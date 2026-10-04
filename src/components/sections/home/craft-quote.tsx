import { useRef } from "react"
import { Picture } from "@/components/media/picture"
import { pageImage } from "@/content/media"
import { getProject } from "@/content/projects"
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap"

/**
 * Full-bleed photo with a slow parallax and the line every builder wants said about them —
 * told, verbatim, by the Wild at Heart clients about their joiner's advice.
 * Photo: public/images/home/02 (falls back to a craft detail, then Oak Leaf Abode).
 */
export function CraftQuote() {
  const root = useRef<HTMLElement>(null)
  const testimonial = getProject("wild-at-heart")?.testimonial
  const oakLeaf = getProject("oak-leaf-abode")
  const image = pageImage("home", 1) ?? pageImage("craft", 0) ?? oakLeaf?.images[1] ?? oakLeaf?.images[0]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-cq-img]",
          { yPercent: -12, scale: 1.15 },
          { yPercent: 12, scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        )
        gsap.from("[data-cq-line]", {
          yPercent: 110,
          duration: 1.4,
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 60%", once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative flex min-h-[110svh] items-center overflow-hidden bg-ink text-limestone">
      <div data-cq-img className="absolute inset-[-12%_0]">
        <Picture image={image} label="Beechtree craftsmanship" caption={false} className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-ink/55" />
      <figure className="container-site relative text-center">
        <p className="eyebrow mb-10 text-brass">(06) — The standard</p>
        <h2 className="display mx-auto max-w-6xl text-[clamp(2.5rem,7vw,7.5rem)] leading-[0.95]">
          {["A square corner", "and a straight wall,", "every time."].map((line, i) => (
            <span key={line} className="block overflow-clip pb-[0.06em]">
              <span data-cq-line className={i === 2 ? "block italic text-brass" : "block"}>
                {line}
              </span>
            </span>
          ))}
        </h2>
        {testimonial && (
          <>
            <blockquote className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-limestone/80">“{testimonial.pull}”</blockquote>
            <figcaption className="eyebrow mt-5 text-limestone/60">
              — {testimonial.author}, Wild at Heart, on their joiner’s advice
            </figcaption>
          </>
        )}
      </figure>
    </section>
  )
}
