"use client"

import { Shield, Award, BadgeCheck, Boxes, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

const scrollToForm = (e: React.MouseEvent) => {
  e.preventDefault()
  document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
}

const reasons = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Our landscapers are fully insured for their safety and your peace of mind. Safety is our top priority.",
  },
  {
    icon: Award,
    title: "Quality Work",
    description: "From the tools we use to the materials we source, we're committed to delivering high-quality results.",
  },
  {
    icon: BadgeCheck,
    title: "Satisfaction Guaranteed",
    description: "We guarantee you'll love your new yard. If you're not 100% satisfied, we'll make it right.",
  },
  {
    icon: Boxes,
    title: "3D Design Preview",
    description: "We provide 3D designs so you can fully visualize your dream yard before we even get started.",
  },
  {
    icon: Users,
    title: "Professional Team",
    description: "A team of highly skilled professionals committed to providing the best service possible.",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description: "Quality landscaping at fair prices. We also offer financing options - free to apply.",
  },
]

export function WhyUsSection() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why Choose Us</p>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-8 text-balance">
              Why Homeowners Choose Saucedo&apos;s Landscape
            </h2>
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg mb-8">
              <div className="text-4xl font-[family-name:var(--font-heading)] font-extrabold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">
                Years of experience serving<br />the West Valley community
              </div>
            </div>
            <Button size="lg" onClick={scrollToForm} className="w-full sm:w-auto bg-[#7cb82f] text-white hover:bg-[#6aa025] text-base px-8 py-6 cursor-pointer">
              Schedule Your Consultation
            </Button>
          </div>

          {/* Right Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason) => (
              <div key={reason.title} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <reason.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
