# WorkPlanX Design System Master

> Generated with UI UX Pro Max and then reconciled against project guidance. Approved brand files in `docs/brand/` and WorkPlanX's existing design direction take precedence over generated suggestions. This master defines design tokens and implementation constraints only; it does not implement page sections.

## Source order and decisions

1. Approved brand guidelines and official assets in `docs/brand/` take precedence.
2. The project-specific WorkPlanX direction in `design-system/workplanx/DESIGN.md` fills in currently undocumented brand details. Confirm those choices against the brand owner before final launch.
3. UI UX Pro Max recommendations fill gaps only and may not override the above sources.
4. `docs/01_website_layout_and_structure.md` controls the page structure: one landing page, seven sections (Hero, Problem Strip, How It Works, Showcase, Access Points, Proof, Contact), and one primary CTA: **Contact us**. No pricing or demo booking.
5. `docs/02_business_context.md` controls product claims; Xero is the only named integration.

### Brand assets reviewed

- `docs/brand/WORKPlanX-full-logo.svg`
- `docs/brand/WORKPlanX-icon-only.svg`
- The supplied SVG fills use `#395AF3`. Use official artwork without recoloring, distortion, or added effects. The logo is not a substitute for a complete written brand guide.
- `docs/brand/README.md` says further brand guidance is still to be supplied; typography and palette choices below follow the existing project-specific design guide and need brand-owner confirmation.

## Design direction

- Calm, trustworthy, precise, operational, and product-led.
- Use generous whitespace, clear hierarchy, authentic product evidence, cool neutrals, and restrained blue accents.
- Prefer solid, legible surfaces and subtle borders. **Do not use the generated Glassmorphism style**: it conflicts with WorkPlanX's restrained design direction and is not required to express the brand.
- No dark-mode-by-default direction. Do not add motion or decorative effects without a clear user benefit.

## Color tokens

### Brand and semantic colors

| Token | Value | Use/source |
|---|---|---|
| `--color-primary` | `#395AF3` | Exact blue sampled from official logo SVG; brand primary |
| `--color-primary-hover` | `#2949D8` | Derived darker interaction state; confirm against official palette |
| `--color-on-primary` | `#FFFFFF` | Text on primary; logo blue/white contrast is 5.34:1 |
| `--color-background` | `#FFFFFF` | Main page surface; existing WorkPlanX guide |
| `--color-foreground` | `#0F172A` | Primary text (slate 900); existing WorkPlanX guide |
| `--color-secondary` | `#3B82F6` | Secondary blue information accent; existing WorkPlanX guide |
| `--color-accent` | `#395AF3` | CTA/active accent follows brand primary; generated orange `#EA580C` rejected |
| `--color-on-accent` | `#FFFFFF` | Text on primary CTA; contrast 5.34:1 |
| `--color-card` | `#FFFFFF` | Card surface |
| `--color-card-foreground` | `#0F172A` | Card text |
| `--color-muted` | `#F8FAFC` | Subtle page/section surface (slate 50) |
| `--color-muted-foreground` | `#475569` | Secondary text (slate 600) |
| `--color-border` | `#E2E8F0` | Subtle borders |
| `--color-destructive` | `#DC2626` | Error/destructive state |
| `--color-on-destructive` | `#FFFFFF` | Text on destructive surface |
| `--color-ring` | `#395AF3` | Focus indicator |

Supporting values from the existing WorkPlanX guide: blue `#EFF6FF`, `#DBEAFE`, `#BFDBFE`, `#93C5FD`, `#60A5FA`, `#1E40AF`, `#1E3A8A`; neutrals `#F1F5F9`, `#CBD5E1`, `#64748B`, `#334155`; success `#16A34A`, warning `#B45309`, error `#DC2626`. Use semantic states with text/icon labels, not color alone.

## Typography

- Typeface: **Inter** with system sans-serif fallbacks, from the existing WorkPlanX guide.
- Generated Calistoga heading font is rejected because the existing project-specific direction specifies Inter throughout and the written brand guide is not present.
- Weights: 400 body, 500 labels/buttons, 600 headings.
- Body baseline: 16px with 26px line height. Body line length: generally 65–75 characters on wide screens.
- Scale: display 56/60px; H1 44/50px; H2 32/40px; H3 24/32px; H4 20/28px; lead 18/28px; body 16/26px; small 14/20px; caption 12/16px.
- Reduce display and heading sizes on narrow viewports; preserve readable line lengths and avoid overflow.

## Spacing and layout

- Four-pixel base spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Content maximum width: 1200px. Standard horizontal gutter: 24px.
- Section padding reference: 96px desktop, 64px mobile.
- Use fluid, centered containers and responsive grids. Avoid horizontal overflow.
- Breakpoint reference: 480px, 640px, 768px, 900px, and 1024px. Validate the page layout at 375px, 768px, 1024px, and 1440px.
- Do not change the seven-section order specified in `docs/01_website_layout_and_structure.md` based on generated patterns.

## Shape, borders, and elevation

- Radius: 8px small controls, 12px cards/panels, 20px image frames, 999px pills.
- Prefer a 1px border over shadow for surface definition.
- Subtle shadow: `0 1px 2px rgba(15, 23, 42, 0.06)`.
- Raised shadow: `0 8px 24px rgba(15, 23, 42, 0.08)`, reserved for elements that need separation.
- Avoid transparent blurred panels, decorative glass reflections, and heavy shadows.

## Component and interaction guidance

- Buttons: minimum 40px height (48px large), 8px radius, medium weight. The sole primary CTA label is **Contact us**. Use white text on the primary blue; secondary links/actions remain visually subordinate.
- Cards: white surface, subtle border, 12px radius, 24px internal padding; no default shadow.
- Form fields: at least 44px height, 16px input text, visible labels, clear inline errors, and visible focus ring.
- Navigation: follow the sticky single-page header in doc 01; portal login links are secondary text links, never primary buttons.
- Focus: visible 3px blue focus ring; do not suppress native focus without an equivalent.
- Motion: restrained and purposeful; use 150ms/250ms/400ms tiers and respect `prefers-reduced-motion`. Avoid layout-shifting hover effects.
- Icons: consistent SVG outline family; no emoji icons. Use official brand logos only.

## Tailwind integration

CSS custom properties are the source of truth in `src/styles/tokens.css`. Tailwind v4 theme aliases are declared in `src/app/globals.css` with `@theme inline` so utilities such as `bg-primary`, `text-foreground`, and `font-sans` resolve to these variables. Do not duplicate raw color values in components.

## Anti-patterns (do not use)

- Do not reorder or expand beyond the seven homepage sections without revising doc 01.
- Do not add pricing or demo-booking flows.
- Do not introduce a second primary CTA; only **Contact us** is primary.
- Do not name integrations other than Xero.
- Do not use the generated orange CTA or Glassmorphism style over the WorkPlanX blue/slate direction.
- Do not use Calistoga in place of the existing Inter direction without brand approval.
- No excessive animation, dark mode by default, emoji icons, low-contrast text, invisible focus, cursor-less clickable controls, layout-shifting hovers, fabricated product visuals, or unsupported claims.
- Do not recolor, distort, or invent logo artwork.

## UI UX Pro Max pre-delivery checklist

- [ ] No emojis as icons; use SVG assets/icons.
- [ ] Icons use one consistent family/style.
- [ ] `cursor-pointer` on clickable elements.
- [ ] Hover states use smooth 150–300ms feedback without layout shift.
- [ ] Light-mode text contrast is at least 4.5:1.
- [ ] Keyboard focus is visible.
- [ ] `prefers-reduced-motion` is respected.
- [ ] Responsive checks at 375px, 768px, 1024px, and 1440px.
- [ ] No content is obscured by fixed navigation.
- [ ] No horizontal scrolling on mobile.
- [ ] The page follows doc 01's seven sections and single **Contact us** primary CTA.
- [ ] Product and integration claims follow doc 02; only Xero is named.
