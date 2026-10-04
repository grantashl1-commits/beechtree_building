#!/usr/bin/env node
/**
 * Optimises new photos and registers them with the site.
 *
 * 1. Drop original JPG/PNG/WebP photos into public/images/<page-or-project-slug>/
 *    e.g. public/images/the-bridge-house/IMG_2041.jpg
 *    (GitHub web: Add file → Upload files works fine for this.)
 * 2. Run:  npm run images
 *
 * Each new photo becomes NN.webp (2400px) + NN-1200.webp, the original is removed,
 * and src/content/media.json is updated so the photo appears on the site — appended
 * after any existing photos for that slug. Already-processed files are left alone.
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

const manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"))
manifest.pages ??= {}
let added = 0

const slugs = (await fs.readdir(IMAGES, { withFileTypes: true }).catch(() => []))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

for (const slug of slugs) {
  const dir = path.join(IMAGES, slug)
  const files = (await fs.readdir(dir)).sort()
  const raw = files.filter((f) => RAW.test(f) && !PROCESSED.test(f))
  if (!raw.length) continue

  const page = (manifest.pages[slug] ??= { images: [] })
  let n = Math.max(0, ...files.filter((f) => PROCESSED.test(f)).map((f) => parseInt(f, 10)))

  for (const file of raw) {
    const name = String(++n).padStart(2, "0")
    const source = path.join(dir, file)
    const pipeline = sharp(source).rotate()
    const large = await pipeline
      .clone()
      .resize({ width: 2400, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(dir, `${name}.webp`))
    await pipeline
      .clone()
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(dir, `${name}-1200.webp`))
    await fs.rm(source)

    page.images.push({
      src: `/images/${slug}/${name}.webp`,
      srcSmall: `/images/${slug}/${name}-1200.webp`,
      width: large.width,
      height: large.height,
      alt: "",
    })
    added++
    console.log(`  ${slug}/${file} → ${name}.webp (${large.width}×${large.height})`)
  }
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n")
console.log(added ? `✓ Added ${added} photo(s). Add alt text in src/content/media.json if you like.` : "No new photos found.")
