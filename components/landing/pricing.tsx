"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"

export function Pricing() {
  const [isAnnually, setIsAnnually] = useState(true)
  const [animatePrice, setAnimatePrice] = useState(false)

  const handleToggle = (annually: boolean) => {
    if (isAnnually === annually) return
    setAnimatePrice(true)
    setTimeout(() => {
      setIsAnnually(annually)
      setAnimatePrice(false)
    }, 150)
  }

  return (
    <section className="relative border-t border-white/5 bg-[#030706] antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Subtle Grid Background & Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-emerald-500/10 blur-[120px]"></div>
        <div className="absolute right-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full bg-teal-500/5 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-32">
        <div className="items-start gap-12 lg:grid lg:grid-cols-12 lg:gap-20">
          {/* Sticky Sidebar: Context & Controls */}
          <div className="mb-16 flex flex-col gap-8 lg:sticky lg:top-32 lg:col-span-4 lg:mb-0">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#070D0A] px-3 py-1.5 text-[10px] font-medium tracking-widest text-slate-400 uppercase">
                <Icon icon="solar:clapperboard-linear" />
                Flexible Orchestration
              </div>
              <h2 className="text-4xl leading-[1.1] font-medium tracking-tight text-white lg:text-5xl">
                Creative output,{" "}
                <span className="text-emerald-500">scaled to fit.</span>
              </h2>
              <p className="text-base leading-relaxed font-normal text-slate-400">
                Align your creative costs with your actual visual throughput.
                Upgrade seamlessly as your project complexity and asset needs
                grow.
              </p>
            </div>

            {/* Sleek Billing Toggle */}
            <div className="mt-4 flex flex-col gap-3">
              <div
                className="relative inline-flex w-max rounded-full border border-white/10 bg-[#050C09] p-1"
                style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)" }}
              >
                {/* Sliding Indicator */}
                <div
                  className="absolute top-1 bottom-1 w-[100px] rounded-full border border-slate-700/50 bg-slate-800/80 shadow-sm transition-transform duration-300 ease-out"
                  style={{
                    transform: isAnnually
                      ? "translateX(100px)"
                      : "translateX(0)",
                  }}
                ></div>

                <button
                  onClick={() => handleToggle(false)}
                  className={`relative z-10 w-[100px] py-2.5 text-xs font-medium transition-colors duration-300 ${!isAnnually ? "text-white" : "text-slate-400 hover:text-slate-300"}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => handleToggle(true)}
                  className={`relative z-10 w-[100px] py-2.5 text-xs font-medium transition-colors duration-300 ${isAnnually ? "text-white" : "text-slate-400 hover:text-slate-300"}`}
                >
                  Annually
                </button>
              </div>
              <p className="ml-2 flex items-center gap-1.5 text-xs font-medium tracking-wide text-emerald-400">
                <Icon icon="solar:tag-linear" />
                Includes 2 months free
              </p>
            </div>
          </div>

          {/* Horizontal Tier Stack */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            {/* Standard Tier */}
            <div className="group relative flex flex-col items-center gap-8 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] sm:flex-row md:p-8">
              <div className="flex flex-col gap-4 sm:w-[45%]">
                <div>
                  <h3 className="mb-1 flex items-center gap-2 text-2xl font-medium tracking-tight text-white">
                    <Icon icon="solar:user-linear" className="text-slate-500" />
                    Standard Architect
                  </h3>
                  <p className="text-sm font-normal text-slate-400">
                    Baseline creative tools for individual storytellers.
                  </p>
                </div>
                <div className="mt-2 flex items-end gap-1.5 overflow-hidden">
                  <span
                    className={`text-4xl font-medium tracking-tight text-white transition-all duration-150 ease-out ${animatePrice ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    ${isAnnually ? "49" : "59"}
                  </span>
                  <span className="mb-1 text-sm text-slate-500">/mo</span>
                </div>
              </div>

              <div className="flex flex-col gap-6 border-t border-white/5 pt-6 sm:w-[55%] sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
                <ul className="flex flex-col gap-3.5 text-sm font-normal text-slate-300">
                  <li className="flex items-start gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="mt-0.5 text-lg text-slate-500"
                    />
                    Up to 10 narrative projects
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="mt-0.5 text-lg text-slate-500"
                    />
                    Standard AI scene generation
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="mt-0.5 text-lg text-slate-500"
                    />
                    7-day asset cloud retention
                  </li>
                </ul>
                <Link href="/billing">
                  <button className="w-full rounded-xl border border-slate-700 bg-slate-800 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 sm:w-max">
                    Deploy Standard
                  </button>
                </Link>
              </div>
            </div>

            {/* Advanced Tier (Highlighted) */}
            <div className="group/adv relative rounded-[2rem] bg-gradient-to-b from-emerald-500/40 via-emerald-800/10 to-white/5 p-[1px] shadow-xl shadow-emerald-900/10 transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-8 z-10 -translate-y-1/2 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold tracking-widest text-black uppercase shadow-lg shadow-emerald-500/20">
                Recommended
              </div>

              <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-[calc(2rem-1px)] bg-[#050C09]/90 p-6 backdrop-blur-xl sm:flex-row md:p-8">
                {/* Subtle background flare */}
                <div className="pointer-events-none absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-emerald-500/5 to-transparent"></div>

                <div className="relative z-10 flex flex-col gap-4 sm:w-[45%]">
                  <div>
                    <h3 className="mb-1 flex items-center gap-2 text-2xl font-medium tracking-tight text-white">
                      <Icon
                        icon="solar:star-linear"
                        className="text-emerald-400"
                      />
                      Creative Director
                    </h3>
                    <p className="text-sm font-normal text-emerald-300/80">
                      AI-driven orchestration for professional studios.
                    </p>
                  </div>
                  <div className="mt-2 flex items-end gap-1.5 overflow-hidden">
                    <span
                      className={`text-5xl font-medium tracking-tight text-white transition-all duration-150 ease-out ${animatePrice ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      ${isAnnually ? "149" : "189"}
                    </span>
                    <span className="mb-1.5 text-sm text-slate-500">/mo</span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col gap-6 border-t border-emerald-500/20 pt-6 sm:w-[55%] sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
                  <ul className="flex flex-col gap-3.5 text-sm font-normal text-slate-200">
                    <li className="flex items-start gap-3">
                      <Icon
                        icon="solar:check-circle-linear"
                        className="mt-0.5 text-lg text-emerald-400"
                      />
                      Unlimited narrative projects
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon
                        icon="solar:check-circle-linear"
                        className="mt-0.5 text-lg text-emerald-400"
                      />
                      Advanced Narrative Heuristic Engine
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon
                        icon="solar:check-circle-linear"
                        className="mt-0.5 text-lg text-emerald-400"
                      />
                      30-day asset cloud retention
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon
                        icon="solar:check-circle-linear"
                        className="mt-0.5 text-lg text-emerald-400"
                      />
                      Automated scene orchestration
                    </li>
                  </ul>
                  <Link href="/billing">
                    <button className="w-full rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-slate-200 sm:w-max">
                      Deploy Advanced
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="group relative flex flex-col items-center gap-8 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] sm:flex-row md:p-8">
              <div className="flex flex-col gap-4 sm:w-[45%]">
                <div>
                  <h3 className="mb-1 flex items-center gap-2 text-2xl font-medium tracking-tight text-white">
                    <Icon
                      icon="solar:buildings-linear"
                      className="text-slate-500"
                    />
                    Studio Enterprise
                  </h3>
                  <p className="text-sm font-normal text-slate-400">
                    Global scope with dedicated creative pipelines.
                  </p>
                </div>
                <div className="mt-2 flex items-end gap-1.5 overflow-hidden">
                  <span
                    className={`text-4xl font-medium tracking-tight text-white transition-all duration-150 ease-out ${animatePrice ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    ${isAnnually ? "499" : "599"}
                  </span>
                  <span className="mb-1 text-sm text-slate-500">/mo</span>
                </div>
              </div>

              <div className="flex flex-col gap-6 border-t border-white/5 pt-6 sm:w-[55%] sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
                <ul className="flex flex-col gap-3.5 text-sm font-normal text-slate-300">
                  <li className="flex items-start gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="mt-0.5 text-lg text-slate-500"
                    />
                    Dedicated bare-metal GPU nodes
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="mt-0.5 text-lg text-slate-500"
                    />
                    Custom style training models
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="mt-0.5 text-lg text-slate-500"
                    />
                    Unlimited asset storage
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon
                      icon="solar:check-circle-linear"
                      className="mt-0.5 text-lg text-slate-500"
                    />
                    24/7 dedicated creative support
                  </li>
                </ul>
                <Link href="/billing">
                  <button className="w-full rounded-xl border border-slate-700 bg-transparent px-6 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white sm:w-max">
                    Contact Sales
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
