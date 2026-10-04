import { useRef, type ReactNode } from "react"
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

/** Fades and lifts its direct children into place, staggered, on scroll. */
export function Reveal({ children, className, stagger = 0.08, y = 40 }: { children: ReactNode; className?: string; stagger?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from(ref.current!.children, {
          y,
          opacity: 0,
          duration: 1.2,
          stagger,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
