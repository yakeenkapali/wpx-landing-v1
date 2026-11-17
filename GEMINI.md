@./AGENTS.md

This repository is a UI/UX design workspace governed by a plan-first, branch-isolated workflow.

**Read `AGENTS.md` now and follow it exactly.** It is the single source of truth for all AI agents here.

- Any UI/UX request → follow the playbook `.agents/skills/ui-task/SKILL.md` (load `.agents/skills/ui-guardrails/SKILL.md` first).
- Roles (researcher, planner, implementer, reviewer, documenter, design-system steward) → `.agents/agents/<role>.md`. Use native subagents if your tool has them; otherwise perform each role yourself, in order, as a separate pass.
- Never edit product files before the user approves the written plan. Never work on or push to `main`. UI/UX changes only. Cite `path:line` for every claim about code; if unknown, ask.
- Task state and checks: `node .agents/scripts/ui-flow.mjs` (run `setup` once per clone to enable git hooks).
