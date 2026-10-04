import { useRef, type ElementType, type ReactNode } from "react"
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap"

type SplitRevealProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  delay?: number
  /** Animate immediately instead of when scrolled into view. */
  immediate?: boolean
  /** Hold the animation until this is true (e.g. after the preloader). */
  ready?: boolean
}

/** Headline whose lines rise out of masks as it enters the viewport. */
export function SplitReveal({ as: Tag = "h2", children, className, delay = 0, immediate, ready = true }: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ready || !ref.current) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(ref.current, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line-inner",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.3,
              stagger: 0.09,
              delay,
              ease: "expo.out",
              scrollTrigger: immediate ? undefined : { trigger: ref.current, start: "top 88%", once: true },
            }),
        })
        return () => split.revert()
      })
      return () => mm.revert()
    },
    { dependencies: [ready], scope: ref },
  )

  return (
    <Tag ref={ref} className={className} style={ready ? undefined : { visibility: "hidden" }}>
      {children}
    </Tag>
  )
}
