"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"

export function LandingNavbar() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/5 bg-[#030706]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/20 bg-white transition-colors duration-500 group-hover:bg-emerald-500">
            <Icon
              icon="solar:clapperboard-linear"
              width="20"
              style={{ color: "#030706" }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg leading-none font-semibold tracking-wide text-white">
              Storyboard
            </span>
            <span className="mt-1 text-[10px] leading-none font-medium tracking-[0.2em] text-emerald-500">
              Architect
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-10 md:flex">
          {["Platform", "Resources", "Pricing"].map((item) => (
            <Link
              key={item}
              href={item === "Pricing" ? "/billing" : "#"}
              className="group relative text-xs font-medium tracking-[0.15em] text-slate-400 transition-colors hover:text-white"
            >
              {item}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Status Pill */}
        <div
          className="hidden cursor-pointer items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 transition-colors hover:bg-emerald-500/10 sm:flex"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-1.5">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className={`h-1.5 w-1.5 rounded-full bg-emerald-500 ${isHovered ? "animate-pulse" : ""}`}
                style={{ animationDelay: `${dot * 150}ms` }}
              ></div>
            ))}
          </div>
          <span className="ml-2 text-[10px] tracking-widest text-emerald-500 uppercase">
            Systems Online
          </span>
        </div>

        {/* Action Button */}
        <Link href="/home" className="hidden md:block">
          <button className="text-xs font-bold tracking-widest text-white transition-colors hover:text-emerald-400">
            Launch
          </button>
        </Link>
      </div>
    </header>
  )
}
