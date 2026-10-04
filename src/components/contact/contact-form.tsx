import { ArrowUpRight, Check, Loader2 } from "lucide-react"
import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { company, contact } from "@/content/site"

type Status = "idle" | "sending" | "sent" | "error"

/** Enquiry form → /api/contact (emails Simon via Resend). Falls back to a mailto link if email isn't configured. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [projectType, setProjectType] = useState("")
  const [error, setError] = useState("")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    data.projectType = projectType
    setStatus("sending")
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      })
      const body = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(body.error ?? "Something went wrong.")
      setStatus("sent")
      form.reset()
      setProjectType("")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.")
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center gap-6 rounded-sm border border-line bg-paper p-10">
        <span className="flex size-14 items-center justify-center rounded-full bg-moss text-limestone">
          <Check className="size-6" />
        </span>
        <h3 className="display text-5xl">Thank you.</h3>
        <p className="max-w-md text-stone">Your enquiry is with {company.director}. We'll be in touch personally.</p>
        <Button variant="outline" className="rounded-full" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    )
  }

  const field = "h-12 rounded-none border-0 border-b border-ink/20 bg-transparent px-0 text-base shadow-none focus-visible:border-beech focus-visible:ring-0"

  return (
    <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
      {/* Honeypot: real people never see or fill this */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-2">
        <Label htmlFor="name" className="eyebrow text-stone">Name *</Label>
        <Input id="name" name="name" required autoComplete="name" className={field} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className="eyebrow text-stone">Email *</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone" className="eyebrow text-stone">Phone</Label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="projectType" className="eyebrow text-stone">Project</Label>
        <Select value={projectType} onValueChange={setProjectType}>
          <SelectTrigger id="projectType" className={`${field} w-full data-[size=default]:h-12`}>
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            {contact.projectTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="location" className="eyebrow text-stone">Site location</Label>
        <Input id="location" name="location" placeholder="e.g. Kinloch, Taupō" className={field} />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="message" className="eyebrow text-stone">Tell us about your project *</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Your architect, timing, budget range — whatever you know so far."
          className={`${field} min-h-32 resize-none py-3`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <Button type="submit" size="lg" disabled={status === "sending"} className="h-14 rounded-full px-8 text-base">
          {status === "sending" ? <Loader2 className="animate-spin" /> : null}
          Send enquiry {status !== "sending" && <ArrowUpRight />}
        </Button>
        {status === "error" && (
          <p role="alert" className="text-sm text-destructive">
            {error}{" "}
            <a className="underline" href={`mailto:${company.email}?subject=${encodeURIComponent("Building enquiry")}`}>
              Email {company.email} instead
            </a>
            .
          </p>
        )}
      </div>
    </form>
  )
}
