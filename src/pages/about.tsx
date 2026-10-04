import { PageHeader } from "@/components/layout/page-header"
import { Picture } from "@/components/media/picture"
import { Reveal } from "@/components/motion/reveal"
import { TransitionLink } from "@/components/providers/page-transition"
import { ContactCta } from "@/components/sections/home/contact-cta"
import { Credentials } from "@/components/sections/home/credentials"
import { pageImage } from "@/content/media"
import { getProject } from "@/content/projects"
import { about, architectQuotes, company, expertise } from "@/content/site"

export function AboutPage() {
  const image = pageImage("about", 0) ?? pageImage("craft", 0) ?? getProject("hawk-ridge")?.images[0]
  return (
    <>
      <title>{`About — ${company.name}`}</title>
      <meta name="description" content={company.description} />
      <PageHeader eyebrow={about.eyebrow} title={about.title} intro={about.lead} />

      <section className="container-site grid gap-14 pb-28 md:grid-cols-12">
        <div className="md:col-span-6">
          <Picture image={image} label="Beechtree craftsmanship" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/5] rounded-sm" />
        </div>
        <Reveal className="space-y-6 self-end md:col-span-5 md:col-start-8">
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "display text-[clamp(1.6rem,2.3vw,2.25rem)] leading-[1.15]"
                  : i === about.paragraphs.length - 1
                    ? "font-medium"
                    : "text-lg leading-relaxed text-stone"
              }
            >
              {p}
            </p>
          ))}
          <div className="border-t border-line pt-6">
            <p className="eyebrow text-stone">The people behind Beechtree</p>
            <p className="mt-1 text-lg">{company.team}</p>
          </div>
        </Reveal>
      </section>

      <section className="bg-ink py-24 text-limestone md:py-32">
        <div className="container-site">
          <p className="eyebrow text-brass">Our expertise</p>
          <div className="mt-10 grid gap-12 md:grid-cols-3">
            {expertise.map((group) => (
              <div key={group.title}>
                <h2 className="display text-4xl">{group.title}</h2>
                <ul className="mt-6 space-y-3 text-limestone/75">
                  {group.items.map((item) => (
                    <li key={item} className="border-b border-white/10 pb-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-36">
        <div className="container-site">
          <p className="eyebrow text-beech-deep">What architects say</p>
          <div className="mt-12 grid gap-16 lg:grid-cols-2">
            {architectQuotes.map((q) => (
              <figure key={q.firm} className="flex flex-col">
                <blockquote className="display text-[clamp(1.75rem,2.8vw,2.75rem)] leading-[1.1]">“{q.pull}”</blockquote>
                <div className="mt-6 space-y-4 text-stone">
                  {q.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <figcaption className="mt-8 border-t border-line pt-5">
                  <p className="font-medium">— {q.author}</p>
                  <p className="text-sm text-stone">{q.firm}</p>
                  <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                    {q.projects.map((slug) => {
                      const project = getProject(slug)
                      return project ? (
                        <TransitionLink key={slug} to={`/projects/${slug}`} transitionLabel={project.title} className="link-underline">
                          {project.title} →
                        </TransitionLink>
                      ) : null
                    })}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Credentials />
      <ContactCta />
    </>
  )
}
