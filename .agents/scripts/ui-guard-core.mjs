// Tool-neutral decision core. Every enforcement layer calls this:
//   - Claude Code PreToolUse hook   (adapters/claude-pretooluse.mjs)
//   - OpenCode plugin               (../../.opencode/plugins/ui-guard.js)
//   - git pre-commit / pre-push     (ui-flow.mjs check-staged / check-push)
//   - CI / manual                   (ui-flow.mjs verify)
// Functions return `null` when allowed, or a human-readable denial string.
import os from 'node:os';
import {
  repoRoot, loadConfig, currentBranch, matchesAny, taskIdFromBranch, readPlan, planExecutable, relToRoot,
} from './ui-lib.mjs';

export function makeContext(cwd = process.cwd(), overrides = {}) {
  const root = repoRoot(cwd);
  const cfg = loadConfig(root);
  const branch = overrides.branch !== undefined ? overrides.branch : currentBranch(root);
  const taskId = taskIdFromBranch(branch, cfg);
  const plan = taskId ? readPlan(root, cfg, taskId) : null;
  return {
    root, cfg, branch, taskId, plan,
    exec: planExecutable(plan, { allowDone: !!overrides.allowDone }),
    maintainer: process.env.UI_KIT_MAINTAINER === '1',
    protectedBranch: !!branch && cfg.git.protectedBranches.includes(branch),
  };
}

const START = (ctx) => `Start with: node .agents/scripts/ui-flow.mjs new <slug>   (creates branch ${ctx.cfg.git.branchPrefix}<task-id> + task folder).`;

const isProductOrKit = (ctx, rel) =>
  matchesAny(rel, [...ctx.cfg.scope.uiSourceGlobs, ...(ctx.cfg.scope.elevatedGlobs || []), ...ctx.cfg.scope.neverEditGlobs]);

// mode 'edit'   : an agent is about to write a file (strictest; used by native tool hooks)
// mode 'commit' : a file is being committed/diffed (git hooks, CI). Only ui/* and protected branches are policed.
export function evaluateWrite(ctx, filePath, { mode = 'edit' } = {}) {
  const { cfg, branch, taskId, plan, exec } = ctx;
  const { rel, outside, abs } = relToRoot(ctx.root, filePath);

  if (outside) {
    if (mode !== 'edit') return null;
    const tmps = [os.tmpdir(), '/tmp', '/private/tmp'].map((d) => d.replace(/\/$/, '') + '/');
    const repoInTmp = relToRoot(ctx.root, ctx.root).abs.startsWith(tmps[0]);
    if (!repoInTmp && tmps.some((d) => abs.startsWith(d))) return null;
    return `"${filePath}" is outside the repository.`;
  }

  if (mode === 'commit') {
    if (!branch) return null;
    if (ctx.protectedBranch) {
      return isProductOrKit(ctx, rel) && !(ctx.maintainer && matchesAny(rel, cfg.scope.neverEditGlobs))
        ? `"${rel}" is product/workflow source and you are on protected branch "${branch}". Work on a ${cfg.git.branchPrefix}<task-id> branch and open a PR. ${START(ctx)} (Humans: UI_ALLOW_PROTECTED=1 to override.)`
        : null;
    }
    if (!taskId) return null; // other branches (feature/*, chore/*) are not policed at commit level
  } else {
    if (!branch) return 'detached HEAD: switch to a ui/<task-id> branch first. ' + START(ctx);
    if (ctx.protectedBranch) {
      return `you are on protected branch "${branch}". All changes must happen on a separate branch and reach main via PR. ${START(ctx)}`;
    }
  }

  if (matchesAny(rel, cfg.scope.neverEditGlobs)) {
    if (ctx.maintainer) return null; // kit maintainers (human, chore/ branch) only
    return `"${rel}" is a protected workflow/config file. UI tasks may not edit it. (Kit maintainers: UI_KIT_MAINTAINER=1.)`;
  }
  if (matchesAny(rel, cfg.scope.alwaysAllowedGlobs)) return null;

  if (!taskId) return needTask(ctx, rel);
  if (!exec.ok) return `cannot change "${rel}": ${exec.reason}. Plan first, show it to the user, get approval (skill ui-plan).`;
  const inScope = matchesAny(rel, cfg.scope.uiSourceGlobs);
  const elevated = matchesAny(rel, cfg.scope.elevatedGlobs || []);
  if (!inScope && !elevated) return `"${rel}" is not a UI source file (allowed: ${cfg.scope.uiSourceGlobs.join(', ')}). This pipeline is UI/UX only.`;
  if (!matchesAny(rel, plan.allowed)) {
    return `"${rel}" is not in the approved plan's allowed-files list (${plan.allowed.join(', ')}). Amend the plan: ui-flow reopen → edit → show user → approve.`;
  }
  return null;
}
const needTask = (ctx, rel) =>
  `"${rel}" is product source; changes are only allowed on a ${ctx.cfg.git.branchPrefix}<task-id> branch (current: ${ctx.branch}). ${START(ctx)}`;

// Parse paths out of an apply_patch / unified-patch text.
export function pathsFromPatch(text = '') {
  const out = new Set();
  for (const m of String(text).matchAll(/^\*\*\* (?:Add|Update|Delete) File:\s*(.+)$/gm)) out.add(m[1].trim());
  for (const m of String(text).matchAll(/^\*\*\* Move to:\s*(.+)$/gm)) out.add(m[1].trim());
  for (const m of String(text).matchAll(/^\+\+\+ b\/(.+)$/gm)) out.add(m[1].trim());
  return [...out];
}

// Shell command policy. Returns denial string or null.
export function evaluateBash(ctx, cmd) {
  cmd = String(cmd || '');
  const { cfg, branch, plan, exec } = ctx;
  const protectedBranches = cfg.git.protectedBranches;
  if (/UI_KIT_MAINTAINER|UI_ALLOW_PROTECTED/.test(cmd)) return 'agents may not set the maintainer/override environment variables; these are for humans in their own terminal.';
  const segments = cmd.split(/&&|\|\||;|\n|\|/).map((s) => s.trim()).filter(Boolean);

  for (const seg of segments) {
    if (/ui-flow\.mjs\s+approve\b/.test(seg) && cfg.approval.mode === 'manual') {
      return 'approval.mode is "manual": only a human may approve a plan. Ask the user to run the approve command in their own terminal.';
    }
    if (/\bgit\s+(?:-C\s+\S+\s+)?config\b[^\n]*core\.hooksPath/.test(seg) || /\bgit\s+config\b[^\n]*--unset[^\n]*hooksPath/.test(seg)) {
      return 'the git hooks path must not be changed by agents.';
    }
    const g = seg.match(/^git\s+(?:-C\s+\S+\s+)?([a-z-]+)(.*)$/);
    if (g) {
      const [, sub, rest] = g;
      if (/--no-verify|--no-gpg-sign|(^|\s)-n(\s|$)/.test(rest) && ['commit', 'push', 'merge'].includes(sub)) return 'git hooks/signing must not be bypassed.';
      if (sub === 'commit' && (!branch || protectedBranches.includes(branch))) return `refusing to commit on "${branch ?? 'detached HEAD'}". Work on ${cfg.git.branchPrefix}<task-id>.`;
      if (sub === 'merge') return 'agents never merge. Merging into main happens through a PR opened by a human.';
      if (sub === 'push') {
        if (/(^|\s)(-f|--force|--force-with-lease|--mirror|--delete|-d)(\s|$)/.test(rest)) return 'force/delete pushes are not allowed.';
        if (protectedBranches.some((b) => new RegExp(`(^|[\\s:/])${b}(\\s|$)`).test(rest)) || (branch && protectedBranches.includes(branch))) {
          return 'never push to a protected branch. Push the ui/<task-id> branch and open a PR.';
        }
      }
      if (sub === 'branch' && /\s-[dD]\b|--delete/.test(rest) && protectedBranches.some((b) => rest.includes(b))) return 'protected branches cannot be deleted.';
      if (sub === 'reset' && /--hard/.test(rest) && branch && protectedBranches.includes(branch)) return 'no hard reset on a protected branch.';
    }
    const dep = seg.match(/^(npm|pnpm|yarn|bun)\s+(i|install|add|remove|rm|uninstall|update|up|upgrade)\b(.*)$/);
    if (dep) {
      const args = dep[3].split(/\s+/).filter((a) => a && !a.startsWith('-'));
      const installs = args.length > 0 || ['add', 'remove', 'rm', 'uninstall', 'update', 'up', 'upgrade'].includes(dep[2]);
      if (installs && !(plan && exec.ok && matchesAny('package.json', plan.allowed))) {
        return 'dependency changes are not UI-only by default. List package.json in the approved plan (with justification) first. Plain `npm install` of existing deps is fine.';
      }
    }
  }

  // Write-ish shell commands: check each path-like token against the same file policy.
  const cleaned = cmd.replace(/\d?>&\d|\d?>\s*\/dev\/null|&>\s*\/dev\/null/g, '');
  const writeish = /\b(sed\s+(-[a-zA-Z]*i|--in-place)|perl\s+-[a-zA-Z]*i|tee|mv|cp|rm|touch|truncate|rsync|install|dd)\b|(^|[^<>=0-9&\-])>>?\s*[^\s&>]/.test(cleaned);
  if (writeish) {
    const tokens = cleaned.split(/[\s>]+/).map((t) => t.replace(/^["'`(]+|["'`);,]+$/g, '').replace(/^\.\//, '')).filter(Boolean);
    for (const t of tokens) {
      if (t.startsWith('-') || !/[./]/.test(t)) continue;
      const cand = t.endsWith('/') ? t : t;
      if (!(matchesAny(cand, [...cfg.scope.uiSourceGlobs, ...(cfg.scope.elevatedGlobs || []), ...cfg.scope.neverEditGlobs]) || matchesAny(cand + '/', cfg.scope.uiSourceGlobs) || matchesAny(cand + '/x', cfg.scope.neverEditGlobs))) continue;
      const why = evaluateWrite(ctx, cand, { mode: 'edit' });
      if (why) return `shell command would modify "${cand}": ${why} (Prefer the editor tool so per-file scope is enforced.)`;
    }
  }
  return null;
}
