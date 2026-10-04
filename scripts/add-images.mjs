#!/usr/bin/env node
/**
 * Optimises new photos and registers them with the site.
 *
 * 1. Put original JPG/PNG/WebP photos in one of:
 *      public/images/<slug>/exterior/   → "Exterior" gallery on a project page
 *      public/images/<slug>/interior/   → "Interior" gallery on a project page
 *      public/images/<slug>/            → ungrouped (treated as exterior)
 *    <slug> is a project slug from src/content/projects.ts, or "home", "about", "services" (see docs/PHOTOS.md).
 *    Files are added in filename order, so prefix them 01-, 02-… to control the order.
 * 2. Run:  npm run images
 *    or:   npm run images -- --replace   (for every slug that has new photos, first delete the
 *                                          photos already registered for it — use this to swap
 *                                          interim/low-res images for the originals)
 *
 * Each new photo becomes public/images/<slug>/NN.webp (max 2400px) + NN-1200.webp, the original
 * is removed, and src/content/media.json is updated — appended after any photos already
 * registered for that slug. Already-processed files are left alone.
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const IMAGES = path.join(ROOT, "public/images")
const MANIFEST = path.join(ROOT, "src/content/media.json")
const PROCESSED = /^\d{2,}(-1200)?\.webp$/
const RAW = /\.(jpe?g|png|webp|tiff?|avif)$/i
const GROUPS = ["exterior", "interior"]
const REPLACE = process.argv.includes("--replace")
const naturalSort = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })

const manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"))
manifest.pages ??= {}
let added = 0

const slugs = (await fs.readdir(IMAGES, { withFileTypes: true }).catch(() => []))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort(naturalSort)

for (const slug of slugs) {
  const dir = path.join(IMAGES, slug)
  const rootFiles = (await fs.readdir(dir)).sort(naturalSort)

  // Exterior first, then interior, then anything loose in the slug folder
  const queue = []
  for (const group of GROUPS) {
    const groupDir = path.join(dir, group)
    const files = await fs.readdir(groupDir).catch(() => [])
    for (const f of files.sort(naturalSort)) if (RAW.test(f)) queue.push({ source: path.join(groupDir, f), file: `${group}/${f}`, group })
  }
  for (const f of rootFiles) if (RAW.test(f) && !PROCESSED.test(f)) queue.push({ source: path.join(dir, f), file: f })
  if (!queue.length) continue

  if (REPLACE) {
    for (const f of rootFiles.filter((f) => PROCESSED.test(f))) await fs.rm(path.join(dir, f))
    manifest.pages[slug] = { ...manifest.pages[slug], images: [] }
    console.log(`  ${slug}: removed previously registered photos (--replace)`)
  }
  const page = (manifest.pages[slug] ??= { images: [] })
  let n = REPLACE ? 0 : Math.max(0, ...rootFiles.filter((f) => PROCESSED.test(f)).map((f) => parseInt(f, 10)))

  for (const { source, file, group } of queue) {
    const name = String(++n).padStart(2, "0")
    const pipeline = sharp(source).rotate() // respect camera orientation
    const large = await pipeline
      .clone()
      .resize({ width: 2400, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(dir, `${name}.webp`))
    await pipeline
      .clone()
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(dir, `${name}-1200.webp`))
    await fs.rm(source)

    page.images.push({
      src: `/images/${slug}/${name}.webp`,
      srcSmall: `/images/${slug}/${name}-1200.webp`,
      width: large.width,
      height: large.height,
      alt: "",
      ...(group ? { group } : {}),
    })
    added++
    console.log(`  ${slug}/${file} → ${name}.webp (${large.width}×${large.height})${group ? ` [${group}]` : ""}`)
  }

  for (const group of GROUPS) {
    await fs.rmdir(path.join(dir, group)).catch(() => {}) // remove now-empty group folders
  }
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n")
console.log(
  added
    ? `✓ Added ${added} photo(s). Add descriptive alt text for each new entry in src/content/media.json.`
    : "No new photos found.",
)
