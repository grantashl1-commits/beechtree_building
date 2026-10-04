import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import { prefersReducedMotion } from "@/lib/gsap"

const STORAGE_KEY = "bt-intro-seen"

type IntroState = { showPreloader: boolean; introDone: boolean; finishIntro: () => void }
const IntroContext = createContext<IntroState>({ showPreloader: false, introDone: true, finishIntro: () => {} })

function shouldShowPreloader() {
  try {
    return !prefersReducedMotion() && !sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return false
  }
}

/** Plays the preloader once per browser session; sections wait for `introDone` before animating in. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [showPreloader] = useState(shouldShowPreloader)
  const [introDone, setIntroDone] = useState(!showPreloader)

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {
      /* private mode — fine */
    }
    setIntroDone(true)
  }, [])

  return (
    <IntroContext.Provider value={{ showPreloader, introDone, finishIntro }}>{children}</IntroContext.Provider>
  )
}

export function useIntro() {
  return useContext(IntroContext)
}
