---
name: ui-a11y-audit
description: Accessibility and technical-quality audit for UI changes in this repo - WCAG 2.2 AA checks (contrast computed with a script, target size, focus, names and labels, colour-not-alone, reflow, motion), responsive and theme checks, with P0-P3 findings. Use when planning acceptance criteria and in review of any UI diff. Read-only.
---

# ui-a11y-audit — accessibility & technical quality (read-only)

Load `ui-guardrails` first. You report; you do not fix. Report results in chat.

## Project thresholds (these override generic numbers)
- Touch targets **48dp** minimum, **8dp** between targets; body text ≥ **14sp**; **AA** contrast; dark theme supported (`roster-mobile-m3-design.md:64`, `roster-mobile-design-plan.md:165`).
- WCAG 2.2 AA is the floor. Where the project is stricter, use the project number.

## Checks (mark each PASS / FAIL / N/A / NOT VERIFIED, with evidence)

### 1. Contrast — compute, never estimate
- Token pairs, both themes: `node .agents/scripts/contrast.mjs --tokens` (add `--strict` to fail under 4.5:1).
- One pair: `node .agents/scripts/contrast.mjs --token-pair on-surface-variant surface` or two hex values.
- Required: text ≥ 4.5:1 (large text ≥ 3:1), UI-component boundaries/icons and focus indicators ≥ 3:1 against adjacent colours.
- Translucent or gradient backgrounds and colours hard-coded in rules are not covered by the token check. Resolve the real values and compute them, or mark `NOT VERIFIED`.

### 2. Targets, spacing, size
- Every interactive element ≥ 48×48dp *hit area* (visual size may be smaller if the hit area, e.g. padding, reaches it). Cite the CSS rule.
- ≥ 8dp between adjacent targets. No hover-only interactions.

### 3. Keyboard & focus
- Visible `:focus-visible` indicator on every interactive element; not removed with `outline: none` unless replaced. Focus not hidden behind sticky bars/FAB/sheets.
- Logical order; sheets and dialogs have a name, a way to close, and (if the repo already implements focus handling) it is not broken by the change.

### 4. Names, roles, labels
- Icon-only buttons have an accessible name (`aria-label`/visible text). Decorative icons are hidden from AT (`aria-hidden`).
- Form fields have a visible label (placeholder is not a label); errors are associated and not colour-only.
- Native elements preferred (`button`, `a`) over `div` + role. Adding attributes is in scope; changing handlers is not.

### 5. Colour and meaning
- Status/selection is not conveyed by colour alone (icon, text, shape).
- Check light **and** `.theme-dark` for every changed colour.

### 6. Reflow & text
- No horizontal scroll at 390, 360 and 320px wide; content reflows at large text/zoom; text spacing overrides do not clip essentials.
- Long names/IDs wrap or truncate with a full-value path; chips/badges wrap or disclose with `+n`.

### 7. Motion
- Honour `prefers-reduced-motion` for non-essential motion; no flashing; no motion required to understand state.

### 8. Status & feedback
- Loading, empty, error and success states are perceivable (text, not only colour or animation).

### 9. Technical quality (UI-visible only)
- No new layout-shift sources; no large unbounded blurs/shadows on scrolling lists; images have dimensions.
- Do not "fix" code performance — that is logic; list it as a follow-up.

## Verification honesty
Say which checks used a rendered browser, which used code reading only, and which are `NOT VERIFIED`. A code-only audit cannot PASS visual items; it can only fail them or leave them NOT VERIFIED.

## Output
```
## A11y audit — <task/target>  (verified: rendered | code only)
| # | Check | Result | Evidence (path:line or command output) | Sev |
Severity: P0 blocks use or fails AA · P1 serious · P2 moderate · P3 polish
Blocking (P0/P1) → must be fixed (within the task's scope) before PASS.
NOT VERIFIED: …
```
