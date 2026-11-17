---
name: ui-docs
description: Documentation rules for UI tasks in this repo - the per-task folder (plan, steps log, review, PR draft), the single docs/ui/CHANGELOG.md entry format, and design-system registry updates. Every step must be documented; use when logging a step, writing the changelog entry or finalising a task.
---

# ui-docs

Everything that happens is written down, as it happens — not reconstructed afterwards.

## Where
| What | File | Who writes | When |
|---|---|---|---|
| The contract | `docs/ui/tasks/<id>/plan.md` | ui-planner | before approval; locked after |
| Step-by-step log | `docs/ui/tasks/<id>/steps.md` | orchestrator (rows) + documenter (final pass) | after **each** step |
| Independent review | `docs/ui/tasks/<id>/review.md` | ui-reviewer | verify phase |
| PR text | `docs/ui/tasks/<id>/pr.md` | ui-documenter | end |
| **One tracking file for all changes** | `docs/ui/CHANGELOG.md` | ui-documenter | end of every task |
| Tokens / components | `design-system/tokens/TOKENS.md`, `design-system/components/REGISTRY.md` | ds-steward | when they change |
| DS version history | `design-system/CHANGELOG.md` | ds-steward | when DS public surface changes |

## steps.md rules
- A row per plan step; statuses `PENDING | IN_PROGRESS | DONE | SKIPPED | BLOCKED`. Fill agent, files, commit sha, real verification result.
- The **Journal** is append-only, timestamped: decisions, deviations, amendments (+ new approval), failures, surprises, follow-ups discovered.

## CHANGELOG entry rules
- Newest first, under "Task entries". Use the format at the top of the file. Must contain the task id verbatim (the `complete` gate checks).
- Describe what the *user sees*, not the diff. List files. State DS impact with counts. List out-of-scope findings as follow-ups.
- Facts only, from the diff and review. No marketing language, no unverified claims.

## Style
Plain, specific, short. Paths in backticks. Link to sibling files with relative links. Dates ISO.
