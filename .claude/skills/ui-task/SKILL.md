---
name: ui-task
description: Entry point for any UI/UX or feature request in this repo (new screen, restyle, layout, copy, component, a11y, dark theme, feature on mock data). Fast single-pass flow - context, short plan in chat, build, check, document. Use whenever the user asks to design, change or build UI.
---
<!-- GENERATED from .agents/skills/ui-task/SKILL.md by .agents/scripts/sync.mjs. Do not edit; edit the source and run: node .agents/scripts/sync.mjs -->

# ui-task: fast UI flow

Read `AGENTS.md` first. The agent does the work itself; subagents are only for the documenting steps. Never run `ui-flow`, never require `plan.md`, approval or a clean worktree, and never stash, reset, revert or commit the user's unrelated changes.

## Flow

1. **Branch.** Follow rule 4 in `AGENTS.md`. Compare the current branch name to the task before editing.
2. **Context.** Identify the module (projects, roster, fleet, ...). Read `docs/ui/modules/<module>.md` if present, `design-system/tokens/TOKENS.md` and `design-system/components/REGISTRY.md`. Grep the affected screens and cite `path:line`. Anything unknown: say `UNKNOWN` and ask, don't guess.
3. **Plan in chat.** A few lines: files to touch and what changes. Reuse first (existing token, then existing component, then extend, then add with a one-line reason). Ask before continuing only if the task deletes something, adds a dependency or calls a real API, or is ambiguous.
4. **Build.** Presentational and mock-data changes are pre-authorized per rule 1 in `AGENTS.md`. No new dependencies. No raw hex or off-scale spacing. Edit only the files the task needs.
5. **Check and commit.** Run `npm run build` once and report the real output. Say "not visually verified" unless the result was seen in a browser. If the build exits 0, commit per rule 4 in `AGENTS.md` (only this task's files). If it fails, don't commit.
6. **Document.** For feature tasks, delegate to `ui-documenter` to create or update `docs/ui/modules/<module>.md` and add one line to `docs/ui/CHANGELOG.md`. Skip the module doc for pure visual tweaks, but still add the changelog line. If a token or component was added or changed, run `ds-steward` in sync mode to update the registries.
7. **Review (optional).** Use `ui-reviewer` only for risky tasks, on request.

## Parallel tasks

Features on different modules can run side by side, each in its own worktree: `git worktree add ../<slug> -b ui/<slug>`. Tasks on the same module run one after another. Update registries and module docs at the end of the task, as small diffs, to keep merges clean.

## Stop and ask

- The task needs a new dependency, a build-config change, a real API, or deleting an existing screen or feature.
- The current branch is `main` or `master` (create `ui/<slug>` and tell the user).
- A claim can't be backed by code you read.
- The build fails and the cause is outside the files you touched.