"use client"

import { Palette, Home, Droplets, Flame, SunMedium } from "lucide-react"
import { Button } from "@/components/ui/button"

const scrollToForm = (e: React.MouseEvent) => {
  e.preventDefault()
  document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
}

const services = [
  {
    icon: Palette,
    title: "3D Landscape Design",
    description: "Visualize your dream yard before we break ground with our custom 3D designs.",
  },
  {
    icon: Home,
    title: "Outdoor Kitchens & Pergolas",
    description: "Create the perfect entertainment space with custom-built outdoor living areas.",
  },
  {
    icon: Droplets,
    title: "Artificial Turf Installation",
    description: "Enjoy a lush, green lawn year-round without the water bill or maintenance.",
  },
  {
    icon: Flame,
    title: "Travertine & Pavers",
    description: "Elegant hardscaping with premium travertine, pavers, and natural stone.",
  },
  {
    icon: SunMedium,
    title: "Complete Yard Renovations",
    description: "Full backyard transformations from concept to completion.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Our Services</p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 text-balance">
            Everything You Need for Your Dream Outdoor Space
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            From initial design to final installation, we handle every aspect of your landscape transformation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-background rounded-lg p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button size="lg" onClick={scrollToForm} className="bg-[#7cb82f] text-white hover:bg-[#6aa025] text-base px-8 py-6 cursor-pointer">
            Start Your Project Today
          </Button>
        </div>
      </div>
    </section>
  )
}
