"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { motion, AnimatePresence } from "framer-motion"

export function Hero() {
  // Animation state representing the generation lifecycle
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center gap-10 px-6 pt-16 pb-20 text-center lg:px-12 lg:pt-20 lg:pb-28">
      {/* Background glow behind text */}
      <div className="pointer-events-none absolute top-[-50px] left-1/2 z-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]"></div>

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center gap-3"
      >
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Storyboard builder
        </span>
      </motion.div>

      {/* Massive Cinematic Heading */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 space-y-4"
      >
        <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Creative Director intelligence. <br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-500 bg-clip-text text-transparent">
            Scaled to your vision.
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
      >
        Translate scripts into storyboard outlines. Collaboratively edit, inject, and refine layouts through conversational Gemini 3 tool calling, and export perfect native-vector formats offscreen.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link href="/home">
          <button className="flex items-center gap-2 rounded-xl bg-foreground text-background px-8 py-3.5 text-sm font-semibold shadow-md hover:opacity-90 transition-opacity">
            Start your project
            <Icon icon="solar:arrow-right-linear" width="18" />
          </button>
        </Link>
      </motion.div>

      {/* Premium Application Canvas Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 mt-8 w-full max-w-[1200px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300"
        style={{
          boxShadow: "0 0 50px rgba(16, 185, 129, 0.03), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Browser chrome header */}
        <div className="flex h-12 w-full items-center justify-between border-b border-border bg-muted/65 px-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/40"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500/40"></div>
            <div className="h-3 w-3 rounded-full bg-emerald-500/40"></div>
          </div>
          <div className="flex h-6 w-80 items-center justify-center rounded border border-border/50 bg-background text-[10px] text-muted-foreground/80 font-medium">
            storyboard.io/project/clq238hf00
          </div>
          <div className="w-16"></div>
        </div>

        {/* Workspace interface */}
        <div className="flex h-[520px] w-full text-left bg-background/50">
          {/* Left panel: Beat Outline */}
          <div className="hidden w-64 flex-col border-r border-border bg-muted/30 p-4 md:flex">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground/75">
                Beat outline
              </span>
              <Icon icon="solar:menu-dots-bold" className="text-muted-foreground/60" />
            </div>
            <div className="space-y-1.5">
              {[
                { idx: "01", title: "Strategic roadmap", active: false },
                { idx: "02", title: "GPU infrastructure", active: false },
                { idx: "03", title: "Model governance", active: true },
                { idx: "04", title: "Scalable deployment", active: false },
              ].map((slide, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-lg p-2.5 transition-colors ${
                    slide.active
                      ? "border border-emerald-500/20 bg-emerald-500/5 text-foreground"
                      : "text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  <span className={`text-xs font-semibold ${slide.active ? "text-emerald-500" : "text-muted-foreground/50"}`}>
                    {slide.idx}
                  </span>
                  <span className="text-xs font-medium truncate">{slide.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Canvas Slide rendering */}
          <div className="flex-1 bg-background/25 p-6 flex flex-col justify-center items-center relative overflow-hidden">
            {/* Aspect ratio frame preview wrapper representing 960x540 canvas */}
            <div
              className="relative w-full max-w-[560px] aspect-[960/540] overflow-hidden rounded-xl border border-border bg-card shadow-lg"
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="absolute inset-0 bg-card flex flex-col justify-between p-5">
                {/* Safe zone indicator border */}
                <div className="absolute inset-3 rounded-lg border border-dashed border-emerald-500/10 pointer-events-none"></div>

                {/* Top header beat area */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-semibold text-emerald-500 uppercase tracking-wider">
                      Beat 3 / Ethics
                    </span>
                    <h2 className="text-xs font-bold text-foreground">
                      Ethical model governance
                    </h2>
                  </div>
                  <Icon icon="solar:shield-check-bold" className="text-emerald-500 text-base" />
                </div>

                {/* Dynamic Content Generation Mockup Container */}
                <div className="relative z-10 flex-1 flex flex-col justify-center my-2">
                  <AnimatePresence mode="wait">
                    {animationStep === 0 && (
                      <motion.div
                        key="step0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-4 space-y-1"
                      >
                        <p className="text-[10px] text-muted-foreground italic font-medium">Awaiting input from creative director...</p>
                        <div className="flex justify-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }}></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }}></span>
                          <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }}></span>
                        </div>
                      </motion.div>
                    )}

                    {animationStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-4 space-y-2"
                      >
                        <div className="flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 rounded-lg text-emerald-500 font-mono text-[9px]">
                          <Icon icon="solar:magic-stick-linear" className="animate-spin" />
                          <span>Generating Bento Grid layouts...</span>
                        </div>
                      </motion.div>
                    )}

                    {(animationStep === 2 || animationStep === 3) && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-3 gap-2.5 w-full"
                      >
                        {/* Bento Item 1 */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="rounded-lg border border-border bg-muted/40 p-2 space-y-0.5"
                        >
                          <span className="text-[8px] text-muted-foreground font-semibold">Latency</span>
                          <p className="text-[11px] font-mono font-bold text-emerald-500">12ms</p>
                        </motion.div>

                        {/* Bento Item 2 */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="rounded-lg border border-border bg-muted/40 p-2 space-y-0.5 col-span-2"
                        >
                          <span className="text-[8px] text-muted-foreground font-semibold">Ethics Score</span>
                          <p className="text-[11px] font-mono font-bold text-foreground">99.8% compliance</p>
                        </motion.div>

                        {/* Bento Item 3 (Full row content) */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="rounded-lg border border-border bg-muted/40 p-2 col-span-3"
                        >
                          <p className="text-[9px] leading-relaxed text-muted-foreground font-medium">
                            Enforcing differential privacy bounds and zero-knowledge checkpoints natively across standard GPU pipeline partitions.
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer metrics */}
                <div className="relative z-10 flex items-center justify-between border-t border-border pt-2">
                  <span className="text-[8px] text-muted-foreground/60 font-semibold uppercase tracking-wider">
                    Storyboard Safe Zone
                  </span>
                  <span className="text-[8px] font-semibold text-emerald-500">
                    960 x 540
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 text-[10px] text-muted-foreground/80 flex items-center gap-1.5 font-medium">
              <Icon icon="solar:window-frame-linear" />
              Live canvas frame (slide 3)
            </div>
          </div>

          {/* Right panel: Floating Refinement chat feed */}
          <div className="hidden w-72 flex-col border-l border-border bg-muted/30 p-4 lg:flex">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-muted-foreground/75">
                Creative director loop
              </span>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar pr-1 text-xs">
              {/* Message 1 */}
              <div className="flex flex-col gap-1 rounded-xl p-3 border border-border bg-background/50 self-end ml-4">
                <span className="text-[8px] font-bold uppercase text-muted-foreground/60">
                  User
                </span>
                <p className="leading-relaxed font-medium">Add a bento grid metric card and style the model compliance details.</p>
              </div>

              {/* Message 2 (Tool trigger status) */}
              {animationStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-1 rounded-xl p-3 border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] leading-normal"
                >
                  <span className="text-[8px] font-bold uppercase text-emerald-500">
                    Action
                  </span>
                  <p className="leading-relaxed">Executing tool 'update_slide' on slide 3... [Success]</p>
                </motion.div>
              )}

              {/* Message 3 (AI response status) */}
              {animationStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-1 rounded-xl p-3 border border-border bg-card mr-4 text-muted-foreground"
                >
                  <span className="text-[8px] font-bold uppercase text-emerald-500">
                    AI
                  </span>
                  <p className="leading-relaxed font-medium">I have updated slide 3. Applied the bento grid metrics layouts and updated governance compliance details.</p>
                </motion.div>
              )}
            </div>
            <div className="mt-3 flex gap-2 rounded-lg border border-border bg-background p-2 items-center">
              <span className="text-[10px] text-muted-foreground/50 flex-1 font-medium">
                {animationStep === 0 ? "Typing..." : "Refine storyboard..."}
              </span>
              <Icon icon="solar:send-linear" className="text-muted-foreground/60" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
