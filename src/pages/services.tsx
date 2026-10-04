import { PageHeader } from "@/components/layout/page-header"
import { Picture } from "@/components/media/picture"
import { Reveal } from "@/components/motion/reveal"
import { ContactCta } from "@/components/sections/home/contact-cta"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { pageImage } from "@/content/media"
import { company, expertise, process, services } from "@/content/site"
import { cn } from "@/lib/utils"

export function ServicesPage() {
  return (
    <>
      <title>{`Services — ${company.name}`}</title>
      <meta name="description" content="New homes, additions and renovations in Taupō — delivered on time and on budget by Registered Master Builders." />
      <PageHeader
        eyebrow="What we build"
        title={
          <>
            New homes. Additions. <span className="italic">Renovations.</span>
          </>
        }
        intro="A passion for architecture and design, delivered on time and on budget — whatever you're building."
      />

      <div className="container-site space-y-28 pb-28 md:space-y-40">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} className="grid scroll-mt-28 items-center gap-10 md:grid-cols-12">
            <div className={cn("md:col-span-7", i % 2 === 1 && "md:order-2 md:col-start-6")}>
              <Picture
                image={pageImage("services", i) ?? pageImage(s.imageFrom)}
                label={s.title}
                sizes="(min-width: 768px) 60vw, 100vw"
                className="aspect-[4/3] rounded-sm"
              />
            </div>
            <Reveal className={cn("md:col-span-4", i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-9")}>
              <p className="eyebrow text-beech-deep">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="display mt-4 text-6xl md:text-7xl">{s.title}</h2>
              <p className="display mt-6 text-2xl leading-snug">{s.lead}</p>
              <p className="mt-6 leading-relaxed text-stone">{s.body}</p>
            </Reveal>
          </section>
        ))}
      </div>

      <section className="bg-ink py-24 text-limestone md:py-32">
        <div className="container-site grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-brass">Expertise</p>
            <h2 className="display mt-4 text-5xl md:text-6xl">Every stage, under one roof.</h2>
          </div>
          <div className="grid gap-12 sm:grid-cols-3 md:col-span-8 md:col-start-5">
            {expertise.map((group) => (
              <div key={group.title}>
                <p className="eyebrow text-limestone/50">{group.title}</p>
                <ul className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <li key={item} className="display border-b border-white/10 pb-4 text-2xl">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-4">
          <p className="eyebrow text-beech-deep">How it works</p>
          <h2 className="display mt-4 text-5xl md:text-6xl">The Beechtree process</h2>
        </div>
        <Accordion type="single" collapsible defaultValue="step-0" className="md:col-span-7 md:col-start-6">
          {process.map((step, i) => (
            <AccordionItem key={step.title} value={`step-${i}`} className="border-line">
              <AccordionTrigger className="py-7 hover:no-underline">
                <span className="flex items-baseline gap-6">
                  <span className="eyebrow text-stone">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-3xl md:text-4xl">{step.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-7 pl-12 text-base leading-relaxed text-stone">{step.body}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <ContactCta />
    </>
  )
}
