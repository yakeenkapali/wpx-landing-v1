# Website

Updated: 2026-11-17

Screens: WorkPlanX landing page—Hero, Clients, Product & Solutions, Trust Strip, Access Points, and contact CTA (`src/app/page.tsx`); shared site shell (`src/app/layout.tsx`).

## Landing page

The home page renders Hero, Clients, Product & Solutions, Access Points, then the contact CTA (`src/app/page.tsx:8-15`). The Trust Strip component and its configured facts remain in source but are not rendered on the landing page (`src/components/sections/TrustStrip.tsx`; `src/content/site.ts:33-40`). Clients appears directly after Hero. It displays the trust line “Trusted by thousands of companies from startups to global enterprises” and the four existing `/clients/client-01.svg` through `/clients/client-04.svg` assets, configured in `siteContent` (`src/components/sections/ClientsSection.tsx:7-23`; `src/content/site.ts:42-50`; assets: `public/clients/client-01.svg`, `public/clients/client-02.svg`, `public/clients/client-03.svg`, `public/clients/client-04.svg`). The hero workflow card displays the Northside customer name with its avatar, the project name “Northside Project,” and address “27 Adelaide St, Brisbane City QLD 4000, Australia” as illustrative data (`src/components/visuals/HeroWorkflow.tsx:70-82`; `src/content/sample-data.ts:42-54`; `public/hero/northside-avatar.png`). Four concentric, fading circle outlines sit behind the hero card; dashed SVG connector arms meet at the card center, including a longer vertical arm to the Roster pill positioned above it to match the Figma reference (`src/components/visuals/HeroWorkflow.tsx:12-69`; circle assets: `public/hero/hero-circle-01.svg` through `public/hero/hero-circle-04.svg`; labels: `src/content/sample-data.ts:42-54`). The shared layout sets page metadata from `siteContent.seo` and supplies the skip link, header, main landmark, and footer (`src/app/layout.tsx:10-30`). Section copy, navigation labels and destinations, SEO text, card IDs, and form messages are static in `siteContent` (`src/content/site.ts:11-136`). Illustrative screen data is held separately in `sampleData` (`src/content/sample-data.ts:1-112`).

Product & Solutions renders the five configured cards by ID-to-visual mapping and adds waste management as a separate card (`src/components/sections/ProductSolutions.tsx:12-18`, `37-73`). Access Points maps its configured Admin Portal, Mobile App, and Customer Portal cards (`src/components/sections/AccessPoints.tsx:21-37`). These visuals use illustrative sample data rather than live product data; their visual descriptions identify them as illustrative (`src/components/visuals/VisualFigure.tsx`; `src/content/sample-data.ts:1-112`).

## Navigation and form behavior

- Solutions and contact links target `#solutions` and `#contact`; the capability statement targets the supplied PDF. Admin and Customer Portal destinations are `null` and shown as unavailable rather than as links (`src/content/site.ts:11-23`; `src/components/layout/LoginDropdown.tsx:46-63`).
- The mobile menu toggles with local state; Escape closes it and restores focus to the toggle (`src/components/layout/MobileMenu.tsx:9-25`, `28-51`). The login dropdown closes on blur or Escape (`src/components/layout/LoginDropdown.tsx:19-29`).
- The contact form collects name, email, company, and message. It requires non-blank name, company, and message values and checks email against a basic address pattern. Invalid submission shows field errors and focuses the first invalid field; editing a field clears its error and any submitted status (`src/components/sections/ContactForm.tsx:6-15`, `24-47`, `58-100`).
- A valid submission displays the configured “not connected” status; there is no message delivery behavior (`src/components/sections/ContactForm.tsx:32-40`, `104-110`; `src/content/site.ts:111-124`).
- Reveal behavior is enhanced only when reduced motion is not requested and `IntersectionObserver` is available. With the default `once` setting, an element is unobserved after it enters view; non-once solution cards stay observed (`src/lib/useInView.ts:5-31`; `src/components/sections/ProductSolutions.tsx:40-45`, `58-62`).

## Open questions

- The contact form delivery destination and Admin/Customer Portal login URLs remain to be supplied (`src/components/sections/ContactForm.tsx:104-110`; `src/content/site.ts:18-23`).

## Documentation note

`docs/ui/project.md` and `docs/ui/modules/_template.md` were absent when this module was documented. No standalone token or component registry files were present under `design-system/`; the landing page styles are in `src/app/globals.css`.
