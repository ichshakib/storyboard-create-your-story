"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"

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

  const tiers = [
    {
      name: "Standard",
      priceMonthly: 59,
      priceAnnually: 49,
      description: "Baseline creative tools for individual storytellers.",
      features: [
        "Up to 10 narrative projects",
        "Standard AI scene generation",
        "7-day asset cloud retention",
      ],
      actionText: "Deploy Standard",
      recommended: false,
    },
    {
      name: "Creative Director",
      priceMonthly: 189,
      priceAnnually: 149,
      description: "AI-driven orchestration for professional studios.",
      features: [
        "Unlimited narrative projects",
        "Advanced Heuristic Engine",
        "30-day asset cloud retention",
        "Automated composition tools",
      ],
      actionText: "Deploy Advanced",
      recommended: true,
    },
    {
      name: "Studio Enterprise",
      priceMonthly: 599,
      priceAnnually: 499,
      description: "Global scope with dedicated creative pipelines.",
      features: [
        "Dedicated bare-metal GPU nodes",
        "Custom style training models",
        "Unlimited asset storage",
        "24/7 dedicated priority support",
      ],
      actionText: "Contact Sales",
      recommended: false,
    },
  ]

  return (
    <section id="pricing" className="relative border-t border-white/5 bg-[#030706] antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Subtle Grid Background & Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div className="absolute top-[20%] left-[20%] h-[40%] w-[40%] rounded-full bg-emerald-500/5 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">
        {/* Title area */}
        <div className="mb-16 flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#070D0A] px-3 py-1 text-xs font-semibold text-slate-400">
            <Icon icon="solar:tag-linear" />
            Pricing strategy
          </div>
          <h2 className="text-3xl leading-tight font-medium tracking-tight text-white lg:text-4xl">
            Sleek tiers, <span className="text-emerald-500">scaled to fit.</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            Scale your visual outputs without abstract friction. Upgrade or downgrade seamlessly as your pipeline needs evolve.
          </p>

          {/* Billing Toggle */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <div
              className="relative inline-flex w-max rounded-full border border-white/10 bg-[#050C09] p-1 shadow-inner"
            >
              {/* Sliding Indicator */}
              <div
                className="absolute top-1 bottom-1 w-[80px] rounded-full border border-slate-700/50 bg-slate-800/80 shadow-sm transition-transform duration-300 ease-out"
                style={{
                  transform: isAnnually ? "translateX(80px)" : "translateX(0)",
                }}
              ></div>

              <button
                onClick={() => handleToggle(false)}
                className={`relative z-10 w-[80px] py-1.5 text-xs font-medium transition-colors duration-300 ${!isAnnually ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => handleToggle(true)}
                className={`relative z-10 w-[80px] py-1.5 text-xs font-medium transition-colors duration-300 ${isAnnually ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
              >
                Annually
              </button>
            </div>
            <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <Icon icon="solar:tag-bold" />
              Save up to 20% annually
            </p>
          </div>
        </div>

        {/* 3-Column Tiers Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative rounded-[2rem] flex flex-col justify-between p-8 backdrop-blur-md transition-all duration-300 ${
                tier.recommended
                  ? "bg-gradient-to-b from-emerald-500/20 via-emerald-950/5 to-white/5 border border-emerald-500/30 shadow-lg shadow-emerald-950/20"
                  : "bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
              }`}
            >
              {tier.recommended && (
                <div className="absolute top-0 right-8 z-10 -translate-y-1/2 rounded-full bg-emerald-500 px-3.5 py-1 text-[10px] font-semibold text-black shadow-lg shadow-emerald-500/20">
                  Recommended
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium tracking-tight text-white mb-1.5">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="flex items-end gap-1 overflow-hidden">
                  <span
                    className={`text-3xl font-semibold tracking-tight text-white transition-all duration-150 ease-out ${
                      animatePrice ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
                    }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    ${isAnnually ? tier.priceAnnually : tier.priceMonthly}
                  </span>
                  <span className="text-xs font-medium text-slate-500 pb-1">
                    / mo
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 border-t border-white/5 pt-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Icon
                        icon="solar:check-circle-linear"
                        className={`text-base shrink-0 mt-0.5 ${
                          tier.recommended ? "text-emerald-400" : "text-slate-500"
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link href="/billing" className="w-full">
                  <button
                    className={`w-full rounded-xl py-3 text-xs font-semibold tracking-wide transition-all ${
                      tier.recommended
                        ? "bg-white text-black shadow-md hover:bg-slate-200"
                        : "border border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700"
                    }`}
                  >
                    {tier.actionText}
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
