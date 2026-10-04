# Beechtree Building — prototype → pitch → handover playbook

Three phases: **(1)** finish the prototype and pitch it, **(2)** hand ownership to the client
cleanly, **(3)** let the client make their own changes through Claude or ChatGPT. Google reviews
setup is at the end.

---

## 1. Finish the prototype and pitch it

The site is built. What's left is pulling in the client's real assets, then deploying a private preview.

### 1a. Import their logo, photos and copy

```bash
npm install
npm run scrape          # crawls beechtreebuilding.co.nz
npm run dev             # http://localhost:5173
```

`npm run scrape` downloads:

- **Logo** → `public/brand/logo.png`, trimmed. The header, footer, preloader and page transitions switch to it automatically, and it's knocked out to white on dark backgrounds.
- **Every photo** → `public/images/<page-slug>/01.webp …`, resized and converted to WebP at 2400px and 1200px.
- **Every page's text** → `scraped/pages/*.md`, for reviewing copy.
- **`src/content/media.json`**, which maps photos to pages. Old project URLs, like `/the-bridge-house`, match project slugs, so each project picks up its own photos.

Until the scrape has run, the site shows on-brand "dusk elevation" placeholders, so it never looks broken.

> The scraper was tested against a Squarespace-style fixture. It couldn't be run against the live site from the cloud build environment, because that network blocks the domain. Run it on your own machine.

Then:

1. Open `scraped/pages/*.md`. Ask Claude Code: *"Merge the verbatim copy from scraped/ into src/content, replacing anything marked VERIFY."* A few testimonials were paraphrased from search snippets, and one project (Skandi By The Lake) had no public description.
2. Check each project's cover photo, which is the first image in `media.json`. Reorder the entries if a better shot exists.
3. To use a palette from a moodboard image, give the image to Claude and ask it to *"update only the `--brand-*` tokens in src/index.css to match this image, keeping AA contrast."* Every colour on the site comes from those tokens.

### 1b. Deploy a private preview to pitch from

1. Push to a **private** GitHub repo under your account.
2. Go to vercel.com → **Add New → Project**, import the repo, and keep the "Vite" preset. You don't need any environment variables for the pitch: reviews fall back to their website testimonials, and the form shows a polite "email us instead".
3. Optionally, add a staging domain such as `beechtree.youragency.co.nz`. On Vercel Pro you can also password-protect the preview.
4. Pitch on a big screen with a mouse or trackpad. The scroll story, the horizontal project reel and the cursor effects are tuned for desktop, then show it on a phone.

**Talking points for a particular client**

- The "blueprint to home" scroll story is their build process, told the way they'd tell it on site.
- Every page is fast: photos are optimised WebP, and pages load on demand.
- Old Squarespace URLs redirect to the new pages, so Google rankings carry over.
- Reviews update themselves from Google.
- They can change text and photos by asking Claude or ChatGPT in plain English. Nothing goes live until they approve a preview.

---

## 2. Hand ownership to the client

**Principle:** everything ends up in accounts the client owns, under a company email such as
`web@beechtreebuilding.co.nz`, not a personal inbox. You stay on as an invited member, not the owner.
Share credentials through a password manager (1Password or Bitwarden shared vault), never by email.

| Service | What to do | Cost to client |
| --- | --- | --- |
| **GitHub** | The client creates a free GitHub **organisation** (e.g. `beechtree-building`). In your repo, go to **Settings → General → Transfer ownership** and pick that organisation. Redirects from the old URL keep working. Have them invite you as a member, then turn on branch protection for `main`: require a PR and the `CI` check. | Free |
| **Vercel** | Business sites need **Pro**, because Hobby is non-commercial only. The client creates a Pro team and invites you. In your Vercel project, use **Settings → General → Transfer project** with zero downtime. Env vars, domains and deployments move with it. Reconnect it to the transferred GitHub repo if prompted. Alternative: host it in your agency's Pro team and bill a monthly care plan. | US$20/user/month |
| **Domain / DNS** | Find where `beechtreebuilding.co.nz` is registered (often Squarespace Domains or an NZ registrar). In Vercel, add the domain. At the registrar, **add** an `A` record (`@ → 76.76.21.21`) and a `CNAME` (`www → cname.vercel-dns.com`), or the exact values Vercel shows. **Don't move nameservers or delete MX/TXT records**, or company email breaks. Cut over at a quiet time. | Unchanged |
| **Resend** (contact form) | Sign up as the client, or create the account and transfer team ownership. Under **Domains**, add `beechtreebuilding.co.nz` and add the SPF/DKIM records it shows. Create an API key, then set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` in Vercel. | Free up to 3,000 emails/month |
| **Google Cloud** (reviews) | Create the project under the **same Google account that manages their Business Profile**. Add a billing account; Google requires one, but this usage sits inside the free allowance. See section 4. | Free at this volume |
| **Supabase** | **Not needed.** The site has no database, and content lives in Git. If you add one later (lead CRM, client portal), create it under a Supabase org the client owns, or move it later with **Project Settings → Transfer project**. | — |
| **Squarespace** | Keep it running until DNS has switched and you've checked the new site. Then cancel, but keep the domain if it's registered there. `vercel.json` already 301-redirects the old project URLs. | Saves their subscription |

**Before switching DNS:** check every page on mobile, submit a test enquiry, confirm reviews load, and set
`GOOGLE_REVIEWS_URL` to their "Ask for reviews" link. After the switch, submit the sitemap in Google
Search Console. A prerender/sitemap step is a good phase-2 upsell.

---

## 3. Let the client edit through Claude or ChatGPT

The safe pattern: the AI edits the GitHub repo on a branch, then opens a pull request. Vercel posts a
preview link, the client checks it, and **merging publishes**. Nothing reaches the live site without
that click, and CI blocks anything that doesn't build.

Guardrails already in the repo:

- `AGENTS.md` (read by Codex, Cursor and others) and `CLAUDE.md` (read by Claude) tell any AI where content lives, the rules (small changes, true facts, no secrets, open a PR, run the build) and the recipes.
- All text is in `src/content/site.ts` and `src/content/projects.ts`, separate from the layout code.
- `npm run images` turns raw phone or camera photos into optimised images and registers them.
- `.github/workflows/ci.yml` runs lint and build on every PR. Make it a required check in branch protection.

### Option A: Claude (recommended)

1. The client signs in at claude.ai on a Pro/Max or Team plan and connects GitHub. The first time, they install the Claude GitHub app on their organisation.
2. They open **Claude Code** at claude.ai/code (or the Claude desktop/mobile app), pick the `beechtree-building` repo and type plain requests. For example: *"Change the phone number to 027 …"*, *"Add a new project called Lakeview Pavilion in Acacia Bay, architect X, 240 m²"*, or *"Make the Kinloch Retreat photo with the deck the cover image."*
3. Claude makes the change, runs the build and opens a PR with a summary. The client opens the Vercel preview link on the PR and clicks **Merge** when happy.

Optional: install the Claude GitHub Action (run `/install-github-app` from Claude Code). Then anyone can open a GitHub issue such as *"@claude please update the services intro to …"* and get a PR back. This works well for a team that doesn't want to open a chat.

### Option B: ChatGPT (Codex)

1. In ChatGPT, open **Codex** and connect GitHub. Give it access to the repo.
2. Create a task with the same kind of plain-English request. Codex reads `AGENTS.md`, makes the change and opens a PR.
3. Review the Vercel preview and merge.

### Adding photos

AI chats can't commit attached images directly. The reliable route:

1. On github.com, open the repo and go to `public/images/<project-slug>/`. Use **Add file → Upload files**, drop the JPGs in, and choose **"Create a new branch… and start a pull request"**.
2. In Claude or Codex: *"On branch X, run `npm run images` and use the new photos for <project>."*

### Optional visual editor

If they'd rather click than chat, add [Keystatic](https://keystatic.com) or [TinaCMS](https://tina.io) later. Both edit the same Git content, so the AI workflow keeps working alongside them.

---

## 4. Google reviews: how they stay live

`api/reviews.ts` fetches the business's Google rating and reviews on the server and caches them
on Vercel's edge for 3 hours, so a newly posted review shows up on its own within a few hours.
The API key never reaches the browser.

**Setup (about 15 minutes):**

1. In console.cloud.google.com, create a project and attach billing.
2. Under **APIs & Services → Library**, enable **Places API (New)**.
3. Under **Credentials**, create an API key and restrict it to *Places API (New)*. It's used server-side, so don't add a website restriction.
4. Find the **Place ID**: search "Beechtree Building Taupō" in Google's *Place ID Finder* (developers.google.com/maps/documentation/places/web-service/place-id). The `share.google/…` link the client sent opens the same listing.
5. In Vercel, set `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID`, then redeploy. Locally, put them in `.env.local`.

**Limits to tell the client about:** the Places API returns the overall rating, the review count and the
**5 reviews Google selects** for the listing, which are usually the most relevant rather than strictly the newest. The site shows
those newest-first and hides anything under 4★ (`REVIEWS_MIN_RATING`).

**Upgrade: every review, newest first.** Set the five `GBP_*` variables in `.env.example` and the
function switches to the **Google Business Profile API** automatically. That needs:

- the business owner to authorise once (OAuth) to get a refresh token, and
- Google to approve API access for the Cloud project through the Business Profile API access request form, which can take a couple of weeks.

Both providers are implemented and tested with mocked responses. Until either is configured, the
section shows the testimonials from the current website, labelled "Kind words" rather than "Google".

**Cost:** Google gives 1,000 free review calls a month, then US$25 per 1,000. With the 3-hour cache this site makes at most about 240 calls a month per Vercel region.
