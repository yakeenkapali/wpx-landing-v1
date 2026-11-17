export const siteContent = {
  accessibility: {
    skipToContent: "Skip to content",
    mainNavigation: "Main navigation",
    footerNavigation: "Footer navigation",
    logoAlt: "WorkPlanX",
    logoLink: "WorkPlanX home",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
  },
  navigation: {
    solutions: { label: "Solutions", href: "#solutions" },
    capabilityStatement: {
      label: "Capability Statement",
      href: null as string | null,
      unavailable: "PDF not yet available",
    },
    contact: { label: "Contact us", href: "#contact" },
    login: {
      label: "Login",
      admin: { label: "Admin Portal", href: null as string | null },
      customer: { label: "Customer Portal", href: null as string | null },
      unavailable: "Login URL not yet available",
    },
  },
  sections: {
    hero: {
      heading: "From the roster to the invoice, in one platform.",
    },
    trust: {
      heading: "Built around the work that needs to connect.",
    },
    solutions: {
      heading: "One connected workflow for every project.",
    },
    access: {
      heading: "For office, field and customer teams.",
    },
    contact: {
      heading: "Ready to see WorkPlanX run your projects?",
    },
  },
  footer: {
    description:
      "End-to-end operations and billing for labour-based, site-delivered services.",
    copyright: "© WorkPlanX. All rights reserved.",
  },
  seo: {
    title: "WorkPlanX — From the roster to the invoice",
    description:
      "One platform for workforce, daily operations, reporting, waste management, payroll and invoicing.",
  },
} as const;
