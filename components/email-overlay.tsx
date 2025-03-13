"use client"

import { useState } from "react"
import { EnvelopeClosedIcon } from "@radix-ui/react-icons"

interface EmailOverlayProps {
  onSubmit: (email: string) => Promise<void>
}

export default function EmailOverlay({ onSubmit }: EmailOverlayProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter your email")
      return
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email")
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(email)
    } catch (error) {
      setError("Failed to save survey results. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-neutral-800 rounded-lg p-6 md:p-8 max-w-md w-full border border-neutral-700">
        <div className="flex items-center mb-6">
          <div className="bg-yellow-400 p-2 rounded-md mr-4">
            <EnvelopeClosedIcon className="h-6 w-6 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-white">Get Your Results</h2>
        </div>

        <p className="text-neutral-300 mb-6">
          Enter your email to receive your detailed valuation report and personalized action plan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError("")
              }}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-yellow-400"
              disabled={isSubmitting}
            />
            {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition duration-200 shadow-md ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Report'}
          </button>

          <p className="text-neutral-400 text-sm text-center">
            We respect your privacy and will never share your email with third parties.
          </p>
        </form>
      </div>
    </div>
  )
} 