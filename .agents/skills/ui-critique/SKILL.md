---
name: ui-critique
description: Scored UX critique of an existing screen or diff using Nielsen's ten usability heuristics, with ranked findings (P0-P3), evidence as path:line, and a prioritised fix list. Use before planning a redesign (to find what is actually wrong) or during review (to judge the result). Read-only; findings feed the plan, they are never auto-fixed.
---

# ui-critique — scored UX review (read-only)

Purpose: replace "make it nicer" with evidence. Run it **before** the plan (what is wrong today?) and **in review** (did we fix it without new problems?). It changes nothing.

Load `ui-guardrails` and `ui-craft` first. Every finding cites `path:line` or a state you actually rendered.

## Inputs
Target (screen/component/flow), personas that use it (`design-systems-personas.md`), and the code map from `ui-researcher`. If you cannot see the rendered result, say "not visually verified" and review from code only; never describe visuals you have not seen.

## Method
1. **Walk the primary task** as the persona would: entry → decision → action → feedback. Note every step and its cost.
2. **Score** each heuristic 0–4 (0 = no issue, 4 = usability catastrophe). Score only what you evidenced; mark the rest `N/A (not evidenced)`.

| # | Heuristic | What to look for here |
|---|---|---|
| 1 | Visibility of system status | loading/progress/confirmation, current selection, date/status chips |
| 2 | Match with the real world | roster/fleet vocabulary from the docs, not internal jargon |
| 3 | User control and freedom | back, cancel, undo, dismissible sheets/dialogs |
| 4 | Consistency and standards | same pattern for same job; registry components reused |
| 5 | Error prevention | disabled/guarded actions are *visibly* explained (presentation only) |
| 6 | Recognition over recall | labels over memory, visible options, sensible defaults |
| 7 | Flexibility and efficiency | shortcuts, filters, thumb-reachable primary actions |
| 8 | Aesthetic and minimalist design | each element earns its place; hierarchy is clear |
| 9 | Help users recover from errors | plain-language errors with a next step |
| 10 | Help and documentation | empty states and inline hints where needed |

3. **Rank findings** with severity: **P0** blocks the task or fails accessibility · **P1** significant friction, likely errors · **P2** noticeable, workaround exists · **P3** polish.
4. **Separate** what is fixable as UI/UX from what needs logic/data (→ "Out of scope / follow-ups").
5. **Recommend** the smallest set of changes that moves the worst scores; each maps to a candidate allowed file.

## Output (paste into plan §3 Evidence, or review.md §3/§5)
```
## Critique — <target>  (mode: Operate; verified: code only | rendered 390px light+dark)
Score: <sum>/40 over <n> evidenced heuristics
| # | Finding (FACT) | Evidence | Heuristic | Sev | UI-fixable? | Proposed move (PROPOSAL) |
Top 3 to fix first: …
Out of scope / follow-ups: …
Not evidenced / UNKNOWN: …
```

## Rules
- No finding without evidence. No invented user research or metrics; if you want data you do not have, put it under UNKNOWN.
- Do not critique confirmed decisions (`roster-mobile-design-plan.md` §0); you may note a concern as a question to the user.
- Do not propose logic changes as fixes. Propose the presentational part, list the rest as follow-ups.
