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
    productScreenshotNote: "Product screenshot to be supplied",
    screenshotCaption: "Product screenshot to be supplied",
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
    headline: "One platform for your entire project lifecycle.",
    subheadline:
      "From workforce and daily operations to reporting, waste management, payroll and invoicing, all in one place.",
    contactLabel: "Contact us",
    secondaryLabel: "See how it works",
    secondaryHref: "#how-it-works",
    trustLine:
      "Built for labour-based, site-delivered services, with a specialist waste and resource-recovery core.",
    image: {
      src: "/images/screens/roster.png",
      alt: "WorkPlanX roster product screen",
      width: 1440,
      height: 900,
      placeholder: "Roster product screenshot",
      available: false,
    },
    mobileImage: {
      src: "/images/screens/mobile-app.png",
      alt: "WorkPlanX mobile app product screen",
      width: 390,
      height: 844,
      placeholder: "Mobile app screenshot",
      available: false,
    },
  },
  problemStrip: {
    heading: "Keep the whole operation in view.",
    problems: [
      "We don't know if we're making money on this job.",
      "Payroll takes days and still goes wrong.",
      "We invoice late and miss variations.",
      "Our clients keep calling for updates.",
    ],
    closing: "WorkPlanX puts it all in one place.",
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
    heading: "See the work as it happens.",
    description:
      "One connected workflow for planning, field records, resource recovery, payroll and invoicing.",
    tabs: [
      {
        id: "roster",
        label: "Roster and tasks",
        title: "Plan the day: people, vehicles, sites.",
        bullets: ["Daily crew plans", "Vehicle and fleet allocation"],
        image: {
          src: "/images/screens/roster.png",
          alt: "WorkPlanX roster and tasks screen",
          width: 1440,
          height: 900,
          placeholder: "Roster screenshot",
          available: false,
        },
      },
      {
        id: "daily-reports",
        label: "Daily reports",
        title: "Hours and tonnes recorded once, used everywhere.",
        bullets: ["Project Daily Report", "Dockets and field records"],
        image: {
          src: "/images/screens/project-daily-report.png",
          alt: "WorkPlanX Project Daily Report screen",
          width: 1440,
          height: 900,
          placeholder: "Project Daily Report screenshot",
          available: false,
        },
      },
      {
        id: "resource-recovery",
        label: "Waste and resource recovery",
        title:
          "See recycling and recovery reporting by project, customer and workspace.",
        bullets: ["Weigh Scale capture", "Resource Recovery Reports"],
        images: [
          {
            src: "/images/screens/weigh-scale.png",
            alt: "WorkPlanX Weigh Scale screen",
            width: 1440,
            height: 900,
            placeholder: "Weigh Scale screenshot",
            available: false,
          },
          {
            src: "/images/screens/resource-recovery-report.png",
            alt: "WorkPlanX Resource Recovery Report screen",
            width: 1440,
            height: 900,
            placeholder: "Resource Recovery Report screenshot",
            available: false,
          },
        ],
      },
      {
        id: "payroll",
        label: "Payroll",
        title: "Award-based loadings and penalty rates applied automatically.",
        bullets: ["Timesheets and approvals", "Weekly or fortnightly pay runs"],
        image: {
          src: "/images/screens/payroll.png",
          alt: "WorkPlanX payroll screen",
          width: 1440,
          height: 900,
          placeholder: "Payroll screenshot",
          available: false,
        },
      },
      {
        id: "invoicing-xero",
        label: "Invoicing and Xero",
        title: "Bill from claims or dockets. Sync with Xero both ways.",
        bullets: ["Contract Invoice", "Docket Invoice", "Xero invoice sync"],
        image: {
          src: "/images/screens/contract-invoice.png",
          alt: "WorkPlanX Contract Invoice screen",
          width: 1440,
          height: 900,
          placeholder: "Contract Invoice screenshot",
          available: false,
        },
      },
    ],
    contactLabel: "Contact us",
    contactPrompt: "See how WorkPlanX can support your project workflow.",
  },
  accessPoints: {
    heading: "One platform. Three ways in.",
    cards: [
      {
        id: "admin",
        title: "Web — Admin Portal",
        audience: "For office teams and managers",
        highlights: "Projects, rostering, reports, payroll and invoicing.",
        image: {
          src: "/images/screens/admin-portal.png",
          alt: "WorkPlanX Admin Portal screen",
          width: 1200,
          height: 800,
          placeholder: "Admin Portal screenshot",
          available: false,
        },
      },
      {
        id: "mobile",
        title: "Mobile App",
        audience: "For field workers and drivers",
        highlights: "Shifts, hours, daily reports, weigh tickets and photos.",
        image: {
          src: "/images/screens/mobile-app.png",
          alt: "WorkPlanX Mobile App screen",
          width: 390,
          height: 844,
          placeholder: "Mobile App screenshot",
          available: false,
        },
      },
      {
        id: "customer",
        title: "Customer Portal",
        audience: "For clients",
        highlights: "Projects, docket sign-off, waste performance and invoices.",
        image: {
          src: "/images/screens/customer-portal-dashboard.png",
          alt: "WorkPlanX Customer Portal dashboard screen",
          width: 1200,
          height: 800,
          placeholder: "Customer Portal dashboard screenshot",
          available: false,
        },
      },
    ],
    integration: "Integrates with Xero.",
  },
  proof: {
    heading: "Trusted by teams doing the work.",
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
    successMessage: "Your message was sent.",
    errorMessage: "Your message couldn't be submitted. Check the fields and try again.",
    deliveryUnavailable:
      "Contact delivery is not configured. This message was not stored or sent to the WorkPlanX team.",
    deliveryNotice:
      "The contact form is not connected yet. Messages are not stored or delivered.",
    validation: {
      required: "Please complete this field.",
    invalidEmail: "Enter a valid email address.",
      workEmail: "Enter a work email address rather than a personal email.",
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
