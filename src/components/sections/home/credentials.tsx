import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { architects, awards, credentials } from "@/content/site"

export function Credentials() {
  return (
    <section className="overflow-hidden bg-limestone py-24 md:py-32">
      <div className="container-site">
        <p className="eyebrow text-beech-deep">(03) — Recognition</p>
        <Reveal className="mt-10 grid grid-cols-2 border-t border-l border-line lg:grid-cols-4">
          {credentials.map((c) => (
            <div key={c.label} className="border-r border-b border-line p-6 md:p-8">
              <p className="display text-[clamp(3rem,6vw,5.5rem)] leading-none">{c.value}</p>
              <p className="mt-3 text-sm text-stone">{c.label}</p>
            </div>
          ))}
        </Reveal>
      </div>

      <Marquee className="mt-20 border-y border-line py-6" duration={55}>
        {awards.map((a) => (
          <span key={a} className="flex items-center">
            <span className="display px-8 text-[clamp(2rem,4vw,3.75rem)] whitespace-nowrap italic">{a}</span>
            <Star />
          </span>
        ))}
      </Marquee>

      <div className="container-site mt-20 grid gap-8 md:grid-cols-12">
        <p className="eyebrow text-stone md:col-span-3">Trusted by New Zealand's leading architects</p>
        <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 md:col-span-9">
          {architects.map((name) => (
            <li key={name} className="display border-b border-line pb-4 text-[clamp(1.5rem,2.4vw,2.25rem)]">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-beech" aria-hidden>
      <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" fill="currentColor" />
    </svg>
  )
}
