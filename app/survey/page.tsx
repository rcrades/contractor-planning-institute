"use client"

import { useState, useRef } from "react"
import WelcomeScreen from "@/components/welcome-screen"
import EducationalSection from "@/components/educational-section"
import QuestionSection from "@/components/question-section"
import ResultsScreen from "@/components/results-screen"
import ProgressBar from "@/components/progress-bar"
import EmailOverlay from "@/components/email-overlay"

interface SurveyStep {
  type: "welcome" | "educational" | "question" | "results"
  title?: string
  content?: string
  transition?: string
  questions?: Array<{
    id: string
    text: string
    options: string[]
  }>
}

// Main survey component that manages the entire survey flow
export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showEmailOverlay, setShowEmailOverlay] = useState(false)
  const [email, setEmail] = useState("")

  // Store all survey responses
  const [responses, setResponses] = useState({
    motivation: "",
    revenue: "",
    employees: "",
    buyerPreference: "",
    preparation: "",
    timeline: "",
  })

  const confettiButtonRef = useRef<{ triggerConfetti: () => void }>(null)

  // Handle individual question responses
  const handleResponse = (question: string, answer: string) => {
    setResponses((prev) => ({
      ...prev,
      [question]: answer,
    }))
  }

  // Navigation functions
  const nextStep = () => {
    if (currentStep === surveySteps.length - 2) {
      if (confettiButtonRef.current) {
        confettiButtonRef.current.triggerConfetti()
      }
      setTimeout(() => {
        setShowEmailOverlay(true)
      }, 2000)
    }
    setCurrentStep(currentStep + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail)
    setShowEmailOverlay(false)
    // Here you would typically send the email to your backend
    console.log(`Report sent to: ${submittedEmail}`)
  }

  // Survey content structure
  const surveySteps: SurveyStep[] = [
    { type: "welcome" },
    {
      type: "educational",
      title: "Why Consider Selling?",
      content:
        "Many owners sell for retirement, growth, or liquidity. Industry trends show increased M&A activity due to infrastructure spending.",
      transition: "Let's understand your goals.",
    },
    {
      type: "question",
      title: "Motivation",
      questions: [
        {
          id: "motivation",
          text: "What's your primary reason for considering a sale?",
          options: ["Retirement", "Growth opportunities", "Financial liquidity", "Other"],
        },
      ],
    },
    {
      type: "educational",
      title: "Business Snapshot",
      content:
        "Buyers assess revenue, profitability, and team size. Knowing your firm's profile helps tailor your sale strategy.",
      transition: "Tell us about your business.",
    },
    {
      type: "question",
      title: "Business Details",
      questions: [
        {
          id: "revenue",
          text: "What's your firm's annual revenue?",
          options: ["Less than $1M", "$1M-$5M", "$5M-$20M", "More than $20M"],
        },
        {
          id: "employees",
          text: "How many employees do you have?",
          options: ["Less than 10", "10-50", "50-100", "More than 100"],
        },
      ],
    },
    {
      type: "educational",
      title: "Buyer Types",
      content:
        "Strategic buyers (e.g., competitors) seek synergies, while PE firms aim for profit through efficiency. Your preference shapes the process.",
      transition: "Who would you prefer to sell to?",
    },
    {
      type: "question",
      title: "Buyer Preference",
      questions: [
        {
          id: "buyerPreference",
          text: "Would you prefer a strategic buyer or a PE firm?",
          options: ["Strategic (e.g., for legacy)", "PE (e.g., for quick liquidity)", "No preference"],
        },
      ],
    },
    {
      type: "educational",
      title: "Readiness",
      content:
        "Preparation (valuation, audits) can boost your sale price. Timing also matters—most deals take 6-12 months.",
      transition: "How ready are you?",
    },
    {
      type: "question",
      title: "Preparation and Timeline",
      questions: [
        {
          id: "preparation",
          text: "Have you taken steps to prepare your business for sale?",
          options: ["Yes (e.g., valuation, audits)", "No"],
        },
        {
          id: "timeline",
          text: "What's your expected timeline for the sale?",
          options: ["Less than 6 months", "6-12 months", "More than 12 months"],
        },
      ],
    },
    { type: "results" },
  ]

  const progressPercentage = (currentStep / (surveySteps.length - 1)) * 100

  // Render the current step based on its type
  const renderStep = () => {
    const step = surveySteps[currentStep]

    switch (step.type) {
      case "welcome":
        return <WelcomeScreen onNext={nextStep} />
      case "educational":
        if (!step.title || !step.content || !step.transition) return null
        return (
          <EducationalSection
            title={step.title}
            content={step.content}
            transition={step.transition}
            onNext={nextStep}
            onBack={currentStep > 0 ? prevStep : undefined}
          />
        )
      case "question":
        if (!step.title || !step.questions) return null
        return (
          <QuestionSection
            title={step.title}
            questions={step.questions}
            responses={responses}
            onResponse={handleResponse}
            onNext={nextStep}
            onBack={prevStep}
            isLastQuestion={currentStep === surveySteps.length - 2}
            confettiButtonRef={confettiButtonRef}
          />
        )
      case "results":
        return <ResultsScreen responses={responses} email={email} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      {currentStep > 0 && currentStep < surveySteps.length - 1 && (
        <div className="sticky top-0 z-10 bg-neutral-900 shadow-md">
          <ProgressBar percentage={progressPercentage} />
        </div>
      )}
      <main className="flex-1 flex flex-col">{renderStep()}</main>
      {showEmailOverlay && <EmailOverlay onSubmit={handleEmailSubmit} />}
    </div>
  )
} 