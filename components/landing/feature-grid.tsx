"use client"

import React, { useState } from "react"
import { Icon } from "@iconify/react"

export function FeatureGrid() {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ["Narrative", "Design", "Export"]

  const features = [
    {
      icon: "solar:clapperboard-edit-linear",
      title: "Contextual Intelligence",
      desc: "Deep understanding of story beats and character arcs.",
    },
    {
      icon: "solar:palet-2-linear",
      title: "Visual Standards",
      desc: "Enforces consistent style and visual hierarchy.",
    },
    {
      icon: "solar:layers-linear",
      title: "Scene Pipeline",
      desc: "Lossless rendering for cinematic resolutions.",
    },
    {
      icon: "solar:reorder-linear",
      title: "Live Synchronization",
      desc: "Instant updates across all project slides.",
    },
  ]

  return (
    <section className="relative border-t border-white/5 bg-[#030507] py-24">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-20 px-6 lg:flex-row lg:px-12">
        {/* Left: 2x2 Feature Grid */}
        <div className="relative w-full lg:w-1/2">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-transparent blur-3xl"></div>

          <div className="relative z-10 grid grid-cols-2 gap-4">
            {features.map((feat, i) => (
              <div
                key={i}
                className="dotted-texture-dense group aspect-square rounded-2xl border border-white/5 bg-[#070D0A] p-6 transition-all hover:border-emerald-500/30"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#030706]">
                  <div className="absolute inset-1 rounded-full border border-dashed border-white/20 transition-all duration-1000 group-hover:rotate-90 group-hover:border-emerald-500/50"></div>
                  <Icon
                    icon={feat.icon}
                    width="28"
                    className="text-slate-300 transition-colors group-hover:text-emerald-500"
                  />
                </div>
                <h4 className="mb-1 text-sm font-medium tracking-wide text-white">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-500">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Content & Tabs */}
        <div className="flex w-full flex-col items-start lg:w-1/2">
          {/* Simulated Tabs */}
          <div className="mb-10 flex gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-1">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                className={`rounded-md px-6 py-2 text-xs font-medium tracking-wider transition-all duration-300 ${
                  activeTab === idx
                    ? "bg-emerald-500 text-black shadow-md"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <h2 className="text-4xl leading-tight font-semibold tracking-tight text-white lg:text-5xl">
            Autonomous,
            <br />
            high-fidelity storyboards.
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-slate-400">
            Powered by our Narrative Heuristic Engine, Storyboard Architect
            parses script intent into structured visual beats, ensuring your
            vision is delivered with cinematic precision.
          </p>

          {/* Rating Block */}
          <div className="mt-10 mb-10 flex w-full max-w-md items-center gap-6 rounded-xl border border-white/10 bg-[#070D0A]/50 p-5">
            <div className="text-4xl font-semibold text-white">4.9</div>
            <div className="flex flex-col gap-1">
              <div className="flex text-emerald-500">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} icon="solar:star-bold" width="16" />
                ))}
              </div>
              <div className="text-xs text-slate-500">
                Empowering 10,000+ directors worldwide
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-lg border border-emerald-500/20 px-6 py-3 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/10">
            <Icon icon="solar:document-text-linear" width="18" />
            View Design Standards
          </button>
        </div>
      </div>
    </section>
  )
}
