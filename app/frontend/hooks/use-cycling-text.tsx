import { useCallback, useEffect, useMemo, useState } from "react"

interface CyclingTextProps {
  texts: string[]
  speed?: number
  effect?: "typewriter" | "none"
}

export default function useCyclingText({ texts, speed = 3000, effect = "none" }: CyclingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const currentText = useMemo(() => texts[currentIndex] || "", [texts, currentIndex])

  const advanceIndex = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
  }, [texts.length])

  useEffect(() => {
    if (effect === "none") {
      setDisplayText(currentText)
      return
    }

    if (effect === "typewriter" && currentText) {
      setIsTyping(true)
      setDisplayText("")
      let charIndex = 0

      const typeInterval = setInterval(() => {
        if (charIndex < currentText.length) {
          const typedPart = currentText.slice(0, charIndex + 1)
          const remainingPart = ".".repeat(Math.max(0, currentText.length - charIndex - 1))
          setDisplayText(typedPart + remainingPart)
          charIndex++
        } else {
          setIsTyping(false)
          setDisplayText(currentText) // Mostrar texto completo
          clearInterval(typeInterval)
        }
      }, 100)

      return () => clearInterval(typeInterval)
    }
  }, [currentText, effect])

  useEffect(() => {
    if (effect === "typewriter" && isTyping) {
      return
    }

    const interval = setInterval(advanceIndex, speed)
    return () => clearInterval(interval)
  }, [speed, effect, isTyping, advanceIndex])

  return effect === "none" ? currentText : displayText
}
