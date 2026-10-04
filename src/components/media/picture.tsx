import type { SiteImage } from "@/content/media"
import { cn } from "@/lib/utils"
import { BlueprintPlaceholder } from "./blueprint-placeholder"

type PictureProps = {
  image?: SiteImage
  alt?: string
  /** Name used for the placeholder (and its caption) until real photography is available. */
  label?: string
  /** Show the "photography to come" caption on the placeholder. */
  caption?: boolean
  sizes?: string
  priority?: boolean
  className?: string
  imgClassName?: string
}

/**
 * Responsive image with 1200w/2400w sources. When a photo hasn't been scraped
 * or supplied yet, renders an architectural line-drawing placeholder instead.
 */
export function Picture({ image, alt, label, caption = true, sizes = "100vw", priority, className, imgClassName }: PictureProps) {
  return (
    <div className={cn("relative overflow-hidden bg-charcoal", className)}>
      {image ? (
        <img
          src={image.src}
          srcSet={image.srcSmall ? `${image.srcSmall} 1200w, ${image.src} 2400w` : undefined}
          sizes={sizes}
          width={image.width}
          height={image.height}
          alt={alt ?? image.alt ?? ""}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          draggable={false}
          className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
        />
      ) : (
        <BlueprintPlaceholder
          seed={label ?? alt ?? "beechtree"}
          label={caption ? label : undefined}
          className={cn("absolute inset-0", imgClassName)}
        />
      )}
    </div>
  )
}
