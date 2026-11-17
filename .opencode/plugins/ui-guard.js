// Lean guard: protects kit files and git history only. No plan/approval gate.
import { execSync } from 'node:child_process';

const KIT = [/^AGENTS\.md$/, /^\.agents\//, /^\.githooks\//, /^\.opencode\//, /^\.claude\//];
const BAD_BASH = [
  /git\s+push\b.*\b(main|master)\b/,
  /git\s+push\b.*(--force|-f\b)/,
  /--no-verify/,
  /git\s+(merge|rebase)\b/,
];

export const UiGuard = async ({ directory, worktree }) => {
  const cwd = worktree || directory || process.cwd();
  const rel = (p) => String(p).replace(cwd, '').replace(/^[\\/]+/, '').replace(/\\/g, '/');
  const branch = () => {
    try { return execSync('git branch --show-current', { cwd }).toString().trim(); } catch { return ''; }
  };
  return {
    'tool.execute.before': async (input, output) => {
      const tool = String(input?.tool || '').toLowerCase();
      const args = output?.args || {};
      if (['edit', 'write', 'multiedit'].includes(tool)) {
        const p = rel(args.filePath || args.file_path || args.path || '');
        if (KIT.some((r) => r.test(p))) throw new Error(`[ui-guard] kit file, edit it yourself: ${p}`);
        if (['main', 'master'].includes(branch())) throw new Error('[ui-guard] on main: create a ui/<slug> branch first');
      } else if (tool === 'bash') {
        const c = String(args.command || '');
        if (BAD_BASH.some((r) => r.test(c))) throw new Error(`[ui-guard] blocked command: ${c}`);
      }
    },
  };
};