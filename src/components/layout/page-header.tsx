import type { ReactNode } from "react"
import { SplitReveal } from "@/components/motion/split-reveal"
import { useIntro } from "@/components/providers/intro"

/** Light editorial header used by every inner page. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  const { introDone } = useIntro()
  return (
    <header className="container-site pt-40 pb-16 md:pt-52 md:pb-24">
      <p className="eyebrow text-beech-deep">{eyebrow}</p>
      <SplitReveal as="h1" immediate ready={introDone} delay={0.2} className="display mt-6 max-w-6xl text-[clamp(3.25rem,10vw,10rem)]">
        {title}
      </SplitReveal>
      {intro && <div className="mt-10 max-w-2xl text-lg leading-relaxed text-stone md:ml-[33%]">{intro}</div>}
    </header>
  )
}
