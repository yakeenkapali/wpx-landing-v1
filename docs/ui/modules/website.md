# Website

Updated: 2026-11-17

Screens: WorkPlanX landing page—Hero, Clients, Product & Solutions, Trust Strip, Access Points, and contact CTA (`src/app/page.tsx`); shared site shell (`src/app/layout.tsx`).

## Landing page

The white hero pairs its left-side copy and existing contact/solutions actions with a right-side labelled orbit diagram. One tilted plane holds five connector-linked workflow nodes around the central Northside works project record. CSS motion pauses when the figure leaves view, is hovered or focused; reduced-motion users see the static tilted arrangement. The figure includes a descriptive text alternative, ordered workflow list, and the visible caption “Illustrative workflow · not a product screenshot” (`src/components/sections/Hero.tsx`; `src/components/visuals/HeroOrbit.tsx`; configuration: `src/content/hero-orbit.ts`; styles: `src/components/visuals/HeroOrbit.module.css`; visibility hook: `src/lib/useInView.ts`).

Product & Solutions renders the five configured cards by ID-to-visual mapping and adds waste management as a separate card (`src/components/sections/ProductSolutions.tsx:12-18`, `37-73`). Access Points maps its configured Admin Portal, Mobile App, and Customer Portal cards (`src/components/sections/AccessPoints.tsx:21-37`). These visuals use illustrative sample data rather than live product data; their visual descriptions identify them as illustrative (`src/components/visuals/VisualFigure.tsx`; `src/content/sample-data.ts:1-112`).

## Navigation and form behavior

- Solutions and contact links target `#solutions` and `#contact`; the capability statement targets the supplied PDF. Admin and Customer Portal destinations are `null` and shown as unavailable rather than as links (`src/content/site.ts:11-23`; `src/components/layout/LoginDropdown.tsx:46-63`).
- The sticky header is transparent at the top of the page and gains its background, divider, and subtle shadow after scrolling; keyboard focus within the header also reveals that surface (`src/components/layout/Header.tsx`).
- The mobile menu toggles with local state; Escape closes it and restores focus to the toggle (`src/components/layout/MobileMenu.tsx:9-25`, `28-51`). The login dropdown closes on blur or Escape (`src/components/layout/LoginDropdown.tsx:19-29`).
- The contact form collects name, email, company, and message. It requires non-blank name, company, and message values and checks email against a basic address pattern. Invalid submission shows field errors and focuses the first invalid field; editing a field clears its error and any submitted status (`src/components/sections/ContactForm.tsx:6-15`, `24-47`, `58-100`).
- A valid submission displays the configured “not connected” status; there is no message delivery behavior (`src/components/sections/ContactForm.tsx:32-40`, `104-110`; `src/content/site.ts:111-124`).
- Reveal behavior is enhanced only when reduced motion is not requested and `IntersectionObserver` is available. With the default `once` setting, an element is unobserved after it enters view; non-once solution cards stay observed (`src/lib/useInView.ts:5-31`; `src/components/sections/ProductSolutions.tsx:40-45`, `58-62`).

## Open questions

- The contact form delivery destination and Admin/Customer Portal login URLs remain to be supplied (`src/components/sections/ContactForm.tsx:104-110`; `src/content/site.ts:18-23`).

## Documentation note

`docs/ui/project.md` and `docs/ui/modules/_template.md` were absent when this module was documented. No standalone token or component registry files were present under `design-system/`; the landing page styles are in `src/app/globals.css`.
