# Photos: where each image goes

Every photo on the site comes from `public/images/<folder>/`. You drop original JPG/PNG files into
the right folder, run one command, and the site picks them up. You never edit code to add a photo.

```
public/images/
├── home/        01 = home page hero (wide landscape, the best "wow" shot)
│                02 = full-width background behind "A square corner and a straight wall" (darkened)
├── about/       01 = About page image (shown tall, 4:5)
├── services/    01 = New Homes · 02 = Additions · 03 = Renovations
├── craft/       01 = optional close-up detail; only shown where home/02, about/ or services/02 is missing
├── the-bridge-house/
│   ├── exterior/   → "Exterior" gallery; the FIRST exterior photo is the project's cover
│   └── interior/   → "Interior" gallery
├── whareroa-hideaway/        (same exterior/ + interior/ structure for every project)
├── kinloch-retreat/
├── oak-leaf-abode/
├── curved-by-the-course/
├── hawk-ridge/
├── wild-at-heart/
├── the-boathouse/
└── clad-to-meet-you/
```

| Project on the current website | Folder (slug) | Old page |
| --- | --- | --- |
| The Bridge House | `the-bridge-house` | /the-bridge-house |
| Whareroa Hideaway | `whareroa-hideaway` | /whareroa-hideaway |
| Kinloch Retreat | `kinloch-retreat` | /kinloch-retreat |
| Oak Leaf Abode | `oak-leaf-abode` | /oak-leaf-abode |
| Curved by the Course | `curved-by-the-course` | /curved-by-the-course |
| Hawk Ridge | `hawk-ridge` | /hawk-ridge |
| Wild at Heart | `wild-at-heart` | /wild-at-heart |
| The Boathouse | `the-boathouse` | /the-boathouse |
| Clad to Meet You | `clad-to-meet-you` | /clad-to-meet-you |

## Where a project's photos appear

- **Cover** (the first exterior photo): shown on the project page hero, its card on /projects, the home page "Selected works" reel and the "Next project" banner. The covers of Whareroa Hideaway and Kinloch Retreat also appear as small photo "pills" in the home page's opening statement. The cover isn't repeated in the Exterior gallery.
- **Galleries:** every third photo (1, 4, 7…) is shown full-width (16:9) and the rest are cropped tall (4:5). Portrait photos are never shown full-width: they stay tall and the next landscape photo takes the wide spot, so you don't need to plan the order around it.

## Adding photos

1. Copy the original photos into the folders above:
   - Name them `01-short-description.jpg`, `02-….jpg` and so on; the number sets the order.
   - Keep `exterior/` and `interior/` flat, with no sub-folders.
   - Convert iPhone `.HEIC` photos to JPEG first.
2. Run one of:
   ```bash
   npm run images              # add new photos after any already there
   npm run images -- --replace # first time only: swap the interim images for the originals
   npm run images -- --check   # change nothing; verify everything is registered and has alt text
   npm run images -- --rehash  # one-off: give older photos named 01.webp… content-hashed names
   ```
   - The script checks every file before changing anything. If one is bad, it says so and **nothing is changed**.
   - Each photo becomes optimised 2400px and 1200px WebP files, with a short content hash in the name.
   - The copied original is deleted, and `src/content/media.json` is updated.
   - `--replace` won't wipe photos that an earlier run added. Use plain `npm run images` to add more, or add `--force` to deliberately redo a folder.
3. Open `src/content/media.json` and give each new photo a short `alt` description, e.g. `"The Bridge House — cedar-lined living room looking over the golf course"`. The `original` field shows which file it came from. Then run `npm run images -- --check`.
4. Run `npm run build`, then check the pages with `npm run dev`.

**Reordering or regrouping later:** edit the order of the entries in `src/content/media.json`, or change an entry's `"group"` between `"exterior"` and `"interior"`. Don't rename the generated `.webp` files.

## Photo requirements

- Use the client's own photography only: the photos from their current website, or originals from their photographer.
- Supply the largest version available. Anything 2400px wide or more is ideal, and the script warns about anything under 1200px.
- Choose landscape photos for `home/` and project covers.

## The interim images

The images in the repo right now were cropped from screenshots of the current website. They're placeholders,
and the first `npm run images -- --replace` swaps them out for the originals.
