"use client"

import React from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"

export function LandingFooter() {
  return (
    <footer className="border-border bg-background border-t px-8 py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-16 lg:flex-row">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Logo className="text-foreground" width={28} height={28} />
              <span className="text-foreground text-xl font-medium tracking-tight">
                Storyboard
              </span>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Precision orchestration for high-fidelity visual narratives. Built
              for the next generation of storytellers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-20 gap-y-12 sm:grid-cols-3">
            <div className="space-y-4">
              <span className="text-foreground text-xs font-semibold">
                Product
              </span>
              <nav className="flex flex-col gap-3">
                <Link
                  href="/home"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Editor
                </Link>
                <Link
                  href="/billing"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Pricing
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <span className="text-foreground text-xs font-semibold">
                Company
              </span>
              <nav className="flex flex-col gap-3">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Vision
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <span className="text-foreground text-xs font-semibold">
                Legal
              </span>
              <nav className="flex flex-col gap-3">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Terms
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="border-border mt-20 flex flex-col items-center justify-between gap-6 border-t pt-10 md:flex-row">
          <p className="text-muted-foreground/60 text-xs">
            © 2026 Storyboard. All rights reserved.
          </p>
          <div className="text-muted-foreground/60 flex gap-8 text-xs">
            <span>San Francisco</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
