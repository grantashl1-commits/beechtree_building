import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { Picture } from "@/components/media/picture"
import { TransitionLink } from "@/components/providers/page-transition"
import { ContactCta } from "@/components/sections/home/contact-cta"
import { projects } from "@/content/projects"
import { company } from "@/content/site"
import { cn } from "@/lib/utils"

/** An editorial, off-grid index: every third project steps across the page. */
const LAYOUT = ["md:col-span-7", "md:col-span-5 md:mt-40", "md:col-span-6 md:col-start-4"]
const ASPECT = ["aspect-[4/3]", "aspect-[4/5]", "aspect-[16/10]"]

export function ProjectsPage() {
  return (
    <>
      <title>{`Projects — ${company.name}`}</title>
      <meta name="description" content="Award-winning architectural homes built by Beechtree Building across Taupō, Kinloch and the Central Plateau." />
      <PageHeader
        eyebrow={`(${String(projects.length).padStart(2, "0")}) — Selected works`}
        title={
          <>
            Built on the <span className="italic">Plateau</span>.
          </>
        }
        intro="From lakefront retreats to ridgeline residences — each home is a partnership with a great architect, and a site that asked something of us."
      />

      <section className="container-site grid gap-x-8 gap-y-20 pb-32 md:grid-cols-12 md:gap-y-28">
        {projects.map((p, i) => (
          <TransitionLink
            key={p.slug}
            to={`/projects/${p.slug}`}
            transitionLabel={p.title}
            data-cursor="View"
            className={cn("group block", LAYOUT[i % 3])}
          >
            <div className={cn("relative overflow-hidden rounded-sm", ASPECT[i % 3])}>
              <Picture
                image={p.images[0]}
                label={p.title}
                sizes="(min-width: 768px) 60vw, 100vw"
                className="h-full w-full"
                imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
            </div>
            <div className="mt-6 flex items-start justify-between gap-6 border-t border-line pt-5">
              <div>
                <h2 className="display text-4xl md:text-5xl">{p.title}</h2>
                <p className="mt-2 text-sm text-stone">
                  {p.location}
                  {p.architect && ` · ${p.architect}`}
                </p>
                {p.awards?.[0] && <p className="eyebrow mt-3 text-beech-deep">{p.awards[0].label}</p>}
              </div>
              <ArrowUpRight className="mt-2 size-6 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
            </div>
          </TransitionLink>
        ))}
      </section>
      <ContactCta />
    </>
  )
}
