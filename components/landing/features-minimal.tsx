"use client"

import React from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"

export function FeaturesMinimal() {
  const steps = [
    {
      num: "01 /",
      icon: "solar:bill-list-linear",
      title: "Contextual outlining",
      description:
        "Input your vision. The platform instantly analyzes the narrative flow to architect a cohesive sequence of 5-7 distinct story beats, setting a unified visual DNA.",
    },
    {
      num: "02 /",
      icon: "solar:magic-stick-linear",
      title: "Creative director agent",
      description:
        "Refine beats through real-time chat. The AI autonomously executes design tool loops, injecting, reordering, deleting, and updating slides with exact Tailwind v4 classes.",
    },
    {
      num: "03 /",
      icon: "solar:export-linear",
      title: "Offscreen vector exports",
      description:
        "Flawless production handoff. The engine renders HTML slides offscreen, measures layouts to pixel coordinates, and compiles native PowerPoint and print-perfect PDFs.",
    },
  ]

  return (
    <section
      id="features"
      className="border-border bg-background relative border-t antialiased selection:bg-emerald-500/30 selection:text-emerald-200"
    >
      {/* Subtle vertical structural guide lines */}
      <div className="pointer-events-none absolute inset-0 z-0 mx-auto flex max-w-[1400px] justify-between px-6 opacity-[0.03] lg:px-12">
        <div className="h-full w-px bg-emerald-500"></div>
        <div className="h-full w-px bg-emerald-500"></div>
        <div className="hidden h-full w-px bg-emerald-500 md:block"></div>
        <div className="hidden h-full w-px bg-emerald-500 lg:block"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">
        {/* Header */}
        <div className="mb-16 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
            Unified creative flow
          </div>
          <h2 className="text-foreground text-3xl leading-tight font-medium tracking-tight lg:text-4xl">
            High-fidelity execution, <br />
            <span className="text-emerald-500">zero layout friction.</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Ditch manual layout adjustments and complex asset pipelines.
            Storyboard combines conversational AI speed with professional design
            engineering.
          </p>
        </div>

        {/* 3-Column Steps Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col gap-5"
            >
              <div className="border-border flex items-center justify-between border-b pb-4">
                <span className="text-xs font-semibold text-emerald-500/70">
                  {step.num}
                </span>
                <div className="border-border bg-card flex h-8 w-8 items-center justify-center rounded-lg border transition-colors group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5">
                  <Icon
                    icon={step.icon}
                    width="16"
                    className="text-muted-foreground transition-colors group-hover:text-emerald-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-foreground text-base font-medium tracking-tight transition-colors group-hover:text-emerald-400">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
