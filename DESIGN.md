---
name: WorkPlanX
description: Calm, precise design for clear project and field operations.
colors:
  clear-signal-blue: "#395af3"
  primary-hover: "#2949d8"
  on-primary: "#ffffff"
  secondary-blue: "#3b82f6"
  page-white: "#ffffff"
  slate-900: "#0f172a"
  slate-600: "#475569"
  slate-50: "#f8fafc"
  slate-200: "#e2e8f0"
  error-red: "#dc2626"
  on-error: "#ffffff"
  focus-blue: "#395af3"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 600
    lineHeight: "3.75rem"
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 600
    lineHeight: "3.125rem"
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: "2.5rem"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.625rem"
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: "1.25rem"
rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
  full: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "24": "96px"
  "32": "128px"
components:
  button-primary:
    backgroundColor: "{colors.clear-signal-blue}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    height: "48px"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    height: "48px"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.page-white}"
    textColor: "{colors.slate-900}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# Design System: WorkPlanX

## Overview

**Creative North Star: "Calm Operational Clarity"**

WorkPlanX’s visual language is calm and precise: it makes complex project and field operations feel understandable without making the product feel decorative or lightweight. Clear hierarchy, generous space, practical product evidence, and direct language support a trustworthy, operationally focused character.

The system is restrained and clear. Blue is reserved for brand emphasis and actionable focus; cool slate neutrals carry most content and surfaces. Surfaces are flat by default, with borders doing the everyday work of separation and subtle shadows used only where genuine lift helps. The existing implementation has tokens and global styles but no built page sections or component library; component entries above are reference primitives synthesized from the documented token rules, not claims about implemented UI.

**Key Characteristics:**
- Calm and precise
- Clear hierarchy with generous whitespace
- Product-led and operationally credible
- Restrained blue against cool, legible neutrals
- Flat by default; practical rather than decorative

## Colors

The palette pairs the official logo blue with white and cool slate neutrals; blue/white is reserved for clear emphasis and remains legible for primary controls.

### Primary
- **Clear Signal Blue** (`{colors.clear-signal-blue}`): Official logo blue, used for primary actions, links, and focus accents.
- **Deeper Signal** (`{colors.primary-hover}`): Darker interaction state for primary blue surfaces.
- **White on Blue** (`{colors.on-primary}`): Foreground for primary and hover surfaces.

### Secondary
- **Supporting Blue** (`{colors.secondary-blue}`): Secondary informational emphasis; use less prominently than the primary brand blue.

### Neutral
- **Page White** (`{colors.page-white}`): Main canvas and card surface.
- **Slate Ink** (`{colors.slate-900}`): Primary text and headings.
- **Slate Copy** (`{colors.slate-600}`): Secondary text and supporting labels.
- **Slate Mist** (`{colors.slate-50}`): Subtle quiet surface behind grouped content.
- **Slate Divider** (`{colors.slate-200}`): Borders and quiet separators.

### Semantic
- **Error Red** (`{colors.error-red}`) with **White on Error** (`{colors.on-error}`): Error/destructive states; pair with explicit text or an icon, not color alone.
- **Focus Blue** (`{colors.focus-blue}`): Visible keyboard-focus treatment, reinforced by a 3px outline/shadow treatment in CSS.

**The One Signal Rule.** Keep the official blue the single dominant brand accent; do not introduce an unrelated CTA accent.

## Typography

**Display Font:** Inter (with system sans-serif fallbacks)

**Body Font:** Inter (with system sans-serif fallbacks)

**Label/Mono Font:** Inter for labels; system monospace is available for technical data when needed.

**Character:** Inter keeps headings and operational copy direct, familiar, and easy to scan. Use medium labels and semibold headings without sacrificing readable line-height.

### Hierarchy
- **Display** (600, `3.5rem` / `3.75rem`): Large display moments; scale down responsively on small viewports.
- **Headline** (600, `2.75rem` / `3.125rem`): Primary page heading and major statements.
- **Title** (600, `2rem` / `2.5rem`): Section and panel titles.
- **Supporting titles** (600, `1.5rem` / `2rem`; `1.25rem` / `1.75rem`): Smaller hierarchy levels.
- **Body** (400, `1rem` / `1.625rem`): Default reading text; aim for roughly 65–75 characters per line on wide screens.
- **Lead** (400, `1.125rem` / `1.75rem`): Introductory or emphasized supporting copy.
- **Label** (500, `0.875rem` / `1.25rem`): Controls and short labels; do not rely on small caps or tracking alone for meaning.
- **Caption** (400, `0.75rem` / `1rem`): Secondary metadata only, not essential instructions.

**The Inter-Throughout Rule.** Use the same sans-serif family across display, headings, body, and controls; do not introduce a contrasting display face without approved brand guidance.

## Layout

Use a centered, fluid content area capped at `1200px`, with a standard `24px` horizontal gutter. The spacing rhythm follows a 4px base, with established steps from `4px` through `128px`; use larger gaps to group content and maintain a generous, low-clutter density. Reference section padding is `96px` on desktop and `64px` on mobile.

The token set includes breakpoint references at `480px`, `640px`, `768px`, `900px`, and `1024px`. Reflow columns and controls cleanly as space narrows; preserve readable line lengths and avoid horizontal overflow. Exact breakpoint behavior should be verified against the eventual responsive interface, since the current route contains no implemented sections.

## Elevation & Depth

The system is **flat by default**. Solid white and subtle slate surfaces with 1px borders establish grouping; shadows are an optional, restrained aid rather than a default card treatment.

### Shadow Vocabulary
- **Subtle** (`0 1px 2px rgb(15 23 42 / 0.06)`): Slight separation for a surface that needs it.
- **Raised** (`0 8px 24px rgb(15 23 42 / 0.08)`): Reserved for a genuinely elevated element, not routine cards.

**The Border-First Rule.** Prefer a quiet border over a shadow for ordinary surface separation; avoid heavy shadows and glass-like blurred layers.

## Shapes

Use gently rounded, functional corners: small controls use `8px`, cards and panels `12px`, larger image frames `20px`, and full pills `999px`. Borders are fine and subtle (`1px`); avoid decorative clipping or exaggerated organic shapes. The shape language should make controls approachable without making the interface playful.

## Components

The component philosophy is **restrained and clear**. The following are token-derived reference specifications; there are no implemented page components yet.

### Buttons
- **Shape:** Gently rounded (`8px`); at least `40px` high, with a large reference height of `48px`.
- **Primary:** Clear Signal Blue with white text; reference padding `12px 24px`.
- **Hover / Focus:** Use the darker blue hover token and a visible keyboard-focus treatment. Keep state feedback smooth and avoid layout shift.
- **Secondary / Ghost / Tertiary:** Keep visually subordinate to the primary action; use text or a quiet outline treatment rather than another filled accent.

### Cards / Containers
- **Corner Style:** Softly rounded (`12px`).
- **Background:** White on the main page; Slate Mist may group quiet content.
- **Shadow Strategy:** Flat by default; follow Elevation & Depth.
- **Border:** Prefer a subtle `1px` slate divider.
- **Internal Padding:** `24px` reference padding.

### Inputs / Fields
- **Style:** White surface, visible label, quiet border, `8px` corner radius, and at least `44px` control height.
- **Focus:** Visible blue focus ring; do not suppress keyboard focus without an equivalent.
- **Error / Disabled:** Make errors explicit in text and keep disabled states distinguishable without relying on color alone.

### Navigation
- **Style:** Clear, restrained text hierarchy with accessible focus states. Keep secondary links quieter than primary actions. Mobile behavior is not implemented in the current page and must be validated when navigation is built.

## Do's and Don'ts

### Do:
- **Do** use official logo artwork from `docs/brand/` without recoloring or distortion.
- **Do** use the CSS custom properties in `src/styles/tokens.css` as the token source of truth.
- **Do** keep text contrast, labels, and keyboard focus clear.
- **Do** prefer authentic product evidence over decorative imagery when product visuals are eventually introduced.
- **Do** respect reduced-motion preferences for any future motion.

### Don't:
- **Don't** introduce a second, unrelated accent color for primary actions.
- **Don't** add glassmorphism, heavy shadows, excessive motion, or layout-shifting hover effects.
- **Don't** use emoji as interface icons; use a consistent SVG icon family.
- **Don't** suppress visible focus or communicate status by color alone.
- **Don't** fabricate product screens, customer proof, or unsupported claims.
