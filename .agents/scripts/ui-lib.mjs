// Shared helpers for the UI workflow guard and the ui-flow CLI. Zero dependencies (Node >= 18).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

export function repoRoot(cwd = process.cwd()) {
  try {
    return execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return cwd;
  }
}

export function loadConfig(root) {
  const file = path.join(root, 'design-system', 'ui-workflow.config.json');
  if (!fs.existsSync(file)) throw new Error(`Missing ${file}. The UI kit is not installed correctly.`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function currentBranch(root) {
  try {
    const b = execFileSync('git', ['symbolic-ref', '--short', '-q', 'HEAD'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return b || null;
  } catch {
    return null; // detached HEAD
  }
}

// --- glob matching: supports **, *, ? ---
export function globToRegExp(glob) {
  let g = glob.replace(/^\.\//, '');
  let re = '';
  for (let i = 0; i < g.length; i++) {
    const c = g[i];
    if (c === '*') {
      if (g[i + 1] === '*') {
        i++;
        if (g[i + 1] === '/') { i++; re += '(?:.*/)?'; } else re += '.*';
      } else re += '[^/]*';
    } else if (c === '?') re += '[^/]';
    else re += c.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  }
  return new RegExp(`^${re}$`);
}
export const matchesAny = (rel, globs) => globs.some((g) => globToRegExp(g).test(rel));

// --- task + plan ---
export function taskIdFromBranch(branch, cfg) {
  if (!branch || !branch.startsWith(cfg.git.branchPrefix)) return null;
  return branch.slice(cfg.git.branchPrefix.length);
}
export const taskDir = (root, cfg, id) => path.join(root, cfg.paths.tasksDir, id);
export const planFile = (root, cfg, id) => path.join(taskDir(root, cfg, id), 'plan.md');

export function splitFrontMatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: text, raw: '' };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  return { meta, body: text.slice(m[0].length), raw: m[0] };
}

export const planHash = (body) =>
  crypto.createHash('sha256').update(body.replace(/\r\n/g, '\n').trim()).digest('hex').slice(0, 16);

export function readPlan(root, cfg, id) {
  const file = planFile(root, cfg, id);
  if (!fs.existsSync(file)) return null;
  const text = fs.readFileSync(file, 'utf8');
  const { meta, body } = splitFrontMatter(text);
  const block = body.match(/```allowed-files\r?\n([\s\S]*?)```/);
  const allowed = block
    ? block[1].split(/\r?\n/).map((l) => l.replace(/#.*$/, '').trim()).filter(Boolean)
    : [];
  return { file, text, meta, body, allowed, hash: planHash(body) };
}

// A plan is "executable" only if approved, in progress, and untouched since approval.
export function planExecutable(plan, { allowDone = false } = {}) {
  if (!plan) return { ok: false, reason: 'no plan.md exists for this task' };
  const s = (plan.meta.status || '').toUpperCase();
  if (s !== 'APPROVED' && s !== 'IN_PROGRESS' && !(allowDone && s === 'DONE')) return { ok: false, reason: `plan status is ${s || 'missing'}, not APPROVED` };
  if (!plan.meta.approved_hash) return { ok: false, reason: 'plan has no approval hash (use ui-flow approve)' };
  if (plan.meta.approved_hash !== plan.hash) return { ok: false, reason: 'plan was modified after approval; run ui-flow reopen, re-present, and get re-approval' };
  if (!plan.allowed.length) return { ok: false, reason: 'plan has no allowed-files block' };
  return { ok: true };
}

// Resolve symlinks on the deepest existing ancestor (the file itself may not exist yet).
function realish(p) {
  let cur = path.resolve(p);
  const tail = [];
  while (!fs.existsSync(cur)) {
    const parent = path.dirname(cur);
    if (parent === cur) break;
    tail.unshift(path.basename(cur));
    cur = parent;
  }
  let base = cur;
  try { base = fs.realpathSync(cur); } catch { /* keep */ }
  return path.join(base, ...tail);
}

export function relToRoot(root, p) {
  const realRoot = realish(root);
  const abs = realish(path.isAbsolute(p) ? p : path.resolve(root, p));
  const rel = path.relative(realRoot, abs).split(path.sep).join('/');
  return { abs, rel, outside: rel.startsWith('..') || path.isAbsolute(rel) };
}

export function writeFrontMatter(file, updates) {
  const text = fs.readFileSync(file, 'utf8');
  const { meta, body } = splitFrontMatter(text);
  const next = { ...meta, ...updates };
  const order = ['task', 'title', 'status', 'branch', 'created', 'approved_by', 'approved_at', 'approved_hash'];
  const keys = [...order.filter((k) => k in next), ...Object.keys(next).filter((k) => !order.includes(k))];
  const fm = `---\n${keys.map((k) => `${k}: ${next[k] ?? ''}`).join('\n')}\n---\n`;
  fs.writeFileSync(file, fm + body);
}
