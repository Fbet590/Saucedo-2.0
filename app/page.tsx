import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { QuoteForm } from "@/components/quote-form"
import { TestimonialsSection } from "@/components/testimonials-section"
import { WhyUsSection } from "@/components/why-us-section"
import { ServicesSection } from "@/components/services-section"
import { GallerySection } from "@/components/gallery-section"
import { ServiceAreas } from "@/components/service-areas"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <QuoteForm />
        <TestimonialsSection />
        <WhyUsSection />
        <ServicesSection />
        <GallerySection />
        <ServiceAreas />
      </main>
      <Footer />
    </>
  )
}
