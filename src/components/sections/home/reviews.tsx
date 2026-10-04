import { ArrowUpRight, Star } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { TransitionLink } from "@/components/providers/page-transition"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { projects } from "@/content/projects"
import { company } from "@/content/site"
import { useGoogleReviews, type Review } from "@/lib/reviews"
import { cn } from "@/lib/utils"

type Card = Review & { project?: { slug: string; title: string } }

/** Client testimonials from the current website, used until Google reviews are configured. */
const testimonialCards: Card[] = projects.flatMap((p) =>
  p.testimonial
    ? [{ id: p.slug, author: p.testimonial.author, rating: 0, text: p.testimonial.pull, project: { slug: p.slug, title: p.title } }]
    : [],
)

/**
 * Live Google reviews (via /api/reviews). New reviews appear automatically —
 * the API response is cached at the edge for three hours. Until the Google keys are
 * configured, the client's existing website testimonials are shown instead
 * (without star ratings, since those testimonials weren't rated).
 */
export function Reviews() {
  const { data } = useGoogleReviews()
  const live = data !== null
  const cards: Card[] = live ? data.reviews : testimonialCards
  const reviewUrl = data?.url ?? company.googleReviewUrl

  return (
    <section id="reviews" className="scroll-mt-24 overflow-hidden bg-paper py-24 md:py-36">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-beech-deep">(07) — {live ? "Reviews from Google" : "What our clients say"}</p>
          {live && data.rating ? (
            <div className="mt-8 flex items-end gap-4">
              <span className="display text-[clamp(5rem,10vw,9rem)] leading-[0.8]">{data.rating.toFixed(1)}</span>
              <div className="pb-2">
                <Stars rating={data.rating} className="text-beech" />
                {data.total ? <p className="mt-2 text-sm text-stone">{data.total} Google reviews</p> : null}
              </div>
            </div>
          ) : (
            <p className="display mt-8 text-[clamp(3rem,5.5vw,5rem)] leading-[0.95]">
              In their <span className="italic">own words.</span>
            </p>
          )}
          <p className="mt-8 max-w-sm text-stone">
            Honest, reliable and highly skilled — don't take our word for it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="h-11 rounded-full border-ink/20 bg-transparent px-5">
              <a href={reviewUrl} target="_blank" rel="noreferrer">
                <GoogleG /> {live ? "Read all reviews" : "Our Google reviews"} <ArrowUpRight />
              </a>
            </Button>
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <Carousel opts={{ align: "start", loop: cards.length > 2 }} className="w-full">
            <CarouselContent className="-ml-5">
              {cards.map((r) => (
                <CarouselItem key={r.id} className="pl-5 md:basis-1/2">
                  <ReviewCard review={r} google={live} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex items-center gap-3">
              <CarouselPrevious className="static size-12 translate-y-0 rounded-full border-ink/20 bg-transparent" />
              <CarouselNext className="static size-12 translate-y-0 rounded-full border-ink/20 bg-transparent" />
              {live && (
                <span className="eyebrow ml-auto inline-flex items-center gap-2 text-stone">
                  <GoogleG /> Reviews from Google
                </span>
              )}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review, google }: { review: Card; google: boolean }) {
  return (
    <figure className="flex h-full min-h-[340px] flex-col justify-between rounded-sm border border-line bg-limestone p-8 md:p-10">
      <div>
        {google && review.rating > 0 && <Stars rating={review.rating} className="mb-6 text-beech" />}
        <blockquote className="display line-clamp-[9] text-[1.65rem] leading-[1.15]">“{review.text}”</blockquote>
      </div>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-6">
        {review.avatar ? (
          <img src={review.avatar} alt="" referrerPolicy="no-referrer" className="size-10 rounded-full object-cover" />
        ) : (
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-lg text-limestone">
            {review.author.charAt(0)}
          </span>
        )}
        <div className="min-w-0">
          {review.authorUrl ? (
            <a href={review.authorUrl} target="_blank" rel="noreferrer" className="link-underline block truncate font-medium">
              {review.author}
            </a>
          ) : (
            <p className="truncate font-medium">{review.author}</p>
          )}
          {review.project ? (
            <TransitionLink
              to={`/projects/${review.project.slug}`}
              transitionLabel={review.project.title}
              className="link-underline text-xs text-stone"
            >
              {review.project.title}
            </TransitionLink>
          ) : (
            review.relativeTime && <p className="text-xs text-stone">{review.relativeTime}</p>
          )}
        </div>
        {google && <GoogleG className="ml-auto" />}
      </figcaption>
    </figure>
  )
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex gap-1", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("size-4", i < Math.round(rating) ? "fill-current" : "opacity-30")} />
      ))}
    </div>
  )
}

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-4 shrink-0", className)} aria-label="Google">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.6 13.2l7.9 6.2C12.4 13.7 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z" />
      <path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.2C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.8l7.9-6.2z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.3 0-11.6-4.2-13.5-10l-7.9 6.2C6.6 42.6 14.6 48 24 48z" />
    </svg>
  )
}
