#!/usr/bin/env node
// Generates tool-specific adapters from the canonical, tool-neutral kit in .agents/.
//   node .agents/scripts/sync.mjs          write adapters
//   node .agents/scripts/sync.mjs --check  exit 1 if any generated file is missing or differs (CI / selftest)
//
// Canonical (edit these):   .agents/skills/<name>/**   .agents/agents/<role>.md   AGENTS.md
// Generated (never edit):   .claude/skills|agents   .opencode/agents   .github/agents
//                           CLAUDE.md GEMINI.md .github/copilot-instructions.md .cursor/rules/ui-workflow.mdc
//                           .windsurf/rules/ui-workflow.md .aider.conf.yml
// Natively read from .agents/skills (no copy needed): OpenCode, Codex-style tools, others following the Agent Skills layout.
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot } from './ui-lib.mjs';

const root = repoRoot();
const check = process.argv.includes('--check');
const drift = [];
const wrote = [];

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
function emit(rel, content) {
  const abs = path.join(root, rel);
  const cur = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : null;
  if (cur === content) return;
  if (check) { drift.push(rel); return; }
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
  wrote.push(rel);
}

function parseFm(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error('missing frontmatter');
  const fm = {};
  for (const l of m[1].split('\n')) { const kv = l.match(/^([A-Za-z_-]+):\s*(.*)$/); if (kv) fm[kv[1]] = kv[2]; }
  return { fm, body: m[2] };
}
const banner = (src) => `<!-- GENERATED from ${src} by .agents/scripts/sync.mjs. Do not edit; edit the source and run: node .agents/scripts/sync.mjs -->\n`;

// ---- 1. skills -> .claude/skills (Claude Code only reads this path) ----
const skillsDir = path.join(root, '.agents/skills');
for (const name of fs.readdirSync(skillsDir)) {
  const walk = (d) => fs.readdirSync(path.join(root, d), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  for (const f of walk(`.agents/skills/${name}`)) {
    const rel = path.relative('.agents/skills', f);
    let c = read(f);
    if (f.endsWith('SKILL.md')) { const { fm, body } = parseFm(c); c = `---\nname: ${fm.name}\ndescription: ${fm.description}\n---\n${banner(f)}${body}`; }
    emit(path.join('.claude/skills', rel), c);
  }
}

// ---- 2. agents -> per-tool formats ----
const agentsDir = path.join(root, '.agents/agents');
for (const file of fs.readdirSync(agentsDir).filter((f) => f.endsWith('.md'))) {
  const src = `.agents/agents/${file}`;
  const { fm, body } = parseFm(read(src));
  const name = fm.name;
  const canWrite = fm.write !== 'none';
  const shell = fm.shell !== 'none';

  // Claude Code
  const tools = ['Read', 'Grep', 'Glob', ...(canWrite ? ['Edit', 'Write'] : []), ...(shell ? ['Bash'] : [])].join(', ');
  emit(`.claude/agents/${file}`, `---\nname: ${name}\ndescription: ${fm.description}\ntools: ${tools}\nmodel: inherit\n---\n${banner(src)}${body}`);

  // OpenCode (.opencode/agents/<name>.md; mode subagent; permission map)
  emit(`.opencode/agents/${file}`, `---\ndescription: ${fm.description}\nmode: subagent\npermission:\n  edit: ${canWrite ? 'allow' : 'deny'}\n  bash: ${shell ? 'allow' : 'deny'}\n---\n${banner(src)}${body}`);

  // GitHub Copilot custom agents
  const ctools = ['read', 'search', ...(canWrite ? ['edit'] : []), ...(shell ? ['execute'] : [])].map((t) => `'${t}'`).join(', ');
  emit(`.github/agents/${name}.agent.md`, `---\nname: ${name}\ndescription: ${fm.description}\ntools: [${ctools}]\n---\n${banner(src)}${body}`);
}

// ---- 3. instruction pointers for tools that read their own file ----
const pointer = `This repository is a UI/UX design workspace governed by a plan-first, branch-isolated workflow.

**Read \`AGENTS.md\` now and follow it exactly.** It is the single source of truth for all AI agents here.

- Any UI/UX request → follow the playbook \`.agents/skills/ui-task/SKILL.md\` (load \`.agents/skills/ui-guardrails/SKILL.md\` first).
- Roles (researcher, planner, implementer, reviewer, documenter, design-system steward) → \`.agents/agents/<role>.md\`. Use native subagents if your tool has them; otherwise perform each role yourself, in order, as a separate pass.
- Never edit product files before the user approves the written plan. Never work on or push to \`main\`. UI/UX changes only. Cite \`path:line\` for every claim about code; if unknown, ask.
- Task state and checks: \`node .agents/scripts/ui-flow.mjs\` (run \`setup\` once per clone to enable git hooks).`;
emit('CLAUDE.md', '@AGENTS.md\n');
emit('GEMINI.md', `@./AGENTS.md\n\n${pointer}\n`);
emit('.github/copilot-instructions.md', `${banner('.agents/scripts/sync.mjs')}${pointer}\n`);
emit('.cursor/rules/ui-workflow.mdc', `---\ndescription: UI/UX workflow rules (always apply)\nalwaysApply: true\n---\n${banner('.agents/scripts/sync.mjs')}${pointer}\n`);
emit('.windsurf/rules/ui-workflow.md', `---\ntrigger: always_on\n---\n${banner('.agents/scripts/sync.mjs')}${pointer}\n`);
emit('.aider.conf.yml', `# GENERATED by .agents/scripts/sync.mjs. Do not edit.\nread:\n  - AGENTS.md\n`);

if (check) {
  if (drift.length) { console.error('Generated adapters are out of date:\n - ' + drift.join('\n - ') + '\nRun: node .agents/scripts/sync.mjs'); process.exit(1); }
  console.log('adapters in sync');
} else {
  console.log(wrote.length ? `wrote ${wrote.length} file(s):\n - ${wrote.join('\n - ')}` : 'nothing to change');
}
