import { TransitionLink } from "@/components/providers/page-transition"
import { Button } from "@/components/ui/button"
import { company } from "@/content/site"

export function NotFoundPage() {
  return (
    <section className="container-site flex min-h-[80svh] flex-col items-start justify-center gap-8 pt-32">
      <title>{`Page not found — ${company.name}`}</title>
      <p className="eyebrow text-beech-deep">404 — Off the plans</p>
      <h1 className="display text-[clamp(3.5rem,10vw,9rem)]">
        This room <span className="italic">wasn't built.</span>
      </h1>
      <Button asChild size="lg" className="h-12 rounded-full px-7">
        <TransitionLink to="/" transitionLabel="Home">
          Back to the front door
        </TransitionLink>
      </Button>
    </section>
  )
}
