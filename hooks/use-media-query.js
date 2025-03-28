"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // ตรวจสอบว่าอยู่ในฝั่ง client หรือไม่
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Update the state with the current value
      const updateMatches = () => {
        setMatches(media.matches)
      }

      // Set the initial value
      updateMatches()

      // Add the change listener
      if (media.addEventListener) {
        media.addEventListener("change", updateMatches)
      } else {
        // Fallback for older browsers
        media.addListener(updateMatches)
      }

      // Clean up
      return () => {
        if (media.removeEventListener) {
          media.removeEventListener("change", updateMatches)
        } else {
          // Fallback for older browsers
          media.removeListener(updateMatches)
        }
      }
    }
  }, [query])

  // ถ้ายังไม่ได้ mount ให้คืนค่า false เพื่อป้องกัน hydration error
  if (!mounted) return false

  return matches
}

