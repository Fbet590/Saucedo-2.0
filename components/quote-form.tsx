"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react"

const packageOptions = [
  { id: "essential", label: "Essential Package - $10,000", description: "Perfect starter transformation" },
  { id: "comfort", label: "Comfort - $21,000", description: "Enhanced outdoor living" },
  { id: "signature", label: "Signature - $50,000", description: "Premium full renovation" },
]

export function QuoteForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState<"forward" | "backward">("forward")
  const [formData, setFormData] = useState({
    selectedPackage: "",
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({})

  const totalSteps = 4

  // Email validation - checks format and common fake patterns
  const validateEmail = (email: string): { valid: boolean; message?: string } => {
    const trimmed = email.trim().toLowerCase()
    
    // Basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
      return { valid: false, message: "Please enter a valid email address" }
    }
    
    // Check for common fake/test email patterns
    const fakePatterns = [
      /^test@/,
      /^fake@/,
      /^asdf@/,
      /^aaa@/,
      /^123@/,
      /@test\./,
      /@fake\./,
      /@example\./,
      /@mailinator\./,
      /@tempmail\./,
      /@throwaway\./,
      /@guerrillamail\./,
      /@sharklasers\./,
      /@10minutemail\./,
    ]
    
    if (fakePatterns.some(pattern => pattern.test(trimmed))) {
      return { valid: false, message: "Please enter a real email address" }
    }
    
    // Check minimum length for local part and domain
    const [localPart, domain] = trimmed.split('@')
    if (localPart.length < 2 || domain.length < 4) {
      return { valid: false, message: "Please enter a valid email address" }
    }
    
    return { valid: true }
  }

  // Phone validation - US phone numbers
  const validatePhone = (phone: string): { valid: boolean; message?: string } => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '')
    
    // US phone should have 10 digits (or 11 if starting with 1)
    if (digits.length === 11 && digits.startsWith('1')) {
      // Valid with country code
    } else if (digits.length !== 10) {
      return { valid: false, message: "Please enter a valid 10-digit phone number" }
    }
    
    // Get the 10-digit number
    const tenDigits = digits.length === 11 ? digits.slice(1) : digits
    
    // Check for obviously fake patterns
    const fakePatterns = [
      /^0{10}$/,
      /^1{10}$/,
      /^2{10}$/,
      /^(.)\1{9}$/,  // All same digit
      /^1234567890$/,
      /^0987654321$/,
      /^5555555555$/,
      /^123456/,
    ]
    
    if (fakePatterns.some(pattern => pattern.test(tenDigits))) {
      return { valid: false, message: "Please enter a real phone number" }
    }
    
    // Area code cannot start with 0 or 1
    if (tenDigits[0] === '0' || tenDigits[0] === '1') {
      return { valid: false, message: "Please enter a valid US phone number" }
    }
    
    // Exchange code (middle 3 digits) cannot start with 0 or 1
    if (tenDigits[3] === '0' || tenDigits[3] === '1') {
      return { valid: false, message: "Please enter a valid US phone number" }
    }
    
    return { valid: true }
  }

  // Format phone number as user types
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '')
    if (digits.length === 0) return ''
    if (digits.length <= 3) return `(${digits}`
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setDirection("forward")
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setDirection("backward")
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const packageLabel = packageOptions.find(p => p.id === formData.selectedPackage)?.label || formData.selectedPackage

      const webhookData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        selected_package: packageLabel,
        source: 'Website Quote Form',
        submitted_at: new Date().toISOString(),
      }

      // Send data to our API route which forwards to webhook
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      // Fire Facebook Pixel Lead conversion event
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: packageLabel,
          currency: 'USD',
        })
      }
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('[v0] Error submitting form:', error)
      // Still show success since no-cors won't give us a response
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.selectedPackage !== ""
      case 2:
        return formData.name.trim().length >= 2
      case 3:
        return formData.email !== "" && validateEmail(formData.email).valid
      case 4:
        return formData.phone !== "" && validatePhone(formData.phone).valid
      default:
        return false
    }
  }

  // Validate on blur for better UX
  const handleEmailBlur = () => {
    if (formData.email) {
      const result = validateEmail(formData.email)
      if (!result.valid) {
        setErrors(prev => ({ ...prev, email: result.message }))
      } else {
        setErrors(prev => ({ ...prev, email: undefined }))
      }
    }
  }

  const handlePhoneBlur = () => {
    if (formData.phone) {
      const result = validatePhone(formData.phone)
      if (!result.valid) {
        setErrors(prev => ({ ...prev, phone: result.message }))
      } else {
        setErrors(prev => ({ ...prev, phone: undefined }))
      }
    }
  }

  if (isSubmitted) {
    return (
      <section id="quote-form" className="py-16 lg:py-24 bg-[#f8faf6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-[#7cb82f]/20">
            <div className="w-20 h-20 bg-[#7cb82f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#7cb82f]" />
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-extrabold text-[#4a4a4a] mb-4">
              Thank You!
            </h2>
            <p className="text-lg text-[#6b6b6b] mb-2">
              We&apos;ll be reaching out via text in just a few minutes to confirm everything.
            </p>
            <p className="text-[#6b6b6b] font-medium">
              Keep an eye out!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quote-form" className="py-16 lg:py-24 bg-[#f8faf6]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl lg:text-4xl font-extrabold text-[#4a4a4a] mb-4">
            <span className="text-[#7cb82f]">Not All Homes Qualify.</span> But Yours Just Might — <span className="text-[#7cb82f] underline decoration-2 underline-offset-4">Let&apos;s Find Out.</span>
          </h2>
          <p className="text-lg text-[#6b6b6b]">
            Choose the options you&apos;re looking for below and we&apos;ll do the rest!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                  s < step
                    ? "bg-[#7cb82f] text-white"
                    : s === step
                    ? "bg-[#7cb82f] text-white ring-4 ring-[#7cb82f]/20"
                    : "bg-[#e5e5e5] text-[#9b9b9b]"
                }`}
              >
                {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
          <div className="h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7cb82f] transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10 border border-[#7cb82f]/10 overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Step Content with Animation */}
            <div className="relative min-h-[280px]">
              {/* Step 1: Package Selection */}
              <div
                className={`transition-all duration-500 ease-out ${
                  step === 1
                    ? "opacity-100 translate-x-0"
                    : step > 1
                    ? "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"
                    : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
                }`}
              >
                <h3 className="text-xl font-semibold text-[#4a4a4a] mb-6">
                  Which package interested you the most?
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {packageOptions.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, selectedPackage: pkg.id })}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 relative ${
                        formData.selectedPackage === pkg.id
                          ? "border-[#7cb82f] bg-[#7cb82f]/5"
                          : "border-[#e5e5e5] hover:border-[#7cb82f]/50 hover:bg-[#f8faf6]"
                      }`}
                    >
                      {formData.selectedPackage === pkg.id && (
                        <div className="absolute top-4 right-4 w-5 h-5 bg-[#7cb82f] rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      <div className="font-semibold text-[#4a4a4a]">{pkg.label}</div>
                      <div className="text-sm text-[#6b6b6b]">{pkg.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Name */}
              <div
                className={`transition-all duration-500 ease-out ${
                  step === 2
                    ? "opacity-100 translate-x-0"
                    : step > 2
                    ? "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"
                    : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
                }`}
              >
                <h3 className="text-xl font-semibold text-[#4a4a4a] mb-6">
                  What&apos;s your name?
                </h3>
                <div>
                  <Label htmlFor="name" className="text-[#4a4a4a] font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5 h-12 border-[#e5e5e5] focus:border-[#7cb82f] focus:ring-[#7cb82f]"
                  />
                </div>
              </div>

              {/* Step 3: Email */}
              <div
                className={`transition-all duration-500 ease-out ${
                  step === 3
                    ? "opacity-100 translate-x-0"
                    : step > 3
                    ? "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"
                    : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
                }`}
              >
                <h3 className="text-xl font-semibold text-[#4a4a4a] mb-6">
                  What&apos;s your email address?
                </h3>
                <div>
                  <Label htmlFor="email" className="text-[#4a4a4a] font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@gmail.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
                    }}
                    onBlur={handleEmailBlur}
                    className={`mt-1.5 h-12 border-[#e5e5e5] focus:border-[#7cb82f] focus:ring-[#7cb82f] ${
                      errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Step 4: Phone */}
              <div
                className={`transition-all duration-500 ease-out ${
                  step === 4
                    ? "opacity-100 translate-x-0"
                    : step > 4
                    ? "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"
                    : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
                }`}
              >
                <h3 className="text-xl font-semibold text-[#4a4a4a] mb-6">
                  What&apos;s your phone number?
                </h3>
                <div>
                  <Label htmlFor="phone" className="text-[#4a4a4a] font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(623) 555-1234"
                    value={formData.phone}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value)
                      setFormData({ ...formData, phone: formatted })
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }))
                    }}
                    onBlur={handlePhoneBlur}
                    className={`mt-1.5 h-12 border-[#e5e5e5] focus:border-[#7cb82f] focus:ring-[#7cb82f] ${
                      errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                    maxLength={14}
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#e5e5e5]">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
                className={`text-[#6b6b6b] hover:text-[#4a4a4a] hover:bg-[#f5f5f5] ${
                  step === 1 ? "invisible" : ""
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>

              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-[#7cb82f] hover:bg-[#6aa525] text-white px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!canProceed() || isSubmitting}
                  className="bg-[#7cb82f] hover:bg-[#6aa525] text-white px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Trust Badge */}
        <p className="text-center text-sm text-[#6b6b6b] mt-6">
          No spam, ever. We&apos;ll only contact you about your project.
        </p>
      </div>
    </section>
  )
}
