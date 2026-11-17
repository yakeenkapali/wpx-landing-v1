# AGENTS.md — WorkPlanX Roster & Fleet prototype

This repo is a **UI/UX design workspace**. The React app *is* the design tool (we do not design in Figma). AI agents here do **UI/UX work by default, and logic work only after the user confirms it**, through a fixed, auditable pipeline.

Project facts (verify in code, don't assume): Vite + React (JSX), plain CSS in `src/styles.css` + `src/spacing.css`, `lucide-react` icons, mobile-first 390×844, light + `.theme-dark`, mock in-memory data. Project-specific kit settings: `design-system/ui-workflow.config.json`.

## The rules (always)
1. **Logic.** Markup, CSS, state, handlers, mock data, validation and screen-to-screen routing are pre-authorized. Ask first only for dependencies, build config, deleting screens or features, or real APIs.
2. **No hallucination.** Cite `path:line` for code claims. Never invent components, tokens, props or copy. Unknown → `UNKNOWN` → ask. Run `npm run build` once at the end and report the real output.
3. **Plan in chat.** A short checklist of files and changes, then build. Wait for a yes only if the task deletes things or is ambiguous.
4. **Branch by relatedness.**
   - Before the first edit, run `git branch --show-current` and compare the branch name to the task.
   - Task belongs to the current branch's purpose (a tweak or fix to the same feature) → stay on it.
   - Task is unrelated to the current branch (different feature, screen or module, or a standalone fix) → create `ui/<short-slug>` from the current branch and say so in one line. If it should start from `main` instead, ask once.
   - Can't tell (the branch name is vague) → ask one short question: "Same branch or new branch?"
   - On `main`/`master` → always create `ui/<short-slug>`.
   - If creating a branch while uncommitted changes exist, say so in one line: those changes will come along. Don't move them.
   - The user's words override all of this ("same branch", "new branch").
   - Never run `ui-flow`. Never require a clean worktree. Never stash, reset or revert the user's changes.
   - Commit only when `npm run build` exits 0 and the task is done: stage only the files this task changed (explicit paths, never `git add -A`), message `<type>: <short summary>`, no `--no-verify`. Build fails or unsure → don't commit and report. Never commit on `main`/`master`. Never merge or push unless asked.
   - Parallel features → `git worktree add ../<slug> -b ui/<slug>`.
5. **Docs.** Feature tasks update `docs/ui/modules/<module>.md` (edit in place, one file per module). Every task adds one line to `docs/ui/CHANGELOG.md`.
6. **Design system first.** Reuse → compose → extend → add (with a one-line reason). No raw hex, no off-scale spacing. Registries: `design-system/tokens/TOKENS.md`, `design-system/components/REGISTRY.md`.
7. **Agents.** The main agent does the work. Use `ui-documenter` for docs and `ds-steward` for registry sync. `ui-reviewer` only on request.


## How to start a UI task
Ask in plain words or invoke skill `ui-task`: context → short plan in chat → build → `npm run build` → commit if green → module doc + changelog line.

## Skills (`.agents/skills/`)
| Skill | Purpose |
|---|---|
| `ui-task` | Orchestrator / entry point for the whole pipeline |
| `ui-guardrails` | Scope (UI/UX by default, logic only with confirmation), evidence protocol, forbidden actions |
| `ui-docs` | Step log, changelog, PR draft, registries |
| `ui-git-workflow` | Branch/commit/PR rules |
| `design-system` | Tokens, components, governance, portability |
| `ui-craft` | Generic UI/UX craft lenses (hierarchy, type, colour, layout, motion, copy, states) + anti-slop checklist. Advisory |
| `ui-critique` | Scored UX review (Nielsen heuristics), P0–P3 findings. Read-only |
| `ui-a11y-audit` | WCAG 2.2 AA audit with computed contrast (`.agents/scripts/contrast.mjs`). Read-only |
| `ui-external-skills` | How to use Impeccable, UI UX Pro Max, frontend-design, etc. safely (advisory only). Registry: `design-system/EXTERNAL-SKILLS.md` |

## Agents (`.agents/agents/`)
`ds-steward` (registry audit/sync) · `ui-documenter` (module doc + changelog) · `ui-reviewer` (optional browser review)

## Works with every AI tool
The kit is **tool-neutral**. The canonical source is `.agents/` (skills, roles, scripts); everything else is generated from it by `node .agents/scripts/sync.mjs` (`sync.mjs --check` fails if generated files drift; run it in CI if you add one). **Edit `.agents/` and `AGENTS.md`, never the generated copies.**

| Tool | Instructions | Skills | Subagent roles | Pre-edit blocking |
|---|---|---|---|---|
| Any tool / human (baseline) | `AGENTS.md` | read `.agents/skills/*/SKILL.md` | read `.agents/agents/<role>.md`, run each role as a separate pass | git hooks (below) |
| Claude Code | `CLAUDE.md` → `AGENTS.md` | `.claude/skills` (generated) | `.claude/agents` (generated) | PreToolUse hook (`.claude/settings.json`) |
| OpenCode | `AGENTS.md` | `.agents/skills` (native) | `.opencode/agents` (generated) | plugin `.opencode/plugins/ui-guard.js` |
| GitHub Copilot | `.github/copilot-instructions.md` + `AGENTS.md` | `.agents/skills` | `.github/agents/*.agent.md` (generated) | git hooks |
| Cursor | `.cursor/rules/ui-workflow.mdc` + `AGENTS.md` | read `.agents/skills` | role files, sequential | git hooks |
| Gemini CLI | `GEMINI.md` → `AGENTS.md` | read `.agents/skills` | role files, sequential | git hooks |
| Windsurf | `.windsurf/rules/ui-workflow.md` + `AGENTS.md` | read `.agents/skills` | role files, sequential | git hooks |
| Aider | `.aider.conf.yml` reads `AGENTS.md` | read `.agents/skills` | role files, sequential | git hooks |
| Codex & others | `AGENTS.md` | read `.agents/skills` | role files, sequential | git hooks |

Support status (be honest about it): Claude Code and OpenCode adapters follow documented hook/plugin APIs; OpenCode's skill/agent/plugin paths were checked against its docs, but the adapters were only exercised through simulated calls (`selftest.mjs`), not inside the live tools. The other tools' rule-file locations follow their published conventions and were **not** verified in a live session; for them `AGENTS.md` + the git hooks (and CI, if you add it) are what you can rely on.

## Enforcement
A lean guard (`.opencode/plugins/ui-guard.js`) blocks edits on `main`/`master`, edits to kit files, `git merge`/`rebase`, force-push, pushes to `main` and `--no-verify`. Everything else follows the rules above.

## Not covered by this workflow?
Dependencies, build config and kit changes are not covered by the logic-confirmation flow. Say so and stop. Setup/kit changes use a `chore/` branch and a human-reviewed PR; after editing `.agents/`, run `node .agents/scripts/sync.mjs`.