"use client"

import React from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"

export function LandingNavbar() {
  const navItems = [
    { label: "Features", target: "#features" },
    { label: "Pricing", target: "#pricing" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    const element = document.querySelector(target)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <Logo className="text-foreground group-hover:text-emerald-500 transition-colors" width={28} height={28} />
          <span className="text-lg font-medium tracking-tight text-foreground">
            Storyboard
          </span>
        </Link>

        {/* Nav Links with Smooth Scroll */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.target}
              onClick={(e) => handleScroll(e, item.target)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Theme Toggle */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link href="/home" className="hidden md:block">
            <button className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors">
              Launch application
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
