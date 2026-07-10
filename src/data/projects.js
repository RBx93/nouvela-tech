// Nouvela Technology Group — Portfolio Projects
// Update `url` and `status` when a client site goes live.
// Status options: 'live' | 'in_development' | 'planning'

const projects = [
  {
    title: "CSCI LIMS (cscilab.com)",
    desc: "Multi-tenant, ISO/IEC 17025-compliant Laboratory Information Management System for the Center for Sustainable Chemical Innovations. 10 modules: sample management, work orders, calibration, document control, QC charts, CoA reporting, and a client portal — with row-level security and append-only audit logging.",
    tags: ["React 19", "Azure Functions", "Azure SQL (RLS)", "Azure AD B2C", "ISO 17025"],
    url: "https://thankful-smoke-07fd79910.7.azurestaticapps.net",
    status: "in_development",
  },
  {
    title: "Bassy Handyman Co.",
    desc: "Full-service handyman website with contact form, gallery, before/after slider, and Google Analytics.",
    tags: ["React 19", "Bootstrap 5", "EmailJS", "Azure"],
    url: "https://black-grass-0bd5c040f.6.azurestaticapps.net",
    status: "live",
  },
  {
    title: "Iota Omega Chapter",
    desc: "Fraternity chapter site with Firebase admin portal, live event calendar, member database, and photo archives.",
    tags: ["React 18", "Firebase", "Bootstrap"],
    url: "https://iotaomega1923.com",
    status: "live",
  },
  {
    title: "Bryant's Lawn Care Services LLC",
    desc: "Editorial redesign for an Eastern NC lawn care business. Custom Patagonia-style visual identity, accordion service catalog, before/after sliders, verified HomeAdvisor testimonials, SEO foundation, and Google Maps service area. Deployed on Azure with GitHub Actions CI/CD.",
    tags: ["React 19", "Bootstrap 5", "SCSS", "Azure SWA", "SEO"],
    url: "https://bryantslawncare.org",
    status: "live",
  },
  {
    title: "LABTEQ",
    desc: "E-commerce storefront for a science-inspired apparel and merch brand — product catalog with detail modals, cart, and custom loading experience.",
    tags: ["JavaScript", "E-commerce", "Azure SWA"],
    url: "https://thelabteq.com",
    status: "live",
  },
  {
    title: "Beehive Lodge #779",
    desc: "WordPress site for a Prince Hall Masonic lodge featuring news & events, officer directory, membership info, and community outreach.",
    tags: ["WordPress", "WPBakery", "AIOSEO"],
    url: "https://beehive779apk.com",
    status: "live",
  },
]

export default projects
