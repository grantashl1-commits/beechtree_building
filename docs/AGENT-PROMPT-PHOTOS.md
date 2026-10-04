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

Read AGENTS.md and docs/PHOTOS.md in the repo first and follow them.

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
1. Get the code. If you're not already inside a checkout of the repo, clone it. Check out BASE,
   then create a new branch `photos/original-project-photos` (if that branch already exists, add
   a suffix such as `-2`). Run `npm ci` (not `npm install`, which can rewrite package-lock.json).

2. Prepare my originals. Work from COPIES; never move or edit the files in my download folder.
   - Convert any .HEIC/.HEIF photos to JPEG first (macOS: `sips -s format jpeg in.heic --out out.jpg`;
     Linux: `heif-convert in.heic out.jpg`). Check real types with `file`; don't just rename extensions.
   - Skip exact duplicates and any image under ~1200px wide; list the skipped files in the PR.
   - For each project, copy the photos into these two flat folders (lowercase names, no sub-folders):
       public/images/<slug>/exterior/   ← outside shots
       public/images/<slug>/interior/   ← inside shots
     The old site shows each project as an EXTERIOR and an INTERIOR gallery. If my folders are
     already split that way, keep my split. If not, look at each photo and sort it yourself.
   - Name every file `NN-short-description.ext` (e.g. `01-courtyard-deck.jpg`). Never name a file
     just `01.webp`. The two-digit prefix sets the order:
       • exterior/01 is the project's COVER: the hero of its page, its card on /projects, the
         home page reel, and the "Next project" banner. Pick the strongest wide, landscape shot
         of the whole house: no people, nothing cropped awkwardly, and sharp. The cover is not
         repeated in the Exterior gallery.
       • Then the remaining exterior shots, then interior shots in a sensible walk-through order
         (entry → living → kitchen → bedrooms → bathrooms → details).
       • Gallery layout: in each gallery, positions 1, 4, 7… are shown full-width at 16:9 and the
         others are cropped to tall 4:5. For the Exterior gallery, position 1 is exterior/02.
         Put landscape shots in the wide positions and portrait-friendly shots in between.

3. Site-wide photos. Copy the chosen files; the same photo can also stay in its project folder.
   Name them as in step 2:
     public/images/home/01-…      HOME HERO: the single most impressive wide exterior across all
                                  projects. The old home slider opened on The Bridge House
                                  courtyard deck, which is a good default.
     public/images/home/02-…      Full-width background behind the home page line "A square
                                  corner and a straight wall, every time." It's darkened, with text
                                  over it, so use a calm, landscape craftsmanship or interior shot.
     public/images/about/01-…     About page image (shown tall, 4:5): an interior or detail shot.
     public/images/services/01-…  New Homes   → a striking new-home exterior (the old Services
                                  page banner was an aerial of Hawk Ridge with its pool).
     public/images/services/02-…  Additions   → a neutral interior or detail shot.
     public/images/services/03-…  Renovations → a neutral interior or detail shot.
     public/images/craft/01-…     OPTIONAL, one photo: a close-up detail. It's only shown where
                                  about/ or services/02 or home/02 is missing.
   We have no dedicated Additions or Renovations photos, so don't describe the chosen images as
   additions or renovations anywhere. Note in the PR that dedicated photos would be better.

4. Process. Run this ONCE, after every photo is in place:
     npm run images -- --replace
   It validates every file first and changes nothing if any file is bad. Then it converts each
   photo to optimised WebP (2400px + 1200px), with a content hash in the file name, replaces the
   interim images in each folder that has new photos, deletes the copied originals and updates
   src/content/media.json. Folders without new photos keep their interim images.
   - If it prints "Nothing was changed", fix the files it lists and run the same command again.
   - To add a photo you forgot, put it in the right folder and run plain `npm run images` (it
     appends; --replace deliberately refuses to wipe photos an earlier run added). Then move its
     entry to the right place in src/content/media.json.
   - Don't rename or hand-copy the generated .webp files.
   - If things get into a mess, reset and start the step again:
       git checkout -- public/images src/content/media.json && git clean -fd public/images

5. Alt text. In src/content/media.json, give every entry with "alt": "" a short, specific
   description written by looking at the actual photo (the "original" field tells you which
   file it came from), e.g. "Oak Leaf Abode — hemlock-lined kitchen with polished concrete
   floor". Don't invent facts that aren't visible or stated in src/content/projects.ts. Then run
   `npm run images -- --check`. It must print ✓.

6. Optional extras, only if I supplied them:
   - Whareroa press PDFs: save them in public/press/ as exactly `Here-28_Whareroa.pdf` and
     `Here-32-_Whareroa.pdf` (drop browser suffixes like " (1)"). Point the two matching links in
     src/content/projects.ts at /press/Here-28_Whareroa.pdf and /press/Here-32-_Whareroa.pdf,
     and delete the comment above them that says they're hosted on the old website.
   - An original logo as a SINGLE-COLOUR SVG: it must have a viewBox, a transparent background,
     text converted to outlines, and no linked images. The site paints the logo as a mask in one
     colour, so colours inside the file are ignored. Replace public/brand/logo.svg (keep the name),
     then set SVG_LOGO_RATIO in src/components/brand/logo.tsx to its viewBox width ÷ height.
     Check it in the dark header (home) and the light header (/about). Leave the favicon alone.
     If the logo isn't an SVG, don't touch the logo.

7. Check your work:
   - `npm run images -- --check`, `npm run build` and `npm run lint` all pass.
   - `npm run dev`, then look at every place photos appear:
       / ........ hero; the two small photo "pills" in the opening statement (Whareroa and
                  Kinloch covers); the "Selected works" reel; the services hover photos
                  (desktop); the "A square corner…" section background
       /projects  every card
       /projects/<slug> for all nine: hero cover, Exterior and Interior galleries, lightbox,
                  "Next project" banner
       /services and /about
     Every page should show real photos, not the "dusk drawing" placeholders. Take screenshots if
     you can.
   - Report the total size of public/images (`du -sh public/images`).

8. Commit with a clear message, push the branch, and open a pull request into BASE.
   In the PR description include:
   - a table: project → number of exterior / interior photos → which original you chose as cover
   - which photos you used for home 01/02, about, services 01–03 and craft
   - anything skipped or missing (with reasons), and any questions for me
   - a reminder to check the Vercel preview link on the PR before merging

## Rules
- Only change files under public/images/, public/press/ and public/brand/logo.svg, plus
  src/content/media.json, the two press links (and their comment) in src/content/projects.ts,
  and the SVG_LOGO_RATIO line in src/components/brand/logo.tsx (only if a new SVG logo was
  supplied). Don't change any wording, layout, animation or dependency.
- Use only the photos I supplied. No stock images, no AI-generated or AI-edited images, and no
  photos from other websites.
- Never push to BASE directly and never force-push.

## If the photos are on GitHub instead of a local folder
I'll upload them on github.com into a branch named `photos-inbox`, at
public/images/<slug>/exterior/ and public/images/<slug>/interior/. Check out that branch, then
start from step 2's preparation and naming rules. Create your working branch from `photos-inbox`
rather than BASE, and open the PR into BASE. The full-size originals will be in that branch's
history, so say in the PR that it should be squash-merged.
```

---

## Tips for downloading the photos

- On each project page of the current site, open every photo in the Exterior and Interior galleries and save the **full-size** version, not the thumbnail. Right-click the photo → *Open image in new tab*. If the address contains `images.squarespace-cdn.com`, change or add `?format=2500w` at the end of the address, press Enter, then save the image.
- Make one folder per project, named like the project ("The Bridge House"), with `exterior` and `interior` sub-folders if you can.
- Also save:
  - the **home page slider** photos, for the home hero
  - the **Services page banner** (the Hawk Ridge aerial)
  - the two Whareroa **HERE magazine PDFs**
