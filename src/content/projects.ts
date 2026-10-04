import { pageImages, type SiteImage } from "./media"

/**
 * PROJECTS — one entry per home, in the same order as the "Projects" page of the
 * current beechtreebuilding.co.nz. Order here = order on the site.
 *
 * Photos live in public/images/<slug>/ (see docs/PHOTOS.md). Drop originals into
 * public/images/<slug>/exterior/ and public/images/<slug>/interior/, then run
 * `npm run images` — they're optimised and registered automatically.
 *
 * Testimonials and property highlights are the client's own words from their current
 * website (obvious typos corrected). `pull` is one complete sentence quoted from the testimonial.
 */

export type Testimonial = {
  /** The full testimonial, one string per paragraph. */
  paragraphs: string[]
  /** One complete sentence from the testimonial, used on cards and in the reviews carousel. */
  pull: string
  author: string
}

export type Project = {
  slug: string
  title: string
  location: string
  architect?: string
  architectUrl?: string
  size?: string
  year?: string
  /** One line used on cards. */
  summary: string
  /** "Property highlights" paragraphs on the project page. */
  highlights: string[]
  awards?: { label: string; href?: string }[]
  /** Press and features (e.g. magazine articles). */
  features?: { label: string; href: string }[]
  testimonial?: Testimonial
  /** Show in the home page "Selected works" reel. */
  featured?: boolean
  /** Explicit images; when empty the images registered for this slug in media.json are used. */
  images?: SiteImage[]
}

const projectList: Project[] = [
  {
    slug: "the-bridge-house",
    title: "The Bridge House",
    location: "Kinloch, Taupō",
    architect: "Fraser Cameron Architects",
    architectUrl: "https://www.frasercameron.co.nz/",
    size: "229 m²",
    summary: "A contemporary home stretching along an angular site above the Kinloch golf course.",
    highlights: [
      "Situated on an angular site overlooking the Jack Nicklaus Golf Course in Kinloch, this 229 m² contemporary home reflects the natural tones of the surrounding landscape and blends gracefully into the hillside. The house stretches the length of the site with each main room angled from the next, creating a slightly different outlook wherever you are, continuously taking advantage of breath-taking views of Lake Taupō and the golf course below.",
      "Extensive use of low maintenance Colorsteel cladding grounds the building and cedar clad walls merge into the landscape, giving a bold form with a natural softness. The extended eaves and automatically controlled clerestory windows help to ventilate the home and control the solar gain in summer, while the polished concrete floors release the natural warmth in winter. The house also features a Maxraft fully insulated concrete slab, hydronic underfloor heating and electric fires for ambience.",
      "The entry door is concealed behind cedar battens to provide a level of privacy and focus. As you enter the home you are greeted immediately by an expansive view through large sliding doors to the golf course on the other side. Exterior materials are brought inwards with large dark sliding doors separating bedrooms from living areas and are contrasted by soft cedar interior walls. Discreet LED strip lighting is used extensively throughout the home with lapped plywood ceilings concealing the lighting within the laps.",
      "The master bedroom, located on the southern end of the property, captures views of the Western Bays of Lake Taupō. As you transition through the house to the living and dining areas, expansive windows take in the evolving view and soak in the seasonal changes of the golf course and Kinloch beyond.",
      "Once again, the landscape’s natural hues are featured throughout the centrally located kitchen. The hub of the house has a discreet scullery accessed via a hidden door panel and metal lockers form part of the kitchen which add a playful yet practical aspect as a bespoke gin and whisky bar.",
      "A relaxed media room spills out onto the adjoining deck areas and leads down to the kids bedrooms at the rear of the house.",
      "The upper level is comprised of a self-contained studio apartment which is accessed by guests via a street level bridge. The cedar batten bridge carries through cedar features from the main entrance and creates a continuity of style. With room for four, this space offers a comfortable living area, bespoke built in bunk beds, kitchenette and upper deck area that complement the main house perfectly.",
    ],
    awards: [{ label: "Gold Award — House of the Year 2023" }, { label: "Regional Category Winner — House of the Year 2023" }],
    testimonial: {
      paragraphs: [
        "As a couple new to building, we had been warned of the stress and trials that building a home would bring into our lives. We are over the moon to report that this couldn’t be further from the truth!",
        "Calm, controlled and considered are just a few of the words we would use to describe Simon. His attention to detail is second to none, and the quality of workmanship is reflected in every aspect of this house.",
        "Our building journey was positive from the outset; Simon, Kylie and our building team truly valued us, and our quirky ideas. It was apparent how invested they were in our build when we requested things such as custom bunks, and we would come on site to see drawings on scrap bits of wood, exploring how they were going to take our ideas and make them even better!",
        "Our friend, who is a quality builder himself, summed it up perfectly when he said, “You can feel the care in every inch of this build.”",
        "Our heartfelt thanks for building us a truly beautiful home.",
      ],
      pull: "Calm, controlled and considered are just a few of the words we would use to describe Simon.",
      author: "Kate & Callum Findlay",
    },
    featured: true,
  },
  {
    slug: "whareroa-hideaway",
    title: "Whareroa Hideaway",
    location: "Whareroa, Lake Taupō",
    architect: "Bossley Architects",
    architectUrl: "https://www.bossleyarchitects.co.nz/project/whareroa/",
    summary: "A family retreat under a living roof, tucked into a valley at the south-western end of the lake.",
    highlights: [
      "A family retreat tucked into the head of a valley at the south western end of Lake Taupō, Whareroa is a home away from home for a busy family – and at times a meeting place for extended family and friends to gather, fish and enjoy a slower pace of life. The building is tucked into the hillside, neatly mimicking the angles and orientation of the site's shape. It opens out to the north, to the native forest to the west, and offers bright flashes of Lake Taupō to the east.",
      "The clients wanted a warm house, both in atmosphere and appearance. Timber linings wrap around curving walls to the interior, and the fireplaces wash the walls with a warm glow in the evenings.",
      "Clever “light stalk” skylights (which function much like a periscope) penetrate a living roof and reflect natural light down into the home. At night, they offer the reverse effect, washing light from the rooms below up onto the living roof, illuminating the beautiful native grasses and sedges. The living roof also provides an attractive elevation for passers by on the track traversing the bush behind the site.",
      "With its low, flat profile, curved internal wall, aluminium features, and living roof with periscopic skylights, the house is a curious, sculptural piece of architecture — but the experience is pure bach.",
      "The three bedrooms (main, guest and bunks) are cocooned at the back of the home, allocating the living, kitchen and dining areas to the sun-drenched front. Appropriately, most of the family's time here is spent outdoors, so the façade's glazed sliders bank together, allowing free flow out to the typically versatile front lawn/cricket pitch/boat park/campground.",
      "The kitchen feeds through to the sheltered concrete-block fireplace on the eastern side “where it all happens.” “They live around it, eat around it — I've even had photos of them sitting around it in the middle of winter,” says the home's architect, Finn Scott.",
      "It’s a sophisticated home, but not precious, and capable of giving the furniture, corrugate cladding, polished concrete floors, and built-in plywood their part, all flowing together to create a harmonious whole. The curved wall separating the dining and living room, for instance, softens the corner in that high traffic area while making space for a pleasingly curved shower on the inside.",
      "Undoubtedly, the building's identity is defined by the living roof. A walking track weaves through the bush behind the property, looking down onto the home. A rooftop garden simplifies the roof profile. Here, any rainwater not absorbed by the planting flows to a rear external gutter, avoiding the complexities of internal gutters and downpipes making ‘simple’ work pretty hard. The planted surface softens the boundary between the building and nature, allowing the home to dissolve back into the bush.",
      "Sprouting up through that tufted greenery are the aptly named “light stalks” — a Bossley Architects innovation. Glazed across the top and down one side, the skylight substitutes are positioned to serve the darker corners of the home. They impart massive personality to the place, funnelling light in during the day and out at night.",
    ],
    awards: [
      { label: "Te Kāhui Whaihanga NZIA Waikato Bay of Plenty Architecture Award 2024", href: "https://www.nzia.co.nz/awards/local/award-detail/11630" },
      { label: "Designers Institute of New Zealand Best Design Awards 2024", href: "https://bestawards.co.nz/spatial/residential/bossley-architects-1/whareroa/" },
      { label: "This Is Here Shortlist 2024", href: "https://www.thisishere.nz/here-and-now/here-awards-shortlist-2024" },
    ],
    features: [
      { label: "HERE magazine feature", href: "https://www.thisishere.nz/here-and-now/light-box" },
      // These two PDFs are hosted on the old website — copy them into public/press/ before switching it off.
      { label: "HERE magazine case study (PDF)", href: "https://www.beechtreebuilding.co.nz/s/Here-32-_Whareroa.pdf" },
      { label: "HERE magazine story (PDF)", href: "https://www.beechtreebuilding.co.nz/s/Here-28_Whareroa.pdf" },
    ],
    featured: true,
  },
  {
    slug: "kinloch-retreat",
    title: "Kinloch Retreat",
    location: "Kinloch, Taupō",
    architect: "Design Group Stapleton Elliott",
    architectUrl: "https://www.designgroupstapletonelliott.co.nz/",
    summary: "Two forms around a central courtyard — a two-storey box and an angled pavilion facing the lake.",
    highlights: [
      "The site is located on a flat elevated building platform surrounded by steep berms, the Otaketake Stream Scenic Reserve, and Lake Taupō. The project respects its lakeside location, integrating the built form into a unique ecosystem and topography.",
      "The main house is made up of two forms, a two-storey box housing the living, bedroom and bathroom spaces and a one-storey kitchen / dining pavilion which angles to celebrate Lake Taupō views. Materials include “Abodo” vertical charred weatherboard to the exterior which have been selected for durability in a lakeside and volcanic environment, while natural cedar and hemlock panelling to the interior create a sense of refuge from the sometimes harsh, climatic conditions.",
      "The plan is organised around a central outdoor courtyard space, which acts as the social hub of the retreat. Living spaces, with views to the lake beyond, radiate around this courtyard.",
    ],
    testimonial: {
      paragraphs: [
        "Simon and his team at Beechtree Builders are the quintessential kiwi builders that we all wish for: honest, reliable and highly skilled. These characteristics (which we are very happy to personally vouch for) leaves us in no doubt as to why Simon and his team are repeatedly recognised by the building industry (including numerous awards) as outstanding in their field.",
        "Although, we could be biased: Beechtree delivered for us a final result that we are absolutely thrilled with. The attention to detail is superb. The standard of finish is exceptional. The management of the build process was without fault. And it is not just us who think so – we continue to receive numerous compliments about our holiday home (and we have no hesitation in crediting the Beechtree team for their excellent work).",
        "Ably led by Simon, the team made our first foray into building an easy and rewarding one. Even though Auckland’s COVID lockdowns meant we were not able to be on-site as much as we hoped, we really appreciated the regular project and photo updates from Simon and his team which kept us up-to-date and well informed of progress. We were also genuinely appreciative of Simon’s availability to show us through the building site, often at times that accommodated our travelling schedule.",
        "We were warned by our architect that building to a bespoke design would not be without its fair share of building challenges - but even so, and to Beechtree’s credit, these were few and far between.",
        "We particularly appreciated the team’s problem solving approach. This generally involved a quick, candid and honest assessment of the issue at hand, which was then closely followed up by supplying us with a range of solutions and options, each carefully considered in terms of the architectural intent and their financial and timing impact on the project. We credit Simon and his team’s genuine integrity and their open and transparent communication style with ensuring the few issues that arose were solved favourably and efficiently.",
        "Again, reiterating the high standard that Simon and his team are held in by the building industry itself, we were also very pleased to hear that our Architects are also very complimentary of Simon and his team – especially as they had not previously worked together. We are confident that their positive relationship added to the success of the project.",
        "We could not recommend Beechtree more highly. We again thank Simon and his team for their dedication and hard work to bring our dream holiday house to life. We are beyond satisfied with the results and look forward to enjoying many memorable moments, not just for our generation, but also for our kids’ generation in the years to come.",
      ],
      pull: "The attention to detail is superb. The standard of finish is exceptional. The management of the build process was without fault.",
      author: "Mark & Karen Allen",
    },
    featured: true,
  },
  {
    slug: "oak-leaf-abode",
    title: "Oak Leaf Abode",
    location: "Kinloch, Taupō",
    architect: "Fraser Cameron Architects",
    architectUrl: "https://www.frasercameron.co.nz/",
    size: "275 m²",
    summary: "Stepping down an elevated site with long views down the lake to Tongariro National Park.",
    highlights: [
      "Situated on an elevated site overlooking the stunning Kinloch bay this 275 m² home elegantly steps down the sloping site with long views down Lake Taupō towards the Tongariro National Park.",
      "The house is designed on an East/West axis to maximise the southerly views and maintain the sheltered outdoor living on the sunny Northerly side.",
      "Clad with enduring materials, the dark “Vulcan” aluminium weatherboard with vertical lines contrast sharply with the horizontal cedar shiplap cladding and bespoke window detailing.",
      "The home features a fully insulated and heated concrete floor. The hydronic underfloor heating and HWC are heated via an efficient air-water heat pump while the polished concrete floors throughout create thermal mass. R4 wall insulation and R7 ceiling insulation as well as XPS insulated external wall junctions and steel beams prevent thermal bridging to retain warmth inside the home.",
      "Ventilation is via clerestory windows running the length of the home, digitally controlled with a rain sensor along with extract fans to bathrooms with remote mounted motors in soffit locations to keep noise down.",
      "This home includes extensive LED strip lighting cleverly concealed within timber pelmets with special scenes for living, dining, kitchen and hallway areas controlled via “Casambi”, a wireless lighting control with a digital LCD interface.",
      "The kitchen, living and master bedroom look south down the lake, whilst also having warm, sheltered outdoor spaces on the north side. The guest bedrooms can be separated from the rest of the house via a large sliding hemlock door while the extended family is away.",
      "The interior cleverly hides secret doors within the hemlock timber wall panelling. Matching ceilings extend through the elevated entry, hallway and living area, with smart use of clerestory windows for natural ventilation control. The kitchen area blends seamlessly with these timber linings and paired with the polished concrete floor give an elegant natural feel that blends with the exterior to create a warm, clean, modern home with a timeless design.",
    ],
    awards: [{ label: "Gold Award — House of the Year 2025" }],
    testimonial: {
      paragraphs: [
        "We were incredibly impressed throughout our build with Simon, Kylie and the Beechtree team from the initial meeting with Simon to the handover.",
        "The meticulous craftsmanship, precision and attention to detail ensured we have an exceptionally high quality home that has exceeded our expectations and functions in the way we had always envisaged.",
        "Communication with the team was excellent, keeping us informed at all times. We were always welcome on site and felt as though we could voice any concerns and they would be dealt with professionally and promptly.",
        "Simon carefully managed the different phases of our build coordinating the many contractors involved which ensured minimal delays and the project to run on time.",
        "This was our first build and we were guided and supported through every stage ensuring that everything went extremely smoothly.",
        "If we ever build again we would definitely want Beechtree with Simon, Kylie and their team to undertake our project as our experience has been positive and rewarding in so many ways.",
      ],
      pull: "The meticulous craftsmanship, precision and attention to detail ensured we have an exceptionally high quality home that has exceeded our expectations and functions in the way we had always envisaged.",
      author: "Glenda & Tim Sullivan",
    },
    featured: true,
  },
  {
    slug: "curved-by-the-course",
    title: "Curved by the Course",
    location: "Kinloch, Taupō",
    architect: "Ink Architecture",
    architectUrl: "https://inkarc.co.nz/",
    summary: "A dual-level holiday home of complex curves, looking west over the golf course.",
    highlights: [
      "Situated on a compact yet elevated site on the Eastern side of Kinloch, Lake Taupō this dual level home has a Westerly aspect with views out over the Jack Nicklaus International Golf course to the Western bays and beyond.",
      "The home consists of two levels and a separate eastern wing for guests with their own private entrance located down a breezeway featuring a unique Bluestone “crazy paving”. The ground floor of the main house consists of a kids bedroom, rumpus room, bathroom, powder room, double garage and main entry.",
      "The entrance greets you with a large metallic copper entrance door inviting you up the light filled steel and White Oak staircase, with the option to use the 4 person lift off to the side. The upper level has the master bedroom, ensuite and walk in wardrobe to the North with expansive views of the golf course, even from the bathroom.",
      "The main living area and kitchen form the core of the house featuring a soft colour palette and cosy area beside the floating fireplace for a good book. A sheltered outdoor living and deck area are accessed via the bi-parting corner doors providing a great place to entertain or relax. Custom slotted sliding screens close off the outdoor area and can also slide across the windows on the west to help control the warm summer sun.",
      "With low maintenance in mind the home is architecturally clad in Colorsteel tray cladding in a “Bone White” colour with a contrasting “Thunder Grey” tray roofing of the same profile featuring several large round skylights. The large curved deck areas consist of a composite decking material for low maintenance and longevity and a custom curved balustrade. Blonded cedar panelling has been used on the soffits cleverly wrapping around the curves of the building while aluminium battens in a “White Oak” finish wrap around the lower kayak storage area and curved gate as well as the upper bedroom area, cleverly highlighted with LED strip lighting at night.",
      "With uncompromising views and low maintenance in mind, this home is the perfect balance and an ideal retreat for an avid golfer.",
    ],
    testimonial: {
      paragraphs: [
        "After researching builders in the Taupo area, we couldn’t be happier with our choice to engage Simon and his team to craft our dream holiday home in Kinloch.",
        "Our home is architecturally designed utilising various materials with a number of complex curves and angles, and boy did Beechtree Builders deliver with expert craftsmanship. Simon is very organised, awesome to deal with and so calm for a Builder! His team are a great bunch too. Thanks Beechtree.",
      ],
      pull: "Our home is architecturally designed utilising various materials with a number of complex curves and angles, and boy did Beechtree Builders deliver with expert craftsmanship.",
      author: "Sheree Hart",
    },
    featured: true,
  },
  {
    slug: "hawk-ridge",
    title: "Hawk Ridge",
    location: "Whakaipo Valley, Taupō",
    architect: "Jackie Robinson Architecture",
    architectUrl: "https://jackierobinson.co.nz/",
    summary: "A ridgeline residence with 360° views of Lake Taupō and the countryside.",
    highlights: [
      "Located on a high ridgeline overlooking the Whakaipo Valley, the Hawk Ridge residence offers stunning 360 degree views of Lake Taupō and the surrounding countryside.",
      "Vertical cedar shiplap and standing seam metal cladding create a bold contrast on the exterior of the building. The boardwalk entryway welcomes guests with a clear louvred roof and stone water feature. Natural stone and cedar cladding carry through into the lobby and cedar feature battens & lining bring warmth to the interior. Expansive views are highlighted from the living area and separate family room.",
      "The foundation of this stately home incorporates a Maxraft insulated floor system. Combining this with the hydronic underfloor heating and a large gas fire for ambience in the living area creates a toasty warm home.",
      "Extensive decks and a sheltered, poolside entertaining nook provide multiple areas to take in the vistas and enjoy the outdoors in any weather.",
    ],
    testimonial: {
      paragraphs: [
        "We would like to thank Simon and his team at Beechtree Building for the completion of our magnificent dream home.",
        "During the course of construction we were continually amazed how professional and passionate Simon was to deliver us a beautiful home.",
        "We have no hesitation to recommend and share our happy experience with Beechtree Building.",
      ],
      pull: "During the course of construction we were continually amazed how professional and passionate Simon was to deliver us a beautiful home.",
      author: "D & A Collins",
    },
    featured: true,
  },
  {
    slug: "wild-at-heart",
    title: "Wild at Heart",
    location: "Lake Taupō",
    architect: "Jackie Robinson Architecture",
    architectUrl: "https://jackierobinson.co.nz/",
    size: "270 m²",
    summary: "A character-filled home of stone, timber and polished concrete, inspired by the great outdoors.",
    highlights: [
      "The client’s passion for the great outdoors was the inspiration for the design of this character-filled house. Natural stone, timber and polished concrete used in the home’s exterior flow through the grand entrance, and can be found dotted around the interior.",
      "Hand-crafted cedar elements are positioned to ensure continuity of design, while custom cedar light fixtures add a touch of warmth. The streamlined black kitchen is designed to catch the eye – clerestory windows bathe the area in light and reflect the colours found in the titanium gold natural granite bench top.",
      "The striking 270 m² house sits on an exposed east-west axis, positioned to make the most of views of Lake Taupō and its surrounds. Triple-glazed timber joinery maintains the inside temperature while showcasing the scenery.",
      "Solar panels help to power ventilation and ducted heating and a rainwater collection system with 25,000 l tank and UV filtration system supplies the home and garden with water year round. Outside you’ll find a fire with polished concrete floating hearth, and a LouvreTec roof system for shelter.",
    ],
    testimonial: {
      paragraphs: [
        "Before starting our house build we approached a quality joiner in town who we knew well and trusted.",
        "We asked him to recommend a builder to us. He told us there is only one builder he works with that gives him a square corner and a straight wall every time.",
        "He then handed us the contact details for Beechtree Building Ltd. After a couple of meetings with Simon and viewing some of his work the decision to choose Beechtree Building was easy.",
        "One thing that really stands out about Simon is that he never gets flustered or bothered when things are not going smoothly. In fact, he is the most honest and even tempered person that we have had the privilege of meeting.",
        "These attributes combined with his unrelenting attention to detail mean that the building process was an absolute pleasure for us and the end result exceeds our wildest expectations.",
        "Simon, Kylie and the Beechtree team get a double thumbs up and a 5 star rating from us.",
      ],
      pull: "He told us there is only one builder he works with that gives him a square corner and a straight wall every time.",
      // VERIFY: the current site spells this "Denis" on the testimonial and project pages and "Denise" on the home page.
      author: "Kelvin & Denis Martin",
    },
  },
  {
    slug: "the-boathouse",
    title: "The Boathouse",
    location: "Lake Terrace, Taupō",
    architect: "Hoogerbrug Architects",
    architectUrl: "https://www.hoogerbrugarchitects.nz/",
    summary: "Two gable ends with a classic Kiwi boathouse feel, right on the water’s edge.",
    highlights: [
      "Strolling along the water’s edge of Lake Taupō, you’ll spy two distinctive gable ends that reveal a home with a classic Kiwi boathouse feel.",
      "Time-honoured cedar board and batten cladding conspire with trough-style spouting to give a traditional look. Wide steps welcome guests onto the main outdoor living area where a kwila deck has built-in seating. It’s a beautiful spot to sit back with a cold one and watch the sun set after a long day fishing on the lake.",
      "Large stacking doors open to the kitchen-dining hub, equipped with commercial-grade appliances. Warm tile floors and plenty of natural lighting are welcome features of this space.",
      "Architectural beams on the main deck frame the picture-perfect view of Mt Ruapehu, Tongariro and Ngauruhoe. A second set of stacked doors lead to a sheltered rear deck while maintaining the unrestricted views of the lake and mountains.",
      "There’s also a geothermally heated cedar hot tub, which can be directly accessed from the rear bedrooms. The lake-facing master suite enjoys wonderful views and a luxury ensuite.",
    ],
    awards: [{ label: "House of the Year award" }],
    testimonial: {
      paragraphs: [
        "I decided to choose Simon Dumble of Beechtree Building to build my house on Lake Terrace and it was the best decision I had ever made.",
        "The build was right on the Lakefront with limited access & in a Geothermal area. The build required not only the difficult logistics of getting materials on site, but also getting such things as concrete trucks to negotiate a narrow access.",
        "Simon was simply amazing at procuring materials & delivering on site, as well as organising sub-contractors etc so that there were no delays. The quality of the build was excellent. Simon was able to add value to the gifted architect, dealing with a sometimes-contrary owner under pressure.",
        "The result was delivered on time & received a well-deserved House of the Year award. Since being finished, there have been so many flattering comments as to the build. I am so pleased I made that first decision to choose Simon Dumble as my builder.",
      ],
      pull: "The quality of the build was excellent.",
      author: "Steve Bignell",
    },
  },
  {
    slug: "clad-to-meet-you",
    title: "Clad to Meet You",
    location: "Two Mile Bay, Taupō",
    architect: "MnM Design",
    architectUrl: "https://www.mnmdesign.co.nz/",
    size: "153 m²",
    summary: "Warming timber and bold blue — a sweet family home on the site of an old bach.",
    highlights: [
      "Packed with personality and modern comforts, this sweet family home at Two Mile Bay isn’t afraid to show its true colours. A striking combination of warming timber and bold blue makes a happy first impression. Cantilevered cedar raises the bar to provide an intriguing sheltered entrance.",
      "With three bedrooms, two bathrooms, a garage loft and a spacious living/dining/kitchen area, this little beauty packs a lot into 153 m². Designed for comfort and relaxation, the open-plan zone features a well appointed kitchen with striking hibiscus splashback.",
      "This space serves indoor and outdoor living with ease. A pair of sliding doors opens to reveal a cosy alfresco dining deck. There’s a second deck off the master bedroom. Established hedging provides privacy.",
      "Back inside, a wood-burner creates a warming focal point on cold nights. A study nook nestled into the living area takes care of business. Slab insulation and double glazing work hard too, keeping the warmth in.",
      "The whitewashed plywood-lined garage leads to a spacious upper storage loft – the perfect teen hideout.",
    ],
    awards: [{ label: "Gold Award — House of the Year 2018" }],
    testimonial: {
      paragraphs: [
        "I had an old bach dismantled and a new house built on the existing site with Beechtree Building Ltd undertaking the project.",
        "I have never undertaken any sort of build project before and I couldn’t believe how easy and enjoyable Simon and his team at Beechtree Building made the whole process.",
        "They are so professional, well organised with workmanship of an exceptional and meticulous standard. This was reflected in their well-deserved Gold Medal in the Master Builders HOY Award in 2018.",
        "I cannot recommend them highly enough. If you are fortunate to have Beechtree Building undertaking your project, I say be guided by their expertise and trust their suggestions.",
      ],
      pull: "I have never undertaken any sort of build project before and I couldn’t believe how easy and enjoyable Simon and his team at Beechtree Building made the whole process.",
      author: "Christine Nash",
    },
  },
]

/** Projects with their images resolved (explicit images win over registered ones). */
export const projects = projectList.map((project) => ({
  ...project,
  images: project.images?.length ? project.images : pageImages(project.slug),
}))

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
