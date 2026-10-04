import { ArrowUpRight } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { TransitionLink } from "@/components/providers/page-transition"
import { company, nav } from "@/content/site"

const YEAR = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-limestone">
      <div className="container-site grid gap-14 pt-24 pb-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="eyebrow text-brass">Have a site in mind?</p>
          <a
            href={`mailto:${company.email}`}
            className="display group mt-6 inline-flex items-start gap-3 text-[clamp(2.25rem,5vw,4.5rem)] hover:text-brass"
          >
            <span className="link-underline">Let's talk.</span>
            <ArrowUpRight className="mt-2 size-8 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-10 text-sm md:col-span-6 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-3">
            <p className="eyebrow text-limestone/50">Studio</p>
            <address className="leading-relaxed text-limestone/80 not-italic">
              {company.physicalAddress}
              <br />
              <span className="text-limestone/50">Postal:</span> {company.postalAddress}
            </address>
            <a href={company.phoneHref} className="link-underline block">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="link-underline block [overflow-wrap:anywhere]">
              {company.email}
            </a>
          </div>
          <div className="space-y-3">
            <p className="eyebrow text-limestone/50">Explore</p>
            {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact" }].map((item) => (
              <TransitionLink key={item.href} to={item.href} transitionLabel={item.label} className="link-underline block w-fit">
                {item.label}
              </TransitionLink>
            ))}
          </div>
          <div className="space-y-3">
            <p className="eyebrow text-limestone/50">Follow</p>
            {company.socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="link-underline block w-fit">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-limestone/50">
        <Logo tone="light" className="h-7" />
        <p>{company.guarantee}</p>
        <p>
          © {YEAR} {company.legalName}
        </p>
      </div>

      <p
        aria-hidden
        className="display pointer-events-none -mb-[0.22em] text-center text-[25vw] leading-none whitespace-nowrap text-white/[0.04] select-none"
      >
        Beechtree
      </p>
    </footer>
  )
}
