"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

interface SlideProps {
  content: React.ReactNode
  id: number
  totalSlides: number
}

export default function Slide({ content, id, totalSlides }: SlideProps) {
  const router = useRouter()
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight" && id < totalSlides) {
      router.push(`/s/${id + 1}`)
    } else if (event.key === "ArrowLeft" && id > 1) {
      router.push(`/s/${id - 1}`)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return

    const swipeDistance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50 // minimum distance to be considered a swipe

    if (swipeDistance > minSwipeDistance && id < totalSlides) {
      router.push(`/s/${id + 1}`)
    } else if (swipeDistance < -minSwipeDistance && id > 1) {
      router.push(`/s/${id - 1}`)
    }

    // Reset touch coordinates
    touchStartX.current = null
    touchEndX.current = null
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (id > 1) {
      router.push(`/s/${id - 1}`)
    }
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (id < totalSlides) {
      router.push(`/s/${id + 1}`)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [id])

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div
        className="relative w-full h-[calc(100vh-48px)] border-2 border-white p-8"
        onClick={() => id < totalSlides && router.push(`/s/${id + 1}`)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {id > 1 && (
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-200 border border-white hover:border-black"
            aria-label="Previous slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10 2L4 8l6 6V2z" />
            </svg>
          </button>
        )}

        {id < totalSlides && (
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-200 border border-white hover:border-black"
            aria-label="Next slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 2l6 6-6 6V2z" />
            </svg>
          </button>
        )}

        <div className="w-full h-full flex flex-col justify-center items-start">{content}</div>
        <div className="absolute bottom-4 left-4 text-sm opacity-50 p-2">
          {id}/{totalSlides}
        </div>
      </div>
    </div>
  )
}
