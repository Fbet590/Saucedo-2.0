"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const scrollToForm = (e: React.MouseEvent) => {
  e.preventDefault()
  document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
}

const galleryImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28394%29-5CyBUXmrig1p6NNqbJTBaHphEAn3bZ.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28297%29-vkGHMju6GEgVsPNQRQTtspFH5CvvJL.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28076%29-vONW7uaojB8CLWS3hiVoAjN3TjJPzv.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28048%29-DLQH59VQj7RygMH09BneocYvNZqZrg.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28484%29-Hp1Gj88D4enzdxjZzzuMckouVhMopC.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28468%29-BcvxK2OLvZWWd717l0qMV5DpeQH3OB.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28191%29-bfkluqJwvGjapuXceoYdeXJNtgsIov.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28422%29-Irw1HOXTLTdn3hVXB29FQuJVpAMZTx.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28098%29-OHg22bL8swDU4lIVADIL80RHfywBX4.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28489%29-KjM2x3QcOLs8XZb9rPAnDHbVHo7R5y.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28343%29-XBQDIFt9ALL21VASd1rPAp6MCZFkRE.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28455%29-qrJm9DxAPtq7ECjrY3Vr9VIFKZ1qZe.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28424%29-WT1iIFPPOXB4VSy7Y9WTz6SRlSvRFM.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28378%29-dtPXZujBuF27P9PBo4Jr95DeCu76J5.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28145%29-kHxrfy2BAYTgWbQPOebPmJwrJY4i8x.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed%28313%29-s5crGf57Tz2UdlbWO9nCmbEPAHE4XA.jpeg",
]

// Different aspect ratios for masonry effect
const aspectRatios = [
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/3]",
]

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
  }

  // Split images into 3 columns for masonry
  const columns: string[][] = [[], [], []]
  galleryImages.forEach((img, i) => {
    columns[i % 3].push(img)
  })

  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Our Portfolio</p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 text-balance">
            Our Work Speaks for Itself
          </h2>
        </div>

        {/* Masonry Grid - 3 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-12">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3 md:gap-4">
              {column.map((img, imgIndex) => {
                const globalIndex = imgIndex * 3 + colIndex
                return (
                  <button
                    key={globalIndex}
                    onClick={() => openLightbox(globalIndex)}
                    className={`relative overflow-hidden rounded-lg group cursor-pointer ${
                      aspectRatios[globalIndex % aspectRatios.length]
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Landscape project ${globalIndex + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button size="lg" onClick={scrollToForm} className="bg-[#7cb82f] text-white hover:bg-[#6aa025] text-base px-8 py-6 cursor-pointer">
            Get Your Backyard Transformation
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Image */}
          <div 
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[currentIndex]}
              alt={`Landscape project ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  )
}
