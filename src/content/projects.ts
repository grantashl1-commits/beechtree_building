import { pageImages, type SiteImage } from "./media"

/**
 * PROJECTS — one entry per home. Order here = order on the site.
 *
 * To add a project: copy an entry, give it a unique `slug`, and put its photos in
 * public/images/projects/<slug>/ (or list them in `images` by hand).
 * Facts marked VERIFY came from public listings and should be confirmed with Beechtree.
 */

export type Project = {
  slug: string
  title: string
  location: string
  architect?: string
  size?: string
  year?: string
  /** One line used on cards. */
  summary: string
  /** Paragraphs on the project page. */
  body: string[]
  awards?: string[]
  testimonial?: { quote: string; author: string }
  /** Show in the home page "Selected works" reel. */
  featured?: boolean
  /** Explicit images; when empty the scraped images for this slug are used. */
  images?: SiteImage[]
}

const projectList: Project[] = [
  {
    slug: "the-bridge-house",
    title: "The Bridge House",
    location: "Kinloch, Taupō",
    architect: "Fraser Cameron Architects",
    size: "229 m²",
    year: "2022",
    summary: "A contemporary home bridging an angular ledge above the Kinloch golf course.",
    body: [
      "Situated on an angular site overlooking the Jack Nicklaus Golf Course in Kinloch, this 229 m² contemporary home reflects the natural tones of the surrounding landscape and blends gracefully into the hillside.",
      "The narrow building ledge demanded meticulous planning to capture views of the course and Lake Taupō — judges praised its flawless construction and the seamless integration of design with landscape.",
    ],
    awards: [
      "Gold Award — Master Builders House of the Year 2023",
      "Category Winner — New Home $1m–$1.5m, 2023",
    ],
    featured: true,
  },
  {
    slug: "whareroa-hideaway",
    title: "Whareroa Hideaway",
    location: "Whareroa, Lake Taupō",
    architect: "Bossley Architects",
    summary: "A family retreat tucked into the head of a valley at the south-western end of the lake.",
    body: [
      "A family retreat tucked into the head of a valley at the south-western end of Lake Taupō, designed by Bossley Architects and crafted by the Beechtree team.",
    ],
    awards: [
      "NZIA Waikato Bay of Plenty Architecture Award 2024",
      "Best Design Awards 2024 — Designers Institute of NZ",
      "Shortlisted — This Is Here 2024",
    ],
    featured: true,
  },
  {
    slug: "kinloch-retreat",
    title: "Kinloch Retreat",
    location: "Kinloch, Taupō",
    architect: "Design Group Stapleton Elliott",
    summary: "Two forms — a two-storey box and an angled pavilion that celebrates the lake.",
    body: [
      "The site is a flat, elevated building platform surrounded by steep berms, the Otaketake Stream Scenic Reserve and Lake Taupō.",
      "The main house is made up of two forms: a two-storey box housing the living, bedroom and bathroom spaces, and a one-storey kitchen and dining pavilion which angles to celebrate the views across Lake Taupō.",
    ],
    testimonial: {
      quote:
        "Simon and his team are the quintessential Kiwi builders that we all wish for: honest, reliable and highly skilled.",
      author: "Kinloch Retreat clients",
    },
    featured: true,
  },
  {
    slug: "hawk-ridge",
    title: "Hawk Ridge",
    location: "Whakaipo Valley, Taupō",
    architect: "Jackie Robinson Architecture",
    summary: "A ridgeline residence with 360° views of Lake Taupō and the countryside.",
    body: [
      "Located on a high ridgeline overlooking the Whakaipo Valley, the Hawk Ridge residence offers stunning 360-degree views of Lake Taupō and the surrounding countryside.",
    ],
    // VERIFY: testimonial paraphrased from a search snippet — swap in the verbatim quote from the scrape.
    testimonial: {
      quote: "Simon's professionalism and passion delivered us a beautiful home.",
      author: "Hawk Ridge clients",
    },
    featured: true,
  },
  {
    slug: "the-boathouse",
    title: "The Boathouse",
    location: "Lake Terrace, Taupō",
    summary: "A lakefront build on a tight, geothermal site — delivered on time.",
    body: [
      "Right on the lakefront with limited access and in a geothermal area, this build demanded difficult logistics — from getting materials on site to negotiating concrete trucks down a narrow access.",
      "The result was delivered on time and received a Master Builders House of the Year Gold Award.",
    ],
    awards: ["Gold Award — Master Builders House of the Year"],
    testimonial: {
      quote:
        "I decided to choose Simon Dumble of Beechtree Building to build my house on Lake Terrace — it was the best decision I had ever made. The quality of the build was excellent … The result was delivered on time & received a well-deserved House of the Year award.",
      author: "Steve Bignell",
    },
    featured: true,
  },
  {
    slug: "oak-leaf-abode",
    title: "Oak Leaf Abode",
    location: "Kinloch, Taupō",
    architect: "Fraser Cameron Architects",
    size: "275 m²",
    summary: "Long views down the lake towards Tongariro National Park.",
    body: [
      "This 275 m² home sits on an elevated site overlooking Kinloch bay, with long views down Lake Taupō towards Tongariro National Park.",
    ],
    // VERIFY: testimonial paraphrased from a search snippet — swap in the verbatim quote from the scrape.
    testimonial: {
      quote:
        "We were impressed with the team's meticulous craftsmanship, precision and attention to detail — an exceptionally high-quality home that exceeded our expectations.",
      author: "Oak Leaf Abode clients",
    },
    featured: true,
  },
  {
    slug: "wild-at-heart",
    title: "Wild at Heart",
    location: "Taupō",
    architect: "Jackie Robinson Architecture",
    size: "270 m²",
    summary: "A character-filled 270 m² home positioned for the lake.",
    body: [
      "A character-filled house with a striking 270 m² design positioned to make the most of views of Lake Taupō.",
    ],
    testimonial: {
      quote:
        "Our joiner recommended Simon — the only builder he works with that gives him a square corner and a straight wall every time.",
      author: "Wild at Heart clients",
    },
  },
  {
    slug: "curved-by-the-course",
    title: "Curved by the Course",
    location: "Kinloch, Taupō",
    summary: "A dual-level home on a compact, elevated site above the golf course.",
    body: [
      "A dual-level home on a compact yet elevated site on the eastern side of Kinloch, with views out over the Jack Nicklaus international golf course.",
    ],
  },
  {
    slug: "clad-to-meet-you",
    title: "Clad To Meet You",
    location: "Two Mile Bay, Taupō",
    summary: "Warming timber meets bold blue in a sweet family home.",
    body: [
      "A sweet family home at Two Mile Bay with a striking combination of warming timber and bold blue.",
    ],
  },
  {
    slug: "two-in-one",
    title: "Two In One",
    location: "Taupō",
    summary: "A large family home capturing sun and views of Mount Tauhara.",
    body: [
      "This large family home was built in a new area of Taupō, positioned on a large section to capture both the sun and the view of Mount Tauhara, with a gully bordered by walking trails to the lake.",
    ],
    testimonial: {
      quote:
        "If you are looking for a professional skilled builder focussed on honesty, integrity, exceptional communication, attention to detail and quality contractors — call Simon!",
      author: "Two In One clients",
    },
  },
  {
    slug: "skandi-by-the-lake",
    title: "Skandi By The Lake",
    location: "Lake Taupō",
    // VERIFY: no public description was found — replace with the client's copy after `npm run scrape`.
    summary: "Scandinavian restraint, lakeside light.",
    body: ["Scandinavian restraint meets lakeside light in this considered Taupō home."],
  },
]

/** Projects with their images resolved (explicit images win over scraped ones). */
export const projects = projectList.map((project) => ({
  ...project,
  images: project.images?.length ? project.images : pageImages(project.slug),
}))

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
