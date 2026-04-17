"use client"

import { useEffect, useState, useCallback } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const scrollToForm = (e: React.MouseEvent) => {
  e.preventDefault()
  document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
}

const testimonials = [
  {
    content: "Excellent work done by Saucedo's! They installed Travertine, rock, artificial turf, outdoor kitchen and pergola. Best prices in the valley - definitely recommend giving them a call for future landscaping needs!",
    author: "Maria Rodriguez",
    rating: 5,
  },
  {
    content: "Thank you for a fabulous job. The work was done in just 7 days. Love my backyard! The team was professional and the communication was excellent throughout the entire project.",
    author: "Robert Gonzalez",
    rating: 5,
  },
  {
    content: "Saucedo's Landscape transformed our barren backyard into a beautiful desert oasis. The 3D design helped us visualize exactly what we were getting. Couldn't be happier!",
    author: "Jennifer Martinez",
    rating: 5,
  },
  {
    content: "Professional, on time, and great quality work. They did our entire front and backyard. The artificial turf looks amazing and the pavers are perfect. Highly recommend!",
    author: "David Chen",
    rating: 5,
  },
  {
    content: "Best landscaping company in the West Valley! They were responsive, fair priced, and the quality of their work is outstanding. Our neighbors keep asking who did our yard.",
    author: "Sarah Thompson",
    rating: 5,
  },
]

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      setIsTransitioning(false)
    }, 300)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section className="py-16 lg:py-24 bg-[#7cb82f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 text-balance">
            What Our Clients Say
          </h2>
        </div>

        {/* Auto-scrolling Cards */}
        <div className="relative overflow-hidden">
          <div 
            className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          >
            {/* Mobile: Single card */}
            <div className="lg:hidden">
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </div>

            {/* Desktop: Three cards */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((offset) => {
                const index = (currentIndex + offset) % testimonials.length
                return <TestimonialCard key={index} testimonial={testimonials[index]} />
              })}
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8 mb-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentIndex(index)
                  setIsTransitioning(false)
                }, 300)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button size="lg" onClick={scrollToForm} className="bg-white text-[#7cb82f] hover:bg-white/90 text-base px-8 py-6 cursor-pointer font-semibold">
            Join Our Happy Customers
          </Button>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      {/* Google Badge */}
      <div className="flex items-center gap-2 mb-4">
        <GoogleIcon className="h-5 w-5" />
        <span className="text-sm font-medium text-gray-600">Google Review</span>
      </div>
      
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      
      {/* Content */}
      <p className="text-gray-700 mb-4 leading-relaxed line-clamp-4">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      
      {/* Author */}
      <p className="font-semibold text-gray-900">{testimonial.author}</p>
    </div>
  )
}
