"use client"

import React from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"

export function LandingFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#030706] px-8 py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-20 lg:flex-row">
          <div className="space-y-8">
            <div className="flex flex-col">
              <span className="text-2xl leading-none font-bold tracking-tighter text-white">
                Storyboard
              </span>
              <span className="mt-1 text-xs font-semibold tracking-widest text-emerald-500">
                Architect
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              Precision orchestration for high-fidelity visual narratives. Built
              for the next generation of content architects.
            </p>
            <button className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5 transition-all hover:bg-emerald-500/10">
              <Icon
                icon="solar:siren-linear"
                width="20"
                className="text-emerald-500"
              />
              <div className="flex flex-col text-left">
                <span className="text-[9px] leading-none tracking-widest text-emerald-500/70 uppercase">
                  24/7 Priority
                </span>
                <span className="mt-0.5 text-xs leading-none font-medium text-emerald-500">
                  Technical Support
                </span>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-20 gap-y-12 sm:grid-cols-3">
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                Product
              </span>
              <nav className="flex flex-col gap-4">
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
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                Company
              </span>
              <nav className="flex flex-col gap-4">
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
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                Legal
              </span>
              <nav className="flex flex-col gap-4">
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

        <div className="mt-28 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row">
          <p className="text-xs font-medium text-slate-700 italic">
            © 2026 Storyboard Architect. All rights reserved.
          </p>
          <div className="flex gap-10 text-xs font-medium tracking-widest text-slate-700 uppercase">
            <span>San Francisco</span>
            <span>v1.0.4</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
