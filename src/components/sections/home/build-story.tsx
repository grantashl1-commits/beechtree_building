import { useRef } from "react"
import { buildStory } from "@/content/site"
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap"

/*
 * "From blueprint to home" — the scroll-told centrepiece.
 *
 * The section pins while a single scrubbed timeline builds a lakeside house in
 * six chapters (site → design → foundations → framing → closing in → handover).
 * The markup's default state IS the finished, dusk-lit house, so with reduced
 * motion (or no JS) visitors simply see the final scene and all six chapters.
 */

const FLOOR = 556
const NIGHT_TINT = 0.72
const TALL = { x: 360, w: 260, top: 296 }
const PAV = { x: 620, w: 340 }
/** Underside of the pavilion's skillion roof at a given x. */
const roofAt = (x: number) => 410 - ((x - 620) * 40) / 390

const tallStuds = Array.from({ length: 11 }, (_, i) => TALL.x + i * 26)
const pavStuds = Array.from({ length: 10 }, (_, i) => PAV.x + 34 + i * 34)
const pavMullions = [706, 762, 818, 874]
const stars = Array.from({ length: 34 }, (_, i) => ({
  x: (i * 211.7) % 1200,
  y: 20 + ((i * 97.3) % 200),
  r: i % 5 === 0 ? 1.6 : 0.9,
}))

export function BuildStory() {
  const root = useRef<HTMLElement>(null)
  const chapters = buildStory.chapters

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root)
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 0.6 },
          scrollTrigger: {
            trigger: q("[data-bs-pin]")[0],
            start: "top top",
            end: () => `+=${window.innerHeight * (window.innerWidth < 768 ? 4.5 : 6)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Start of story: daylight, empty site, first chapter showing.
        // (Set outside the timeline — zero-length sets at t=0 get reverted when a scrubbed trigger refreshes.)
        gsap.set(q("[data-bs-dusk], [data-bs-night], [data-bs-glow], [data-bs-stars], [data-bs-moon]"), { opacity: 0 })
        gsap.set(q("[data-bs-ui]"), { color: "#171513" })
        gsap.set(q("[data-bs-chapter]"), { opacity: 0, y: 40 })
        gsap.set(q("[data-bs-chapter='0']"), { opacity: 1, y: 0 })
        gsap.set(q("[data-bs-num]"), { opacity: 0.25 })
        gsap.set(q("[data-bs-num='0']"), { opacity: 1 })
        gsap.set(q("[data-bs-sun]"), { opacity: 1 })

        const chapter = (i: number, at: number) => {
          tl.to(q(`[data-bs-chapter='${i - 1}']`), { opacity: 0, y: -40, duration: 0.3 }, at)
            .fromTo(q(`[data-bs-chapter='${i}']`), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, at + 0.15)
            .to(q(`[data-bs-num='${i - 1}']`), { opacity: 0.25, duration: 0.2 }, at)
            .to(q(`[data-bs-num='${i}']`), { opacity: 1, duration: 0.2 }, at)
        }

        // 01 — The site: survey the land, the lake, the mountains
        tl.from(q("[data-bs-ground]"), { drawSVG: 0, duration: 0.8 }, 0.05)
          .from(q("[data-bs-mountains]"), { drawSVG: "50% 50%", fillOpacity: 0, duration: 0.9 }, 0.1)
          .from(q("[data-bs-lake]"), { opacity: 0, duration: 0.6 }, 0.2)
          .from(q("[data-bs-ripple]"), { drawSVG: "50% 50%", stagger: 0.04, duration: 0.4 }, 0.3)
          .to(q("[data-bs-contour]"), { opacity: 1, stagger: 0.08, duration: 0.3 }, 0.3)
          .from(q("[data-bs-peg]"), { scaleY: 0, transformOrigin: "50% 100%", stagger: 0.1, duration: 0.3 }, 0.5)
          .to(q("[data-bs-note='0']"), { opacity: 1, duration: 0.3 }, 0.55)

        // 02 — Design & pricing: grid, dimensions and the drawn outline
        chapter(1, 1)
        tl.to(q("[data-bs-grid]"), { opacity: 1, duration: 0.5 }, 1.05)
          .to(q("[data-bs-note='0'], [data-bs-contour]"), { opacity: 0, duration: 0.3 }, 1.05)
          .to(q("[data-bs-plan]"), { opacity: 1, duration: 0.01 }, 1.1)
          .from(q("[data-bs-plan] > *"), { drawSVG: 0, stagger: 0.08, duration: 0.6 }, 1.1)
          .to(q("[data-bs-dims]"), { opacity: 1, duration: 0.4 }, 1.4)

        // 03 — Foundations: the slab is poured
        chapter(2, 2)
        tl.from(q("[data-bs-slab]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.6 }, 2.1)
          .to(q("[data-bs-note='2']"), { opacity: 1, duration: 0.3 }, 2.4)

        // 04 — Framing: studs, plates and braces go up
        chapter(3, 3)
        tl.to(q("[data-bs-note='2']"), { opacity: 0, duration: 0.2 }, 3.0)
          .from(q("[data-bs-stud]"), { scaleY: 0, transformOrigin: "50% 100%", stagger: 0.025, duration: 0.35 }, 3.05)
          .from(q("[data-bs-plate]"), { drawSVG: 0, stagger: 0.05, duration: 0.4 }, 3.3)
          .from(q("[data-bs-brace]"), { drawSVG: 0, stagger: 0.05, duration: 0.3 }, 3.5)
          .to(q("[data-bs-note='3']"), { opacity: 1, duration: 0.3 }, 3.5)

        // 05 — Closing in: cladding, roof and glass
        chapter(4, 4)
        tl.to(q("[data-bs-note='3'], [data-bs-dims], [data-bs-plan]"), { opacity: 0, duration: 0.3 }, 4.0)
          .from(q("[data-bs-clad]"), { scaleY: 0, transformOrigin: "50% 100%", stagger: 0.15, duration: 0.6 }, 4.05)
          .from(q("[data-bs-roof]"), { opacity: 0, y: -30, stagger: 0.1, duration: 0.4 }, 4.35)
          .from(q("[data-bs-glass]"), { opacity: 0, stagger: 0.04, duration: 0.3 }, 4.5)
          .to(q("[data-bs-grid]"), { opacity: 0, duration: 0.4 }, 4.5)
          .to(q("[data-bs-note='4']"), { opacity: 1, duration: 0.3 }, 4.6)

        // 06 — Handover: landscape grows, dusk falls, the lights come on
        chapter(5, 5)
        tl.to(q("[data-bs-note='4']"), { opacity: 0, duration: 0.2 }, 5.0)
          .from(q("[data-bs-landscape] > *"), { scale: 0, transformOrigin: "50% 100%", stagger: 0.06, duration: 0.4 }, 5.0)
          .to(q("[data-bs-sun]"), { opacity: 0, y: 120, duration: 0.6 }, 5.0)
          .to(q("[data-bs-dusk]"), { opacity: 1, duration: 0.6 }, 5.1)
          .to(q("[data-bs-night]"), { opacity: NIGHT_TINT, duration: 0.6 }, 5.1)
          .to(q("[data-bs-ui]"), { color: "#f2eee7", duration: 0.4 }, 5.2)
          .to(q("[data-bs-glow]"), { opacity: 1, stagger: 0.05, duration: 0.4 }, 5.45)
          .to(q("[data-bs-stars]"), { opacity: 1, duration: 0.4 }, 5.6)
          .to(q("[data-bs-moon]"), { opacity: 1, duration: 0.4 }, 5.6)
          .to({}, { duration: 0.3 }) // a beat to linger on the finished home

        tl.fromTo(q("[data-bs-progress]"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: tl.duration() }, 0)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="build-story-title" className="relative bg-ink">
      <div data-bs-pin className="relative overflow-hidden motion-safe:h-[100svh]">
        {/* Sky: daylight limestone, cross-fading to dusk */}
        <div className="absolute inset-0 bg-limestone" />
        <div
          data-bs-dusk
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #0c1115 0%, #18232b 40%, #2f3e46 68%, #6f5642 100%)" }}
        />

        <div
          data-bs-ui
          className="container-site relative grid h-full grid-rows-[auto_1fr] gap-6 pt-24 pb-8 text-limestone motion-reduce:py-24 lg:grid-cols-12 lg:grid-rows-1 lg:gap-10"
        >
          {/* Narrative column */}
          <div className="flex flex-col gap-8 lg:col-span-4 lg:justify-between">
            <div>
              <p className="eyebrow opacity-70">(02) — {buildStory.eyebrow}</p>
              <h2 id="build-story-title" className="display mt-4 max-w-sm text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[1.05]">
                {buildStory.title}
              </h2>
            </div>

            <ol className="relative motion-safe:min-h-[190px] motion-safe:lg:min-h-[240px] motion-reduce:space-y-8">
              {chapters.map((c, i) => (
                <li key={c.label} data-bs-chapter={i} className="motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-0">
                  <p className="eyebrow flex items-center gap-3 opacity-70">
                    <span className="font-serif text-3xl tracking-normal normal-case not-italic">{String(i + 1).padStart(2, "0")}</span>
                    {c.label}
                  </p>
                  <h3 className="display mt-3 text-[clamp(1.9rem,3.2vw,3.25rem)] leading-[1]">{c.title}</h3>
                  <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed opacity-75">{c.body}</p>
                </li>
              ))}
            </ol>

            <div className="hidden motion-safe:block">
              <div className="flex justify-between font-mono text-[0.6875rem]">
                {chapters.map((c, i) => (
                  <span key={c.label} data-bs-num={i}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ))}
              </div>
              <div className="mt-3 h-px w-full bg-current/15">
                <div data-bs-progress className="h-px origin-left bg-beech" />
              </div>
            </div>
          </div>

          {/* Drawing */}
          <div className="relative flex items-center lg:col-span-8 motion-reduce:lg:sticky motion-reduce:lg:top-24 motion-reduce:lg:self-start">
            <div className="w-full [mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)]">
              <div className="[mask-image:linear-gradient(to_bottom,#000_72%,transparent)]">
                <HouseDrawing />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HouseDrawing() {
  const mono = { fontFamily: "JetBrains Mono Variable, monospace", fontSize: 11, letterSpacing: 1.5 }
  return (
    <svg
      viewBox="0 0 1200 760"
      className="h-auto w-full max-h-[70svh]"
      role="img"
      aria-label="An architectural drawing of a lakeside home being built in stages, finishing at dusk with its windows lit."
    >
      <defs>
        <pattern id="bs-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#171513" strokeOpacity="0.07" />
        </pattern>
        <pattern id="bs-boards-dark" width="9" height="10" patternUnits="userSpaceOnUse">
          <rect width="9" height="10" fill="#24211e" />
          <path d="M0.5 0V10" stroke="#3a3530" />
        </pattern>
        <pattern id="bs-boards-beech" width="11" height="10" patternUnits="userSpaceOnUse">
          <rect width="11" height="10" fill="#b4834f" />
          <path d="M0.5 0V10" stroke="#93653b" />
        </pattern>
        <pattern id="bs-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill="#cfc8bc" />
          <path d="M0 0V8" stroke="#9e968a" strokeWidth="1.4" />
        </pattern>
        <linearGradient id="bs-lake-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9dcd6" />
          <stop offset="1" stopColor="#e9e5dc" />
        </linearGradient>
        {/* Everything below the mountain ridge — the night tint darkens the land, not the sky */}
        <clipPath id="bs-land">
          <path d="M0 300 L80 288 L150 296 L230 262 L300 214 L338 200 L372 214 L430 252 L500 270 L560 250 L600 226 L630 238 L690 268 L780 280 L860 266 L940 282 L1040 276 L1120 290 L1200 284 L1200 760 L0 760 Z" />
        </clipPath>
        <filter id="bs-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      {/* Sun & sky */}
      <circle data-bs-sun cx="960" cy="150" r="46" fill="#a86b3c" opacity="0" />
      <g data-bs-stars>
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f2eee7" opacity={0.4 + (i % 3) * 0.2} />
        ))}
      </g>
      <circle data-bs-moon cx="1060" cy="110" r="16" fill="#f5e9d2" />

      {/* Tongariro on the horizon, Lake Taupō below */}
      <path
        data-bs-mountains
        d="M0 300 L80 288 L150 296 L230 262 L300 214 L338 200 L372 214 L430 252 L500 270 L560 250 L600 226 L630 238 L690 268 L780 280 L860 266 L940 282 L1040 276 L1120 290 L1200 284 L1200 330 L0 330 Z"
        fill="#d8d2c6"
        stroke="#6b655d"
        strokeWidth="1.2"
      />
      <rect data-bs-lake x="0" y="330" width="1200" height="240" fill="url(#bs-lake-day)" />
      <g stroke="#8c857c" strokeWidth="1" strokeLinecap="round">
        {[
          [60, 360, 180], [880, 352, 1010], [1040, 390, 1160], [120, 420, 210], [960, 440, 1050], [30, 470, 120], [1080, 500, 1170],
        ].map(([x1, y, x2]) => (
          <line key={`${x1}-${y}`} data-bs-ripple x1={x1} y1={y} x2={x2} y2={y} />
        ))}
      </g>

      {/* Site */}
      <path data-bs-ground-fill d="M0 600 C150 585 240 570 300 566 L1000 566 C1060 566 1120 572 1200 580 L1200 760 L0 760 Z" fill="#e4ddd1" />
      <path data-bs-ground d="M0 600 C150 585 240 570 300 566 L1000 566 C1060 566 1120 572 1200 580" fill="none" stroke="#171513" strokeWidth="1.6" />
      <g fill="none" stroke="#8c857c" strokeDasharray="6 7">
        <path data-bs-contour opacity="0" d="M0 640 C200 625 400 618 600 622 S1000 630 1200 640" />
        <path data-bs-contour opacity="0" d="M0 690 C220 676 420 668 620 672 S1010 682 1200 694" />
        <path data-bs-contour opacity="0" d="M0 735 C240 722 440 716 640 720 S1020 730 1200 742" />
      </g>
      <g data-bs-peg-group>
        {[330, 990].map((x) => (
          <g key={x} data-bs-peg>
            <line x1={x} y1={566} x2={x} y2={536} stroke="#171513" strokeWidth="1.6" />
            <path d={`M${x} 536 l16 5 -16 5 Z`} fill="#a86b3c" />
          </g>
        ))}
      </g>
      <text data-bs-note="0" opacity="0" x="330" y="612" fill="#6b655d" {...mono}>
        SITE SURVEY · RL 372.40 · LAKE TAUPŌ
      </text>

      {/* Design grid, dimensions, planning outline */}
      <rect data-bs-grid opacity="0" x="0" y="0" width="1200" height="760" fill="url(#bs-grid)" />
      <g data-bs-plan opacity="0" fill="none" stroke="#a86b3c" strokeWidth="1.4">
        <path d={`M${TALL.x} ${FLOOR} V${TALL.top} H${TALL.x + TALL.w} V${FLOOR}`} />
        <path d={`M${PAV.x} ${roofAt(620)} L1010 ${roofAt(1010)}`} />
        <path d={`M${PAV.x + PAV.w} ${FLOOR} V${roofAt(960)}`} />
        <path d={`M330 ${FLOOR} H990`} />
      </g>
      <g data-bs-dims opacity="0" stroke="#171513" strokeWidth="1" fill="#171513">
        <line x1="330" y1="640" x2="990" y2="640" />
        <line x1="330" y1="632" x2="330" y2="648" />
        <line x1="990" y1="632" x2="990" y2="648" />
        <text x="660" y="632" textAnchor="middle" stroke="none" {...mono}>
          14 400
        </text>
        <line x1="316" y1={TALL.top} x2="316" y2={FLOOR} />
        <line x1="308" y1={TALL.top} x2="324" y2={TALL.top} />
        <line x1="308" y1={FLOOR} x2="324" y2={FLOOR} />
        <text x="304" y="430" textAnchor="middle" stroke="none" transform="rotate(-90 304 430)" {...mono}>
          7 200
        </text>
      </g>

      {/* Foundations */}
      <rect data-bs-slab x="330" y={FLOOR} width="660" height="14" fill="url(#bs-hatch)" stroke="#171513" strokeWidth="1.2" />
      <text data-bs-note="2" opacity="0" x="330" y="600" fill="#6b655d" {...mono}>
        FFL ±0.000 · ENGINEERED SLAB
      </text>

      {/* Framing */}
      <g stroke="#9a6a3e" strokeWidth="2">
        {tallStuds.map((x) => (
          <line key={`t${x}`} data-bs-stud x1={x} y1={FLOOR} x2={x} y2={TALL.top} />
        ))}
        {pavStuds.map((x) => (
          <line key={`p${x}`} data-bs-stud x1={x} y1={FLOOR} x2={x} y2={roofAt(x)} />
        ))}
      </g>
      <g stroke="#7a5230" strokeWidth="3" fill="none">
        <line data-bs-plate x1={TALL.x} y1={TALL.top} x2={TALL.x + TALL.w} y2={TALL.top} />
        <line data-bs-plate x1={TALL.x} y1="426" x2={TALL.x + TALL.w} y2="426" />
        <line data-bs-plate x1={PAV.x} y1={roofAt(620)} x2="1010" y2={roofAt(1010)} />
        <line data-bs-brace x1={TALL.x} y1={FLOOR} x2="490" y2="426" />
        <line data-bs-brace x1="490" y1="426" x2={TALL.x + TALL.w} y2={TALL.top} />
        <line data-bs-brace x1={PAV.x} y1={FLOOR} x2="790" y2={roofAt(790)} />
      </g>
      <text data-bs-note="3" opacity="0" x="640" y="600" fill="#6b655d" {...mono}>
        90×45 SG8 STUDS @ 600 CRS
      </text>

      {/* Cladding & roof */}
      <rect data-bs-clad x={TALL.x} y={TALL.top} width={TALL.w} height={FLOOR - TALL.top} fill="url(#bs-boards-dark)" />
      <path
        data-bs-clad
        d={`M${PAV.x} ${FLOOR} V${roofAt(620)} L${PAV.x + PAV.w} ${roofAt(960)} V${FLOOR} Z`}
        fill="url(#bs-boards-beech)"
      />
      <rect data-bs-roof x={TALL.x - 10} y={TALL.top - 10} width={TALL.w + 20} height="10" fill="#171513" />
      <path data-bs-roof d={`M600 ${roofAt(600)} L1012 ${roofAt(1012)} V${roofAt(1012) - 14} L600 ${roofAt(600) - 14} Z`} fill="#171513" />

      {/* Glazing (pale by day) */}
      <g fill="#c7d0d1" stroke="#171513" strokeWidth="2">
        <rect data-bs-glass x="384" y="320" width="212" height="72" />
        <rect data-bs-glass x="384" y="456" width="56" height="100" />
        <rect data-bs-glass x="466" y="456" width="130" height="74" />
        <rect data-bs-glass x="650" y="430" width="280" height="118" />
      </g>
      <g data-bs-glass stroke="#171513" strokeWidth="2">
        <line x1="455" y1="320" x2="455" y2="392" />
        <line x1="525" y1="320" x2="525" y2="392" />
        {pavMullions.map((x) => (
          <line key={x} x1={x} y1="430" x2={x} y2="548" />
        ))}
      </g>
      <text data-bs-note="4" opacity="0" x="640" y="600" fill="#6b655d" {...mono}>
        CHARRED TIMBER · VERTICAL CEDAR · LONG-RUN ROOF
      </text>

      {/* Landscape & deck */}
      <g data-bs-landscape>
        <g fill="#3d4636">
          <circle cx="170" cy="528" r="38" />
          <circle cx="212" cy="506" r="46" />
          <circle cx="252" cy="534" r="32" />
          <circle cx="138" cy="552" r="24" />
        </g>
        <path d="M206 590 V520" stroke="#2a2724" strokeWidth="5" />
        <g stroke="#3d4636" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M1112 586 C1110 560 1106 530 1104 500" />
          <path d="M1104 500 l-22 -26 M1104 500 l-6 -32 M1104 500 l10 -30 M1104 500 l24 -20 M1104 500 l-28 -8 M1104 500 l28 -4" />
        </g>
        <rect x="960" y="548" width="150" height="8" fill="#a86b3c" />
        <path d="M440 556 h40 v8 h-40 Z M432 564 h56 v6 h-56 Z" fill="#8c857c" />
      </g>

      {/* Night tint over the scene, then the lights come on above it */}
      <rect
        data-bs-night
        x="0"
        y="0"
        width="1200"
        height="760"
        fill="#0b1014"
        opacity={NIGHT_TINT}
        clipPath="url(#bs-land)"
        style={{ mixBlendMode: "multiply" }}
      />
      <g data-bs-glow>
        <g filter="url(#bs-blur)" fill="#f5c27a" opacity="0.7">
          <rect x="384" y="320" width="212" height="72" />
          <rect x="466" y="456" width="130" height="74" />
          <rect x="650" y="430" width="280" height="118" />
          <rect x="620" y="548" width="420" height="30" />
        </g>
        <g fill="#f8d39a">
          <rect x="384" y="320" width="212" height="72" />
          <rect x="384" y="456" width="56" height="100" />
          <rect x="466" y="456" width="130" height="74" />
          <rect x="650" y="430" width="280" height="118" />
        </g>
        <g stroke="#171513" strokeWidth="2">
          <line x1="455" y1="320" x2="455" y2="392" />
          <line x1="525" y1="320" x2="525" y2="392" />
          {pavMullions.map((x) => (
            <line key={x} x1={x} y1="430" x2={x} y2="548" />
          ))}
        </g>
      </g>
    </svg>
  )
}
