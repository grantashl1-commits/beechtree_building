import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { useRef, useState } from "react"
import { Navigate, useParams } from "react-router"
import { Picture } from "@/components/media/picture"
import { Reveal } from "@/components/motion/reveal"
import { useIntro } from "@/components/providers/intro"
import { TransitionLink } from "@/components/providers/page-transition"
import { ContactCta } from "@/components/sections/home/contact-cta"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import type { SiteImage } from "@/content/media"
import { getProject, projects } from "@/content/projects"
import { company } from "@/content/site"
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

export function ProjectPage() {
  const { slug = "" } = useParams()
  const project = getProject(slug)
  if (!project) return <Navigate to="/projects" replace />
  // keyed so every project mounts fresh (animations, lightbox state)
  return <ProjectView key={project.slug} slug={project.slug} />
}

function ProjectView({ slug }: { slug: string }) {
  const project = getProject(slug)!
  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]
  const root = useRef<HTMLDivElement>(null)
  const { introDone } = useIntro()
  const [lightbox, setLightbox] = useState<number | null>(null)

  // Gallery shows real photos, or three placeholders that preview the layout
  const gallery: (SiteImage | undefined)[] = project.images.length > 1 ? project.images.slice(1) : [undefined, undefined, undefined]

  useGSAP(
    () => {
      if (!introDone) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from("[data-pj-line]", { yPercent: 110, duration: 1.4, stagger: 0.1, delay: 0.3 })
        gsap.fromTo("[data-pj-hero]", { scale: 1.2 }, { scale: 1, duration: 2.2 })
        gsap.to("[data-pj-hero]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: "[data-pj-hero-wrap]", start: "top top", end: "bottom top", scrub: true },
        })
      })
      return () => mm.revert()
    },
    { dependencies: [introDone], scope: root },
  )

  const facts = [
    { label: "Location", value: project.location },
    { label: "Architect", value: project.architect },
    { label: "Size", value: project.size },
    { label: "Completed", value: project.year },
  ].filter((f) => f.value)

  return (
    <div ref={root}>
      <title>{`${project.title} — ${company.name}`}</title>
      <meta name="description" content={project.summary} />

      <section data-pj-hero-wrap className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-limestone">
        <div data-pj-hero className="absolute inset-0">
          <Picture image={project.images[0]} label={project.title} caption={false} priority className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/85" />
        <div className="container-site relative flex h-full flex-col justify-end pb-12">
          <TransitionLink to="/projects" transitionLabel="Projects" className="eyebrow mb-8 inline-flex w-fit items-center gap-2 text-limestone/70 hover:text-limestone">
            <ArrowLeft className="size-3.5" /> All projects
          </TransitionLink>
          <h1 className="display text-[clamp(3.25rem,11vw,11rem)]">
            <span className="block overflow-clip pb-[0.06em]">
              <span data-pj-line className="block">
                {project.title}
              </span>
            </span>
          </h1>
          <p className="mt-4 overflow-clip text-lg text-limestone/80">
            <span data-pj-line className="block">
              {project.summary}
            </span>
          </p>
        </div>
      </section>

      <section className="container-site grid gap-16 py-24 md:grid-cols-12 md:py-32">
        <Reveal className="space-y-6 md:col-span-4">
          {facts.map((f) => (
            <div key={f.label} className="border-t border-line pt-4">
              <p className="eyebrow text-stone">{f.label}</p>
              <p className="mt-1 text-lg">{f.value}</p>
            </div>
          ))}
          {project.awards && (
            <div className="border-t border-line pt-4">
              <p className="eyebrow text-stone">Recognition</p>
              <ul className="mt-2 space-y-2">
                {project.awards.map((a) => (
                  <li key={a} className="text-beech-deep">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
        <div className="md:col-span-7 md:col-start-6">
          <Reveal className="space-y-6">
            {project.body.map((para, i) => (
              <p key={i} className={cn(i === 0 ? "display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.12]" : "text-lg leading-relaxed text-stone")}>
                {para}
              </p>
            ))}
          </Reveal>
          {project.testimonial && (
            <figure className="mt-16 border-l-2 border-beech pl-8">
              <blockquote className="display text-2xl leading-snug italic md:text-3xl">“{project.testimonial.quote}”</blockquote>
              <figcaption className="eyebrow mt-5 text-stone">— {project.testimonial.author}</figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="container-site grid gap-5 pb-28 md:grid-cols-2">
        {gallery.map((img, i) => {
          const wide = i % 3 === 0
          return (
            <button
              key={img?.src ?? i}
              type="button"
              disabled={!img}
              data-cursor={img ? "Expand" : undefined}
              onClick={() => img && setLightbox(i)}
              className={cn("group relative overflow-hidden rounded-sm text-left", wide ? "aspect-[16/9] md:col-span-2" : "aspect-[4/5]")}
            >
              <Picture
                image={img}
                label={`${project.title} ${String(i + 2).padStart(2, "0")}`}
                sizes={wide ? "100vw" : "50vw"}
                className="h-full w-full"
                imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
              />
            </button>
          )
        })}
      </section>

      <TransitionLink
        to={`/projects/${next.slug}`}
        transitionLabel={next.title}
        data-cursor="Next"
        className="group relative block h-[70svh] overflow-hidden bg-ink text-limestone"
      >
        <Picture image={next.images[0]} label={next.title} caption={false} className="absolute inset-0 h-full w-full opacity-60 transition-opacity duration-700 group-hover:opacity-80" />
        <div className="container-site relative flex h-full flex-col justify-end pb-12">
          <p className="eyebrow text-brass">Next project</p>
          <p className="display mt-4 flex items-end gap-6 text-[clamp(3rem,9vw,9rem)]">
            {next.title}
            <ArrowRight className="mb-4 size-10 transition-transform duration-500 group-hover:translate-x-3 md:size-16" />
          </p>
        </div>
      </TransitionLink>

      <ContactCta />

      <Lightbox
        images={gallery.filter((g): g is SiteImage => Boolean(g))}
        index={lightbox}
        title={project.title}
        onChange={setLightbox}
      />
    </div>
  )
}

function Lightbox({ images, index, title, onChange }: { images: SiteImage[]; index: number | null; title: string; onChange: (i: number | null) => void }) {
  const current = index === null ? undefined : images[index]
  const step = (d: number) => index !== null && onChange((index + d + images.length) % images.length)
  return (
    <Dialog open={current !== undefined} onOpenChange={(open) => !open && onChange(null)}>
      <DialogContent
        showCloseButton={false}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1)
          if (e.key === "ArrowLeft") step(-1)
        }}
        className="max-w-[min(92vw,1600px)] border-none bg-transparent p-0 shadow-none sm:max-w-[min(92vw,1600px)]"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">Photo {index !== null ? index + 1 : 0} of {images.length}</DialogDescription>
        {current && (
          <img src={current.src} alt={current.alt ?? title} className="max-h-[86svh] w-full rounded-sm object-contain" />
        )}
        <div className="flex items-center justify-between text-limestone">
          <span className="eyebrow">
            {(index ?? 0) + 1} / {images.length}
          </span>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className="flex size-11 items-center justify-center rounded-full border border-white/30">
              <ArrowLeft className="size-4" />
            </button>
            <button type="button" aria-label="Next photo" onClick={() => step(1)} className="flex size-11 items-center justify-center rounded-full border border-white/30">
              <ArrowRight className="size-4" />
            </button>
            <DialogClose className="flex size-11 items-center justify-center rounded-full bg-limestone text-ink" aria-label="Close">
              <X className="size-4" />
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
