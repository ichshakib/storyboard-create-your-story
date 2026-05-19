"use client"

import * as React from "react"
import { useTheme } from "next-themes"

/**
 * ThemeKeyboardShortcut Component
 * Listens for the 'd' keypress globally to toggle between Light and Dark mode.
 * Safe-guards input fields to ensure user typing is not interrupted.
 */
export function ThemeKeyboardShortcut() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 1. Ignore if key is not 'd' or 'D'
      if (event.key.toLowerCase() !== "d") return

      // 2. Ignore keypress if the user is typing in an input, textarea, or editable element
      const activeElement = document.activeElement
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.tagName === "SELECT" ||
          activeElement.hasAttribute("contenteditable") ||
          activeElement.closest("[contenteditable]"))
      ) {
        return
      }

      // 3. Toggle the theme (handling system theme resolution properly)
      const currentTheme = theme === "system" ? resolvedTheme : theme
      const nextTheme = currentTheme === "dark" ? "light" : "dark"
      setTheme(nextTheme)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [theme, resolvedTheme, setTheme])

  return null
}
