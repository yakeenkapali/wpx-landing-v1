#!/usr/bin/env node
// Claude Code adapter (PreToolUse). Reads the hook JSON from stdin; exit 2 = block.
// Wired in .claude/settings.json. Decision logic lives in ../ui-guard-core.mjs.
import { makeContext, evaluateWrite, evaluateBash, pathsFromPatch } from '../ui-guard-core.mjs';

const deny = (msg) => { process.stderr.write(`[ui-guard] BLOCKED: ${msg}\n`); process.exit(2); };

let input = '';
for await (const chunk of process.stdin) input += chunk;
let evt;
try { evt = JSON.parse(input || '{}'); } catch { process.exit(0); }

let ctx;
try { ctx = makeContext(evt.cwd || process.cwd()); } catch (e) { deny(e.message); }

const tool = evt.tool_name || '';
const ti = evt.tool_input || {};

if (['Edit', 'Write', 'MultiEdit', 'NotebookEdit'].includes(tool)) {
  const p = ti.file_path || ti.notebook_path;
  const why = p && evaluateWrite(ctx, p);
  if (why) deny(why);
} else if (tool === 'Bash') {
  const why = evaluateBash(ctx, ti.command);
  if (why) deny(why);
} else if (tool === 'apply_patch') {
  for (const p of pathsFromPatch(ti.input || ti.patch || '')) {
    const why = evaluateWrite(ctx, p);
    if (why) deny(why);
  }
}
process.exit(0);
