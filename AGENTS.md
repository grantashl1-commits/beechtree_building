# Beechtree Building website — guide for AI assistants

This file is read by Claude, ChatGPT Codex, Cursor and other coding agents. The people
asking you for changes are usually the Beechtree team (builders, not developers), so:
make the change they asked for, keep everything else exactly as it is, explain what you
did in plain English, and always leave the site building cleanly.

## How the site works

- Vite + React + TypeScript, Tailwind CSS v4, shadcn/ui components, GSAP + Lenis for motion.
- Hosted on Vercel. Every pull request gets a preview link; merging to `main` publishes the live site.
- `api/` holds two Vercel functions: `reviews.ts` (live Google reviews) and `contact.ts` (enquiry emails via Resend).

## Where things live — edit these for everyday changes

| Change | File |
| --- | --- |
| Phone, email, address, social links, headlines, services, process, about text, awards, fallback testimonials | `src/content/site.ts` |
| Projects (add / remove / reorder / edit text, awards, testimonial) | `src/content/projects.ts` |
| Which photos belong to which page/project (generated) | `src/content/media.json` |
| Colours (the whole palette) | the `:root` block at the top of `src/index.css` |
| Photos | `public/images/<slug>/` |
| Logo | `public/brand/logo.svg` (single-colour; see docs/AGENT-PROMPT-PHOTOS.md step 6) |

### Recipes

- **Edit wording:** change the string in `src/content/site.ts` or `src/content/projects.ts`. Keep the existing structure and quotes.
- **Add a project:** copy an existing entry in `src/content/projects.ts`, give it a new unique kebab-case `slug`, fill in the fields. Its photos go in `public/images/<slug>/`.
- **Add photos:** follow `docs/PHOTOS.md`. Put the original JPG/PNG files in `public/images/<slug>/exterior/` or `/interior/` (or `home/`, `about/`, `services/`), then run `npm run images`. That converts them to optimised WebP, deletes the copies and registers them in `media.json`. Write `alt` text for each new entry, then run `npm run images -- --check`. The first exterior photo of a project is its cover. To reorder, reorder the entries in `media.json`.
- **Change colours:** edit only the `--brand-*` values in `src/index.css`. Check text stays readable (4.5:1 contrast on its background).
- **Feature a project on the home page:** set `featured: true` on it.

## Rules

1. Keep changes small and limited to what was asked. Don't refactor, rename or "tidy" unrelated code.
2. Don't change animation/scroll code in `src/components/sections/**` or `src/components/providers/**` unless explicitly asked — it's finely tuned.
3. Never put secrets (API keys, passwords) in the code. They live in Vercel → Settings → Environment Variables (see `.env.example`).
4. Facts must be true. Don't invent awards, numbers, testimonials or client names. If unsure, ask.
5. Before finishing, run `npm run build` (and `npm run lint`) and fix anything that fails.
6. Work on a branch and open a pull request — never push straight to `main`. In the PR description, list what changed in plain English and remind the reviewer to check the Vercel preview link.
7. Photos: only use images the client owns or is licensed to use. Give meaningful `alt` text where you can.

## Commands

```bash
npm ci               # first time (installs exact versions)
npm run dev          # local preview at http://localhost:5173 (also serves /api)
npm run build        # typecheck + production build — must pass
npm run lint         # oxlint
npm run images       # optimise + register new photos (see docs/PHOTOS.md); --check verifies
npm run scrape       # (one-off) re-import logo, photos and copy from the old website
```

## Design system

Palette and fonts are tokens in `src/index.css` (Instrument Serif for display, Inter Tight for text,
JetBrains Mono for small "blueprint" labels). For new UI, reuse the components in
`src/components/ui` (shadcn/ui) and the existing section patterns. The `ui-ux-pro-max` skill in
`.claude/skills/` has searchable design guidance if a larger design change is requested.
