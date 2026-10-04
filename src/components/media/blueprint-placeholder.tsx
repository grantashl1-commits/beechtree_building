import { useId, useMemo } from "react"
import { cn } from "@/lib/utils"

/**
 * A seeded, on-brand "dusk elevation" used wherever a photograph is missing.
 * Every seed produces a different lakeside house so grids never look repetitive.
 * Real photos (from `npm run scrape` or supplied by the client) replace these automatically.
 */

const PALETTES = [
  { top: "#1d2a30", bottom: "#56707a", hills: "#22313a", ground: "#141a1c", house: "#0f1213", line: "#c9a063" },
  { top: "#23281f", bottom: "#7b7a5d", hills: "#2c3327", ground: "#161812", house: "#101110", line: "#d6b47a" },
  { top: "#1a1817", bottom: "#6d5a4a", hills: "#2a2522", ground: "#121010", house: "#0d0c0b", line: "#e0b981" },
  { top: "#20262f", bottom: "#8a7f74", hills: "#2b323b", ground: "#15181c", house: "#0e1012", line: "#f5c27a" },
]

function rng(seed: string) {
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

function ridge(rand: () => number, baseY: number, amp: number, steps: number) {
  const pts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const x = (1600 / steps) * i
    const y = baseY - rand() * amp
    pts.push(`${x.toFixed(0)},${y.toFixed(0)}`)
  }
  return `M0,1000 L${pts.join(" L")} L1600,1000 Z`
}

export function BlueprintPlaceholder({ seed, label, className }: { seed: string; label?: string; className?: string }) {
  const uid = useId().replace(/:/g, "")
  const scene = useMemo(() => {
    const rand = rng(seed)
    const palette = PALETTES[Math.floor(rand() * PALETTES.length)]
    const horizon = 600 + rand() * 60
    const width = 560 + rand() * 360
    const x = 220 + rand() * (1600 - width - 440)
    const ground = horizon + 150
    const tallW = width * (0.38 + rand() * 0.18)
    const tallH = 230 + rand() * 90
    const lowH = 130 + rand() * 50
    const roof = Math.floor(rand() * 3) // 0 flat, 1 skillion, 2 gable
    const glassCols = 3 + Math.floor(rand() * 4)
    return {
      palette,
      horizon,
      ground,
      far: ridge(rand, horizon - 40, 140, 9),
      near: ridge(rand, horizon + 10, 60, 6),
      x,
      width,
      tallW,
      tallH,
      lowH,
      roof,
      glassCols,
    }
  }, [seed])

  const { palette: p, ground, x, width, tallW, tallH, lowH, roof, glassCols } = scene
  const lowX = x + tallW
  const lowW = width - tallW
  const roofPath =
    roof === 0
      ? `M${lowX - 10},${ground - lowH} H${lowX + lowW + 40} v-12 H${lowX - 10} Z`
      : roof === 1
        ? `M${lowX - 10},${ground - lowH} L${lowX + lowW + 50},${ground - lowH - 46} v-12 L${lowX - 10},${ground - lowH - 12} Z`
        : `M${lowX - 10},${ground - lowH} L${lowX + lowW / 2},${ground - lowH - 70} L${lowX + lowW + 10},${ground - lowH} Z`

  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={label ? `${label} — photography coming soon` : "Photography coming soon"}
    >
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.top} />
          <stop offset="1" stopColor={p.bottom} />
        </linearGradient>
        <radialGradient id={`glow-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={p.line} stopOpacity="0.55" />
          <stop offset="1" stopColor={p.line} stopOpacity="0" />
        </radialGradient>
        <pattern id={`grid-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#fff" strokeOpacity="0.04" />
        </pattern>
      </defs>
      <rect width="1600" height="1000" fill={`url(#sky-${uid})`} />
      <path d={scene.far} fill={p.hills} opacity="0.65" />
      <rect y={scene.horizon} width="1600" height={1000 - scene.horizon} fill={p.bottom} opacity="0.25" />
      <path d={scene.near} fill={p.hills} />
      <rect y={ground} width="1600" height={1000 - ground} fill={p.ground} />

      {/* light spill */}
      <ellipse cx={x + width / 2} cy={ground} rx={width * 0.8} ry="120" fill={`url(#glow-${uid})`} />

      {/* house */}
      <rect x={x} y={ground - tallH} width={tallW} height={tallH} fill={p.house} />
      <rect x={lowX} y={ground - lowH} width={lowW} height={lowH} fill={p.house} />
      <path d={roofPath} fill={p.house} />
      <rect x={x + 26} y={ground - tallH + 34} width={tallW - 52} height={tallH * 0.28} fill={p.line} opacity="0.85" />
      {Array.from({ length: glassCols }).map((_, i) => {
        const gw = (lowW - 40) / glassCols
        return (
          <rect
            key={i}
            x={lowX + 20 + i * gw + 3}
            y={ground - lowH + 22}
            width={gw - 6}
            height={lowH - 30}
            fill={p.line}
            opacity={0.55 + ((i * 37) % 40) / 100}
          />
        )
      })}
      <rect x={x - 60} y={ground - 2} width={width + 160} height="4" fill={p.line} opacity="0.35" />

      <rect width="1600" height="1000" fill={`url(#grid-${uid})`} />
      {label && (
        <text
          x="48"
          y="952"
          fill="#fff"
          fillOpacity="0.5"
          fontFamily="JetBrains Mono Variable, monospace"
          fontSize="22"
          letterSpacing="5"
        >
          {label.toUpperCase()} — PHOTOGRAPHY TO COME
        </text>
      )}
    </svg>
  )
}
