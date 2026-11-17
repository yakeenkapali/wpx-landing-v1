#!/usr/bin/env node
// ui-flow: the state machine for a UI task. Used by the orchestrator skill (and humans).
//
//   node .agents/scripts/ui-flow.mjs new <slug> ["Human title"]   create branch ui/<task-id> + task folder
//   node .agents/scripts/ui-flow.mjs status                       show task, plan status, scope, hash check
//   node .agents/scripts/ui-flow.mjs approve --by "<name>"        DRAFT -> APPROVED (locks plan with a hash)
//   node .agents/scripts/ui-flow.mjs reopen                       any -> DRAFT (plan needs re-approval)
//   node .agents/scripts/ui-flow.mjs start                        APPROVED -> IN_PROGRESS
//   node .agents/scripts/ui-flow.mjs complete                     IN_PROGRESS -> DONE (only if docs + review are in place)
//   node .agents/scripts/ui-flow.mjs setup                      enable git hooks (core.hooksPath) - run once per clone
//   node .agents/scripts/ui-flow.mjs verify [--base ref] [--branch name] [--final]
//                                                               audit branch diff vs approved plan (used by CI + reviewer)
//   (internal, called by .githooks/*)  check-staged | check-push
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  repoRoot, loadConfig, currentBranch, matchesAny, taskIdFromBranch, taskDir, readPlan, planExecutable, writeFrontMatter,
} from './ui-lib.mjs';
import { makeContext, evaluateWrite } from './ui-guard-core.mjs';

const root = repoRoot();
const cfg = loadConfig(root);
const [cmd, ...args] = process.argv.slice(2);

const git = (...a) => execFileSync('git', a, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const fail = (m) => { console.error(`ui-flow: ${m}`); process.exit(1); };
const today = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return { ymd: `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`, iso: d.toISOString() };
};
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };

function activeTask() {
  const branch = currentBranch(root);
  const id = taskIdFromBranch(branch, cfg);
  if (!id) fail(`not on a ${cfg.git.branchPrefix}<task-id> branch (current: ${branch ?? 'detached HEAD'}).`);
  const plan = readPlan(root, cfg, id);
  if (!plan) fail(`no plan.md for ${id}.`);
  return { id, branch, plan };
}

const staticPrefix = (g) => g.split('*')[0].split('?')[0];
const globPrefixes = (globs) => globs.map(staticPrefix);

function validateScope(plan) {
  const problems = [];
  if (!plan.allowed.length) problems.push('plan has an empty `allowed-files` block');
  const scopeGlobs = [...cfg.scope.uiSourceGlobs, ...(cfg.scope.elevatedGlobs || []), ...cfg.scope.alwaysAllowedGlobs];
  const topLevel = globPrefixes(cfg.scope.uiSourceGlobs);
  for (const g of plan.allowed) {
    const isGlob = /[*?]/.test(g);
    const probe = isGlob ? `${staticPrefix(g)}x` : g;
    if (matchesAny(g, cfg.scope.neverEditGlobs) || matchesAny(probe, cfg.scope.neverEditGlobs)) {
      problems.push(`allowed-files lists a protected path: ${g}`);
    } else if (isGlob ? !globPrefixes(scopeGlobs).some((p) => p && staticPrefix(g).startsWith(p)) : !matchesAny(g, scopeGlobs)) {
      problems.push(`allowed-files lists a path outside UI scope: ${g}`);
    } else if (isGlob && (topLevel.includes(staticPrefix(g)) || staticPrefix(g) === '')) {
      problems.push(`allowed-files glob is too broad (list specific files or a narrower folder): ${g}`);
    }
  }
  if (/\{\{[A-Z_]+\}\}|\[\[FILL/.test(plan.body)) problems.push('plan still contains unfilled template placeholders ({{...}} / [[FILL ...]])');
  return problems;
}

function completionProblems(id, plan) {
  const problems = [];
  const dir = taskDir(root, cfg, id);
  const read = (f) => (fs.existsSync(path.join(dir, f)) ? fs.readFileSync(path.join(dir, f), 'utf8') : null);
  const steps = read('steps.md');
  if (steps === null) problems.push('steps.md is missing');
  else {
    if (/\|\s*(PENDING|IN_PROGRESS)\s*\|/.test(steps)) problems.push('steps.md still has PENDING / IN_PROGRESS steps');
    if (!/\|\s*(DONE|SKIPPED)\s*\|/.test(steps)) problems.push('steps.md has no completed steps logged');
  }
  const review = read('review.md');
  if (review === null || !/Verdict:\s*PASS\b/i.test(review)) problems.push('review.md does not contain "Verdict: PASS"');
  const changelog = path.join(root, cfg.paths.changelog);
  if (!fs.existsSync(changelog) || !fs.readFileSync(changelog, 'utf8').includes(id)) problems.push(`${cfg.paths.changelog} has no entry for ${id}`);
  return problems;
}

function setupHooks() {
  const hp = cfg.git.hooksPath || '.githooks';
  git('config', 'core.hooksPath', hp);
  const dir = path.join(root, hp);
  if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) fs.chmodSync(path.join(dir, f), 0o755);
  return hp;
}

const diffFiles = (...a) => git('diff', '--name-only', '--diff-filter=ACMRD', ...a).split('\n').filter(Boolean);

switch (cmd) {
  case 'new': {
    const slug = (args[0] || '').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
    if (!slug) fail('usage: new <slug> ["Title"]');
    const title = args.slice(1).join(' ') || slug.replace(/-/g, ' ');
    if (git('status', '--porcelain')) fail('working tree is not clean. Commit or stash first so unrelated changes never leak into a UI task.');
    const { ymd, iso } = today();
    fs.mkdirSync(path.join(root, cfg.paths.tasksDir), { recursive: true });
    const n = fs.readdirSync(path.join(root, cfg.paths.tasksDir)).filter((d) => d.startsWith(`UI-${ymd}-`)).length + 1;
    const id = `UI-${ymd}-${String(n).padStart(2, '0')}-${slug}`;
    const branch = `${cfg.git.branchPrefix}${id}`;
    try { git('fetch', 'origin', cfg.git.baseBranch); } catch { /* offline is fine */ }
    let base = cfg.git.baseBranch;
    try { git('rev-parse', '--verify', `origin/${base}`); base = `origin/${base}`; } catch { /* use local */ }
    git('checkout', '--no-track', '-b', branch, base);
    try { setupHooks(); } catch { /* not fatal */ }
    const dir = taskDir(root, cfg, id);
    fs.mkdirSync(dir, { recursive: true });
    const tplDir = path.join(root, cfg.paths.workflowDocs, '_templates');
    const files = { 'plan.md': 'plan.md', 'steps.md': 'steps.md', 'review.md': 'review.md', 'pr.md': 'pr.md' };
    for (const [out, tpl] of Object.entries(files)) {
      const t = fs.readFileSync(path.join(tplDir, tpl), 'utf8')
        .replaceAll('{{ID}}', id).replaceAll('{{TITLE}}', title).replaceAll('{{BRANCH}}', branch)
        .replaceAll('{{DATE}}', iso.slice(0, 10)).replaceAll('{{BASE}}', cfg.git.baseBranch);
      fs.writeFileSync(path.join(dir, out), t);
    }
    console.log(`Created branch ${branch} (from ${base}) and ${path.relative(root, dir)}/{plan,steps,review,pr}.md\nTASK_ID=${id}`);
    break;
  }

  case 'status': {
    const { id, branch, plan } = activeTask();
    const e = planExecutable(plan);
    console.log(JSON.stringify({
      task: id, branch, status: plan.meta.status, approved_by: plan.meta.approved_by || null,
      hash_matches_approval: plan.meta.approved_hash ? plan.meta.approved_hash === plan.hash : null,
      executable: e.ok, reason: e.ok ? null : e.reason, allowedFiles: plan.allowed,
    }, null, 2));
    process.exit(e.ok ? 0 : 3);
  }

  case 'approve': {
    const { plan } = activeTask();
    const by = flag('--by');
    if (!by) fail('usage: approve --by "<approver name>"');
    if ((plan.meta.status || '').toUpperCase() !== 'DRAFT') fail(`plan status is ${plan.meta.status}; only DRAFT plans can be approved.`);
    const problems = validateScope(plan);
    if (problems.length) fail(`cannot approve:\n - ${problems.join('\n - ')}`);
    writeFrontMatter(plan.file, { status: 'APPROVED', approved_by: by, approved_at: today().iso, approved_hash: plan.hash });
    console.log(`Plan APPROVED by ${by}. Locked with hash ${plan.hash}. Any edit to the plan body now invalidates it.`);
    break;
  }

  case 'reopen': {
    const { plan } = activeTask();
    writeFrontMatter(plan.file, { status: 'DRAFT', approved_by: '', approved_at: '', approved_hash: '' });
    console.log('Plan reopened as DRAFT. Edit it, show the user, then approve again. Log the amendment in steps.md.');
    break;
  }

  case 'start': {
    const { plan } = activeTask();
    const e = planExecutable(plan);
    if (!e.ok) fail(`cannot start: ${e.reason}`);
    writeFrontMatter(plan.file, { status: 'IN_PROGRESS' });
    console.log('Plan IN_PROGRESS. Implementation may begin.');
    break;
  }

  case 'complete': {
    const { id, plan } = activeTask();
    const problems = [];
    if ((plan.meta.status || '').toUpperCase() !== 'IN_PROGRESS') problems.push(`plan status is ${plan.meta.status}, expected IN_PROGRESS`);
    const e = planExecutable(plan);
    if (!e.ok) problems.push(e.reason);
    problems.push(...completionProblems(id, plan));
    if (git('status', '--porcelain')) problems.push('working tree has uncommitted changes; commit them on this branch first');
    if (problems.length) fail(`cannot complete:\n - ${problems.join('\n - ')}`);
    writeFrontMatter(plan.file, { status: 'DONE' });
    console.log(`Task ${id} marked DONE. Hand off: branch ${currentBranch(root)} is ready for a PR into ${cfg.git.baseBranch}.`);
    break;
  }

  case 'setup': {
    console.log(`git hooks enabled: core.hooksPath=${setupHooks()}`);
    break;
  }

  case 'check-staged': { // pre-commit
    const ctx = makeContext(root);
    if (ctx.protectedBranch && process.env.UI_ALLOW_PROTECTED === '1') process.exit(0);
    const bad = diffFiles('--cached').map((f) => [f, evaluateWrite(ctx, f, { mode: 'commit' })]).filter(([, w]) => w);
    if (bad.length) {
      console.error('[ui-workflow] commit blocked:\n' + bad.map(([f, w]) => ` - ${f}: ${w}`).join('\n'));
      process.exit(1);
    }
    break;
  }

  case 'check-push': { // pre-push; stdin lines: <local ref> <local sha> <remote ref> <remote sha>
    let input = '';
    for await (const c of process.stdin) input += c;
    if (process.env.UI_ALLOW_PROTECTED === '1') process.exit(0);
    for (const line of input.split('\n').filter(Boolean)) {
      const remoteRef = line.split(' ')[2] || '';
      const name = remoteRef.replace(/^refs\/heads\//, '');
      if (cfg.git.protectedBranches.includes(name)) {
        console.error(`[ui-workflow] push to protected branch "${name}" blocked. Push your ${cfg.git.branchPrefix}<task-id> branch and open a PR. (Humans: UI_ALLOW_PROTECTED=1.)`);
        process.exit(1);
      }
    }
    break;
  }

  case 'verify': { // branch audit: CI + ui-reviewer
    const final = args.includes('--final');
    const branchArg = flag('--branch') || process.env.GITHUB_HEAD_REF || undefined;
    const ctx = makeContext(root, { branch: branchArg ?? currentBranch(root), allowDone: true });
    let base = flag('--base') || `origin/${cfg.git.baseBranch}`;
    try { git('rev-parse', '--verify', base); } catch { base = cfg.git.baseBranch; }
    const files = diffFiles(`${base}...HEAD`);
    const problems = [];
    const warnings = [];
    if (!ctx.taskId) {
      const touched = files.filter((f) => matchesAny(f, [...cfg.scope.uiSourceGlobs, ...(cfg.scope.elevatedGlobs || []), ...cfg.scope.neverEditGlobs]));
      if (touched.length) {
        const msg = `branch "${ctx.branch}" is not a ${cfg.git.branchPrefix}<task-id> branch but touches product/workflow files: ${touched.join(', ')}`;
        (cfg.ci.nonUiBranchPolicy === 'fail' ? problems : warnings).push(msg);
      }
    } else {
      if (!ctx.plan) problems.push(`no plan.md for ${ctx.taskId}`);
      else if (!ctx.exec.ok) problems.push(`plan not valid: ${ctx.exec.reason}`);
      for (const f of files) {
        const why = evaluateWrite(ctx, f, { mode: 'commit' });
        if (why) problems.push(`${f}: ${why}`);
      }
      if (ctx.plan && (final || cfg.ci.requireCompleteOnPR && process.env.CI)) {
        if ((ctx.plan.meta.status || '').toUpperCase() !== 'DONE') problems.push(`plan status is ${ctx.plan.meta.status}, expected DONE (run ui-flow complete)`);
        problems.push(...completionProblems(ctx.taskId, ctx.plan));
      }
    }
    console.log(`verify: branch=${ctx.branch} task=${ctx.taskId ?? '-'} base=${base} files=${files.length}`);
    warnings.forEach((w) => console.log(`WARN: ${w}`));
    if (problems.length) { console.error('FAIL:\n - ' + problems.join('\n - ')); process.exit(1); }
    console.log('OK');
    break;
  }

  default:
    console.log(fs.readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(1, 11).join('\n'));
    process.exit(cmd ? 1 : 0);
}
