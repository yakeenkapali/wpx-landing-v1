---
name: WorkPlanX
description: Design system for the WorkPlanX website. Calm, precise, operational. Signal blue on cool slate.
---

# WorkPlanX Design System

**North star: calm operational clarity.** WorkPlanX is serious business software for site-based work. The site should feel clear, trustworthy and precise, never playful or decorative.

**Authority:** the official logo files in `docs/brand/` override this document. Page structure follows `docs/01_website_layout_and_structure.md`; product claims follow `docs/02_business_context.md`.

## 1. Principles

1. **Clarity first.** Concise headings, short copy, scannable sections.
2. **One signal.** Brand blue is the only accent. Cool slate neutrals carry everything else.
3. **Product-led.** Show how people, projects, site activity, reporting, payroll and billing connect.
4. **Flat by default.** Borders separate surfaces; shadows are rare.
5. **Accessible by default.** Contrast, visible focus, semantic HTML, reduced motion.
6. **Honest.** No invented screenshots, logos, testimonials, statistics or integrations.

## 2. Tokens

The single source of truth. Everything below refers to these names; no value is repeated elsewhere. Source file: `src/styles/tokens.css`. Tailwind v4 aliases (`bg-primary`, `text-foreground`, `font-sans`) map to these through `@theme inline` in `src/app/globals.css`.

```css
:root {
  /* Colour */
  --primary:        #395AF3;  /* official logo blue */
  --primary-hover:  #2949D8;
  --on-primary:     #FFFFFF;
  --background:     #FFFFFF;
  --foreground:     #0F172A;  /* primary text */
  --muted-fg:       #475569;  /* secondary text */
  --surface:        #F8FAFC;  /* quiet section background */
  --surface-alt:    #F1F3F8;  /* showcase and illustration ground */
  --border:         #E2E8F0;
  --ink:            #101B31;  /* dark sections and footer */
  --error:          #DC2626;
  --success:        #166534;

  /* Type */
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif;
  --fs-display:  clamp(2rem, 4.6vw, 4.6rem);   --lh-display: 0.99;  --ls-display: -0.065em;
  --fs-headline: clamp(1.625rem, 2.5vw, 2.5rem); --lh-headline: 1.06; --ls-headline: -0.055em;
  --fs-title:    1.25rem;    --lh-title: 1.75rem;
  --fs-subtitle: 1.125rem;   --lh-subtitle: 1.5rem;
  --fs-lead:     1rem;       --lh-lead: 1.5rem;
  --fs-body:     1rem;      --lh-body: 1.625rem;
  --fs-small:    0.875rem;  --lh-small: 1.25rem;
  --fs-caption:  0.75rem;   --lh-caption: 1rem;
  --fw-regular: 400;  --fw-medium: 500;  --fw-semibold: 600;
  --ls-eyebrow: 0.08em;

  /* Spacing (4px base) */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-6: 24px; --space-8: 32px;  --space-12: 48px; --space-16: 64px;
  --space-24: 96px; --space-32: 128px;

  /* Layout */
  --content-max: 1320px;
  --gutter: clamp(20px, 4vw, 56px);
  --section-pad: clamp(64px, 9vw, 120px);

  /* Shape and elevation */
  --radius-sm: 8px;  --radius-md: 12px;  --radius-lg: 20px;  --radius-full: 999px;
  --shadow-subtle: 0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-raised: 0 8px 24px rgba(15, 23, 42, 0.08);

  /* Motion */
  --dur-fast: 150ms;  --dur: 250ms;  --dur-slow: 400ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  /* Focus */
  --focus-ring: 0 0 0 3px var(--primary);
}
```

Breakpoints: 480, 640, 768, 900, 1024px. Validate at 375, 768, 1024 and 1440px.

## 3. Colour usage

| Role | Token |
|---|---|
| Primary action, links, selected state, focus | `--primary` (hover: `--primary-hover`, text on it: `--on-primary`) |
| Hero ground | `--background` with subtle primary-tinted square rule and concentric line-work |
| Page and card surface | `--background` |
| Quiet section background | `--surface` |
| Workflow showcase and diagram ground | `--surface-alt` |
| Dark problem band and footer | `--ink`, with white text |
| Primary text / secondary text | `--foreground` / `--muted-fg` |
| Borders and dividers | `--border` |
| Error / confirmed submission | `--error` / `--success`, always with text or an icon |

Rules: no second accent colour and no gradients. Text on `--primary` or `--ink` is white. Contrast targets are WCAG AA (white on `--primary` is 5.34:1).

## 4. Typography

**Inter** throughout; no second display face. Weights: 400 body, 500 labels and buttons, 600 headings.

| Style | Use |
|---|---|
| Display | Hero headline only |
| Headline | Section headings |
| Title / Subtitle | Subsections, card headings |
| Lead | Introductory copy, about 34rem wide |
| Body | Default text, 65–75 characters per line |
| Small | Controls, supporting text |
| Caption | Metadata only |

Rules: tight tracking applies to display and headline only. Eyebrow labels are uppercase small text in `--primary`, used sparingly (section labels, diagram metadata). Keep paragraphs short. The fluid tokens scale headings down on phones; never let them overflow.

## 5. Layout

- Centered fluid container, `--content-max` wide, `--gutter` side padding, `--section-pad` between sections.
- Group related content with small gaps and separate sections with large ones, using spacing tokens only.
- Two columns for copy plus visual, three for features. Collapse before content gets cramped. Every grid child must be able to shrink; no page-level horizontal scroll.
- Prefer editorial rules and selective panels. Do not wrap every item in a card.

## 6. Components

- **Buttons:** `--radius-sm`, medium weight, 40px minimum height (48px large), no layout shift on hover. Only **Contact us** is a filled primary. Secondary actions are a text link or quiet outline. On dark backgrounds, use a white fill with dark text.
- **Navigation:** sticky, solid `--background`, 1px bottom border, logo left. Login is a secondary text link, never a primary button. On mobile, a 44px menu control opens a panel with the same links; it closes on Escape or link selection.
- **Cards:** `--background`, 1px `--border`, `--radius-md`, 24px padding, no default shadow, content top-aligned.
- **Form fields:** 44px minimum height, 16px text, visible label above, `--radius-sm`, 1px `--border`, `--focus-ring` on focus. Placeholder never replaces a label. Errors use `--error` with visible text, linked to the field.
- **Badges:** `--radius-full`, light fill, readable text, always labelled.
- **Screenshot and diagram frames:** `--radius-lg`, 1px `--border`, `--shadow-raised`, consistent framing across the site.
- **Icons:** one outline family (Lucide), 24px, 1.5px stroke. No emoji.
- **Footer:** `--ink` ground, grouped links (Platform, Solutions, Company, Legal), short product description, copyright. Keep it proportionate to the page.
- **Logo:** use the official SVGs unmodified: no recolouring, distortion or effects.

## 7 . User Personas

Proto-personas based on the WorkPlanX business capability overview. They represent website visitors and should be validated with customer interviews. Use them to decide what each section must answer, not to invent copy or claims.

### 1. Operations Manager (primary decision maker)
- **Context:** runs day-to-day delivery for a labour-based, site-delivered service business, including waste and resource recovery work.
- **Goals:** know whether each job is making money; keep crews rostered correctly; have one place for site records.
- **Frustrations:** work is tracked across spreadsheets, messages and paper; cost and margin by job are unclear.
- **Looks for on the site:** the roster-to-invoice flow, real product screens, how field data reaches the office.
- **Persuaded by:** a clear end-to-end sequence and product evidence, not feature lists.
- **Path:** Hero, Product & Solutions, Contact us.
- **Design implication:** lead with the connected workflow; show the roster and daily report cards first.

### 2. Finance and Payroll Lead (influencer, risk checker)
- **Context:** processes pay and invoices from timesheets, claims and approved site work, under award and agreement rules.
- **Goals:** accurate pay and fast invoicing with fewer manual corrections.
- **Frustrations:** payroll takes too long and still needs fixing; invoices depend on proof of work that is hard to assemble.
- **Looks for on the site:** payroll rule handling, approvals, Xero sync, audit trail.
- **Persuaded by:** specific, verifiable capability statements and the downloadable capability statement.
- **Path:** Product & Solutions (payroll and invoicing cards), Capability Statement, Contact us.
- **Design implication:** payroll and Xero cards must name concrete capabilities; keep the capability statement easy to find.

### 3. Site Supervisor (evaluator, daily user)
- **Context:** leads crews on site and reports on shifts, work done and waste handled, mostly from a phone.
- **Goals:** capture reports, photos and weigh tickets quickly without duplicate entry.
- **Frustrations:** paperwork after the shift; hours and reports that don't match.
- **Looks for on the site:** the mobile app, how simple capture is, what happens to the data afterwards.
- **Persuaded by:** a realistic mobile view and a short explanation of the field workflow.
- **Path:** Access Points (Mobile App), Product & Solutions.
- **Design implication:** show the phone clearly; keep field copy plain and short.

### 4. Business Owner or Director (sponsor)
- **Context:** accountable for margin, compliance and customer relationships; usually reviews rather than operates.
- **Goals:** control, visibility across projects and branches, and confidence in records.
- **Frustrations:** decisions rely on late or inconsistent information.
- **Looks for on the site:** a credible, established-looking product and a straightforward way to start a conversation.
- **Persuaded by:** the page's overall clarity and a low-friction contact step.
- **Path:** Hero, Waste differentiator, CTA band.
- **Design implication:** the hero must state the outcome in one sentence; the contact step must be simple.

### 5. Client Representative (Customer Portal user)
- **Context:** works for a WorkPlanX customer's own client; needs proof of work done, waste and recycling reports, and invoices.
- **Goals:** see project status and sign off work without chasing emails.
- **Frustrations:** having to ask for monthly recycling or work reports; disputes about what was done.
- **Looks for on the site:** a clear Login route to the Customer Portal.
- **Path:** Nav Login, Access Points (Customer Portal).
- **Design implication:** Login stays visible and separate from the marketing actions; this persona is served by access, not persuasion.

### Priority
Primary: Operations Manager. Secondary: Finance and Payroll Lead, Business Owner. Supporting: Site Supervisor, Client Representative.

## 8. Content

Plain, direct language that leads with the customer outcome. Specific headings. Use product terms consistently: people, clients, projects, rosters, daily reports, dockets, waste and resource recovery, timesheets, claims, invoices, customer portal. Xero is the only named integration. Claim only what can be substantiated.

## 9. Motion and accessibility

- Motion is short and purposeful (`--dur-fast`, `--dur`, `--dur-slow`, `--ease-out`). Content stays visible if animation fails. Respect `prefers-reduced-motion`. No scroll hijacking or heavy parallax.
- Semantic HTML, logical heading order, skip link, keyboard-reachable controls, accessible names on icon-only buttons.
- Visible `--focus-ring` on every interactive element; never suppress it without an equivalent.
- Informative images get meaningful alt text; decorative ones get empty alt.
- Status, validation and selection are never conveyed by colour alone.
- Touch targets are at least 44px on mobile.

## 10. Don'ts

- No second accent, glassmorphism, blurred panels, heavy shadows, or hover effects that shift layout.
- No dark mode by default, emoji icons, or low-contrast text.
- No extra sections, pricing, demo booking, or second primary action.
- No fabricated screens, logos, testimonials, statistics or integrations.
- No arbitrary colours, spacing, radii or type styles when a token fits.

## 11. Pre-launch checklist

- [ ] Only the colours in section 2 are used.
- [ ] Inter and the defined type scale throughout.
- [ ] Spacing, radii and shadows come from tokens.
- [ ] Contact us is the only filled primary action.
- [ ] Seven sections in order; only Xero named.
- [ ] Visuals are real or clearly labelled illustrations.
- [ ] Text contrast at least 4.5:1; focus visible; form errors clear.
- [ ] Reduced motion respected.
- [ ] Checked at 375, 768, 1024 and 1440px with no horizontal scroll.
