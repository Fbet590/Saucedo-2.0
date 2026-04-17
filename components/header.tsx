"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFF0] backdrop-blur-sm border-b border-[#E8E8D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Saucedo's Landscape LLC"
              width={150}
              height={60}
              className="h-12 lg:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#4a4a4a] hover:text-[#7cb82f] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            <a
              href="tel:6239809669"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#4a4a4a]"
            >
              <Phone className="h-4 w-4" />
              (623) 980-9669
            </a>
            <Button asChild className="hidden lg:flex bg-[#7cb82f] text-white hover:bg-[#6aa025]">
              <a href="#quote-form" onClick={(e) => { e.preventDefault(); document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' }); }}>Get a Quote</a>
            </Button>
            <button
              className="lg:hidden p-2 text-[#4a4a4a]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-[#E8E8D0]">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-[#4a4a4a] hover:text-[#7cb82f] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="w-full mt-2 bg-[#7cb82f] text-white hover:bg-[#6aa025]">
                <Link href="#quote-form">Get a Quote</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
