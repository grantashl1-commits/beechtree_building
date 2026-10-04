import { company } from "@/content/site"
import { scrapedLogo } from "@/content/media"
import { cn } from "@/lib/utils"

type LogoProps = { tone?: "dark" | "light"; className?: string }

/** Aspect ratio of public/brand/logo.svg (its viewBox width / height). */
const SVG_LOGO_RATIO = 1185 / 459

/**
 * The client's logo. An SVG logo is drawn as a CSS mask filled with `currentColor`,
 * so it takes the brand ink on light backgrounds and limestone on dark ones.
 * A raster logo (from `npm run scrape`) is knocked out to white on dark backgrounds.
 * With no logo file at all, an interim wordmark keeps the layout intact.
 */
export function Logo({ tone = "dark", className }: LogoProps) {
  const color = tone === "light" ? "text-limestone" : "text-ink"
  if (scrapedLogo?.endsWith(".svg")) {
    return (
      <span
        role="img"
        aria-label={company.legalName}
        className={cn("inline-block h-11 bg-current", color, className)}
        style={{
          aspectRatio: SVG_LOGO_RATIO,
          maskImage: `url(${scrapedLogo})`,
          WebkitMaskImage: `url(${scrapedLogo})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "left center",
          WebkitMaskPosition: "left center",
        }}
      />
    )
  }
  if (scrapedLogo) {
    return (
      <img
        src={scrapedLogo}
        alt={company.name}
        className={cn("h-9 w-auto object-contain", tone === "light" && "brightness-0 invert", className)}
        draggable={false}
      />
    )
  }
  return <Wordmark tone={tone} className={className} />
}

function Wordmark({ tone, className }: LogoProps) {
  return (
    <span
      role="img"
      aria-label={company.name}
      className={cn(
        "inline-flex h-9 items-center gap-2.5",
        tone === "light" ? "text-limestone" : "text-ink",
        className,
      )}
    >
      <svg viewBox="0 0 40 40" className="h-full w-auto" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
        <path d="M4 18 20 4l16 14" strokeLinejoin="round" />
        <path d="M8 15v21h24V15" strokeLinejoin="round" />
        <path d="M20 36V17M20 24l-5-5M20 21l5-5M20 29l4-3.5" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-sans text-[0.95rem] font-semibold tracking-[0.22em]">BEECHTREE</span>
        <span className="mt-1 font-mono text-[0.55rem] tracking-[0.42em] opacity-70">BUILDING</span>
      </span>
    </span>
  )
}
