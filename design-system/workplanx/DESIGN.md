# WorkPlanX Website Design System

## 1. Design Direction

**Design intent:** Trustworthy, precise, calm, and operationally
focused. WorkPlanX is serious business software that makes complex,
site-based work easier to manage.

The website should communicate clarity and control rather than novelty.
Use a restrained visual system, clear hierarchy, generous whitespace,
practical product imagery, and direct language.

### Core principles

-   **Clarity first:** Make each section easy to scan. Use concise
    headings and supporting copy.
-   **Operational credibility:** Show the connection between people,
    projects, site activity, reporting, payroll, and billing.
-   **Restrained branding:** Blue is the single brand colour; cool slate
    neutrals provide most of the interface.
-   **Product-led storytelling:** Prefer authentic product screenshots
    and clear workflow explanations over decorative illustrations.
-   **Consistency:** Reuse the design tokens and component patterns
    defined in this document.
-   **Accessible by default:** Maintain readable contrast, visible
    keyboard focus, semantic structure, and reduced-motion support.

## 2. Brand Personality

  -----------------------------------------------------------------------
  Attribute                           Direction
  ----------------------------------- -----------------------------------
  Trustworthy                         Stable layouts, restrained colour,
                                      clear information

  Precise                             Consistent spacing, aligned
                                      elements, meaningful labels

  Calm                                White space, cool neutrals, limited
                                      visual noise

  Practical                           Real workflows, concrete benefits,
                                      product-focused content

  Modern                              Clean sans-serif typography, subtle
                                      motion, responsive layouts
  -----------------------------------------------------------------------

Avoid overly playful visuals, excessive gradients, decorative effects,
heavy shadows, and unnecessary animation.

## 3. Colour System

### Brand blues

Blue is the only brand colour. Use the primary blue for calls to action,
links, selected states, and key interface accents.

  -----------------------------------------------------------------------
  Token                   Hex                     Intended use
  ----------------------- ----------------------- -----------------------
  `blue-50`               `#EFF6FF`               Soft blue surfaces

  `blue-100`              `#DBEAFE`               Subtle borders and
                                                  fills

  `blue-200`              `#BFDBFE`               Light emphasis

  `blue-300`              `#93C5FD`               Focus rings and
                                                  decorative accents

  `blue-400`              `#60A5FA`               Accent on dark navy

  `blue-500`              `#3B82F6`               Information accent

  `blue-600`              `#2563EB`               Primary brand colour,
                                                  primary buttons, links

  `blue-700`              `#1D4ED8`               Hover state

  `blue-800`              `#1E40AF`               Deeper blue accents

  `blue-900`              `#1E3A8A`               Deep navy sections and
                                                  footer
  -----------------------------------------------------------------------

### Neutral palette

Use cool slate neutrals for page backgrounds, text, borders, and subdued
surfaces.

  Token         Hex         Intended use
  ------------- ----------- -----------------------------------
  `white`       `#FFFFFF`   Main page and card backgrounds
  `slate-50`    `#F8FAFC`   Subtle section backgrounds
  `slate-100`   `#F1F5F9`   Muted fills and disabled surfaces
  `slate-200`   `#E2E8F0`   Default borders and dividers
  `slate-300`   `#CBD5E1`   Stronger borders and separators
  `slate-500`   `#64748B`   Placeholder and low-emphasis text
  `slate-600`   `#475569`   Secondary body text
  `slate-700`   `#334155`   Strong secondary text and icons
  `slate-900`   `#0F172A`   Primary text

### Semantic colours

Semantic colours should be used sparingly, mainly inside product UI
mockups and status indicators. They should not compete with the brand
blue.

  -----------------------------------------------------------------------
  Role              Foreground        Background        Border
  ----------------- ----------------- ----------------- -----------------
  Success           `#16A34A`         `#DCFCE7`         `#BBF7D0`

  Warning           `#B45309`         `#FEF3C7`         `#FDE68A`

  Error             `#DC2626`         `#FEE2E2`         `#FECACA`

  Info              `#3B82F6`         Use a light blue  Use a light blue
                                      surface           border
  -----------------------------------------------------------------------

### Surface and text roles

-   Page background: white.
-   Main cards: white with a subtle slate border.
-   Secondary sections: `slate-50`.
-   Dark feature or footer sections: `blue-900`.
-   Primary text: `slate-900`.
-   Secondary text: `slate-600`.
-   Text on primary blue or navy: white.
-   Default border: `slate-200`.

Do not introduce additional brand colours without a clear requirement.

## 4. Typography

### Typeface

Use **Inter** with system sans-serif fallbacks.

``` css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", sans-serif;
```

Use regular 400 for body text, medium 500 for UI labels and buttons, and
semibold 600 for headings.

### Type scale

  Style          Font size   Line height       Weight Usage
  ------------ ----------- ------------- ------------ -----------------------------------
  Display             56px          60px          600 Primary hero statement
  H1                  44px          50px          600 Main page heading
  H2                  32px          40px          600 Main section headings
  H3                  24px          32px          600 Feature or subsection headings
  H4                  20px          28px          600 Card and smaller section headings
  Body large          18px          28px          400 Lead paragraphs
  Body                16px          26px          400 Default body copy
  Small               14px          20px   500 or 400 Supporting copy and UI text
  Caption             12px          16px          400 Metadata and image captions

### Typography rules

-   Use tight letter spacing (`-0.02em`) for display headings and H1
    only.
-   Keep paragraph line lengths comfortable; lead copy should generally
    remain around 34rem wide.
-   Use uppercase eyebrow labels sparingly, at 12px semibold with
    `0.08em` letter spacing and brand blue.
-   Avoid long paragraphs in marketing sections. Use short paragraphs,
    lists, and meaningful subheadings.
-   On narrower screens, reduce display and heading sizes rather than
    allowing overflow.

### Responsive type guidance

At widths up to 900px: - Display and H1: approximately 36px with 44px
line height. - H2: approximately 28px with 36px line height.

Adjust further on very small screens when required to prevent wrapping
issues.

## 5. Spacing, Layout, and Grid

### Spacing scale

Use a 4px base unit and the following spacing tokens.

  Token          Value
  ------------ -------
  `space-1`        4px
  `space-2`        8px
  `space-3`       12px
  `space-4`       16px
  `space-6`       24px
  `space-8`       32px
  `space-12`      48px
  `space-16`      64px
  `space-24`      96px
  `space-32`     128px

Prefer these tokens over arbitrary spacing values. Small gaps should
group related content; larger gaps should distinguish separate sections.

### Page layout

-   Maximum content width: **1200px**.
-   Standard horizontal gutter: **24px**.
-   Standard desktop section padding: **96px** vertically.
-   Mobile section padding: **64px** vertically.
-   Use a centred container with fluid width and consistent horizontal
    gutters.
-   Keep section headings and lead paragraphs aligned with the content
    beneath them.
-   Use a clear grid and avoid unnecessarily dense layouts.

### Grid behaviour

-   Two-column layouts are appropriate for paired copy and product
    imagery.
-   Three-column grids suit feature cards and concise benefit summaries.
-   Four-column grids may be used for compact feature groups on wide
    screens.
-   How-it-works steps can display as six columns on wide desktop
    screens, three columns on medium screens, and a vertical list on
    mobile.
-   Collapse columns before their content becomes cramped.
-   Ensure all grid children can shrink without causing horizontal
    overflow.

## 6. Shape, Borders, and Elevation

### Border radius

  Token             Value Usage
  --------------- ------- ------------------------------------
  `radius-sm`         8px Buttons, inputs, small controls
  `radius-md`        12px Cards, callouts, standard panels
  `radius-lg`        20px Large screenshot frames and panels
  `radius-full`     999px Pills and status badges

### Shadows

Use shadows sparingly. Borders are the default way to define surfaces.

-   Subtle: `0 1px 2px rgba(15, 23, 42, 0.06)`
-   Raised: `0 8px 24px rgba(15, 23, 42, 0.08)`

Use the raised shadow for product screenshot frames or elements that
genuinely need separation. Do not add shadows to every card.

## 7. Logo and Wordmark

-   Render the wordmark as **WorkPlanX**.
-   Use the primary sans-serif typeface at semibold weight.
-   Colour `WorkPlan` in the standard text colour and the `X` in
    `blue-600`.
-   On navy backgrounds, use white for `WorkPlan` and `blue-400` for the
    `X`.
-   The supplied wordmark treatment has no separate icon.
-   Preserve legibility and do not add effects or alter the letterforms.

Use official logo assets if supplied in the project brand folder; the
text treatment here documents the visual direction, not a replacement
for an official logo file.

## 8. Components

### Buttons

Buttons use medium-weight text, an 8px radius, and a minimum height of
40px. Large buttons are 48px high.

**Primary** - Blue `#2563EB` background and border. - White text. -
Hover: `#1D4ED8`. - Disabled: muted slate background and text.

**Secondary** - White background. - Slate border and primary text. -
Hover: subtle slate background and stronger border.

**Ghost** - Transparent background. - Blue text. - Hover: darker blue
and underline.

**On navy** - Use a white-filled button with navy text for the primary
action. - Use a transparent button with a light border for the secondary
action.

Guidelines: - Keep button labels concise and action-oriented. - Use one
visually dominant primary action per decision area where possible. -
Align buttons consistently and provide adequate spacing between
actions. - Include hover, focus, disabled, and active states. - Do not
communicate disabled or error states by colour alone.

### Navigation

-   Use a sticky white navigation bar with a subtle bottom border.
-   A light translucent white background and restrained backdrop blur
    are acceptable.
-   Desktop navigation should have clear text links and a compact set of
    actions.
-   Use a 44px touch target for the mobile menu control.
-   On mobile, show a dedicated expandable panel with vertically
    arranged links and full-width actions.
-   Keep the wordmark at the left and primary navigation/actions aligned
    consistently.
-   Indicate the current page or section where appropriate.

### Hero section

-   Use a clear headline that communicates the product outcome.
-   Pair the text with a real product screenshot or a carefully
    constructed product UI visual.
-   Keep supporting copy concise and readable.
-   Place the primary CTA near the headline and use a secondary CTA only
    when it serves a different user intent.
-   On desktop, use a two-column layout with text and visual balanced in
    scale.
-   Stack the content cleanly on mobile.
-   A trust row may follow the hero content, separated by a subtle top
    border.

### Section headers

A standard section header consists of: 1. An optional uppercase eyebrow
label. 2. A clear section heading. 3. An optional lead paragraph.

Keep section headers to a readable maximum width of approximately 720px.
Centre them only when the section design calls for a centred layout.

### Cards

-   White background.
-   1px slate border.
-   12px radius.
-   24px internal padding.
-   Avoid default shadows.
-   Feature cards may include a 44px icon tile with a light-blue fill
    and border.
-   Keep card content top-aligned and use consistent gaps.
-   Use cards to group related information, not as decoration around
    every paragraph.

### Status badges and pills

-   Use compact pill shapes with a full radius.
-   Use a light background, readable text, and a subtle border.
-   Neutral badges use slate tones.
-   Blue badges indicate a selected or informational state.
-   Success and warning badges use their semantic palettes.
-   Use labels alongside colour so status meaning remains clear.

### Form fields

-   Minimum field height: 44px.
-   White background, 1px slate border, and 8px radius.
-   Use 16px input text.
-   Labels should be visible and positioned consistently above fields.
-   Placeholder text must not replace a field label.
-   Helper text should use a smaller size and secondary colour.
-   Focus should visibly change the border and show a 3px blue focus
    ring.
-   Disabled fields should use a subtle slate surface and muted text.
-   Error fields should use an error border and visible error text; do
    not rely on the border alone.
-   Provide clear required-field indicators and associate help/error
    messages with their fields.

### Callouts

Use callouts for important contextual information, not routine copy.

-   Light-blue background.
-   Light-blue border.
-   Navy/blue text.
-   12px radius.
-   16px vertical and 24px horizontal padding.
-   Align an optional icon with the first line of text.

### Tables

-   Use a clear header row with small uppercase labels where
    appropriate.
-   Use subtle horizontal row dividers.
-   Avoid heavy gridlines and unnecessary decoration.
-   Align cell content consistently.
-   Provide a responsive horizontal-scroll wrapper for tables that
    cannot fit narrow screens.
-   Preserve readable minimum widths and meaningful table captions where
    needed.

### Product screenshot frames

-   White background with a 1px slate border.
-   20px radius.
-   Subtle raised shadow.
-   Optional light-slate browser bar with small neutral dots and a short
    title.
-   Use genuine WorkPlanX screenshots wherever available.
-   Do not represent placeholder visuals as actual product screenshots.
-   Keep screenshot framing consistent across the site.

### Icons

-   Use one consistent outline icon family, preferably Lucide.
-   Standard size: 24px.
-   Stroke width: 1.5px.
-   Use `blue-600` for emphasis and `slate-700` for neutral icons.
-   Avoid mixing outline and filled icon styles in the same context.
-   Icons should support the text, not replace essential labels.

### Footer

-   Use `blue-900` as the background.
-   Use white or softened white for text and links.
-   Organise links into clear groups such as Platform, Solutions,
    Company, and Legal.
-   Include a short product description, copyright information, and
    relevant legal links.
-   Keep link spacing generous and ensure the footer stacks clearly on
    mobile.

## 9. Imagery and Product Visuals

The website should be product-led. Visuals should demonstrate how
WorkPlanX helps coordinate labour-based, site-delivered services.

Preferred visual content: - Authentic application screenshots. - Clear
views of rosters, projects, daily reports, dockets, waste/recovery
workflows, timesheets, claims, invoicing, and the customer portal. -
Consistent screenshot framing. - Realistic, legible sample data when
mockups are necessary.

Avoid: - Generic stock photography as the main proof of product value. -
Decorative 3D graphics that do not explain the product. - Invented
interface details presented as if they exist in the live product. -
Screenshots with inconsistent scaling, excessive blur, or illegible
content.

If a screenshot is not yet available, use a clearly identified
placeholder and replace it with an approved product visual before
launch.

## 10. Motion and Interaction

Motion should be subtle and purposeful.

-   Fast transitions: 150ms.
-   Standard transitions: 250ms.
-   Slow transitions: 400ms.
-   Use an ease-out curve for most entering and hover interactions.
-   Buttons may transition background, border, text colour, and focus
    shadow.
-   Arrow links may shift slightly on hover.
-   Section reveals should be understated and must never prevent content
    from being read.
-   Content must remain visible if the animation runtime fails to load.
-   Respect `prefers-reduced-motion`; remove or greatly reduce animation
    and smooth scrolling for users who request reduced motion.

Avoid scroll hijacking, long entrance sequences, excessive parallax, and
animations that delay access to important information.

## 11. Accessibility

-   Target WCAG AA contrast for text and interactive controls.
-   The design system's reference contrast values include approximately
    17.9:1 for slate-900 on white, 7.5:1 for slate-600 on white, 5.2:1
    for white on blue-600, and 4.8:1 for blue-600 on white.
-   Use semantic HTML elements and a logical heading hierarchy.
-   Ensure all interactive elements are keyboard accessible.
-   Provide a visible focus indicator; the standard focus ring is a 3px
    `blue-300` ring.
-   Include a skip link for keyboard users.
-   Provide meaningful alternative text for informative images; use
    empty alt text for decorative images.
-   Give icon-only controls accessible names.
-   Use labels and programmatically associated descriptions for form
    fields and errors.
-   Ensure mobile touch targets are large enough and spaced
    appropriately.
-   Respect reduced-motion preferences.
-   Do not rely on colour alone to convey status, validation, or
    selection.

## 12. Responsive Behaviour

Use a mobile-first implementation and validate the design at small,
medium, and large widths.

Reference breakpoints used by the supplied style guide: - `480px`:
small-screen layout adjustments. - `640px`: compact two-column grids. -
`768px`: tablet grid and footer changes. - `900px`: heading scale
adjustments. - `1024px`: desktop navigation and wide multi-column
layouts.

Responsive rules: - Navigation collapses into a menu on smaller
screens. - Hero and split sections stack vertically on mobile. - Cards
and feature grids collapse to one column when needed. - Buttons in the
hero may become full width on very small screens. - Stat rows can stack
vertically on narrow screens. - Tables may scroll horizontally rather
than compressing text to unreadable widths. - Maintain consistent
gutters and avoid horizontal page overflow.

## 13. Content and UX Principles

-   Use direct, plain language.
-   Lead with customer outcomes, then explain the workflow or feature.
-   Keep headings specific rather than vague or overly clever.
-   Prefer concrete operational terms that match the product, including
    people, clients, projects, rosters, daily reports, dockets, waste
    and resource recovery, timesheets, claims, invoices, and customer
    portal.
-   Explain complex processes in a clear sequence.
-   Use evidence only when it can be substantiated; do not invent
    performance statistics, customer logos, testimonials, integrations,
    or product capabilities.
-   Make primary actions easy to identify.
-   Use consistent terminology across navigation, page headings, CTAs,
    and supporting content.

## 14. Implementation Rules

1.  **Treat design tokens as the source of truth.** Define reusable CSS
    variables and use them across the site.
2.  **Do not introduce arbitrary colours, spacing, radii, shadows, or
    type styles** when an existing token is suitable.
3.  **Build reusable components** for buttons, cards, badges, forms,
    section headers, navigation, screenshot frames, and footer groups.
4.  **Preserve the established visual system** when adding new pages or
    sections.
5.  **Keep the site responsive and accessible** as part of
    implementation, not as a final polish step.
6.  **Use real product assets** when available and clearly label
    placeholders.
7.  **Keep content and components maintainable.** Avoid one-off styling
    unless a real design need justifies it.
8.  **Keep animation progressive-enhancement only.** The page content
    must work without motion scripts.
9.  **Validate every page** at mobile, tablet, and desktop widths and
    test keyboard focus and form states.
10. **Do not silently invent brand rules or product claims.** If a
    requirement is not defined here, choose the simplest option
    consistent with this system and flag material assumptions.

## 15. Design Tokens Reference

The following CSS variables are the canonical token names and values for
the current design direction.

``` css
:root {
  --blue-50: #EFF6FF;
  --blue-100: #DBEAFE;
  --blue-200: #BFDBFE;
  --blue-300: #93C5FD;
  --blue-400: #60A5FA;
  --blue-500: #3B82F6;
  --blue-600: #2563EB;
  --blue-700: #1D4ED8;
  --blue-800: #1E40AF;
  --blue-900: #1E3A8A;

  --white: #FFFFFF;
  --slate-50: #F8FAFC;
  --slate-100: #F1F5F9;
  --slate-200: #E2E8F0;
  --slate-300: #CBD5E1;
  --slate-500: #64748B;
  --slate-600: #475569;
  --slate-700: #334155;
  --slate-900: #0F172A;

  --success: #16A34A;
  --success-bg: #DCFCE7;
  --success-border: #BBF7D0;
  --warning: #B45309;
  --warning-bg: #FEF3C7;
  --warning-border: #FDE68A;
  --error: #DC2626;
  --error-bg: #FEE2E2;
  --error-border: #FECACA;
  --info: var(--blue-500);

  --background: var(--white);
  --surface-subtle: var(--slate-50);
  --border: var(--slate-200);
  --text-primary: var(--slate-900);
  --text-secondary: var(--slate-600);
  --text-on-primary: var(--white);

  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", sans-serif;

  --fs-display: 3.5rem;
  --lh-display: 3.75rem;
  --fs-h1: 2.75rem;
  --lh-h1: 3.125rem;
  --fs-h2: 2rem;
  --lh-h2: 2.5rem;
  --fs-h3: 1.5rem;
  --lh-h3: 2rem;
  --fs-h4: 1.25rem;
  --lh-h4: 1.75rem;
  --fs-body-l: 1.125rem;
  --lh-body-l: 1.75rem;
  --fs-body: 1rem;
  --lh-body: 1.625rem;
  --fs-small: 0.875rem;
  --lh-small: 1.25rem;
  --fs-caption: 0.75rem;
  --lh-caption: 1rem;

  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;

  --tracking-tight: -0.02em;
  --tracking-eyebrow: 0.08em;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 999px;

  --shadow-subtle: 0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-raised: 0 8px 24px rgba(15, 23, 42, 0.08);

  --content-max: 1200px;
  --gutter: 24px;
  --section-pad: 96px;
  --section-pad-mobile: 64px;

  --dur-fast: 150ms;
  --dur: 250ms;
  --dur-slow: 400ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);

  --focus-ring: 0 0 0 3px var(--blue-300);
}
```

## 16. Final Quality Checklist

Before considering a page complete, confirm:

-   [ ] It follows the blue-and-slate palette.
-   [ ] Typography uses Inter and the defined type scale.
-   [ ] Spacing follows the 4px-based token system.
-   [ ] Cards, buttons, inputs, and frames use the defined radii and
    borders.
-   [ ] The primary action is visually clear.
-   [ ] Product visuals are accurate or clearly labelled as
    placeholders.
-   [ ] Layouts work at mobile, tablet, and desktop widths.
-   [ ] Keyboard focus is visible and all controls are accessible.
-   [ ] Colour contrast and form validation states are clear.
-   [ ] Reduced-motion preferences are respected.
-   [ ] No unsupported product claims, testimonials, or statistics have
    been introduced.
