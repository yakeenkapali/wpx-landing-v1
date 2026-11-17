---
name: ui-git-workflow
description: Git rules for UI work in this repo - branch by task type (rule 4 in AGENTS.md), never commit unless asked, no merge, no force-push, no push to main. Use when branching, committing or handing off.
---

# ui-git-workflow

- **Branching** follows rule 4 in `AGENTS.md`: stay on the current branch only if the task belongs to it, otherwise create `ui/<short-slug>`.
- **Uncommitted changes are the user's.** Never require a clean tree. Never stash, reset, checkout over, revert or commit them. Edit only the files the task needs.
- **Commits**: Commit only when `npm run build` exits 0 and the task is done: stage only the files this task changed (explicit paths, never `git add -A`), message `<type>: <short summary>`, no `--no-verify`. Build fails or unsure → don't commit and report. Never commit on `main`/`master`. Never merge or push unless asked.
- **Never** run `git merge`, `git rebase`, force-push, delete branches, or push to `main`/`master`. Don't push at all unless the user asks, and then push only the current `ui/<slug>` branch.
- **Handoff**: report the branch name, what changed and the build result. The user opens the PR and merges.
- **Rollback**: `git revert <sha>` for a commit, or drop the branch. `main` is untouched.
- **Kit changes** (anything in `.agents/`, `AGENTS.md`, `.opencode/`, `.claude/`, `.github/`) are not UI tasks. The agent doesn't edit them. The user does it on a `chore/` branch.