import { MenuIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router"
import { Logo } from "@/components/brand/logo"
import { TransitionLink } from "@/components/providers/page-transition"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { company, nav } from "@/content/site"
import { cn } from "@/lib/utils"

/** Routes whose first screen is a dark, full-bleed image — the header starts in light-on-dark mode there. */
const DARK_HERO = [/^\/$/, /^\/projects\/[^/]+$/]

export function SiteHeader() {
  const { pathname } = useLocation()
  const overDarkHero = DARK_HERO.some((re) => re.test(pathname))
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > window.innerHeight * 0.6)
      setHidden(y > 200 && y > lastY.current)
      lastY.current = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  const light = overDarkHero && !scrolled

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-700 ease-[var(--ease-out-expo)]",
        hidden && "-translate-y-full",
        light ? "text-limestone" : "text-ink",
        scrolled || !overDarkHero ? "border-b border-ink/5 bg-limestone/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <TransitionLink to="/" aria-label={`${company.name} — home`} className="shrink-0">
          <Logo tone={light ? "light" : "dark"} />
        </TransitionLink>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <TransitionLink
              key={item.href}
              to={item.href}
              transitionLabel={item.label}
              className={cn(
                "link-underline text-[0.8125rem] font-medium tracking-wide",
                pathname.startsWith(item.href) && item.href !== "/" && "bg-[length:100%_1px]",
              )}
            >
              {item.label}
            </TransitionLink>
          ))}
          <Button
            asChild
            size="lg"
            className={cn(
              "h-11 rounded-full px-6 text-[0.8125rem] tracking-wide",
              light && "bg-limestone text-ink hover:bg-paper",
            )}
          >
            <TransitionLink to="/contact" transitionLabel="Contact">
              Start your build
            </TransitionLink>
          </Button>
        </nav>

        <MobileMenu light={light} />
      </div>
    </header>
  )
}

function MobileMenu({ light }: { light: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className={cn("inline-flex size-11 items-center justify-center rounded-full border md:hidden", light ? "border-white/30" : "border-ink/15")}
          aria-label="Open menu"
        >
          <MenuIcon className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full border-none bg-ink text-limestone sm:max-w-md [&>button]:text-limestone">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <div className="flex h-full flex-col justify-between px-6 pt-20 pb-10">
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact" }].map((item, i) => (
              <SheetClose asChild key={item.href}>
                <TransitionLink to={item.href} transitionLabel={item.label} className="group flex items-baseline gap-4 py-1">
                  <span className="eyebrow text-brass">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-5xl transition-transform duration-500 group-hover:translate-x-2">{item.label}</span>
                </TransitionLink>
              </SheetClose>
            ))}
          </nav>
          <div className="space-y-1 text-sm text-limestone/70">
            <a href={company.phoneHref} className="block text-lg text-limestone">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="block">
              {company.email}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
