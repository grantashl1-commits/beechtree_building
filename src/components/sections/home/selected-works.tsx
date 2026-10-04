import { ArrowRight } from "lucide-react"
import { useRef } from "react"
import { Picture } from "@/components/media/picture"
import { TransitionLink } from "@/components/providers/page-transition"
import { featuredProjects, projects } from "@/content/projects"
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

/**
 * Pinned horizontal reel on desktop (vertical scroll drives sideways travel,
 * with parallax inside each frame). On touch/small screens it's a native
 * swipeable scroll-snap row.
 */
export function SelectedWorks() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const el = track.current!
        const distance = () => el.scrollWidth - window.innerWidth
        const travel = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        gsap.utils.toArray<HTMLElement>("[data-work-img]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: img, containerAnimation: travel, start: "left right", end: "right left", scrub: true },
            },
          )
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative overflow-hidden bg-ink text-limestone lg:h-[100svh]">
      <div className="flex h-full flex-col justify-center py-20 lg:py-0">
        <div className="container-site mb-10 flex items-end justify-between gap-6 lg:mb-12">
          <div>
            <p className="eyebrow text-brass">(04) — Selected works</p>
            <h2 className="display mt-4 text-[clamp(2.75rem,6vw,6rem)]">
              Homes we're <span className="italic">proud</span> of.
            </h2>
          </div>
          <p className="eyebrow hidden text-limestone/50 md:block">
            ({String(projects.length).padStart(2, "0")}) projects · drag or scroll →
          </p>
        </div>

        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8 lg:w-max lg:snap-none lg:overflow-visible lg:px-12 lg:pb-0"
        >
          {featuredProjects.map((p, i) => (
            <TransitionLink
              key={p.slug}
              to={`/projects/${p.slug}`}
              transitionLabel={p.title}
              data-cursor="View"
              className={cn("group w-[80vw] shrink-0 snap-start sm:w-[55vw] lg:w-[38vw]", i % 2 === 1 && "lg:mt-16")}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:aspect-[5/4]">
                <div data-work-img className="absolute inset-[-10%]">
                  <Picture
                    image={p.images[0]}
                    label={p.title}
                    sizes="(min-width: 1024px) 40vw, 80vw"
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                </div>
                {p.awards?.[0] && (
                  <span className="eyebrow absolute top-4 left-4 rounded-full bg-ink/70 px-3 py-1.5 text-[0.6rem] text-brass backdrop-blur">
                    Award winner
                  </span>
                )}
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="display text-3xl md:text-4xl">{p.title}</h3>
                  <p className="mt-2 text-sm text-limestone/60">
                    {p.location}
                    {p.architect && ` · ${p.architect}`}
                  </p>
                </div>
                <span className="eyebrow pt-2 text-limestone/40">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </TransitionLink>
          ))}

          <TransitionLink
            to="/projects"
            transitionLabel="Projects"
            className="group flex w-[70vw] shrink-0 snap-start flex-col justify-center gap-6 border border-white/10 p-10 sm:w-[40vw] lg:w-[26vw]"
          >
            <span className="display text-5xl leading-none md:text-6xl">
              All
              <br />
              projects
            </span>
            <span className="inline-flex size-16 items-center justify-center rounded-full border border-white/20 transition-colors duration-500 group-hover:bg-brass group-hover:text-ink">
              <ArrowRight className="size-6" />
            </span>
          </TransitionLink>
        </div>
      </div>
    </section>
  )
}
