type ProofLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  real: boolean;
};

type ProofTestimonial = {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  real: boolean;
};

const proofLogos: ProofLogo[] = [];
const proofTestimonials: ProofTestimonial[] = [];

export const siteContent = {
  accessibility: {
    skipToContent: "Skip to content",
    mainNavigation: "Main navigation",
    footerNavigation: "Footer navigation",
    productTabs: "WorkPlanX product workflows",
    customerLogos: "Customer logos",
    brandName: "WorkPlanX",
    logoAlt: "WorkPlanX",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    contactDeliveryNote: "Contact delivery status",
    logoLink: "WorkPlanX home",
  },
  navigation: {
    links: [
      { label: "How it works", href: "#how-it-works", id: "how-it-works" },
      { label: "Our work", href: "#our-work", id: "our-work" },
      { label: "Portal & Mobile", href: "#access-points", id: "access-points" },
    ],
    adminPortal: { label: "Admin Portal login", href: null },
    customerPortal: { label: "Customer Portal login", href: null },
    contactLabel: "Contact us",
    contactActionLabel: "Contact us",
    mobileContactLabel: "Contact us",
    mobileLinkListLabel: "Main navigation",
    loginDestinationPending: "Login destination not yet supplied",
  },
  hero: {
    headline: "One platform for the project lifecycle.",
    subheadline:
      "Connect workforce, site reporting, resource recovery, payroll, invoicing and customer access in one operational workflow.",
    contactLabel: "Contact us",
    secondaryLabel: "See how it works",
    secondaryHref: "#how-it-works",
    trustLine:
      "Built for labour-based, site-delivered services, with waste and resource recovery at its core.",
    visual: {
      eyebrow: "ONE PROJECT RECORD",
      source: {
        title: "The project",
        detail: "People · site · scope",
      },
      branches: [
        { title: "Field reporting", detail: "Hours · dockets · reports", icon: "report" },
        { title: "Resource recovery", detail: "Weighing · classification", icon: "recovery" },
        { title: "Payroll", detail: "Timesheets · pay runs", icon: "payroll" },
        { title: "Invoicing + Xero", detail: "Claims · dockets · sync", icon: "invoice" },
        { title: "Customer access", detail: "Projects · sign-off", icon: "portal" },
      ],
      caption: "Illustrative workflow · not a product screenshot",
    },
  },
  problemStrip: {
    heading: "When work is spread across systems.",
    problems: [
      "We don't know if we're making money on this job.",
      "Payroll takes days and still goes wrong.",
      "We invoice late and miss variations.",
      "Our clients keep calling for updates.",
    ],
    closing: "WorkPlanX connects the work from site to office.",
  },
  howItWorks: {
    heading: "From the plan to the final account.",
    steps: [
      {
        title: "Plan",
        description: "Register projects, win work, set up people and clients.",
      },
      {
        title: "Roster",
        description: "Assign crews and vehicles to sites each day.",
      },
      {
        title: "Capture",
        description:
          "Field teams record hours, reports, dockets and weigh tickets on mobile.",
      },
      {
        title: "Pay and bill",
        description:
          "Hours flow to timesheets and payroll. Work flows to invoices, then Xero.",
      },
      {
        title: "Share",
        description:
          "Clients see projects, dockets, waste performance and invoices in their portal.",
      },
    ],
  },
  showcase: {
    heading: "Follow the work through the whole project.",
    tabs: [
      {
        id: "roster",
        label: "Roster and tasks",
        title: "Plan the day: people, vehicles, sites.",
        bullets: ["Daily crew plans", "Vehicle and fleet allocation"],
        visual: {
          source: { title: "Plan the day", detail: "A project starts with people, vehicles and sites." },
          steps: [
            { title: "People", detail: "Set up the workforce", icon: "people" },
            { title: "Vehicles", detail: "Allocate the fleet", icon: "vehicle" },
            { title: "Sites", detail: "Assign the work", icon: "site" },
          ],
        },
      },
      {
        id: "daily-reports",
        label: "Daily reports",
        title: "Hours and tonnes recorded once, used everywhere.",
        bullets: ["Project Daily Report", "Dockets and field records"],
        visual: {
          source: { title: "Capture on site", detail: "Field records carry the day's work forward." },
          steps: [
            { title: "Hours", detail: "Time on the job", icon: "report" },
            { title: "Dockets", detail: "Work recorded", icon: "document" },
            { title: "Daily report", detail: "Site activity", icon: "report" },
          ],
        },
      },
      {
        id: "resource-recovery",
        label: "Waste and resource recovery",
        title:
          "See recycling and recovery reporting by project, customer and workspace.",
        bullets: ["Weigh Scale capture", "Resource Recovery Reports"],
        visual: {
          source: { title: "Track material", detail: "Waste records connect to project reporting." },
          steps: [
            { title: "Weigh", detail: "Capture the load", icon: "recovery" },
            { title: "Classify", detail: "Record the material", icon: "document" },
            { title: "Report", detail: "View recovery by project", icon: "report" },
          ],
        },
      },
      {
        id: "payroll",
        label: "Payroll",
        title: "Award-based loadings and penalty rates applied automatically.",
        bullets: ["Timesheets and approvals", "Weekly or fortnightly pay runs"],
        visual: {
          source: { title: "Work recorded", detail: "Hours move from site activity to payroll." },
          steps: [
            { title: "Hours", detail: "Recorded in the field", icon: "report" },
            { title: "Timesheets", detail: "Reviewed and approved", icon: "document" },
            { title: "Pay run", detail: "Weekly or fortnightly", icon: "payroll" },
          ],
        },
      },
      {
        id: "invoicing-xero",
        label: "Invoicing and Xero",
        title: "Bill from claims or dockets. Sync with Xero both ways.",
        bullets: ["Contract Invoice", "Docket Invoice", "Xero invoice sync"],
        visual: {
          source: { title: "Work completed", detail: "Build invoices from claims or dockets." },
          steps: [
            { title: "Claims", detail: "Contract work", icon: "document" },
            { title: "Invoices", detail: "Bill from project records", icon: "invoice" },
            { title: "Xero", detail: "Invoice sync", icon: "portal" },
          ],
        },
      },
    ],
    contactLabel: "Contact us",
    contactPrompt: "Explore your project workflow with WorkPlanX.",
  },
  accessPoints: {
    heading: "For office, field and customer teams.",
    cards: [
      {
        id: "admin",
        title: "Web — Admin Portal",
        audience: "For office teams and managers",
        highlights: "Projects, rostering, reports, payroll and invoicing.",
        visual: {
          label: "WEB WORKSPACE",
          nodes: ["Projects", "Rostering", "Payroll", "Invoicing"],
        },
      },
      {
        id: "mobile",
        title: "Mobile App",
        audience: "For field workers and drivers",
        highlights: "Shifts, hours, daily reports, weigh tickets and photos.",
        visual: {
          label: "FIELD WORKFLOW",
          nodes: ["Shift", "Hours", "Daily report", "Weigh ticket"],
        },
      },
      {
        id: "customer",
        title: "Customer Portal",
        audience: "For clients",
        highlights: "Projects, docket sign-off, waste performance and invoices.",
        visual: {
          label: "CUSTOMER ACCESS",
          nodes: ["Projects", "Dockets", "Recovery", "Invoices"],
        },
      },
    ],
    integration: "Integrates with Xero.",
  },
  proof: {
    heading: "The project record stays in view.",
    description:
      "Follow work from the crew plan and site records through reporting, payroll, invoicing and customer access.",
    integration: "Xero integration for invoice sync.",
    logos: proofLogos,
    testimonials: proofTestimonials,
  },
  contact: {
    heading: "Ready to see WorkPlanX run your projects?",
    description:
      "Tell us a little about your business and how your projects run.",
    fields: {
      name: { label: "Name", autocomplete: "name" },
      email: { label: "Work email", autocomplete: "email" },
      company: { label: "Company", autocomplete: "organization" },
      message: { label: "Message", autocomplete: "off" },
    },
    requiredNote: "All fields are required.",
    submitLabel: "Contact us",
    sendingLabel: "Sending…",
    retryLabel: "Try again",
    successMessage: "Your message was sent.",
    errorMessage: "Your message couldn't be submitted. Check the fields and try again.",
    deliveryUnavailable:
      "Contact delivery is not configured. This message was not stored or sent to the WorkPlanX team.",
    deliveryNotice:
      "The contact form is not connected yet. Messages are not stored or delivered.",
    limits: {
      name: 120,
      email: 254,
      company: 160,
      message: 4000,
    },
    validation: {
      required: "Please complete this field.",
      invalidEmail: "Enter a valid email address.",
      workEmail: "Enter a work email address rather than a personal email.",
      tooLong: (maxLength: number) => `Use ${maxLength} characters or fewer.`,
    },
  },
  footer: {
    description:
      "End-to-end operations and billing for labour-based, site-delivered services.",
    adminPortal: "Admin Portal login",
    customerPortal: "Customer Portal login",
    contactLabel: "Contact us",
    website: "www.workplanx.com",
    company: "Dohoro Management Pvt Ltd",
    copyright: "© WorkPlanX. All rights reserved.",
    privacyLabel: "Privacy",
    privacyHref: null,
    cookiesLabel: "Cookie notice",
    cookiesHref: null,
  },
  seo: {
    title: "WorkPlanX — Project operations and billing",
    description:
      "One platform for workforce, daily operations, reporting, waste management, payroll and invoicing.",
  },
} as const;

export type SiteContent = typeof siteContent;
