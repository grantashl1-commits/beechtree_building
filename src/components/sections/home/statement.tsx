import { Fragment, useRef } from "react"
import { Picture } from "@/components/media/picture"
import { featuredProjects } from "@/content/projects"
import { homeIntro, statement } from "@/content/site"
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap"

/** Inline photo "pills" are dropped in after these word positions. */
const PILL_AFTER = [5, 22]

/** A big editorial statement whose words fill in with ink as you scroll through it. */
export function Statement() {
  const root = useRef<HTMLElement>(null)
  const words = statement.text.split(" ")

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        )
        gsap.from("[data-pill]", {
          width: 0,
          duration: 1.4,
          stagger: 0.2,
          scrollTrigger: { trigger: "[data-statement]", start: "top 75%", once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className="container-site py-28 md:py-44">
      <div className="grid gap-10 md:grid-cols-12">
        <p className="eyebrow text-beech-deep md:col-span-3">(01) — {homeIntro.title}</p>
        <div className="md:col-span-9">
          <div data-statement className="display text-[clamp(2rem,4.6vw,4.75rem)] leading-[1.04]">
            {words.map((word, i) => (
              <Fragment key={i}>
                <span data-word>{word}</span>{" "}
                {PILL_AFTER.includes(i) && (
                  <>
                    <span
                      data-pill
                      aria-hidden
                      className="relative inline-block h-[0.78em] w-[1.9em] translate-y-[0.08em] overflow-hidden rounded-full align-baseline"
                    >
                      <Picture
                        image={featuredProjects[PILL_AFTER.indexOf(i) + 1]?.images[0]}
                        label=""
                        sizes="160px"
                        className="absolute inset-0 h-full w-[1.9em]"
                      />
                    </span>{" "}
                  </>
                )}
              </Fragment>
            ))}
          </div>
          <p className="eyebrow mt-10 flex items-center gap-4 text-stone">
            <span className="h-px w-10 bg-stone/50" /> {statement.signature}, Beechtree Building
          </p>
        </div>
      </div>
    </section>
  )
}
