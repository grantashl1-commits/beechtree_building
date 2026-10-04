import Lenis from "lenis"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap"

const LenisContext = createContext<Lenis | null>(null)

/** Buttery inertial scrolling (Lenis) wired into GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const instance = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: false })
    instance.on("scroll", ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export function useLenis() {
  return useContext(LenisContext)
}

/** Scroll to an element or a position, using Lenis when it's running (`force` works even while it's paused). */
export function scrollToTarget(lenis: Lenis | null, target: string | number, immediate = false) {
  // Lenis caches the scroll limit; after a route change the page height has changed.
  lenis?.resize()
  if (typeof target === "string") {
    const el = document.querySelector(target)
    if (!el) return
    if (lenis) lenis.scrollTo(el as HTMLElement, { immediate, force: true })
    else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" })
    return
  }
  if (lenis) lenis.scrollTo(target, { immediate, force: true })
  else window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" })
}
