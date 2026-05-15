"use client"

import * as React from "react"
import { UnicornBackground } from "@/components/landing/unicorn-background"
import { Hero } from "@/components/landing/hero"
import { FeatureGrid } from "@/components/landing/feature-grid"
import { Capabilities } from "@/components/landing/capabilities"
import { TechStack } from "@/components/landing/tech-stack"
import { Pricing } from "@/components/landing/pricing"
import { BottomCTA } from "@/components/landing/bottom-cta"
import { LandingNavbar } from "@/components/landing/landing-navbar"
import { LandingFooter } from "@/components/landing/landing-footer"

/**
 * LandingPage component: The public-facing marketing page.
 * Re-architected with a high-fidelity, premium dark aesthetic inspired by Unicorn Studio.
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030706] font-sans tracking-tight text-neutral-200 selection:bg-[#10B981] selection:text-white">
      {/* Dynamic Aura Background */}
      <UnicornBackground />

      {/* Structural Vertical Guide Lines */}
      <div className="pointer-events-none fixed inset-0 z-0 mx-auto flex max-w-[1600px] justify-between px-8 opacity-10 lg:px-24">
        <div className="h-full w-px bg-white/20"></div>
        <div className="h-full w-px bg-white/20"></div>
        <div className="hidden h-full w-px bg-white/20 md:block"></div>
        <div className="hidden h-full w-px bg-white/20 lg:block"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Persistent Premium Navbar */}
        <LandingNavbar />

        <main className="animate-in fade-in flex-grow pt-20 duration-1000">
          {/* Hero Section */}
          <Hero />

          {/* Detailed Feature Grid */}
          <FeatureGrid />

          {/* Capabilities Grid with Canvas Animation */}
          <Capabilities />

          {/* Infrastructure Tech Stack with Network Animation */}
          <TechStack />

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
