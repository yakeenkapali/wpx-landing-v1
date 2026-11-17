#!/usr/bin/env node
// Self-test for the whole UI workflow kit. Copies it into a throwaway git repo and exercises every enforcement layer:
// Claude adapter, OpenCode plugin, git hooks, ui-flow state machine, verify (CI), adapter sync.
// Run: node .agents/scripts/selftest.mjs   (exit 0 = all pass). Needs only Node >= 18 and git.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';

const SRC = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();
const T = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'ui-kit-test-')));
const run = (cmd, args, opts = {}) => spawnSync(cmd, args, { cwd: T, encoding: 'utf8', ...opts });
const git = (...a) => run('git', ['-c', 'user.email=t@t', '-c', 'user.name=t', ...a]);

for (const p of ['.agents', '.githooks', '.opencode', '.github', '.claude', 'design-system', 'docs/ui', 'AGENTS.md', 'CLAUDE.md', 'GEMINI.md', '.aider.conf.yml', '.cursor', '.windsurf', 'src', 'index.html', 'package.json']) {
  const from = path.join(SRC, p);
  if (!fs.existsSync(from)) continue;
  fs.cpSync(from, path.join(T, p), { recursive: true, filter: (f) => !f.includes('/docs/ui/tasks/UI-') });
}
git('init', '-q', '-b', 'main'); git('add', '-A'); git('commit', '-qm', 'base', '--no-verify');

let failed = 0;
const check = (name, got, want) => {
  const ok = got === want;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : `  (got ${got}, expected ${want})`}`);
};
const section = (s) => console.log(`\n# ${s}`);

// --- layer: Claude Code adapter ---
const claude = (tool, input, env = {}) =>
  run('node', ['.agents/scripts/adapters/claude-pretooluse.mjs'], { input: JSON.stringify({ tool_name: tool, tool_input: input, cwd: T }), env: { ...process.env, ...env } }).status;
const edit = (rel, env) => claude('Edit', { file_path: path.join(T, rel) }, env);
const bash = (command) => claude('Bash', { command });
const flow = (...a) => run('node', ['.agents/scripts/ui-flow.mjs', ...a]);
const touch = (rel) => fs.appendFileSync(path.join(T, rel), '\n/* t */\n');

section('Claude adapter on protected branch main');
check('edit src blocked', edit('src/styles.css'), 2);
check('edit docs blocked', edit('docs/ui/CHANGELOG.md'), 2);
check('commit blocked', bash('git commit -m x'), 2);
check('merge blocked', bash('git merge ui/x'), 2);
check('--no-verify blocked', bash('git commit --no-verify -m x'), 2);
check('read-only git ok', bash('git log --oneline -3 && git diff main...HEAD'), 0);
check('build ok', bash('npm run build 2>&1 | tail -3'), 0);
check('agent cannot set override env', bash('UI_ALLOW_PROTECTED=1 git commit -m x'), 2);
check('agent cannot change hooksPath', bash('git config core.hooksPath /dev/null'), 2);

section('Git hooks on main');
check('ui-flow setup', flow('setup').status, 0);
check('hooksPath set', run('git', ['config', 'core.hooksPath']).stdout.trim(), '.githooks');
touch('src/styles.css'); git('add', 'src/styles.css');
check('pre-commit blocks product file on main', git('commit', '-m', 'x').status !== 0, true);
check('UI_ALLOW_PROTECTED lets a human through', run('node', ['.agents/scripts/ui-flow.mjs', 'check-staged'], { env: { ...process.env, UI_ALLOW_PROTECTED: '1' } }).status, 0);
git('reset', '-q', '--hard');
const push = (line) => run('node', ['.agents/scripts/ui-flow.mjs', 'check-push'], { input: line + '\n' }).status;
check('pre-push blocks main', push('refs/heads/x abc refs/heads/main def'), 1);
check('pre-push allows ui branch', push('refs/heads/ui/x abc refs/heads/ui/x def'), 0);

section('Task created, plan DRAFT');
check('ui-flow new', flow('new', 'selftest', 'Selftest').status, 0);
const branch = run('git', ['branch', '--show-current']).stdout.trim();
const id = branch.replace(/^ui\//, '');
check('branch is ui/<task-id>', branch.startsWith('ui/UI-'), true);
check('src edit blocked (DRAFT)', edit('src/styles.css'), 2);
check('task docs editable', edit(`docs/ui/tasks/${id}/steps.md`), 0);
check('sed -i on src blocked', bash('sed -i "" s/a/b/ src/styles.css'), 2);
check('redirect into src blocked', bash('echo x >> src/App.jsx'), 2);
check('cp into src dir blocked', bash('cp /tmp/a.css src/x.css'), 2);
check('write to .agents blocked', edit('.agents/scripts/ui-flow.mjs'), 2);
check('write to .github blocked', edit('.github/workflows/ui-workflow.yml'), 2);
check('write to .githooks blocked', edit('.githooks/pre-commit'), 2);
check('write to config blocked', edit('design-system/ui-workflow.config.json'), 2);
check('write to AGENTS.md blocked', edit('AGENTS.md'), 2);
check('shell write to .agents blocked', bash('echo x > .agents/scripts/ui-flow.mjs'), 2);
check('maintainer env allows kit edit (human)', edit('.agents/scripts/ui-flow.mjs', { UI_KIT_MAINTAINER: '1' }), 0);
check('outside repo blocked', claude('Write', { file_path: path.join(os.homedir(), 'x.txt') }), 2);
check('approve with placeholders refused', flow('approve', '--by', 't').status, 1);
touch('src/styles.css'); git('add', 'src/styles.css');
check('pre-commit blocks src while plan DRAFT', git('commit', '-m', 'x').status !== 0, true);
git('reset', '-q', '--hard');

section('OpenCode plugin');
const { UiGuard } = await import(pathToFileURL(path.join(T, '.opencode/plugins/ui-guard.js')).href);
const oc = await UiGuard({ directory: T, worktree: T });
const ocBlocked = async (tool, args) => { try { await oc['tool.execute.before']({ tool }, { args }); return false; } catch { return true; } };
check('edit src blocked (DRAFT)', await ocBlocked('edit', { filePath: path.join(T, 'src/styles.css') }), true);
check('write docs allowed', await ocBlocked('write', { filePath: path.join(T, `docs/ui/tasks/${id}/steps.md`) }), false);
check('bash git merge blocked', await ocBlocked('bash', { command: 'git merge main' }), true);
check('apply_patch to src blocked', await ocBlocked('apply_patch', { patchText: '*** Begin Patch\n*** Update File: src/App.jsx\n*** End Patch' }), true);
check('read always allowed', await ocBlocked('read', { filePath: path.join(T, 'src/App.jsx') }), false);

section('Plan filled + approved');
const planFile = path.join(T, 'docs/ui/tasks', id, 'plan.md');
let plan = fs.readFileSync(planFile, 'utf8').replace(/\[\[FILL[^\]]*\]\]/g, 'filled');
plan = plan.replace(/```allowed-files\n[\s\S]*?```/, '```allowed-files\nsrc/styles.css\n```');
fs.writeFileSync(planFile, plan);
check('approve ok', flow('approve', '--by', 'tester').status, 0);
check('start ok', flow('start').status, 0);
check('listed file editable (claude)', edit('src/styles.css'), 0);
check('listed file editable (opencode)', await ocBlocked('edit', { filePath: path.join(T, 'src/styles.css') }), false);
check('unlisted file blocked (claude)', edit('src/App.jsx'), 2);
check('unlisted file blocked (opencode)', await ocBlocked('edit', { filePath: path.join(T, 'src/App.jsx') }), true);
check('package.json blocked (not listed)', edit('package.json'), 2);
check('npm add dep blocked', bash('npm install lodash'), 2);
check('push main blocked', bash('git push origin main'), 2);
check('force push blocked', bash('git push --force origin ' + branch), 2);

section('Git hooks on ui branch + verify (CI)');
touch('src/styles.css'); git('add', 'src/styles.css');
check('pre-commit allows listed file', git('commit', '-m', 'ui step 1').status, 0);
check('verify passes (non-final)', flow('verify', '--base', 'main').status, 0);
touch('src/App.jsx'); git('add', 'src/App.jsx');
check('pre-commit blocks unlisted file', git('commit', '-m', 'x').status !== 0, true);
check('bypass via --no-verify works locally...', git('commit', '--no-verify', '-m', 'sneak').status, 0);
check('...but is caught by verify (CI)', flow('verify', '--base', 'main').status, 1);
check('verify --final fails w/o docs/review', flow('verify', '--base', 'main', '--final').status, 1);
git('reset', '-q', '--hard', 'HEAD~1');
check('verify passes again after revert', flow('verify', '--base', 'main').status, 0);

section('Plan tampered after approval');
fs.appendFileSync(planFile, '\nsneaky change\n');
check('listed file now blocked', edit('src/styles.css'), 2);
check('complete refused', flow('complete').status, 1);
check('verify flags invalid plan', flow('verify', '--base', 'main').status, 1);
check('reopen ok', flow('reopen').status, 0);
check('status shows DRAFT', JSON.parse(flow('status').stdout || '{}').status === 'DRAFT', true);

section('Other branches are not policed at commit level');
git('stash', '-u', '-q'); git('checkout', '-q', '-b', 'chore/other', 'main');
touch('src/styles.css'); git('add', 'src/styles.css');
check('commit on chore/ branch passes hook', git('commit', '-m', 'logic fix by a human').status, 0);
check('verify only warns on non-ui branch', flow('verify', '--base', 'main').status, 0);

section('Generated adapters');
check('sync --check passes', run('node', ['.agents/scripts/sync.mjs', '--check']).status, 0);
fs.appendFileSync(path.join(T, '.claude/agents/ui-planner.md'), '\ndrift\n');
check('drift detected', run('node', ['.agents/scripts/sync.mjs', '--check']).status, 1);
check('sync repairs drift', run('node', ['.agents/scripts/sync.mjs']).status, 0);
check('sync --check passes again', run('node', ['.agents/scripts/sync.mjs', '--check']).status, 0);
for (const f of ['CLAUDE.md', 'GEMINI.md', '.github/copilot-instructions.md', '.cursor/rules/ui-workflow.mdc', '.windsurf/rules/ui-workflow.md', '.aider.conf.yml', '.opencode/agents/ui-reviewer.md', '.github/agents/ui-reviewer.agent.md', '.claude/agents/ui-reviewer.md', '.claude/skills/ui-task/SKILL.md']) {
  check(`generated file exists: ${f}`, fs.existsSync(path.join(T, f)), true);
}

section('Contrast tool and design-skill pack');
check('contrast white on black = 21:1', run('node', ['.agents/scripts/contrast.mjs', '#fff', '#000']).stdout.includes('21.00:1'), true);
check('contrast #777 on white is below AA text', run('node', ['.agents/scripts/contrast.mjs', '#777', '#fff']).stdout.includes('4.48:1'), true);
check('contrast --strict fails on a low pair', run('node', ['.agents/scripts/contrast.mjs', '#777', '#fff', '--strict']).status, 1);
check('contrast refuses non-hex instead of guessing', run('node', ['.agents/scripts/contrast.mjs', 'rgba(0,0,0,.5)', '#fff']).stdout.includes('SKIPPED'), true);
for (const sk of ['ui-craft', 'ui-critique', 'ui-a11y-audit', 'ui-external-skills']) {
  check(`skill present and mirrored: ${sk}`, fs.existsSync(path.join(T, `.agents/skills/${sk}/SKILL.md`)) && fs.existsSync(path.join(T, `.claude/skills/${sk}/SKILL.md`)), true);
}
check('external skills registry present', fs.existsSync(path.join(T, 'design-system/EXTERNAL-SKILLS.md')), true);

section('Manual approval mode');
const cfgPath = path.join(T, 'design-system/ui-workflow.config.json');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
cfg.approval.mode = 'manual';
fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
check('agent cannot run approve', bash('node .agents/scripts/ui-flow.mjs approve --by x'), 2);

fs.rmSync(T, { recursive: true, force: true });
console.log(failed ? `\n${failed} check(s) FAILED` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
