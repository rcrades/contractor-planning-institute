"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import ConfettiButton from "./confetti-button"

interface Question {
  id: string
  text: string
  options: string[]
}

interface QuestionSectionProps {
  title: string
  questions: Question[]
  responses: Record<string, string>
  onResponse: (question: string, answer: string) => void
  onNext: () => void
  onBack: () => void
  isLastQuestion: boolean
  confettiButtonRef: React.RefObject<{ triggerConfetti: () => void }>
}

export default function QuestionSection({
  title,
  questions,
  responses,
  onResponse,
  onNext,
  onBack,
  isLastQuestion,
  confettiButtonRef,
}: QuestionSectionProps) {
  const [isComplete, setIsComplete] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    const allAnswered = questions.every((q) => responses[q.id] !== undefined)
    setIsComplete(allAnswered)
  }, [questions, responses])

  const handleSkip = () => {
    const currentQuestion = questions[currentQuestionIndex]
    if (currentQuestion) {
      onResponse(currentQuestion.id, "skipped")
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        onNext()
      }
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      onNext()
    }
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="flex flex-col min-h-[80vh] justify-center p-4 md:p-8">
      <div className="max-w-lg w-full mx-auto">
        <div className="bg-neutral-800 rounded-lg shadow-lg p-6 md:p-8 border border-neutral-700">
          <div className="flex items-start mb-6">
            <div className="bg-yellow-400 p-2 rounded-md mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 9H15M9 13H15M9 17H12M8.2 5H15.8C16.9201 5 17.4802 5 17.908 5.21799C18.2843 5.40973 18.5903 5.71569 18.782 6.09202C19 6.51984 19 7.07989 19 8.2V15.8C19 16.9201 19 17.4802 18.782 17.908C18.5903 18.2843 18.2843 18.5903 17.908 18.782C17.4802 19 16.9201 19 15.8 19H8.2C7.07989 19 6.51984 19 6.09202 18.782C5.71569 18.5903 5.40973 18.2843 5.21799 17.908C5 17.4802 5 16.9201 5 15.8V8.2C5 7.07989 5 6.51984 5.21799 6.09202C5.40973 5.71569 5.71569 5.40973 6.09202 5.21799C6.51984 5 7.07989 5 8.2 5Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          </div>

          {currentQuestion && (
            <div className="space-y-8 pl-12">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-white font-medium text-lg">
                    {currentQuestionIndex + 1}. {currentQuestion.text}
                  </p>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        responses[currentQuestion.id] === option
                          ? "border-yellow-400 bg-neutral-700"
                          : "border-neutral-600 hover:border-neutral-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option}
                        checked={responses[currentQuestion.id] === option}
                        onChange={() => onResponse(currentQuestion.id, option)}
                        className="w-5 h-5 text-yellow-400 border-neutral-600 focus:ring-yellow-400"
                      />
                      <span className="ml-3 text-neutral-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={onBack}
              className="flex items-center py-2 px-4 text-neutral-300 hover:text-white font-medium rounded-lg transition duration-200"
            >
              <ArrowLeftIcon className="mr-2 h-5 w-5" />
              Back
            </button>
            <div className="flex space-x-4">
              <button
                onClick={handleSkip}
                className="flex items-center py-3 px-6 bg-neutral-700 hover:bg-neutral-600 text-white font-medium rounded-lg transition duration-200 shadow-md"
              >
                Skip
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </button>

              {isLastQuestion && currentQuestionIndex === questions.length - 1 ? (
                <ConfettiButton
                  onClick={handleNext}
                  ref={confettiButtonRef}
                  className="flex items-center py-3 px-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition duration-200 shadow-md"
                >
                  Finish
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </ConfettiButton>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center py-3 px-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transition duration-200 shadow-md"
                >
                  Continue
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 