---
name: ui-craft
description: Generic, tool-neutral UI/UX craft playbook - hierarchy, typography, colour, spacing and layout, motion, UX copy, states, responsive and density, plus an anti-"AI slop" checklist - applied as design lenses (steer, simplify, polish, clarify, adapt, animate). Use when designing or improving the look and feel of a screen, choosing between design options, or reviewing visual quality. Advisory only; the repo design system and the user's request always win.
---

# ui-craft — general UI/UX craft, scoped to this repo

This skill supplies **design judgement**. It never grants permission to change anything. Load `ui-guardrails` first; its rules and the user's request override everything here.

## Precedence (highest first)
1. The user's words.
2. `roster-mobile-design-plan.md` §0 (confirmed decisions), `design-systems-DESIGN.md` §0, `roster-mobile-m3-design.md`, `design-systems-personas.md`.
3. The repo design system (`design-system/tokens/TOKENS.md`, `components/REGISTRY.md`) and what the code actually does.
4. This skill, then any external skill (`ui-external-skills`).

If generic advice disagrees with 1–3, **the project wins** and you say so. Example: generic guides often cite 44px touch targets; this project's documented minimum is 48dp with 8dp between targets (`roster-mobile-m3-design.md:64`).

## How to use it (by phase)
- **Discovery / planning:** pick the lens(es) that match the request, state what you are optimising (one sentence), and turn the lens checks into *plan content*: options, wireframe, states, acceptance criteria. Craft advice is a `PROPOSAL`, never a `FACT`.
- **Review:** use the lenses as a checklist against the diff and the rendered result; record findings with `path:line`.
- **Never** implement from this skill directly. Implementation happens only through `ui-implement` on an approved step.

## Mode first: what is this surface for?
- **Operate** (task completion: roster, fleet, forms, sheets) — scanability, consistency, native expectations beat expression. This app is almost entirely Operate. Ambition shows up as precision and restraint, not novelty.
- **Read** (docs, long text) — structure for comprehension.
- **Persuade / Experience** (marketing, portfolios) — not applicable here unless the user says so.
State the mode in the plan. Do not apply landing-page tactics (hero moments, big gradients) to an Operate screen.

## Lenses
Each lens lists **checks** (things to verify with evidence) and **moves** (permitted UI-only changes). Anything that needs new state, data or behaviour is out of scope: report it as a follow-up.

### Hierarchy & focus (steer: quieter / bolder / distill)
- One primary action per screen region; the eye should land on it first. Count competing emphasis (weight, colour, size, fill).
- Quieter: reduce simultaneous emphasis, lower the contrast of secondary text, remove decorative borders or tints. Bolder: strengthen the single most important element, not everything.
- Distill: remove what the task does not need (redundant labels, duplicate icons, nested containers). Fewer cards-in-cards.
- Visual structure is information: dividers, numbering, badges must encode something real. No numbering unless the content is a sequence.

### Typography (typeset)
- A defined scale and 2–3 weights; sizes come from tokens or the existing scale, not one-offs. Body ≥ 14sp here (`roster-mobile-m3-design.md:64`).
- Line length under ~80 characters on wide layouts; on mobile make sure long names/IDs wrap or truncate with a recoverable full value.
- Avoid template tells: tracked ALL-CAPS eyebrow over every heading, one-word accent in a headline, gratuitous monospace for labels, arrow glyphs appended to every link.
- Tabular numerals for aligned figures (times, counts) when the font supports it — verify support before claiming.

### Colour (colorize)
- Colour carries meaning (status, emphasis, brand), not decoration. Use semantic roles from the token registry; no raw hex.
- Status never relies on colour alone (add icon/text) — and check both themes.
- Compute contrast, never eyeball: `node .agents/scripts/contrast.mjs --tokens` and `contrast.mjs <fg> <bg>` (see `ui-a11y-audit`).
- Tinted neutrals, one accent, restrained gradients. Gradient washes as decoration are a tell.

### Spacing & layout (layout)
- Use the spacing tokens (`--space-4/8/12/16/24`); look for off-scale values and inconsistent gaps between sibling groups.
- Group by proximity: related items closer than unrelated ones; consistent rhythm top to bottom.
- Alignment: one left edge per column; check icon/text baseline alignment and equal heights in rows.
- Vary the rhythm only where it expresses hierarchy; do not chop everything into identical rounded cards with one radius and one shadow.

### Motion (animate)
- Motion must answer a user action or show what changed (open, expand, confirm). No ambient or on-load decoration in Operate screens.
- Use existing durations/easings if the repo has them; otherwise propose values in the plan. Respect `prefers-reduced-motion`.
- Only animate `transform`/`opacity` unless there is a verified reason; never animate layout properties that cause reflow in long lists.
- Interrupted animations must leave the final state correct.

### Copy (clarify)
- Say what happens: "Save changes", not "Submit". Keep one name for an action across the flow (button → toast).
- Errors say what went wrong and how to fix it; no apology, no blame. Empty states point to the next action.
- Plain verbs; follow the capitalisation convention already used in the code (read it, do not mix). **Copy is user-supplied**: propose text as `[COPY TBC]` in the plan; never ship invented product claims, numbers or rules.

### States & resilience (the UI part of "harden")
Check every state exists and looks intentional: default, hover/pressed, focus-visible, disabled, selected, loading, empty, error, long text, many items, one item, dark theme. Text must reflow or truncate with a full-value path; chips/badges wrap or disclose. Adding a *visual* treatment for a state the app already has is in scope. Creating a new state (new logic, new data path, validation) is **not**: log a follow-up.

### Responsive & density (adapt)
- Canvas is mobile-first at 390×844; verify at 360 and 320 wide too (no horizontal scroll, no clipped essentials), and with large text/zoom.
- Respect the bottom-navigation and FAB layout the repo documents (`design-systems-DESIGN.md:204`); check any notch/safe-area handling in the code before claiming it exists.
- Density is a decision: more rows per screen vs. tap comfort. Targets stay ≥ 48dp whatever the density.

### Performance (UI-visible only)
Flag layout-shift sources (images without size, late-loading fonts) and heavy effects (large blurs/shadows on scrolling lists). Do not "optimise" code paths; that is logic and out of scope.

## Anti-slop checklist (tick each in plan or review)
- [ ] Not the generic SaaS kit: identical cards, one radius everywhere, same soft grey shadow, gradient wash.
- [ ] No decoration that encodes nothing (numbering, eyebrows, dividers, badges).
- [ ] No invented copy, stats, icons or features.
- [ ] Nothing nested in a container just to have a container.
- [ ] Hierarchy survives squinting: one clear primary element.
- [ ] Both themes, all states, 390/360/320 widths considered.
- [ ] Every new colour/size/space maps to a token, or the plan justifies a new token.

## Output of a craft pass
A short list: `lens → finding (FACT, path:line) → proposed move (PROPOSAL) → affects which allowed file`. Findings without evidence are dropped.
