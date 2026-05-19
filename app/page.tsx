"use client"

import * as React from "react"
import { UnicornBackground } from "@/components/landing/unicorn-background"
import { Hero } from "@/components/landing/hero"
import { FeaturesMinimal } from "@/components/landing/features-minimal"
import { Pricing } from "@/components/landing/pricing"
import { BottomCTA } from "@/components/landing/bottom-cta"
import { LandingNavbar } from "@/components/landing/landing-navbar"
import { LandingFooter } from "@/components/landing/landing-footer"

/**
 * LandingPage component: The public-facing marketing page.
 * Re-architected with a highly refined, minimal dark aesthetic.
 */
export default function LandingPage() {
  return (
    <div className="bg-background text-foreground min-h-screen font-sans tracking-tight selection:bg-[#10B981] selection:text-white">
      {/* Dynamic Aura Background */}
      <UnicornBackground />

      {/* Structural Vertical Guide Lines */}
      <div className="pointer-events-none fixed inset-0 z-0 mx-auto flex max-w-[1600px] justify-between px-8 opacity-[0.02] lg:px-24">
        <div className="h-full w-px bg-white"></div>
        <div className="h-full w-px bg-white"></div>
        <div className="hidden h-full w-px bg-white md:block"></div>
        <div className="hidden h-full w-px bg-white lg:block"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Persistent Premium Navbar */}
        <LandingNavbar />

        <main className="animate-in fade-in flex-grow pt-20 duration-1000">
          {/* Hero Section */}
          <Hero />

          {/* Minimal Platform Pipeline Features (Outlines, Chat Tools, Offscreen Vector Exports) */}
          <FeaturesMinimal />

          {/* Pricing Plans */}
          <Pricing />

          {/* Bottom Call to Action Banner */}
          <BottomCTA />
        </main>

        {/* Global Landing Footer */}
        <LandingFooter />
      </div>
    </div>
  )
}
