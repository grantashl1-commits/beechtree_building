import { useEffect, useState } from "react"

/** Shape returned by /api/reviews (mirrors api/reviews.ts). */
export type Review = {
  id: string
  author: string
  avatar?: string
  authorUrl?: string
  rating: number
  text: string
  time?: string
  relativeTime?: string
}

export type ReviewsPayload = {
  source: "google-places" | "google-business-profile" | "none"
  rating?: number
  total?: number
  url?: string
  reviews: Review[]
}

/** Fetches live Google reviews; resolves to null if the API isn't configured or fails. */
export function useGoogleReviews() {
  const [data, setData] = useState<ReviewsPayload | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch("/api/reviews", { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<ReviewsPayload>) : null))
      .then((payload) => setData(payload && payload.source !== "none" && payload.reviews.length ? payload : null))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return { data, loading }
}
