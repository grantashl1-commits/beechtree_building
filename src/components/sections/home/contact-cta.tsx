import { ArrowUpRight, Phone } from "lucide-react"
import { SplitReveal } from "@/components/motion/split-reveal"
import { TransitionLink } from "@/components/providers/page-transition"
import { Button } from "@/components/ui/button"
import { company, contact } from "@/content/site"

export function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-moss py-28 text-limestone md:py-40">
      <div className="container-site grid gap-12 md:grid-cols-12">
        <p className="eyebrow text-brass md:col-span-3">(08) — {contact.eyebrow}</p>
        <div className="md:col-span-9">
          <SplitReveal className="display text-[clamp(3rem,8vw,8.5rem)]">{contact.title}</SplitReveal>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-limestone/75">{contact.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-14 rounded-full bg-limestone px-8 text-base text-ink hover:bg-paper">
              <TransitionLink to="/contact" transitionLabel="Contact">
                Start your build <ArrowUpRight />
              </TransitionLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-white/30 bg-transparent px-8 text-base text-limestone hover:bg-white/10 hover:text-limestone"
            >
              <a href={company.phoneHref}>
                <Phone /> {company.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
