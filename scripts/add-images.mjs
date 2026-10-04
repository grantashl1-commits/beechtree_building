#!/usr/bin/env node
/**
 * Optimises new photos and registers them with the site. See docs/PHOTOS.md.
 *
 * Put original JPG/PNG/WebP photos in:
 *   public/images/<project-slug>/exterior/   → "Exterior" gallery (first photo = project cover)
 *   public/images/<project-slug>/interior/   → "Interior" gallery
 *   public/images/home|about|services|craft/ → site-wide photos (see docs/PHOTOS.md)
 * Name files 01-something.jpg, 02-something.jpg… — they're added in that order.
 *
 *   npm run images                  add the new photos after any already registered
 *   npm run images -- --replace     for each folder that has new photos, replace the photos already
 *                                   registered there. Refuses if those were added by an earlier
 *                                   `npm run images` run (add --force to really redo a folder).
 *   npm run images -- --check       change nothing; verify media.json against the files on disk,
 *                                   list stray files and photos still missing alt text.
 *
 * Safety: every file is validated and converted in memory BEFORE anything is deleted, so a bad file
 * aborts the run with nothing changed. Output files get a content hash in their name
 * (01-3fa2c19b.webp) so browsers never show a cached older photo under the same URL.
 */
import crypto from "node:crypto"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const IMAGES = path.join(ROOT, "public/images")
const MANIFEST = path.join(ROOT, "src/content/media.json")
const PROJECTS = path.join(ROOT, "src/content/projects.ts")
const SITE_SLUGS = ["home", "about", "services", "craft"]
const GROUPS = ["exterior", "interior"]
const RAW = /\.(jpe?g|jfif|png|webp|tiff?|avif)$/i
const HEIC = /\.(heic|heif)$/i
const JUNK = /^(\.DS_Store|Thumbs\.db|desktop\.ini|\._.+)$/i
const ORPHAN_SMALL = /^\d{2,}(-[0-9a-f]{8})?-1200\.webp$/
const MIN_WIDTH = 1200

const flags = new Set(process.argv.slice(2))
const REPLACE = flags.has("--replace")
const FORCE = flags.has("--force")
const CHECK = flags.has("--check")

const rel = (p) => path.relative(ROOT, p)
const naturalSort = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
const readdir = (dir) => fs.readdir(dir, { withFileTypes: true }).catch(() => [])

const manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"))
manifest.pages ??= {}
const projectSlugs = [...(await fs.readFile(PROJECTS, "utf8")).matchAll(/^\s*slug: "([a-z0-9-]+)"/gm)].map((m) => m[1])
const knownSlugs = [...SITE_SLUGS, ...projectSlugs]

if (CHECK) process.exit((await check({ strict: true })) ? 0 : 1)

/* ───────────── 1. Scan (no changes) ───────────── */

const errors = []
const warnings = []
const junk = []
const plan = [] // { slug, items: [{ source, file, group }] }

for (const entry of await readdir(IMAGES)) {
  const full = path.join(IMAGES, entry.name)
  if (!entry.isDirectory()) {
    if (JUNK.test(entry.name)) junk.push(full)
    else errors.push(`${rel(full)}: photos must go inside a folder, e.g. public/images/<project-slug>/exterior/`)
    continue
  }
  const slug = entry.name
  const registered = new Set(
    (manifest.pages[slug]?.images ?? []).flatMap((img) => [img.src, img.srcSmall]).filter(Boolean).map((s) => path.basename(s)),
  )
  const items = []
  const classify = (file, group) => {
    const name = path.basename(file)
    if (JUNK.test(name)) junk.push(file)
    else if (HEIC.test(name))
      errors.push(`${rel(file)}: HEIC/HEIF photos aren't supported — convert to JPEG first (macOS: sips -s format jpeg "${name}" --out "${name.replace(HEIC, ".jpg")}")`)
    else if (ORPHAN_SMALL.test(name)) errors.push(`${rel(file)}: leftover 1200px copy that isn't registered in media.json — delete it`)
    else if (RAW.test(name)) items.push({ source: file, file: rel(file), group })
    else errors.push(`${rel(file)}: not a supported image (use .jpg .jpeg .jfif .png .webp .tif .avif)`)
  }

  for (const child of (await readdir(full)).sort((a, b) => naturalSort(a.name, b.name))) {
    const childPath = path.join(full, child.name)
    if (child.isDirectory()) {
      const group = GROUPS.find((g) => g === child.name.toLowerCase())
      if (!group) {
        errors.push(`${rel(childPath)}/: unknown folder — inside a slug folder only "exterior/" and "interior/" are allowed`)
        continue
      }
      for (const f of (await readdir(childPath)).sort((a, b) => naturalSort(a.name, b.name))) {
        const fPath = path.join(childPath, f.name)
        if (f.isDirectory()) errors.push(`${rel(fPath)}/: nested folders aren't supported — put the photos directly in ${child.name}/`)
        else classify(fPath, group)
      }
    } else if (!registered.has(child.name)) {
      classify(childPath, undefined)
    }
  }

  if (items.length) {
    if (!knownSlugs.includes(slug)) {
      errors.push(`public/images/${slug}/: unknown folder name.${suggest(slug)} Valid folders: ${knownSlugs.join(", ")}`)
      continue
    }
    const order = (it) => (it.group === "exterior" ? 0 : it.group === "interior" ? 1 : 2)
    items.sort((a, b) => order(a) - order(b) || naturalSort(a.file, b.file))
    plan.push({ slug, items })
  }
}

if (REPLACE && !FORCE) {
  for (const { slug } of plan) {
    if ((manifest.pages[slug]?.images ?? []).some((img) => img.original)) {
      errors.push(
        `public/images/${slug}/: already has photos added by an earlier "npm run images" run, so --replace won't delete them. ` +
          `To add more photos run plain "npm run images"; to redo this folder from scratch add --force.`,
      )
    }
  }
}

/* ───────────── 2. Validate + convert in memory (still no changes) ───────────── */

const converted = new Map() // source -> { large, small, hash, width, height }
const scanFailed = errors.length > 0 // still validate every file, so all problems are reported in one go
for (const { items } of plan) {
  for (const item of items) {
    try {
      const meta = await sharp(item.source).metadata()
      if (!meta.width || !meta.height) throw new Error("could not read image size")
      if (meta.width < MIN_WIDTH) warnings.push(`${item.file}: only ${meta.width}px wide — it will look soft on large screens`)
      if (scanFailed) continue
      const base = sharp(item.source).rotate() // respect camera orientation
      const large = await base.clone().resize({ width: 2400, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer({ resolveWithObject: true })
      const small = await base.clone().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer()
      const hash = crypto.createHash("sha1").update(large.data).digest("hex").slice(0, 8)
      converted.set(item.source, { large: large.data, small, hash, width: large.info.width, height: large.info.height })
    } catch (error) {
      errors.push(`${item.file}: can't be read as an image (${error.message}). Check it isn't a partial download or a renamed HEIC.`)
    }
  }
}

if (errors.length) {
  console.error(`✖ Nothing was changed. Fix these and run again:\n${errors.map((e) => `  - ${e}`).join("\n")}`)
  process.exit(1)
}

/* ───────────── 3. Apply, one folder at a time ───────────── */

for (const file of junk) {
  await fs.rm(file, { force: true })
  console.log(`  removed system file ${rel(file)}`)
}

let added = 0
for (const { slug, items } of plan) {
  const dir = path.join(IMAGES, slug)
  const page = (manifest.pages[slug] ??= { images: [] })

  if (REPLACE && page.images.length) {
    for (const img of page.images) {
      for (const src of [img.src, img.srcSmall].filter(Boolean)) await fs.rm(path.join(ROOT, "public", src), { force: true })
    }
    console.log(`  ${slug}: removed ${page.images.length} previously registered photo(s) (--replace)`)
    page.images = []
  }

  let n = Math.max(0, ...page.images.map((img) => parseInt(path.basename(img.src), 10) || 0))
  for (const item of items) {
    const out = converted.get(item.source)
    const name = `${String(++n).padStart(2, "0")}-${out.hash}`
    await fs.writeFile(path.join(dir, `${name}.webp`), out.large)
    await fs.writeFile(path.join(dir, `${name}-1200.webp`), out.small)
    page.images.push({
      src: `/images/${slug}/${name}.webp`,
      srcSmall: `/images/${slug}/${name}-1200.webp`,
      width: out.width,
      height: out.height,
      alt: "",
      ...(item.group ? { group: item.group } : {}),
      original: path.relative(IMAGES, item.source),
    })
    added++
    console.log(`  ${item.file} → ${name}.webp (${out.width}×${out.height})`)
  }

  await writeManifest() // saved after every folder, before the originals are removed
  for (const item of items) await fs.rm(item.source, { force: true })
  for (const child of await readdir(dir)) {
    if (child.isDirectory() && GROUPS.includes(child.name.toLowerCase())) await fs.rmdir(path.join(dir, child.name)).catch(() => {})
  }
}

for (const w of warnings) console.warn(`  ! ${w}`)
if (!added) {
  console.log("No new photos found.")
} else {
  console.log(`✓ Added ${added} photo(s).`)
  const missingAlt = Object.values(manifest.pages).flatMap((p) => p.images).filter((img) => !img.alt?.trim()).length
  if (missingAlt) console.log(`  Next: write alt text for the ${missingAlt} photo(s) with "alt": "" in src/content/media.json, then run: npm run images -- --check`)
}

/* ───────────── helpers ───────────── */

async function writeManifest() {
  const tmp = `${MANIFEST}.tmp`
  await fs.writeFile(tmp, JSON.stringify(manifest, null, 2) + "\n")
  await fs.rename(tmp, MANIFEST)
}

/** Verifies media.json ↔ files on disk. With `strict`, empty alt text also fails. */
async function check({ strict }) {
  const problems = []
  const referenced = new Set()
  for (const [slug, page] of Object.entries(manifest.pages ?? {})) {
    if (page.images?.length && !knownSlugs.includes(slug)) console.warn(`  ! media.json has photos for "${slug}", which no page uses`)
    for (const img of page.images ?? []) {
      for (const src of [img.src, img.srcSmall].filter(Boolean)) {
        const file = path.join(ROOT, "public", src)
        referenced.add(file)
        try {
          await fs.access(file)
        } catch {
          problems.push(`media.json lists ${src} but the file doesn't exist`)
        }
      }
      if (strict && !img.alt?.trim()) problems.push(`${img.src} has no alt text (src/content/media.json)`)
    }
  }
  for (const file of await walk(IMAGES)) {
    if (!referenced.has(file) && path.basename(file) !== ".gitkeep") problems.push(`${rel(file)} is not registered in media.json (run "npm run images", or delete it)`)
  }
  if (problems.length) {
    console.error(`✖ ${problems.length} problem(s):\n${problems.map((p) => `  - ${p}`).join("\n")}`)
    return false
  }
  console.log("✓ media.json and public/images match, and every photo has alt text.")
  return true
}

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir)) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

function suggest(slug) {
  const distance = (a, b) => {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
    for (let j = 1; j <= b.length; j++) d[0][j] = j
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    return d[a.length][b.length]
  }
  const normal = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  const best = knownSlugs
    .map((s) => ({ s, d: s.includes(normal) || normal.includes(s) ? 0 : distance(normal, s) }))
    .sort((a, b) => a.d - b.d)[0]
  return best && best.d <= Math.max(4, normal.length / 2) ? ` Did you mean "${best.s}"?` : ""
}
