"use client"

import React from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"

export function LandingFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#030706] px-8 py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-16 lg:flex-row">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Logo className="text-white" width={28} height={28} />
              <span className="text-xl font-medium tracking-tight text-white">
                Storyboard
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              Precision orchestration for high-fidelity visual narratives. Built for the next generation of storytellers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-20 gap-y-12 sm:grid-cols-3">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-slate-400">
                Product
              </span>
              <nav className="flex flex-col gap-3">
                <Link
                  href="/home"
                  className="text-sm text-slate-500 transition-colors hover:text-white"
                >
                  Editor
                </Link>
                <Link
                  href="/billing"
                  className="text-sm text-slate-500 transition-colors hover:text-white"
                >
                  Pricing
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <span className="text-xs font-semibold text-slate-400">
                Company
              </span>
              <nav className="flex flex-col gap-3">
                <Link
                  href="#"
                  className="text-sm text-slate-500 transition-colors hover:text-white"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="text-sm text-slate-500 transition-colors hover:text-white"
                >
                  Vision
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <span className="text-xs font-semibold text-slate-400">
                Legal
              </span>
              <nav className="flex flex-col gap-3">
                <Link
                  href="#"
                  className="text-sm text-slate-500 transition-colors hover:text-white"
                >
                  Privacy
                </Link>
                <Link
                  href="#"
                  className="text-sm text-slate-500 transition-colors hover:text-white"
                >
                  Terms
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 md:flex-row">
          <p className="text-xs text-slate-600">
            © 2026 Storyboard. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-slate-600">
            <span>San Francisco</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
