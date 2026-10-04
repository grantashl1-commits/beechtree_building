import { ArrowUpRight } from "lucide-react"
import { useRef, useState, type PointerEvent } from "react"
import { Picture } from "@/components/media/picture"
import { TransitionLink } from "@/components/providers/page-transition"
import { getProject } from "@/content/projects"
import { services } from "@/content/site"
import { gsap, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

/** Oversized service rows; on desktop a photo trails the cursor while hovering. */
export function ServicesList() {
  const root = useRef<HTMLElement>(null)
  const follower = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const moveTo = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null)

  useGSAP(
    () => {
      if (!follower.current) return
      moveTo.current = {
        x: gsap.quickTo(follower.current, "x", { duration: 0.7, ease: "power3" }),
        y: gsap.quickTo(follower.current, "y", { duration: 0.7, ease: "power3" }),
      }
    },
    { scope: root },
  )

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return
    const box = root.current!.getBoundingClientRect()
    moveTo.current?.x(e.clientX - box.left)
    moveTo.current?.y(e.clientY - box.top)
  }

  return (
    <section ref={root} onPointerMove={onMove} className="relative bg-limestone py-24 md:py-36">
      <div className="container-site">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-beech-deep">(05) — What we build</p>
            <h2 className="display mt-4 text-[clamp(2.75rem,6vw,6rem)]">Services</h2>
          </div>
          <p className="max-w-sm text-stone">
            New homes, additions and renovations — delivered with a passion for architecture and design, on time and on budget.
          </p>
        </div>

        <ul onPointerLeave={() => setActive(null)}>
          {services.map((s, i) => (
            <li key={s.slug} onPointerEnter={() => setActive(i)} className="border-t border-line last:border-b">
              <TransitionLink
                to={`/services#${s.slug}`}
                transitionLabel="Services"
                className="group grid items-baseline gap-4 py-8 md:grid-cols-12 md:py-10"
              >
                <span className="eyebrow text-stone md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-[clamp(2.75rem,7vw,7.5rem)] leading-[0.9] transition-[transform,color] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-beech md:col-span-6">
                  {s.title}
                </span>
                <span className="text-stone md:col-span-4">{s.lead}</span>
                <ArrowUpRight className="hidden size-7 justify-self-end transition-transform duration-500 group-hover:rotate-45 md:col-span-1 md:block" />
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Cursor-following photo (desktop) */}
      <div
        ref={follower}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-10 hidden lg:block"
      >
        <div
          className={cn(
            "relative -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)]",
            active === null ? "scale-75 opacity-0" : "scale-100 opacity-100",
          )}
          style={{ width: 340, height: 420 }}
        >
          {services.map((s, i) => (
            <Picture
              key={s.slug}
              image={getProject(s.imageFrom)?.images[0]}
              label={s.title}
              sizes="340px"
              className={cn("absolute inset-0 transition-opacity duration-500", active === i ? "opacity-100" : "opacity-0")}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
