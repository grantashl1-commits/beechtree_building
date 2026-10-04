/**
 * GET /api/reviews — live Google reviews for the business, normalised for the site.
 *
 * Provider A (default) — Google Places API (New)
 *   env: GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID
 *   Overall rating + review count, plus the (max 5) reviews Google selects for the listing.
 *
 * Provider B (optional) — Google Business Profile API: EVERY review, newest first.
 *   env: GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN, GBP_ACCOUNT_ID, GBP_LOCATION_ID
 *   Requires the business owner's Google login (OAuth) and API access approval from Google.
 *   Used automatically whenever its env vars are present.
 *
 * Optional: REVIEWS_MIN_RATING (default 4), GOOGLE_REVIEWS_URL ("read all" link override).
 *
 * The response is cached on Vercel's edge for 3 hours (and served stale for up to a day
 * while refreshing), so a new Google review appears on the site within ~3 hours. That keeps
 * usage to ≤240 Google calls/month per Vercel region — inside Google's free monthly allowance
 * for Place Details with reviews (1,000 calls; then US$25 per 1,000).
 */

type Review = {
  id: string
  author: string
  avatar?: string
  authorUrl?: string
  rating: number
  text: string
  time?: string
  relativeTime?: string
}

type ReviewsPayload = {
  source: "google-places" | "google-business-profile" | "none"
  rating?: number
  total?: number
  url?: string
  reviews: Review[]
}

const CACHE_OK = "public, s-maxage=10800, stale-while-revalidate=86400"
const CACHE_EMPTY = "public, s-maxage=300"

export default {
  async fetch(request: Request) {
    if (request.method !== "GET") return json({ error: "Method not allowed" }, 405)

    const env = process.env
    const useGbp = Boolean(env.GBP_REFRESH_TOKEN && env.GBP_CLIENT_ID && env.GBP_CLIENT_SECRET && env.GBP_ACCOUNT_ID && env.GBP_LOCATION_ID)
    const usePlaces = Boolean(env.GOOGLE_PLACES_API_KEY && env.GOOGLE_PLACE_ID)
    if (!useGbp && !usePlaces) return json({ source: "none", reviews: [] } satisfies ReviewsPayload, 200, CACHE_EMPTY)

    try {
      const payload = useGbp ? await fromBusinessProfile() : await fromPlaces()
      const minRating = Number(env.REVIEWS_MIN_RATING ?? 4)
      payload.reviews = payload.reviews.filter((r) => r.rating >= minRating && r.text.trim().length > 0)
      if (env.GOOGLE_REVIEWS_URL) payload.url = env.GOOGLE_REVIEWS_URL
      return json(payload, 200, CACHE_OK)
    } catch (error) {
      console.error("[api/reviews]", error)
      // The site falls back to its built-in testimonials; retry Google again shortly.
      return json({ source: "none", reviews: [] } satisfies ReviewsPayload, 200, "public, s-maxage=60")
    }
  },
}

/* ── Provider A: Places API (New) ─────────────────────────────────────────── */

type PlacesReview = {
  name: string
  rating?: number
  text?: { text: string }
  originalText?: { text: string }
  publishTime?: string
  relativePublishTimeDescription?: string
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string }
}

async function fromPlaces(): Promise<ReviewsPayload> {
  const placeId = encodeURIComponent(process.env.GOOGLE_PLACE_ID!)
  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=en`, {
    headers: {
      "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY!,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
    },
  })
  if (!res.ok) throw new Error(`Places API ${res.status}: ${await res.text()}`)
  const place = (await res.json()) as {
    rating?: number
    userRatingCount?: number
    googleMapsUri?: string
    reviews?: PlacesReview[]
  }

  return {
    source: "google-places",
    rating: place.rating,
    total: place.userRatingCount,
    url: place.googleMapsUri,
    reviews: (place.reviews ?? [])
      .map((r) => ({
        id: r.name,
        author: r.authorAttribution?.displayName ?? "Google user",
        avatar: r.authorAttribution?.photoUri,
        authorUrl: r.authorAttribution?.uri,
        rating: r.rating ?? 0,
        text: r.originalText?.text ?? r.text?.text ?? "",
        time: r.publishTime,
        relativeTime: r.relativePublishTimeDescription,
      }))
      .sort((a, b) => (b.time ?? "").localeCompare(a.time ?? "")),
  }
}

/* ── Provider B: Google Business Profile API ──────────────────────────────── */

const STARS: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }

type GbpReview = {
  reviewId: string
  reviewer: { displayName?: string; profilePhotoUrl?: string; isAnonymous?: boolean }
  starRating: string
  comment?: string
  createTime: string
}

async function fromBusinessProfile(): Promise<ReviewsPayload> {
  const env = process.env
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GBP_CLIENT_ID!,
      client_secret: env.GBP_CLIENT_SECRET!,
      refresh_token: env.GBP_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  })
  if (!tokenRes.ok) throw new Error(`Google OAuth ${tokenRes.status}: ${await tokenRes.text()}`)
  const { access_token } = (await tokenRes.json()) as { access_token: string }

  const url = `https://mybusiness.googleapis.com/v4/accounts/${env.GBP_ACCOUNT_ID}/locations/${env.GBP_LOCATION_ID}/reviews?pageSize=50&orderBy=updateTime%20desc`
  const res = await fetch(url, { headers: { authorization: `Bearer ${access_token}` } })
  if (!res.ok) throw new Error(`Business Profile API ${res.status}: ${await res.text()}`)
  const data = (await res.json()) as { averageRating?: number; totalReviewCount?: number; reviews?: GbpReview[] }

  return {
    source: "google-business-profile",
    rating: data.averageRating,
    total: data.totalReviewCount,
    reviews: (data.reviews ?? []).map((r) => ({
      id: r.reviewId,
      author: r.reviewer.isAnonymous ? "Google user" : (r.reviewer.displayName ?? "Google user"),
      avatar: r.reviewer.profilePhotoUrl,
      rating: STARS[r.starRating] ?? 0,
      text: originalComment(r.comment ?? ""),
      time: r.createTime,
      relativeTime: relativeTime(r.createTime),
    })),
  }
}

/** GBP appends machine translations — keep the reviewer's own words. */
function originalComment(comment: string) {
  const original = comment.split("(Original)\n")[1]
  return (original ?? comment.split("\n\n(Translated by Google)")[0]).trim()
}

function relativeTime(iso: string) {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31_536_000],
    ["month", 2_592_000],
    ["week", 604_800],
    ["day", 86_400],
    ["hour", 3_600],
  ]
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit)
  }
  return "just now"
}

function json(body: unknown, status = 200, cacheControl = "no-store") {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": cacheControl },
  })
}
