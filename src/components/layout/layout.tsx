import { Outlet } from "react-router"
import { CursorFollower } from "@/components/motion/cursor"
import { IntroProvider } from "@/components/providers/intro"
import { PageTransitionProvider } from "@/components/providers/page-transition"
import { SmoothScroll } from "@/components/providers/smooth-scroll"
import { Preloader } from "./preloader"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"

export function Layout() {
  return (
    <SmoothScroll>
      <IntroProvider>
        <PageTransitionProvider>
          <div className="grain">
            <a
              href="#main"
              className="sr-only z-[90] rounded-full bg-ink px-5 py-3 text-limestone focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
            >
              Skip to content
            </a>
            <SiteHeader />
            <main id="main">
              <Outlet />
            </main>
            <SiteFooter />
          </div>
          <Preloader />
          <CursorFollower />
        </PageTransitionProvider>
      </IntroProvider>
    </SmoothScroll>
  )
}
