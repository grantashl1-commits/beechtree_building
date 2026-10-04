# Photos: where each image goes

Every photo on the site comes from `public/images/<folder>/`. You drop original JPG/PNG files into
the right folder, run one command, and the site picks them up. You never edit code to add a photo.

```
public/images/
├── home/                     first photo = home page hero (wide landscape, the best "wow" shot)
├── about/                    first photo = About page feature image (portrait crops best)
├── services/                 01 = New Homes · 02 = Additions · 03 = Renovations
├── craft/                    close-up detail shots (doors, joinery, cladding); used as fallbacks
├── the-bridge-house/
│   ├── exterior/             → "Exterior" gallery; the FIRST exterior photo is the project's cover
│   └── interior/             → "Interior" gallery
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

## Adding photos

1. Copy the original photos into the folders above. Name them `01-….jpg`, `02-….jpg` and so on, so the order is the order you want. Within a project, the first exterior photo becomes its cover.
2. Run:
   ```bash
   npm run images              # add to any photos already there
   npm run images -- --replace # replace what's there; use this to swap the interim images
   ```
   Each photo is resized to 2400px and 1200px WebP. The original is deleted, and `src/content/media.json` is updated.
3. Open `src/content/media.json` and give each new photo a short `alt` description, e.g. `"The Bridge House — cedar-lined living room looking over the golf course"`.
4. Run `npm run build`, then check the pages with `npm run dev`.

**Reordering or regrouping later:** edit the order of the entries in `src/content/media.json`, or change an entry's `"group"` between `"exterior"` and `"interior"`.

## Photo requirements

- Use the client's own photography only: the photos from their current website, or originals from their photographer.
- Supply the largest version available. Anything 2400px wide or more is ideal, and phone or web thumbnails will look soft.
- Choose landscape photos for `home/` and project covers. Choose a portrait photo for `about/`.

## The interim images

The images in the repo right now were cropped from screenshots of the current website. They're placeholders,
and `npm run images -- --replace` replaces them as soon as the originals are added.
