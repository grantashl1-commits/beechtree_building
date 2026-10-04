import { ArrowDown, ArrowUpRight } from "lucide-react"
import { useRef } from "react"
import { Picture } from "@/components/media/picture"
import { useIntro } from "@/components/providers/intro"
import { TransitionLink } from "@/components/providers/page-transition"
import { Button } from "@/components/ui/button"
import { pageImage } from "@/content/media"
import { projects } from "@/content/projects"
import { company, hero } from "@/content/site"
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap"

export function Hero() {
  const { introDone } = useIntro()
  const root = useRef<HTMLElement>(null)
  const heroImage = pageImage("home", 0) ?? projects[0]?.images[0]

  useGSAP(
    () => {
      if (!introDone) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // Intro: photo settles, headline lines rise out of their masks
        gsap
          .timeline()
          .fromTo("[data-hero-media]", { scale: 1.25 }, { scale: 1, duration: 2.4, ease: "expo.out" })
          .from("[data-hero-line]", { yPercent: 110, duration: 1.4, stagger: 0.1, ease: "expo.out" }, 0.15)
          .from("[data-hero-fade]", { opacity: 0, y: 24, duration: 1.2, stagger: 0.08 }, 0.6)

        // Scroll: the photo pulls back into a framed picture as the page begins
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
          .fromTo(
            "[data-hero-frame]",
            { clipPath: "inset(0% 0% 0% 0% round 0px)" },
            { clipPath: "inset(10% 5% 6% 5% round 28px)", ease: "none" },
          )
          .to("[data-hero-copy]", { yPercent: -35, opacity: 0, ease: "none" }, 0)
      })
      return () => mm.revert()
    },
    { dependencies: [introDone], scope: root },
  )

  return (
    <section ref={root} className="relative h-[100svh] min-h-[640px] bg-limestone text-limestone">
      <div data-hero-frame className="absolute inset-0 overflow-hidden bg-ink">
        <div data-hero-media className="absolute inset-0">
          <Picture image={heroImage} label="The Bridge House" caption={false} priority className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/80" />
      </div>

      <div data-hero-copy className="container-site relative z-10 flex h-full flex-col justify-end pt-28 pb-8">
        <p data-hero-fade className="eyebrow mb-6 text-limestone/70">
          {hero.eyebrow}
        </p>
        <h1 className="display text-[clamp(3.1rem,9.2vw,10.5rem)]">
          {hero.lines.map((line, i) => (
            <span key={line} className="block overflow-clip pb-[0.06em]">
              <span data-hero-line className={i === hero.lines.length - 1 ? "block italic text-brass" : "block"}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid items-end gap-6 md:grid-cols-12">
          <p data-hero-fade className="max-w-md text-base leading-relaxed text-limestone/80 md:col-span-5 md:text-lg">
            {hero.intro}
          </p>
          <div data-hero-fade className="flex flex-wrap gap-3 md:col-span-7 md:justify-end">
            <Button asChild size="lg" className="h-12 rounded-full bg-limestone px-7 text-ink hover:bg-paper">
              <TransitionLink to={hero.primaryCta.href} transitionLabel="Contact">
                {hero.primaryCta.label}
                <ArrowUpRight />
              </TransitionLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/30 bg-transparent px-7 text-limestone hover:bg-white/10 hover:text-limestone"
            >
              <TransitionLink to={hero.secondaryCta.href} transitionLabel="Projects">
                {hero.secondaryCta.label}
              </TransitionLink>
            </Button>
          </div>
        </div>

        <div data-hero-fade className="eyebrow mt-10 flex items-center justify-between gap-4 border-t border-white/20 pt-4 text-limestone/60">
          <span className="hidden sm:inline">{company.coordinates}</span>
          <span className="hidden items-center gap-2 md:inline-flex">
            <ArrowDown className="size-3.5 animate-bounce" /> Scroll to explore
          </span>
          <span className="text-brass">{hero.badge}</span>
        </div>
      </div>
    </section>
  )
}
