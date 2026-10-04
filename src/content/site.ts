/**
 * SITE COPY — business details and every headline/paragraph that isn't a project.
 * Edit text here; the layout updates automatically.
 * Facts marked VERIFY came from public listings and should be confirmed with Beechtree.
 */

export const company = {
  name: "Beechtree Building",
  legalName: "Beechtree Building Ltd",
  tagline: "Award-winning builders of architectural homes in Taupō",
  description:
    "Beechtree Building is an award-winning Registered Master Builder crafting architecturally designed new homes, additions and renovations across Taupō and the Central Plateau.",
  director: "Simon Dumble",
  phone: "022 192 1197",
  phoneHref: "tel:+64221921197",
  email: "simon@beechtreebuilding.co.nz",
  address: { street: "4 Parata Street", city: "Taupō", postcode: "3330", country: "New Zealand" },
  coordinates: "38.6857° S, 176.0702° E",
  mapsUrl: "https://maps.google.com/?q=Beechtree+Building+4+Parata+Street+Taupo",
  // Paste the client's "Get more reviews" link from Google Business Profile here.
  googleReviewUrl: "https://share.google/QXzQtWp7hHCvrX1Zm",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/beechtreebuilding/" },
    { label: "ArchiPro", href: "https://archipro.co.nz/professional/beechtree-building" },
    { label: "Houzz", href: "https://www.houzz.co.nz/professionals/home-builders/beechtree-building-ltd-pfvwnz-pf~1477294875" },
  ],
}

export const nav = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/#reviews" },
]

export const hero = {
  eyebrow: "Registered Master Builders — Taupō, Aotearoa",
  lines: ["Architectural homes,", "built with", "quiet precision."],
  intro:
    "We partner with New Zealand's finest architects to turn ambitious, beautiful designs into homes that stand for generations.",
  primaryCta: { label: "Start your build", href: "/contact" },
  secondaryCta: { label: "View the work", href: "/projects" },
  badge: "House of the Year — Gold 2023",
}

export const statement = {
  text: "We're a hands-on team of licensed builders who treat every home as if it were our own. Complex curves, cantilevers and lakefront sites don't scare us — they're the reason we love what we do.",
  signature: company.director,
}

/** The pinned "blueprint to home" scroll story. Six chapters, in order. */
export const buildStory = {
  eyebrow: "From blueprint to home",
  title: "Every Beechtree home is built twice — once on paper, once for life.",
  chapters: [
    {
      label: "The site",
      title: "We start by listening.",
      body: "To you, and to the land. We walk the site with you and your architect, reading the light, the slope and the view before a single peg goes in.",
    },
    {
      label: "Design & pricing",
      title: "Buildability, from the first sketch.",
      body: "Design-build input, scheduling, estimating and honest budgeting — so the home on paper is the home you can build.",
    },
    {
      label: "Foundations",
      title: "Built right where no one looks.",
      body: "Lakefront, ridgeline or geothermal ground — precise set-out and engineered foundations, built as carefully as the parts you'll see.",
    },
    {
      label: "Framing",
      title: "A square corner and a straight wall. Every time.",
      body: "Our licensed builders frame with the precision every finished detail depends on — something your joiner, and your architect, will notice.",
    },
    {
      label: "Closing in",
      title: "Craft, coordinated.",
      body: "Cladding, joinery and roofing come together under one exacting standard, with trusted subcontractors managed by us from start to finish.",
    },
    {
      label: "Handover",
      title: "Welcome home.",
      body: "Delivered on time, on budget, and backed by the 10-year Master Build Guarantee.",
    },
  ],
}

export const credentials = [
  { value: "Gold", label: "House of the Year 2023" },
  { value: "10 yr", label: "Master Build Guarantee" },
  { value: "LBP", label: "Licensed Building Practitioners" },
  { value: "RMB", label: "Registered Master Builders" },
]

export const awards = [
  "House of the Year Gold — 2023",
  "Regional Category Winner — 2023",
  "House of the Year Silver — 2020",
  "House of the Year Gold — 2018",
  "NZIA Architecture Award — 2024",
  "Best Design Awards — 2024",
]

export const architects = [
  "Fraser Cameron Architects",
  "Bossley Architects",
  "Jackie Robinson Architecture",
  "Design Group Stapleton Elliott",
]

export const services = [
  {
    slug: "new-homes",
    title: "New Homes",
    lead: "Your architecturally designed home, brought to life.",
    body: "Our team of licensed builders works closely with you every step of the way to bring your architecturally designed home to life — on time and on budget.",
    imageFrom: "the-bridge-house",
  },
  {
    slug: "additions",
    title: "Additions",
    lead: "More space, seamlessly matched.",
    body: "Additions are the perfect way to add space to your existing home. Our craftsmen have extensive experience matching extensions harmoniously with the home you already love.",
    imageFrom: "kinloch-retreat",
  },
  {
    slug: "renovations",
    title: "Renovations",
    lead: "Lift what you have into a new realm.",
    body: "We enhance and develop your current space by seamlessly integrating new features into the existing design — marking it with your distinctive style and vision.",
    imageFrom: "clad-to-meet-you",
  },
]

export const expertise = {
  preConstruction: ["Design-build", "Scheduling", "Estimating & budgeting"],
  construction: ["Quality control", "Safety management", "Subcontractor management"],
}

// Proposed copy for the pitch — confirm wording with the client.
export const process = [
  {
    title: "Conversation",
    body: "Coffee, plans and a site visit. We learn what you want to build, and why.",
  },
  {
    title: "Pricing & programme",
    body: "Transparent estimating and a realistic programme, worked through with your architect.",
  },
  {
    title: "The build",
    body: "One point of contact, weekly updates and a tidy, safe site from start to finish.",
  },
  {
    title: "Handover & beyond",
    body: "A thorough walk-through, your Master Build Guarantee, and a builder who still picks up the phone.",
  },
]

export const about = {
  eyebrow: "About Beechtree",
  title: "A builder's builder.",
  paragraphs: [
    "Beechtree Building is an award-winning, highly experienced building company specialising in quality new homes, renovations and additions in the Taupō region.",
    "Our approach combines professional design and construction expertise, making you a partner in the build — whether that's a cosy dream home, an architectural masterpiece or the remodelling of an existing residence.",
    "We're Licensed Building Practitioners and Registered Master Builders, so every home we build is guaranteed.",
  ],
  quote: {
    text: "Beechtree Building have remained consistently client and outcome focused — the built results and happy clients testify to the value they bring.",
    author: "Fraser Cameron Architects",
  },
}

/** Shown when Google reviews aren't configured yet (or the API is unavailable). */
export const fallbackReviews = [
  {
    author: "Steve Bignell",
    rating: 5,
    text: "I decided to choose Simon Dumble of Beechtree Building to build my house on Lake Terrace — it was the best decision I had ever made. The quality of the build was excellent.",
  },
  {
    author: "Two In One clients",
    rating: 5,
    text: "Simon and his team at Beechtree Building did a splendid job with our house. Our project ran smoothly. Simon was very approachable and offered assistance right through our whole design and build process.",
  },
  {
    author: "Kinloch Retreat clients",
    rating: 5,
    text: "Simon and his team are the quintessential Kiwi builders that we all wish for: honest, reliable and highly skilled.",
  },
  {
    author: "Wild at Heart clients",
    rating: 5,
    text: "Our joiner told us Simon is the only builder he works with that gives him a square corner and a straight wall every time.",
  },
]

export const contact = {
  eyebrow: "Start your build",
  title: "Let's build something remarkable.",
  body: "Tell us a little about your site, your architect and your timing. Simon will be in touch personally.",
  projectTypes: ["New home", "Addition", "Renovation", "Not sure yet"],
}
