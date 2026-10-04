# Prompt: add the real project photos

Copy everything inside the box below into your coding agent (Claude Code, ChatGPT Codex, Cursor…),
after filling in the one line marked **FILL IN**.

---

```text
You are adding Beechtree Building's real photography to their new website.

REPO:   https://github.com/grantashl1-commits/beechtree_building
BASE:   branch `main` if it exists, otherwise `claude/brave-euler-e4juje`
PHOTOS: FILL IN → the folder with the downloaded photos, e.g. "~/Downloads/beechtree-photos"
        (one sub-folder per project). If you can't access that folder, ask me to upload the
        photos to a branch on GitHub instead (see "If the photos are on GitHub" below).

Read AGENTS.md and docs/PHOTOS.md in the repo first and follow them. They describe the
folder structure, the image script and the rules (small changes only, true facts, no secrets,
build must pass, finish with a pull request).

## Goal
Replace the interim, low-resolution images (cropped from screenshots of the old site) with the
original photos, for exactly the nine projects that are on the current beechtreebuilding.co.nz:

| Project (as named on the old site) | Folder slug            |
|------------------------------------|------------------------|
| The Bridge House                   | the-bridge-house       |
| Whareroa Hideaway                  | whareroa-hideaway      |
| Kinloch Retreat                    | kinloch-retreat        |
| Oak Leaf Abode                     | oak-leaf-abode         |
| Curved by the Course               | curved-by-the-course   |
| Hawk Ridge                         | hawk-ridge             |
| Wild at Heart                      | wild-at-heart          |
| The Boathouse                      | the-boathouse          |
| Clad to Meet You                   | clad-to-meet-you       |

Do not add, remove or rename projects. If my download folder contains photos for anything that
isn't in this table, list them in the PR and leave them out. Match my sub-folder names to these
projects by name. If a match is ambiguous, stop and ask.

## Steps
1. Clone the repo, check out BASE, then create a new branch `photos/original-project-photos`.
   Run `npm install`.

2. For each project, copy (don't move) my originals into:
     public/images/<slug>/exterior/   ← outside shots
     public/images/<slug>/interior/   ← inside shots
   The old site shows each project as an EXTERIOR and an INTERIOR gallery. If my folders are
   already split that way, keep my split. If not, look at each photo and sort it yourself.
   Rename files with a two-digit prefix to set the order (01-, 02-, …):
     - exterior/01 must be the project's COVER. Pick the strongest wide, landscape shot of the
       whole house: no people, nothing cropped awkwardly, and sharp.
     - then the remaining exterior shots, then interior shots in a sensible walk-through order
       (entry → living → kitchen → bedrooms → bathrooms → details).
   Skip exact duplicates and any image under ~1200px wide; list the skipped files in the PR.

3. Site-wide images (copy the chosen files; the same photo may also stay in its project folder):
     public/images/home/01-…      the home page hero: the single most impressive wide exterior
                                  photo across all projects (the old home page slider opened on
                                  The Bridge House courtyard deck, which is a good default)
     public/images/about/01-…     About page image: a portrait-friendly interior or detail shot
     public/images/services/01-…  New Homes  → a striking new-home exterior (the old Services
                                  page banner was an aerial of Hawk Ridge with its pool)
     public/images/services/02-…  Additions  → a neutral interior or detail shot
     public/images/services/03-…  Renovations → a neutral interior or detail shot
     public/images/craft/01-…     2–4 close-up craftsmanship details (timber joinery, doors,
                                  cladding, stonework)
   We have no dedicated Additions or Renovations photos, so don't describe the chosen images as
   additions or renovations anywhere. Note in the PR that dedicated photos would be better.

4. Run:  npm run images -- --replace
   This replaces the interim images for every folder that now has new photos. It converts each
   photo to optimised WebP (2400px + 1200px) and registers it in src/content/media.json.
   Folders without new photos keep their interim images.

5. Alt text: open src/content/media.json and give every new entry a short, specific "alt",
   written by looking at the actual photo, e.g.
   "Oak Leaf Abode — hemlock-lined kitchen with polished concrete floor". Don't invent facts
   that aren't visible or stated in src/content/projects.ts.

6. Optional extras, only if I supplied them:
   - Whareroa press PDFs (Here-28_Whareroa.pdf, Here-32-_Whareroa.pdf): put them in
     public/press/ and point the two matching links in src/content/projects.ts at
     /press/<filename>.
   - An original logo file in SVG: replace public/brand/logo.svg (keep the file name). Then update
     SVG_LOGO_RATIO in src/components/brand/logo.tsx to the new viewBox width ÷ height.
     Otherwise don't touch the logo.

7. Check your work:
   - `npm run build` and `npm run lint` pass.
   - No original JPG/PNG files remain under public/images/ (only NN.webp / NN-1200.webp),
     and no .DS_Store or other stray files are committed.
   - `npm run dev`, then look at: / (hero, "Selected works" reel, services hover images),
     /projects, each /projects/<slug> page (cover, Exterior and Interior galleries, lightbox),
     /services and /about. Every page should show real photos, not the "dusk drawing"
     placeholders. Take screenshots if you can.
   - Report the total size of public/images (`du -sh public/images`).

8. Commit with a clear message, push the branch, and open a pull request into BASE.
   In the PR description include:
   - a table: project → number of exterior / interior photos → which file you chose as cover
   - which photos you used for home, about, services and craft
   - anything skipped or missing, and any questions for me
   - a reminder to check the Vercel preview link on the PR before merging

## Rules
- Only change files under public/images/, public/press/, public/brand/ (logo, if supplied),
  src/content/media.json, and the two press links in src/content/projects.ts. Don't change any
  wording, layout, animation or dependency.
- Use only the photos I supplied. No stock images, no AI-generated or AI-edited images, and no
  photos from other websites.
- Never push to BASE directly and never force-push.

## If the photos are on GitHub instead of a local folder
I'll upload them on github.com into a branch named `photos-inbox`, at
public/images/<slug>/exterior/ and public/images/<slug>/interior/. Check out that branch, then
start from step 2's ordering and renaming rules. Create your working branch from `photos-inbox`
rather than BASE, and open the PR into BASE.
```

---

## Tips for downloading the photos

- On each project page of the current site, open every photo in the Exterior and Interior galleries and save the **full-size** version, not the thumbnail. Right-click the photo → *Open image in new tab*, then save the image that opens.
- Make one folder per project, named like the project ("The Bridge House"), with `exterior` and `interior` sub-folders if you can.
- Also save:
  - the **home page slider** photos, for the home hero
  - the **Services page banner** (the Hawk Ridge aerial)
  - the two Whareroa **HERE magazine PDFs**
