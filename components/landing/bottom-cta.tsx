"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"

export function BottomCTA() {
  return (
    <section className="flex justify-center border-t border-white/5 px-6 py-24 lg:px-12">
      <div className="relative w-full max-w-[1200px]">
        {/* Massive background decorative circle */}
        <div className="pointer-events-none absolute -top-32 left-1/2 z-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full border border-white/5"></div>
        <div className="pointer-events-none absolute -top-16 left-1/2 z-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full border border-emerald-500/10"></div>

        {/* The Banner Card */}
        <div className="dotted-texture relative z-10 w-full overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#030706] p-12 text-center lg:p-20">
          {/* Subtle gradient glow inside */}
          <div className="absolute top-0 left-1/2 h-1/2 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-500/10 to-transparent blur-3xl"></div>

          <div className="relative z-20 mx-auto flex max-w-2xl flex-col items-center">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <Icon
                icon="solar:magic-stick-linear"
                width="24"
                className="text-emerald-500"
              />
            </div>

            <h2 className="mb-6 text-4xl font-semibold tracking-tight text-white lg:text-5xl">
              Architect Your Vision
            </h2>

            <p className="mb-10 text-sm leading-relaxed text-slate-400 lg:text-base">
              Deploy high-fidelity narratives across your entire creative
              pipeline in minutes. Stop abstract friction and manual layout
              loops before they breach your creative process.
            </p>

            <Link href="/home">
              <Button className="flex h-14 items-center gap-2 bg-emerald-500 px-8 text-sm font-bold text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-400">
                Initialize Project
                <Icon icon="solar:arrow-right-linear" width="20" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
