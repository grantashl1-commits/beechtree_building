/**
 * SITE COPY — business details and every headline/paragraph that isn't a project.
 * Edit text here; the layout updates automatically.
 * Text marked "verbatim" is the client's own wording from their current website.
 * Facts marked VERIFY came from public listings and should be confirmed with Beechtree.
 */

export const company = {
  name: "Beechtree Building",
  legalName: "Beechtree Building Ltd",
  // verbatim
  tagline: "Award winning home builders in the Taupō region",
  description:
    "Beechtree Building is an award-winning Registered Master Builder crafting architecturally designed new homes, additions and renovations across Taupō and the Central Plateau.",
  director: "Simon Dumble",
  team: "Simon & Kylie Dumble",
  phone: "022 192 1197",
  phoneHref: "tel:+64221921197",
  email: "simon@beechtreebuilding.co.nz",
  address: { street: "4 Parata Street", city: "Taupō", postcode: "3330", country: "New Zealand" },
  physicalAddress: "24 Raywood Crescent, Tauhara, Taupō",
  postalAddress: "4 Parata Street, Taupō 3330",
  coordinates: "38.6857° S, 176.0702° E",
  mapsUrl: "https://maps.google.com/?q=24+Raywood+Crescent+Tauhara+Taupo",
  // verbatim
  guarantee: "We are Registered Master Builders and our work is guaranteed.",
  // Paste the client's "Get more reviews" link from Google Business Profile here.
  googleReviewUrl: "https://share.google/QXzQtWp7hHCvrX1Zm",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/beechtreebuilding/" },
    { label: "ArchiPro", href: "https://archipro.co.nz/professional/beechtree-building" },
    // VERIFY: add the Instagram link from the current website footer.
  ],
}

export const nav = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/#reviews" },
]

export const hero = {
  eyebrow: company.tagline,
  lines: ["Architectural homes,", "built with", "quiet precision."],
  intro:
    "We partner with New Zealand's finest architects to turn ambitious, beautiful designs into homes that stand for generations.",
  primaryCta: { label: "Start your build", href: "/contact" },
  secondaryCta: { label: "View the work", href: "/projects" },
  badge: "House of the Year — Gold 2025",
}

/** "We build dream homes" — the home page introduction (verbatim). */
export const homeIntro = {
  title: "We build dream homes",
  cta: "Talk to us today about how we can help you get started building your dream.",
}

export const statement = {
  // verbatim
  text: "We’re dedicated to exceeding expectations for craftsmanship, quality, and service on every project — no matter the size or style.",
  signature: company.team,
}

/** The four values from the current website (verbatim). */
export const values = ["Experienced", "Professional team", "Award winning", "Meticulous"]

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
      body: "Design collaboration, advice and assistance, scheduling, estimating and transparent pricing — so the home on paper is the home you can build.",
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
      body: "Cladding, joinery and roofing come together under one exacting standard, with quality control and subcontractor management handled by us from start to finish.",
    },
    {
      label: "Handover",
      title: "Welcome home.",
      body: "Delivered on time, on budget, with Code of Compliance, as-built documentation and our digital warranty & maintenance service.",
    },
  ],
}

/**
 * Master Builders House of the Year medals (Bay of Plenty & Central Plateau),
 * as shown on the current website. `project` links a medal to its project where known.
 */
export const awards: { title: string; year: number; project?: string }[] = [
  { title: "Gold Award", year: 2025, project: "oak-leaf-abode" },
  { title: "Regional Category Winner", year: 2023, project: "the-bridge-house" },
  { title: "Gold Award", year: 2023, project: "the-bridge-house" },
  { title: "Silver Award", year: 2020 },
  { title: "Gold Award", year: 2018, project: "clad-to-meet-you" },
  { title: "Gold Award", year: 2016 },
  { title: "Local Category Winner", year: 2016 },
  { title: "Gold Reserve Award", year: 2016 },
]

export const awardsProgramme = "Master Builders House of the Year — Bay of Plenty & Central Plateau"

export const credentials = [
  { value: String(awards.length), label: "House of the Year medals since 2016" },
  { value: "Gold", label: "House of the Year 2025" },
  { value: "LBP", label: "Licensed Building Practitioners" },
  { value: "RMB", label: "Registered Master Builders — our work is guaranteed" },
]

export const architects = [
  "Fraser Cameron Architects",
  "Bossley Architects",
  "Jackie Robinson Architecture",
  "Design Group Stapleton Elliott",
]

/** What architects say (verbatim). */
export const architectQuotes = [
  {
    firm: "Fraser Cameron Architects",
    author: "Fraser Cameron",
    projects: ["the-bridge-house", "oak-leaf-abode"],
    pull: "With a great fit of building team on site for each project and clear communication, the built results and happy clients are testimony to the value Beechtree Building brings to a client and their special project.",
    paragraphs: [
      "Fraser Cameron Architects has worked in association with Simon, Kylie and the team at Beechtree Building on a variety of residential projects for our mutual clients.",
      "While these projects have varied in scope and design, Beechtree Building has remained consistently client and outcome focused in their delivery of building contracts.",
      "Simon has made the effort to communicate with us to clarify our design intention in detail (both construction and interior finishing details) as necessary throughout the building process.",
      "With a great fit of building team on site for each project and clear communication, the built results and happy clients are testimony to the value Beechtree Building brings to a client and their special project.",
    ],
  },
  {
    firm: "Jackie Robinson Architecture",
    author: "Jackie Robinson",
    projects: ["wild-at-heart", "hawk-ridge"],
    pull: "Commitment, enthusiasm, great communication and high ethics are the forefront of who Beechtree Building are.",
    paragraphs: [
      "Simon and I have worked on many projects together over time. Engaging with clients as a collective team to work through the processes of their unique projects, from the first client meeting through the Concept Design stage, on to Working Drawings and through the Building Consent process.",
      "Many of our clients are unfamiliar with the process of building a “New Home” and find the collaborative approach reassuring and appealing. It is our commitment to provide a cooperative and rewarding experience for clients, as this is one of the greatest journeys they may take.",
      "Simon and Kylie manage a very professional business, delivering an extremely high standard of build. They pride themselves in all they do and place their clients' satisfaction as paramount. Commitment, enthusiasm, great communication and high ethics are the forefront of who Beechtree Building are and I am honoured to be involved with them as an Architectural Design Colleague.",
    ],
  },
]

/**
 * Services — `lead` and `body` are verbatim; `tagline` is the short line on the home page.
 * Photos: public/images/services/01 = New Homes, 02 = Additions, 03 = Renovations.
 * Until those exist, the first photo of the `imageFrom` slug is used.
 */
export const services = [
  {
    slug: "new-homes",
    title: "New Homes",
    tagline: "Any vision, made real.",
    lead: "With a passion for architecture and design, we have the skills to make any vision a reality; delivered on time and on budget.",
    body: "At Beechtree Building, our team of qualified builders work closely with you every step of the way to bring your project to life.",
    imageFrom: "the-bridge-house",
  },
  {
    slug: "additions",
    title: "Additions",
    tagline: "More space, seamlessly matched.",
    lead: "Love your home but it's just not quite big enough? Additions are the perfect way to add space to your existing home.",
    body: "Our team of craftsmen at Beechtree Building have extensive knowledge and experience at matching extensions harmoniously with your existing home.",
    imageFrom: "craft",
  },
  {
    slug: "renovations",
    title: "Renovations",
    tagline: "A new lease on life.",
    lead: "Beechtree Building can enhance and develop your current space by seamlessly integrating new features and improvements into the existing design.",
    body: "This lifts the building into a new realm, giving it a new lease on life and marking it with your distinctive style and vision.",
    imageFrom: "oak-leaf-abode",
  },
]

/** Our expertise (verbatim). */
export const expertise = [
  { title: "Pre-Construction", items: ["Design collaboration, advice, & assistance", "Scheduling, estimating & budgeting", "Transparent pricing"] },
  { title: "Construction", items: ["Quality control", "Safety management", "Subcontractor management"] },
  { title: "Post-Construction", items: ["Code of Compliance", "As-built documentation", "Digital Warranty & Maintenance Service"] },
]

// Proposed copy for the pitch — confirm wording with the client.
export const process = [
  {
    title: "Conversation",
    body: "Coffee, plans and a site visit. We learn what you want to build, and why.",
  },
  {
    title: "Pricing & programme",
    body: "Transparent pricing and a realistic programme, worked through with your architect.",
  },
  {
    title: "The build",
    body: "Regular project and photo updates, and a tidy, safe site from start to finish.",
  },
  {
    title: "Handover & beyond",
    body: "Code of Compliance, as-built documentation, and our digital warranty & maintenance service.",
  },
]

export const about = {
  eyebrow: "About Beechtree",
  // verbatim
  title: "Creative thinking, meticulous execution.",
  lead: "A combination of professional design and construction expertise",
  paragraphs: [
    "Beechtree Building's approach combines professional design and construction expertise and makes you – the client – a partner in the construction. Your priorities drive the project. Whether it’s building your cosy dream home, an architectural masterpiece, or remodelling your present residence, we’ll craft a project that reflects your vision and fits your budget.",
    "Our talented team of builders, skilled trade partners and professionals will provide you with every advantage necessary to achieve the result of your dreams. We’re dedicated to exceeding expectations for craftsmanship, quality, and service on every project — no matter the size or style. When you choose Beechtree Building, you will receive the highest level of quality, attention, and care to ensure that your new custom home or renovation—architectural or otherwise — is delivered on time, on budget, and to your exact specifications.",
    company.guarantee,
  ],
}

export const contact = {
  eyebrow: "Start your build",
  title: "Let’s build.",
  // verbatim
  body: "From concept to construction, we’re ready to build your dream. We promise a client-centric approach that empowers ideas, eases concerns, and delivers quality craftsmanship we’ll all be proud of.",
  projectTypes: ["New home", "Addition", "Renovation", "Not sure yet"],
}
