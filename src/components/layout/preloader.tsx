import { useEffect, useRef, useState } from "react"
import { Logo } from "@/components/brand/logo"
import { useIntro } from "@/components/providers/intro"
import { useLenis } from "@/components/providers/smooth-scroll"
import { company } from "@/content/site"
import { gsap, useGSAP } from "@/lib/gsap"

/** First-visit loader: a 0→100 site-survey counter, then the panel lifts like a curtain. */
export function Preloader() {
  const { showPreloader, finishIntro } = useIntro()
  const lenis = useLenis()
  const root = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const [gone, setGone] = useState(!showPreloader)
  const lenisRef = useRef(lenis)

  // Lenis boots a frame after us — keep it paused for as long as the loader is up.
  useEffect(() => {
    lenisRef.current = lenis
    if (!gone) lenis?.stop()
  }, [lenis, gone])

  useGSAP(
    () => {
      if (!showPreloader) return
      document.documentElement.style.overflow = "hidden"
      const count = { v: 0 }
      gsap
        .timeline({
          onComplete: () => {
            document.documentElement.style.overflow = ""
            lenisRef.current?.start()
            setGone(true)
          },
        })
        .from("[data-pl-logo]", { opacity: 0, y: 20, duration: 1 })
        .to(count, {
          v: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter.current) counter.current.textContent = String(Math.round(count.v)).padStart(3, "0")
          },
        }, 0.1)
        .to("[data-pl-bar]", { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0.1)
        .to("[data-pl-content]", { opacity: 0, y: -20, duration: 0.5, ease: "expo.in" })
        .add(finishIntro, "-=0.1")
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "-=0.15")
    },
    { dependencies: [showPreloader], scope: root },
  )

  if (gone) return null
  return (
    <div ref={root} className="fixed inset-0 z-[80] bg-ink text-limestone" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
      <div data-pl-content className="container-site flex h-full flex-col justify-between py-8">
        <div className="eyebrow flex justify-between text-limestone/50">
          <span>{company.address.city}, Aotearoa</span>
          <span>{company.coordinates}</span>
        </div>
        <div data-pl-logo className="flex justify-center">
          <Logo tone="light" className="h-14 md:h-16" />
        </div>
        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <span className="eyebrow text-limestone/50">Setting out</span>
            <span ref={counter} className="font-mono text-5xl tabular-nums md:text-7xl">
              000
            </span>
          </div>
          <div className="h-px w-full bg-white/10">
            <div data-pl-bar className="h-px origin-left scale-x-0 bg-brass" />
          </div>
        </div>
      </div>
    </div>
  )
}
