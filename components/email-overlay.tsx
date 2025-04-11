"use client"

import type React from "react"

import { useState } from "react"

interface EmailOverlayProps {
  onSubmit: (email: string) => void
}

export default function EmailOverlay({ onSubmit }: EmailOverlayProps) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-neutral-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Almost there!</h2>
        <p className="text-neutral-300 mb-6">Enter your email to access your personalized report.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="w-full p-3 rounded-lg bg-neutral-700 text-white placeholder-neutral-400 border border-neutral-600 focus:outline-none focus:border-yellow-400"
          />
          <button
            type="submit"
            className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition duration-200 shadow-md"
          >
            Send Report & Show Preview
          </button>
        </form>
      </div>
    </div>
  )
}
