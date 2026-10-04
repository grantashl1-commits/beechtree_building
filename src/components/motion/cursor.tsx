import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"
import { useMediaQuery } from "@/hooks/use-media-query"

/**
 * A soft follower that grows into a labelled disc over anything with
 * `data-cursor="View"` (desktop pointers only — the native cursor stays visible).
 */
export function CursorFollower() {
  const fine = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)")
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState("")

  useEffect(() => {
    if (!fine || !ref.current) return
    const el = ref.current
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" })
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" })
    const move = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]")
      const next = target?.dataset.cursor ?? ""
      setLabel((prev) => (prev === next ? prev : next))
    }
    window.addEventListener("pointermove", move, { passive: true })
    return () => window.removeEventListener("pointermove", move)
  }, [fine])

  if (!fine) return null
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[65]">
      <div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-beech text-paper transition-[width,height,opacity] duration-500 ease-[var(--ease-out-expo)]"
        style={{ width: label ? 96 : 10, height: label ? 96 : 10, opacity: label ? 1 : 0 }}
      >
        <span className="eyebrow text-[0.625rem]" style={{ opacity: label ? 1 : 0 }}>
          {label}
        </span>
      </div>
    </div>
  )
}
