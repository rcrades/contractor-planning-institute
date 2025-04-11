"use client"

import type React from "react"

import { useCallback, useRef } from "react"
import ReactCanvasConfetti from "react-canvas-confetti"

interface ConfettiButtonProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export default function ConfettiButton({ onClick, children, className }: ConfettiButtonProps) {
  const refAnimationInstance = useRef(null)

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance
  }, [])

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      })
  }, [])

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ["#FCD34D", "#FBBF24", "#F59E0B", "#D97706", "#B45309"],
    })

    makeShot(0.2, {
      spread: 60,
      colors: ["#FCD34D", "#FBBF24", "#F59E0B", "#D97706", "#B45309"],
    })

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ["#FCD34D", "#FBBF24", "#F59E0B", "#D97706", "#B45309"],
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ["#FCD34D", "#FBBF24", "#F59E0B", "#D97706", "#B45309"],
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ["#FCD34D", "#FBBF24", "#F59E0B", "#D97706", "#B45309"],
    })
  }, [makeShot])

  const handleClick = () => {
    fire()
    onClick()
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      />
    </button>
  )
}
