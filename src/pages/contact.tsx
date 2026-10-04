import { ContactForm } from "@/components/contact/contact-form"
import { PageHeader } from "@/components/layout/page-header"
import { company, contact } from "@/content/site"

export function ContactPage() {
  const { address } = company
  return (
    <>
      <title>{`Contact — ${company.name}`}</title>
      <meta name="description" content={`Start your build with ${company.name}. Call ${company.phone} or send us your plans.`} />
      <PageHeader eyebrow={contact.eyebrow} title={contact.title} />

      <section className="container-site grid gap-16 pb-28 md:grid-cols-12">
        <aside className="space-y-10 md:col-span-4">
          <p className="text-lg leading-relaxed text-stone">{contact.body}</p>
          <div className="space-y-2 border-t border-line pt-6">
            <p className="eyebrow text-stone">Call {company.director}</p>
            <a href={company.phoneHref} className="display block text-4xl hover:text-beech">
              {company.phone}
            </a>
          </div>
          <div className="space-y-2 border-t border-line pt-6">
            <p className="eyebrow text-stone">Email</p>
            <a href={`mailto:${company.email}`} className="link-underline text-lg break-all">
              {company.email}
            </a>
          </div>
          <div className="space-y-2 border-t border-line pt-6">
            <p className="eyebrow text-stone">Visit</p>
            <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="link-underline text-lg">
              {address.street}, {address.city} {address.postcode}
            </a>
          </div>
        </aside>
        <div className="md:col-span-7 md:col-start-6">
          <ContactForm />
        </div>
      </section>

      <section className="h-[60svh] min-h-[380px] w-full bg-ink">
        <iframe
          title={`Map — ${company.name}`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(`${address.street}, ${address.city} ${address.postcode}, New Zealand`)}&z=14&output=embed`}
          className="h-full w-full grayscale-[0.85] contrast-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  )
}
