"use client"

import { forwardRef, useImperativeHandle, useRef } from "react"
import confetti from "canvas-confetti"

interface ConfettiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const ConfettiButton = forwardRef<{ triggerConfetti: () => void }, ConfettiButtonProps>(
  ({ children, onClick, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const triggerConfetti = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        const x = (rect.left + rect.width / 2) / window.innerWidth
        const y = (rect.top + rect.height / 2) / window.innerHeight

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x, y },
          colors: ["#facc15", "#fbbf24", "#f59e0b", "#d97706"],
        })
      }
    }

    useImperativeHandle(ref, () => ({
      triggerConfetti,
    }))

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e)
      }
    }

    return (
      <button ref={buttonRef} onClick={handleClick} {...props}>
        {children}
      </button>
    )
  }
)

ConfettiButton.displayName = "ConfettiButton"

export default ConfettiButton 