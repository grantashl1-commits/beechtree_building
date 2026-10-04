import { PageHeader } from "@/components/layout/page-header"
import { Picture } from "@/components/media/picture"
import { Reveal } from "@/components/motion/reveal"
import { ContactCta } from "@/components/sections/home/contact-cta"
import { Credentials } from "@/components/sections/home/credentials"
import { pageImage } from "@/content/media"
import { getProject } from "@/content/projects"
import { about, company } from "@/content/site"

export function AboutPage() {
  const image = pageImage("about", 0) ?? getProject("hawk-ridge")?.images[0]
  return (
    <>
      <title>{`About — ${company.name}`}</title>
      <meta name="description" content={company.description} />
      <PageHeader eyebrow={about.eyebrow} title={about.title} />

      <section className="container-site grid gap-14 pb-28 md:grid-cols-12">
        <div className="md:col-span-6">
          <Picture image={image} label="Beechtree on site" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/5] rounded-sm" />
        </div>
        <Reveal className="space-y-6 self-end md:col-span-5 md:col-start-8">
          {about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.12]" : "text-lg leading-relaxed text-stone"}>
              {p}
            </p>
          ))}
          <div className="border-t border-line pt-6">
            <p className="eyebrow text-stone">Director</p>
            <p className="mt-1 text-lg">{company.director}</p>
          </div>
        </Reveal>
      </section>

      <section className="bg-paper py-24 md:py-36">
        <figure className="container-site max-w-5xl text-center">
          <blockquote className="display text-[clamp(2rem,4.5vw,4.25rem)] leading-[1.05]">“{about.quote.text}”</blockquote>
          <figcaption className="eyebrow mt-10 text-beech-deep">— {about.quote.author}</figcaption>
        </figure>
      </section>

      <Credentials />
      <ContactCta />
    </>
  )
}
