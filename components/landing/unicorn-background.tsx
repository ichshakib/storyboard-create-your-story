"use client"

import React, { useEffect } from "react"

export function UnicornBackground() {
  useEffect(() => {
    // Natively load the Unicorn Studio script to avoid undeclared npm dependencies
    const scriptId = "unicorn-studio-script"
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.id = scriptId
      script.src = "https://cdn.unicorn.studio/v1.3.2/unicornStudio.umd.js"
      script.async = true
      script.onload = () => {
        const win = window as unknown as {
          UnicornStudio?: { init: () => void }
        }
        if (win.UnicornStudio) {
          win.UnicornStudio.init()
        }
      }
      document.body.appendChild(script)
    } else {
      const win = window as unknown as {
        UnicornStudio?: { init: () => void }
      }
      if (win.UnicornStudio) {
        win.UnicornStudio.init()
      }
    }
  }, [])

  return (
    <div
      className="aura-background-component fixed top-0 -z-10 h-screen w-full dark:opacity-100 opacity-20 transition-opacity duration-500"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
      }}
    >
      <div className="aura-background-component absolute top-0 -z-10 h-full w-full">
        <div
          data-us-project="EET25BiXxR2StNXZvAzF"
          className="absolute inset-0 -z-10 h-full w-full"
        ></div>
      </div>
    </div>
  )
}
