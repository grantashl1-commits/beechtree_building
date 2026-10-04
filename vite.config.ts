import fs from 'node:fs'
import path from 'node:path'
import type { IncomingMessage } from 'node:http'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Expose server-only secrets (GOOGLE_*, RESEND_*) to the /api handlers in dev.
  // Only VITE_* variables are ever bundled into the browser build.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), tailwindcss(), devApi()],
    resolve: {
      alias: { '@': path.resolve(import.meta.dirname, 'src') },
    },
  }
})

/**
 * Runs the Vercel functions in /api inside the Vite dev server, so `npm run dev`
 * behaves like production without needing `vercel dev`. Each file in /api must
 * `export default { fetch(request: Request): Response }` (Vercel's Web signature).
 */
function devApi(): Plugin {
  return {
    name: 'beechtree:dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)
        const match = url.pathname.match(/^\/api\/([a-z0-9-]+)\/?$/)
        const file = match && path.resolve(import.meta.dirname, 'api', `${match[1]}.ts`)
        if (!file || !fs.existsSync(file)) return next()

        try {
          const mod = await server.ssrLoadModule(file)
          const headers = new Headers()
          for (const [key, value] of Object.entries(req.headers)) {
            if (typeof value === 'string') headers.set(key, value)
          }
          const hasBody = req.method !== 'GET' && req.method !== 'HEAD'
          const request = new Request(url, {
            method: req.method,
            headers,
            body: hasBody ? await readBody(req) : undefined,
          })
          const response: Response = await mod.default.fetch(request)
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (error) {
          server.ssrFixStacktrace(error as Error)
          next(error)
        }
      })
    },
  }
}

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}
