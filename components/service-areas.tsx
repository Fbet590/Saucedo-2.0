"use client"

import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const scrollToForm = (e: React.MouseEvent) => {
  e.preventDefault()
  document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
}

const areas = [
  "Buckeye",
  "Litchfield Park",
  "Goodyear",
  "Avondale",
  "Waddell",
  "Surprise",
  "Tolleson",
  "Laveen",
  "Peoria",
  "Sun City",
]

export function ServiceAreas() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-sm font-semibold text-[#7cb82f] uppercase tracking-wider mb-3">Service Areas</p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 text-balance">
            Proudly Serving the West Valley
          </h2>
        </div>

        {/* Two column grid for cities */}
        <div className="max-w-md mx-auto mb-10">
          <div className="grid grid-cols-2 gap-3">
            {areas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3"
              >
                <MapPin className="h-4 w-4 text-[#7cb82f] flex-shrink-0" />
                <span className="font-medium text-foreground text-sm">{area}, AZ</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-2 bg-[#7cb82f]/10 rounded-lg px-5 py-2.5 text-[#7cb82f] font-medium">
              ...and surrounding areas!
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button size="lg" onClick={scrollToForm} className="bg-[#7cb82f] text-white hover:bg-[#6aa025] text-base px-8 py-6 cursor-pointer">
            Request Your Free Estimate
          </Button>
        </div>
      </div>
    </section>
  )
}
