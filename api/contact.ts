import { Resend } from "resend"

/**
 * POST /api/contact — emails website enquiries to the business via Resend.
 *
 * env: RESEND_API_KEY, CONTACT_TO_EMAIL (comma-separated for several people),
 *      CONTACT_FROM_EMAIL (an address on a domain verified in Resend,
 *      e.g. "Beechtree Website <website@beechtreebuilding.co.nz>").
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405)

    let body: Record<string, unknown>
    try {
      body = (await request.json()) as Record<string, unknown>
    } catch {
      return json({ error: "Invalid request." }, 400)
    }
    const field = (key: string, max = 200) => String(body[key] ?? "").trim().slice(0, max)

    // Honeypot — bots fill every field; pretend it worked.
    if (field("website")) return json({ ok: true })

    const enquiry = {
      name: field("name"),
      email: field("email"),
      phone: field("phone", 40),
      projectType: field("projectType", 40),
      location: field("location"),
      message: field("message", 5000),
    }
    if (!enquiry.name || !enquiry.message || !EMAIL.test(enquiry.email)) {
      return json({ error: "Please add your name, a valid email address and a message." }, 422)
    }

    const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
      return json({ error: "Online enquiries aren't switched on yet." }, 503)
    }

    const rows: [string, string][] = [
      ["Name", enquiry.name],
      ["Email", enquiry.email],
      ["Phone", enquiry.phone],
      ["Project", enquiry.projectType],
      ["Site location", enquiry.location],
    ]
    const filled = rows.filter(([, v]) => v)

    const { error } = await new Resend(RESEND_API_KEY).emails.send({
      from: CONTACT_FROM_EMAIL || "Beechtree Website <onboarding@resend.dev>",
      to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
      replyTo: enquiry.email,
      subject: `New enquiry — ${enquiry.name}${enquiry.projectType ? ` (${enquiry.projectType})` : ""}`,
      text: [...filled.map(([k, v]) => `${k}: ${v}`), "", enquiry.message].join("\n"),
      html: `
        <div style="font-family:Georgia,serif;color:#171513;max-width:560px">
          <h2 style="font-weight:normal;font-size:28px;margin:0 0 16px">New website enquiry</h2>
          <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
            ${filled.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#6b655d">${k}</td><td>${escapeHtml(v)}</td></tr>`).join("")}
          </table>
          <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;white-space:pre-wrap;border-top:1px solid #d9d2c6;margin-top:16px;padding-top:16px">${escapeHtml(enquiry.message)}</p>
        </div>`,
    })

    if (error) {
      console.error("[api/contact]", error)
      return json({ error: "We couldn't send your message just now." }, 502)
    }
    return json({ ok: true })
  },
}

function json(body: unknown, status = 200, cacheControl = "no-store") {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": cacheControl },
  })
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)
}
