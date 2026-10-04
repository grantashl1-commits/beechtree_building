import manifest from "./media.json"

/**
 * Typed access to the images downloaded by `npm run scrape`.
 * Components never read media.json directly — they go through these helpers,
 * so a missing image falls back to an on-brand placeholder instead of breaking.
 */

export type SiteImage = {
  src: string
  /** ~1200px wide variant for srcset */
  srcSmall?: string
  width?: number
  height?: number
  alt?: string
  /** Which gallery the photo belongs to on a project page (matches the old site's Exterior / Interior). */
  group?: "exterior" | "interior"
}

type Manifest = {
  logo: string | null
  favicon: string | null
  pages: Record<string, { title?: string; images: SiteImage[] }>
}

const media = manifest as unknown as Manifest

export const scrapedLogo = media.logo

/** All images found on a page of the original site, in page order. */
export function pageImages(slug: string): SiteImage[] {
  return media.pages[slug]?.images ?? []
}

/** Images for one gallery group ("exterior" / "interior"); ungrouped images count as exterior. */
export function pageImagesByGroup(slug: string, group: "exterior" | "interior"): SiteImage[] {
  return pageImages(slug).filter((img) => (img.group ?? "exterior") === group)
}

/** The nth image on a page, or undefined so callers can fall back. */
export function pageImage(slug: string, index = 0): SiteImage | undefined {
  return pageImages(slug)[index]
}
