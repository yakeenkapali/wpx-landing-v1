---
name: WorkPlanX Website Layout and Structure
description: Page structure, section specifications and responsive behaviour for the WorkPlanX single-page marketing site.
---

# WorkPlanX Website: Layout and Structure

Visual tokens, components and content rules live in `DESIGN.md`. This document defines **what is on the page, in what order, and how it behaves**. It is based on the approved wireframe.

## 1. Goals and scope

- **Goal:** show what WorkPlanX does, with real work and workflows, and move the visitor to **Contact us**.
- **Format:** one landing page with anchor navigation. No pricing, no demo booking, no blog.
- **Primary action:** Contact us (the only filled button on the page).
- **Secondary actions:** Download capability statement, Login, "See how it works".
- **Audience:** operators of labour-based, site-delivered services (including waste and resource recovery) who need rostering, site reporting, payroll and billing in one platform.

## 2. Page map

```
┌──────────────────────────────────────────────┐
│ 1  NAV      Logo · Solutions · Capability     │
│             Statement · Contact us · Login ▾  │
├──────────────────────────────────────────────┤
│ 2  HERO     headline · Contact us · visual    │
├──────────────────────────────────────────────┤
│ 3  TRUST STRIP / CLIENT MARQUEE               │
├──────────────────────────────────────────────┤
│ 4  PRODUCT & SOLUTIONS                        │
│    ┌──────────────────────┬─────────────┐     │
│    │ Card 1 (wide)        │ Card 2      │     │
│    ├────────────┬─────────┴──┬──────────┤     │
│    │ Card 3     │ Card 4     │ Card 5   │     │
│    ├────────────┴────────────┴──────────┤     │
│    │ Waste management & eco footprints  │     │
│    └─────────────────────────────────────┘     │
├──────────────────────────────────────────────┤
│ 5  ACCESS POINTS  Admin · Mobile · Customer   │
├──────────────────────────────────────────────┤
│ 6  CTA BAND                                   │
├──────────────────────────────────────────────┤
│ 7  FOOTER (slim)                              │
└──────────────────────────────────────────────┘
```

| # | Section | Anchor | Purpose |
|---|---|---|---|
| 1 | Navigation | n/a | Orientation and persistent actions |
| 2 | Hero | `#top` | State the outcome, show the product, ask for contact |
| 3 | Trust strip | n/a | Early credibility |
| 4 | Product & Solutions | `#solutions` | Show the core flow and the waste differentiator |
| 5 | Access points | `#access` | Show who uses the platform and where |
| 6 | CTA band | `#contact` | Convert |
| 7 | Footer | n/a | Navigation, legal, brand |

## 3. Global layout rules

- **Container:** centred, fluid, `--content-max` wide with `--gutter` side padding.
- **Grid:** 12 columns on desktop, 6 on tablet, 1 on mobile. Column gap uses `--space-6`.
- **Vertical rhythm:** `--section-pad` between sections; `--space-12` between a section header and its content; `--space-6` between cards.
- **Section header pattern:** optional eyebrow, headline, optional lead paragraph, aligned left, about 720px maximum width.
- **Alternating grounds:** white, then `--surface`, so sections read as distinct bands. Dark `--ink` is reserved for the waste card, CTA band and footer.
- **Anchor scrolling:** smooth scroll with an offset equal to the header height so headings are never hidden under the sticky nav. Disable smooth scroll under reduced motion.
- **Heights:** cards are sized by content plus visual, not by fixed pixel heights. Use a minimum height only to keep the bento rhythm (about 320px desktop for small cards, about 400px for the wide card).

## 4. Section specifications

### 4.1 Navigation
- **Layout:** sticky, full width, logo left, links right.
- **Links:** Solutions (`#solutions`), Capability Statement (download), Contact us (button), Login (dropdown).
- **Capability Statement:** links to a PDF; show a small download icon and open in a new tab or download directly.
- **Login:** a dropdown with two items, Admin Portal and Customer Portal. It is a secondary text control, never a filled button. Destinations stay disabled and labelled until URLs are supplied.
- **Contact us:** the only filled element; scrolls to `#contact`.
- **Mobile:** logo plus a 44px menu control opening a full-width panel with the same links.

### 4.2 Hero
- **Layout:** desktop two-zone composition: headline, lead and actions on one side, product visual on the other, inside the full-width hero field described in `DESIGN.md`. On mobile, text first, visual below.
- **Content:** headline stating the outcome, one lead sentence, **Contact us** (primary), "See how it works" (text link to `#solutions`).
- **Visual:** approved product screenshot, or a labelled illustrative workflow diagram until screenshots are supplied.
- **Draft headline (to confirm):** "From the roster to the invoice, in one platform."

### 4.3 Trust strip / client marquee
- **Layout:** full-width band below the hero, single row, horizontally centred; slow scroll only if it runs as a marquee, and it pauses on hover and under reduced motion.
- **Condition:** render customer logos **only** when real, permitted logos exist. Otherwise render a static trust strip of verifiable facts, for example Xero invoice sync and a full audit trail. Never show placeholder logos on the live site.
- **Mobile:** wraps to two rows or scrolls horizontally.

### 4.4 Product & Solutions
**Header:** eyebrow "Product & Solutions", headline, one-line description, left-aligned.

**Grid (desktop, 12 columns):**

| Row | Cards | Span |
|---|---|---|
| 1 | Card 1 (wide), Card 2 | 8 + 4 |
| 2 | Card 3, Card 4, Card 5 | 4 + 4 + 4 |
| 3 | Waste management & eco footprints | 12 |

**Card anatomy:** icon, title, two-line description, product visual, optional text link. No card has its own filled button.

**Proposed content (confirm which five modules earn a card):**

| Card | Module | Message |
|---|---|---|
| 1 (wide) | Rostering and workforce | Plan shifts and crews, with skills and inductions in view |
| 2 | Daily reports and dockets | Site activity captured and signed off in the field |
| 3 | Payroll | Approved hours become correct pay |
| 4 | Invoicing and Xero | Verified work flows into invoices and syncs to Xero |
| 5 | Projects and estimates | One record per job, from estimate to completion |
| Full width | Waste management and eco footprints | Weigh tickets roll up into resource recovery reporting by project, customer and workspace |

**Waste card:** the page's differentiator. Full width, on `--ink`, two-zone layout: story and key points on one side, the resource recovery report visual on the other. Headline metric is recycling percentage, shown only as a real figure from an approved sample or omitted.

**Tablet:** row 1 becomes two equal cards; rows 2 and 3 become two columns, with the third card of row 2 spanning full width. **Mobile:** single column in the order above.

### 4.5 Access points
- **Header:** short headline: who uses WorkPlanX and where.
- **Layout:** three equal columns, left to right: Admin Portal, Mobile App, Customer Portal. The phone mockup sits in the centre.
- **Each column:** device or screen visual, a one-line role description ("Office: plan, approve, invoice", "Field: shifts, hours, reports, weigh tickets", "Clients: projects, dockets, invoices"), no button.
- **Mobile:** stack in the order Mobile App, Admin Portal, Customer Portal, since field staff are the main app users.

### 4.6 CTA band
- **Layout:** full-width `--ink` band, centred headline, one lead line, **Contact us** (white fill), and a secondary "Download capability statement" text link.
- **Form:** name, email, company, message, with visible labels and inline validation. Marked as unconfigured until a delivery endpoint exists; it must not claim a message was sent.
- **Mobile:** form fields stack, button full width.

### 4.7 Footer
- **Layout:** slim, about 150 to 200px on desktop: logo, short description, one row of links (Solutions, Capability Statement, Contact us, Login), copyright, legal links.
- **Mobile:** stacks into a single column with generous link spacing.

## 5. Responsive behaviour

| Width | Behaviour |
|---|---|
| 1024px and up | Full layout above; desktop navigation |
| 768–1023px | Two-column grids; navigation collapses to a menu |
| 480–767px | Single column; hero buttons may go full width |
| Below 480px | Reduced heading sizes; two-row trust strip |

Validate at 375, 768, 1024 and 1440px. No horizontal page scroll at any width.

## 6. Content and asset inventory

**Needed before build:**
- Official logo files (`docs/brand/`).
- Approved product screenshots: roster, daily report, docket, weigh ticket, resource recovery report, payroll, invoice, customer portal, mobile app.
- Capability statement as a PDF (reviewed for public release).
- Customer logos, only if permission exists.
- Contact form destination and portal login URLs.

**Copy to write:** hero headline and lead, product & solutions header, six card descriptions, three access-point lines, CTA headline, footer description.

## 7. Open decisions

1. **Button label:** the wireframe says "Contact Sales"; `DESIGN.md` specifies **Contact us**. Default: Contact us everywhere.
2. **Marquee:** logos or static trust strip (default: trust strip).
3. **Bento modules:** confirm the five cards in section 4.4.
4. **Login:** one dropdown with two destinations, or a single landing page that asks which portal.
5. **Market wording:** state the Australian payroll basis in the hero, or only in the trust strip.

## 8. Acceptance criteria

- [ ] Sections appear in the order of section 2; no extra sections.
- [ ] Contact us is the only filled primary action.
- [ ] Capability statement downloads from the nav and the CTA band.
- [ ] No logos, testimonials or statistics appear unless supplied and approved.
- [ ] Anchor links land with headings clear of the sticky header.
- [ ] Bento grid reflows as specified at each breakpoint.
- [ ] Footer is slim and proportionate to the page.
- [ ] All items in the `DESIGN.md` pre-launch checklist pass.