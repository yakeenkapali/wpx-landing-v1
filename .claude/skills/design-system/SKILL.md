---
name: design-system
description: Governance of the WorkPlanX design system in this repo - tokens, components, patterns, registries, when to reuse vs add, naming, versioning, deprecation, and how to keep the system portable to other repos. Use when a UI task touches colors, type, spacing, shape, elevation, icons, or any reusable component, or when asked to update, audit or document the design system.
---
<!-- GENERATED from .agents/skills/design-system/SKILL.md by .agents/scripts/sync.mjs. Do not edit; edit the source and run: node .agents/scripts/sync.mjs -->

# design-system

The React app is the design tool (replacing Figma). The design system is therefore **code + registries**, and both must stay in sync.

## Sources of truth (read in this order)
1. `design-systems-DESIGN.md` — foundations & rules (§0 "Rules that always apply" is mandatory).
2. `design-system/tokens/TOKENS.md` — registry of tokens that actually exist in code.
3. `design-system/components/REGISTRY.md` — registry of components (status, source, variants, a11y).
4. `design-system/GOVERNANCE.md` — process rules. `design-system/patterns/` — composed patterns.
5. Code: `src/styles.css` (`:root` + `.theme-dark`), `src/spacing.css`, components in `src/`.
If code and registry disagree, **code is the fact**; fix the registry (ds-steward) and flag the drift.

## Decision ladder (stop at the first that fits)
1. **Reuse** an existing component/token as is.
2. **Compose** existing ones (pattern).
3. **Extend** an existing component with a variant/prop (no new look).
4. **Add** new token/component — only with written justification in the plan (§5), registry entry, both themes, all states, a11y notes.
Never create a second button/card/chip/input style. Never use raw hex or off-scale px where a token exists.

## Rules for tokens
- Naming: M3 role names, kebab-case CSS variables (`--on-surface-variant`). Spacing 4/8-based. Both light and dark values defined together.
- A token is added in `:root` (+ `.theme-dark` override) and registered in TOKENS.md in the same task.
- Renames/removals = breaking: deprecate first, migrate usages, then remove (GOVERNANCE.md).

## Rules for components
- One responsibility, props-in/markup-out, no business logic, no data fetching, no app-state coupling. That is what makes it portable.
- Registered with: name, status (`in-app` | `extracted` | `deprecated`), source path:line, variants, states, a11y, usage do/don't.
- Extraction of an in-app component into its own file is a UI task like any other (plan → approval).

## Portability (reuse in another repo)
Keep project-specific facts only in `design-system/ui-workflow.config.json` and the brand values in tokens. Everything else (skills, agents, hooks, templates, governance) is generic. See `design-system/README.md` → "Reuse in another repo".
