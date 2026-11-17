# Website

Updated: 2026-11-17

Screens: WorkPlanX landing page (`src/app/page.tsx`); shared site shell (`src/app/layout.tsx`).

## Current foundation

P02 establishes the initial website shell. The root layout supplies the header, main landmark, and footer (`src/app/layout.tsx:15-30`); the home page composes Hero, Trust Strip, Product & Solutions, Access Points, and CTA sections in that order (`src/app/page.tsx:7-15`). At this stage these sections render their headings rather than their full screen content; for example, the CTA renders a heading only (`src/components/sections/CtaBand.tsx:5-20`). Existing screens and the contact flow remain unrendered, not deleted.

## Navigation and content rules

- Site copy, labels, navigation destinations, and SEO text are held in the static `siteContent` object (`src/content/site.ts:1-53`).
- Solutions and Contact us navigate to `#solutions` and `#contact`; the capability statement and both portal destinations are null until supplied, and are shown as unavailable rather than linked (`src/content/site.ts:11-24`).
- The mobile navigation opens and closes with local state; Escape closes it and restores focus to the toggle (`src/components/layout/MobileMenu.tsx:9-25`). The login menu closes on blur or Escape, and unavailable portal destinations are not links (`src/components/layout/LoginDropdown.tsx:10-24`, `37-60`).
- The current CTA section has no contact form or submission behavior (`src/components/sections/CtaBand.tsx:5-20`).

## Open questions

- Which existing screens and contact-flow content should be rendered in subsequent work is not specified by this shell.
- The contact delivery destination and portal login URLs remain to be supplied; the website layout notes these as build prerequisites (`docs/website_layout.md:141-148`).

## Documentation note

`docs/ui/project.md` and `docs/ui/modules/_template.md` were absent when this module was documented, so this concise module structure was created directly.
