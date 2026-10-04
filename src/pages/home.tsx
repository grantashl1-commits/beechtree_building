import { BuildStory } from "@/components/sections/home/build-story"
import { ContactCta } from "@/components/sections/home/contact-cta"
import { CraftQuote } from "@/components/sections/home/craft-quote"
import { Credentials } from "@/components/sections/home/credentials"
import { Hero } from "@/components/sections/home/hero"
import { Reviews } from "@/components/sections/home/reviews"
import { SelectedWorks } from "@/components/sections/home/selected-works"
import { ServicesList } from "@/components/sections/home/services-list"
import { Statement } from "@/components/sections/home/statement"
import { company } from "@/content/site"

export function HomePage() {
  return (
    <>
      <title>{`${company.name} — Award-winning architectural home builders, Taupō`}</title>
      <meta name="description" content={company.description} />
      <Hero />
      <Statement />
      <BuildStory />
      <Credentials />
      <SelectedWorks />
      <ServicesList />
      <CraftQuote />
      <Reviews />
      <ContactCta />
    </>
  )
}
