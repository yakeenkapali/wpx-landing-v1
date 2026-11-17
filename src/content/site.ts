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
      href: "/capability/workplanx-capability-statement.pdf",
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
      lead: "One platform to manage the entire project lifecycle: workforce, daily operations, reporting, waste management, payroll and invoicing.",
      contactLabel: "Contact us",
      secondaryLabel: "See how it works",
      visualCaption: "Illustrative workflow · not a product screenshot",
    },
    trust: {
      heading: "Built around the work that needs to connect.",
      facts: [
        { label: "Xero invoice sync", icon: "receipt" },
        { label: "Full audit trail", icon: "history" },
        { label: "Award / EA / NES payroll", icon: "calendar" },
        { label: "Multi-branch workspaces", icon: "layers" },
      ],
    },
    clients: {
      trustLine:
        "Trusted by thousands of companies from startups to global enterprises",
      logos: [
        { src: "/clients/client-01.svg", width: 300, height: 92 },
        { src: "/clients/client-02.svg", width: 311, height: 100 },
        { src: "/clients/client-03.svg", width: 754, height: 238 },
        { src: "/clients/client-04.svg", width: 1806, height: 1000 },
      ],
    },
    solutions: {
      eyebrow: "Product & Solutions",
      heading: "One connected workflow for every project.",
      description:
        "The entire project lifecycle: workforce, daily operations, reporting, waste management, payroll and invoicing.",
      visualCaption: "Illustrative workflow · not a product screenshot",
      cards: [
        {
          id: "roster",
          title: "Rostering and workforce",
          description:
            "Plan shifts and crews, with skills and inductions in view.",
        },
        {
          id: "reports",
          title: "Daily reports and dockets",
          description: "Daily reports capture hours, waste and signed dockets.",
        },
        {
          id: "payroll",
          title: "Payroll",
          description: "Timesheets flow through Award / EA / NES payroll.",
        },
        {
          id: "invoicing",
          title: "Invoicing and Xero",
          description:
            "Create invoices from claims or signed dockets; sync with Xero.",
        },
        {
          id: "projects",
          title: "Projects and estimates",
          description:
            "Track budget vs actual hours, rate overrides and variations.",
        },
      ],
      waste: {
        title: "Waste management and eco footprints",
        description:
          "Weigh tickets roll up into Resource Recovery reports by project, customer and workspace.",
        detail: "Material composition, recovery pathways and volumes.",
      },
    },
    access: {
      heading: "For office, field and customer teams.",
      visualCaption: "Illustrative workflow · not a product screenshot",
      cards: [
        {
          id: "admin",
          title: "Admin Portal",
          role: "Office: plan, approve, invoice.",
        },
        {
          id: "mobile",
          title: "Mobile App",
          role: "Field: shifts, hours, reports, weigh tickets.",
        },
        {
          id: "customer",
          title: "Customer Portal",
          role: "Clients: projects, dockets, invoices.",
        },
      ],
    },
    contact: {
      heading: "One platform to manage the entire project lifecycle.",
      lead: "Better coordination, improved visibility, streamlined workflows and centralised project management.",
      contactLabel: "Contact us",
      capabilityLabel: "Download capability statement",
      form: {
        name: "Name",
        email: "Email",
        company: "Company",
        message: "Message",
        submit: "Contact us",
        notConnected: "Form not connected yet. Your message has not been sent.",
        errors: {
          name: "Enter your name.",
          email: "Enter a valid email address.",
          company: "Enter your company.",
          message: "Enter a message.",
        },
      },
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
