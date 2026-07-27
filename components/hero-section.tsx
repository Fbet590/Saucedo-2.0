"use client"

import { Button } from "@/components/ui/button"
import { Star, ChevronDown } from "lucide-react"

const scrollToForm = (e: React.MouseEvent) => {
  e.preventDefault()
  document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-bg.png')`,
        }}
      >
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">5.0 on Google Reviews</span>
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-heading)] text-[2.5rem] sm:text-[3.25rem] lg:text-[5rem] font-extrabold text-background leading-tight mb-4 text-balance">
            Choose Your Package. One Stunning Backyard.
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-background/90 font-medium mb-10">
            {"$20K · $50K — pick what fits and we'll handle the rest"}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button size="lg" onClick={scrollToForm} className="w-full sm:w-auto bg-[#7cb82f] text-white hover:bg-[#6aa025] text-base px-8 py-6 cursor-pointer">
              Free In-Home Estimate
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Bouncing Arrow */}
      <button
        onClick={scrollToForm}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
      >
        <span className="text-sm font-medium text-background/80 group-hover:text-background transition-colors">Get Your Quote</span>
        <div className="animate-bounce">
          <ChevronDown className="h-8 w-8 text-background/80 group-hover:text-background transition-colors" />
        </div>
      </button>
    </section>
  )
}
