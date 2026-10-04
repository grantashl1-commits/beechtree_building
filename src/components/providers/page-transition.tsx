import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { Logo } from "@/components/brand/logo"
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap"
import { scrollToTarget, useLenis } from "./smooth-scroll"

type TransitionApi = { go: (to: string, label?: string) => void }
const TransitionContext = createContext<TransitionApi>({ go: () => {} })

/**
 * Route changes play an "ink curtain" wipe: cover → swap page → scroll reset → reveal.
 * Same-page hash links (e.g. /#reviews from the home page) just smooth-scroll.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const lenis = useLenis()
  const curtain = useRef<HTMLDivElement>(null)
  const covering = useRef(false)
  const [label, setLabel] = useState("")

  const go = useCallback(
    (to: string, nextLabel = "") => {
      const url = new URL(to, window.location.href)
      if (url.pathname === location.pathname) {
        scrollToTarget(lenis, url.hash || 0)
        if (url.hash !== location.hash) navigate(to, { preventScrollReset: true })
        return
      }
      if (prefersReducedMotion() || covering.current || !curtain.current) {
        navigate(to)
        return
      }
      covering.current = true
      setLabel(nextLabel)
      lenis?.stop()
      gsap
        .timeline()
        .set(curtain.current, { visibility: "visible" })
        .fromTo(
          curtain.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "expo.inOut" },
        )
        .fromTo("[data-curtain-content]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.35")
        .add(() => navigate(to))
    },
    [lenis, location.hash, location.pathname, navigate],
  )

  // After every route change: reset scroll, refresh triggers, lift the curtain.
  useLayoutEffect(() => {
    scrollToTarget(lenis, 0, true)
    if (location.hash) {
      // let the new page lay out before jumping to the anchor
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToTarget(lenis, location.hash, true)))
    }
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh())
    if (covering.current && curtain.current) {
      gsap
        .timeline({
          delay: 0.1,
          onComplete: () => {
            covering.current = false
            lenis?.start()
          },
        })
        .to("[data-curtain-content]", { y: -30, opacity: 0, duration: 0.4, ease: "expo.in" })
        .to(curtain.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "expo.inOut" }, "-=0.1")
        .set(curtain.current, { visibility: "hidden" })
    }
    return () => cancelAnimationFrame(refresh)
    // Runs on navigation only — `lenis` changing must not re-trigger the curtain.
  }, [location.pathname])

  return (
    <TransitionContext.Provider value={{ go }}>
      {children}
      <div
        ref={curtain}
        aria-hidden
        className="invisible fixed inset-0 z-[70] flex flex-col items-center justify-center gap-6 bg-ink text-limestone"
      >
        <div data-curtain-content className="flex flex-col items-center gap-5">
          <Logo tone="light" className="h-16 md:h-20" />
          {label && <span className="display text-5xl italic md:text-7xl">{label}</span>}
        </div>
      </div>
    </TransitionContext.Provider>
  )
}

export function usePageTransition() {
  return useContext(TransitionContext)
}

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "to"> & { to: string; transitionLabel?: string }

/** Drop-in replacement for <Link> that plays the curtain transition. */
export function TransitionLink({ to, transitionLabel, onClick, ...props }: TransitionLinkProps) {
  const { go } = usePageTransition()
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }
    event.preventDefault()
    go(to, transitionLabel)
  }
  return <Link to={to} onClick={handleClick} {...props} />
}
