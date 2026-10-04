# Beechtree Building — website

A "builder's showhome" website for [Beechtree Building](https://www.beechtreebuilding.co.nz), the
award-winning Registered Master Builders in Taupō.

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · GSAP (ScrollTrigger, SplitText, DrawSVG) · Lenis · Vercel Functions · Resend · Google Places API

## Quick start

```bash
npm install
npm run scrape     # one-off: import the logo, photos and copy from the current site
npm run dev        # http://localhost:5173 (serves /api/* too)
```

Copy `.env.example` to `.env.local` to switch on live Google reviews and the contact form locally.

## What's in it

- **Preloader → hero:** a site-survey counter lifts away like a curtain, the headline rises out of line masks, and the hero photo pulls back into a framed picture as you scroll.
- **"From blueprint to home" scroll story:** a pinned, scrubbed sequence that surveys the site, draws the plans, pours the slab, frames, clads and glazes a lakeside house, then shifts to dusk as the windows light up for handover.
- **Selected works:** a pinned horizontal reel with parallax inside each frame. On touch devices it's a native swipe.
- **Services:** oversized rows, with a photo that follows the cursor on desktop.
- **Live Google reviews** via `api/reviews.ts`, with the existing testimonials as a fallback.
- **Enquiry form** via `api/contact.ts` (Resend), with a honeypot and a mailto fallback.
- **Page transitions:** an ink curtain wipe between routes.
- **Old Squarespace URLs** 301-redirect to their new pages (`vercel.json`).
- **Accessibility:** reduced motion turns off pinning and scrubbing and shows the finished scene with every chapter. The site also has a skip link, visible focus rings and semantic landmarks.

## Editing content

All words live in `src/content/` and all colours in the `:root` block of `src/index.css`.
See **[AGENTS.md](./AGENTS.md)** for recipes. It's written for both people and AI assistants.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with the `/api` functions |
| `npm run build` | Typecheck and production build |
| `npm run lint` | oxlint |
| `npm run scrape` | Crawl the old site and import its logo, photos (as WebP) and copy |
| `npm run images` | Optimise new photos dropped into `public/images/<slug>/` |

## Deploying

Import the repo into Vercel and keep the Vite preset. Add the environment variables from `.env.example`.
The full prototype → handover → client-editing guide is in **[docs/PLAYBOOK.md](./docs/PLAYBOOK.md)**.

## Credits

UI primitives from [shadcn/ui](https://github.com/shadcn-ui/ui) (MIT). Design reasoning via the
[UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) skill (MIT), included in
`.claude/skills/` for future design work.
