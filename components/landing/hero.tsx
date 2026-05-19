"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { motion, AnimatePresence } from "framer-motion"

export function Hero() {
  // Animation steps:
  // 0: Typing prompt and generating Outline beats in left panel
  // 1: Triggering slide generation for active outline beat (Beat 3)
  // 2: Live rendering/assembling slide layouts on the canvas
  // 3: Finished / Display state showing final output
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
        <h1 className="text-foreground text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
          Creative Director intelligence. <br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-500">
            Scaled to your vision.
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-muted-foreground relative z-10 max-w-2xl text-sm leading-relaxed sm:text-base"
      >
        Translate scripts into storyboard outlines. Collaboratively edit,
        inject, and refine layouts through conversational Gemini 3 tool calling,
        and export perfect native-vector formats offscreen.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link href="/home">
          <button className="bg-foreground text-background flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold shadow-md transition-opacity hover:opacity-90">
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
        className="border-border bg-card relative z-10 mt-8 w-full max-w-[1200px] overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300"
        style={{
          boxShadow:
            "0 0 50px rgba(16, 185, 129, 0.03), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Browser chrome header */}
        <div className="border-border bg-muted/65 flex h-12 w-full items-center justify-between border-b px-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/40"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500/40"></div>
            <div className="h-3 w-3 rounded-full bg-emerald-500/40"></div>
          </div>
          <div className="border-border/50 bg-background text-muted-foreground/80 flex h-6 w-80 items-center justify-center rounded border text-[10px] font-medium">
            storyboard.io/project/martian-hydroponics
          </div>
          <div className="w-16"></div>
        </div>

        {/* Real ProjectView header mockup */}
        <div className="border-border bg-card/80 flex h-16 w-full items-center justify-between border-b px-6 text-xs font-semibold backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="hover:bg-muted text-muted-foreground flex h-9 w-9 items-center justify-center rounded-full transition-colors">
              <Icon icon="solar:alt-arrow-left-linear" width="18" />
            </div>
            <div className="bg-border h-4 w-px"></div>
            <span className="text-foreground max-w-[200px] truncate text-sm font-bold tracking-tight">
              Martian Hydroponics Colony
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-[10px] opacity-60 sm:inline">
              80 credits remaining
            </span>
            <button className="border-border bg-background text-muted-foreground hover:bg-muted/50 flex h-9 items-center gap-2 rounded-full border px-4 font-medium transition-colors">
              <Icon icon="solar:upload-linear" width="14" />
              <span>Import</span>
            </button>
            <button className="border-border bg-background text-muted-foreground hover:bg-muted/50 flex h-9 items-center gap-2 rounded-full border px-4 font-medium transition-colors">
              <Icon icon="solar:download-linear" width="14" />
              <span>Export</span>
            </button>
            <button className="bg-foreground text-background flex h-9 items-center gap-2 rounded-full px-4 font-bold transition-all">
              <Icon icon="solar:play-linear" width="14" />
              <span>Present</span>
            </button>
          </div>
        </div>

        {/* Real ProjectView workspace: single scrollable main area */}
        <div className="no-scrollbar bg-background relative flex h-[500px] w-full flex-col overflow-y-auto text-left">
          {/* Radial grid decorator */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 mx-auto w-full max-w-[900px] space-y-12 px-8 py-10 pb-28">
            {/* Storyboard title & description arc */}
            <div className="space-y-3">
              <h1 className="text-foreground text-2xl font-black tracking-tight">
                Martian Hydroponics Colony
              </h1>
              <p className="text-muted-foreground max-w-xl text-xs leading-relaxed">
                A strategic outline detailing the food production, water
                recovery systems, and automated crop harvesters deployed for
                long-term Martian colony sustenance.
              </p>
            </div>

            {/* Sections / Slides list in vertical stack */}
            <div className="space-y-8">
              {/* Section 02 - Simple Summary */}
              <div className="border-border/40 bg-muted/10 flex flex-col gap-4 rounded-xl border p-5 md:flex-row">
                <div className="flex shrink-0 items-start gap-3 md:w-28">
                  <Icon
                    icon="solar:menu-dots-bold"
                    className="text-muted-foreground/30 mt-1"
                    width="14"
                  />
                  <span className="text-muted-foreground/30 text-[10px] font-black">
                    Section 02
                  </span>
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-foreground text-sm font-black">
                    Hydroponic Grid Assembly
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    Setting up vertical growth towers and nutrient channels in
                    Dome B.
                  </p>
                </div>
              </div>

              {/* Section 03 - Active Animating Section */}
              <div className="group border-border bg-card relative flex flex-col gap-4 rounded-xl border p-6 transition-colors md:flex-row">
                <div className="flex shrink-0 items-start gap-3 md:w-28">
                  <Icon
                    icon="solar:menu-dots-bold"
                    className="mt-1 cursor-grab text-emerald-500/50"
                    width="14"
                  />
                  <span className="text-[10px] font-black text-emerald-500">
                    Section 03
                  </span>
                </div>

                <div className="flex-1 space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-foreground text-sm font-black">
                      Automated Harvesting Yields
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Calibration of autonomous gatherers and post-harvest
                      caloric sorting analytics.
                    </p>
                  </div>

                  {/* Inline Live Slide Preview frame */}
                  <div className="border-border bg-muted/20 relative aspect-video w-full max-w-[460px] overflow-hidden rounded-xl border shadow-lg">
                    <AnimatePresence mode="wait">
                      {animationStep === 0 && (
                        <motion.div
                          key="preview-empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-center space-y-1.5 p-6 text-center"
                        >
                          <Icon
                            icon="solar:shield-check-bold"
                            className="text-muted-foreground/20 text-2xl"
                          />
                          <p className="text-muted-foreground text-[10px] font-medium italic">
                            Awaiting visual prompts for automated harvest...
                          </p>
                        </motion.div>
                      )}

                      {animationStep === 1 && (
                        <motion.div
                          key="preview-loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-muted/40 absolute inset-0 flex flex-col items-center justify-center"
                        >
                          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 font-mono text-[9px] text-emerald-500">
                            <Icon
                              icon="solar:magic-stick-linear"
                              className="animate-spin"
                            />
                            <span>
                              AI Architect generating slide visuals...
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {(animationStep === 2 || animationStep === 3) && (
                        <motion.div
                          key="preview-ready"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-card absolute inset-0 flex flex-col justify-between p-4"
                        >
                          <div className="border-border/50 flex items-center justify-between border-b pb-1.5">
                            <span className="text-[8px] font-bold tracking-wider text-emerald-500 uppercase">
                              Beat 3 / Caloric Yield
                            </span>
                            <Icon
                              icon="solar:shield-check-bold"
                              className="text-emerald-500"
                              width="12"
                            />
                          </div>

                          <div className="my-2 grid flex-grow grid-cols-3 gap-2">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="border-border bg-muted/50 flex flex-col justify-between rounded border p-1.5"
                            >
                              <span className="text-muted-foreground text-[7px]">
                                Harvest Rate
                              </span>
                              <span className="font-mono text-[10px] font-bold text-emerald-500">
                                840kg/day
                              </span>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="border-border bg-muted/50 col-span-2 flex flex-col justify-between rounded border p-1.5"
                            >
                              <span className="text-muted-foreground text-[7px]">
                                Automation Ratio
                              </span>
                              <span className="text-foreground font-mono text-[10px] font-bold">
                                99.4% Calibrated
                              </span>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="border-border bg-muted/50 text-muted-foreground col-span-3 rounded border p-1.5 text-[8px] leading-normal"
                            >
                              Balancing caloric outputs from Dome B hydroponic
                              nodes under telemetry automation rules.
                            </motion.div>
                          </div>

                          <div className="text-muted-foreground/60 border-border/50 flex justify-between border-t pt-1 text-[7px]">
                            <span>Safe Zone active</span>
                            <span>960 x 540</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Real Section Toolbar at the bottom of the card */}
                  <div className="border-border bg-background flex w-max items-center gap-1 rounded-full border p-1 shadow-md">
                    <button className="hover:bg-muted text-muted-foreground flex h-7 w-7 items-center justify-center rounded-full">
                      <Icon icon="solar:compass-linear" width="13" />
                    </button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 font-bold text-emerald-500 transition-all hover:bg-emerald-500/20">
                      <Icon
                        icon="solar:wand-linear"
                        width="13"
                        className={animationStep === 1 ? "animate-spin" : ""}
                      />
                    </button>
                    <button className="hover:bg-muted text-muted-foreground flex h-7 w-7 items-center justify-center rounded-full">
                      <Icon icon="solar:add-circle-linear" width="13" />
                    </button>
                    <button className="hover:bg-muted text-muted-foreground flex h-7 w-7 items-center justify-center rounded-full">
                      <Icon icon="solar:magic-stick-linear" width="13" />
                    </button>
                    <button className="hover:bg-muted text-muted-foreground flex h-7 w-7 items-center justify-center rounded-full">
                      <Icon icon="solar:trash-bin-trash-linear" width="13" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating AI Architect Chat widget (Bottom Right) */}
          <div className="absolute right-4 bottom-4 z-50 flex flex-col items-end gap-2">
            <AnimatePresence>
              {animationStep >= 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="border-border bg-card flex h-[320px] w-[280px] flex-col overflow-hidden rounded-2xl border text-[10px] shadow-2xl"
                >
                  <div className="border-border bg-muted/30 flex items-center justify-between border-b px-3 py-2.5 font-bold">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></div>
                      <span>Project Assistant</span>
                    </div>
                  </div>

                  <div className="no-scrollbar flex-grow space-y-2.5 overflow-y-auto p-3">
                    {/* User Prompt */}
                    <div className="border-border bg-background/50 ml-3 flex flex-col gap-0.5 self-end rounded-lg border p-2">
                      <span className="text-muted-foreground text-[7px] font-bold uppercase">
                        User
                      </span>
                      <p className="leading-relaxed">
                        Generate outline beats and create a metrics slide for
                        automated harvesting yields.
                      </p>
                    </div>

                    {/* AI outline reaction */}
                    {animationStep === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-border bg-muted/30 text-muted-foreground mr-3 flex flex-col gap-0.5 rounded-lg border p-2"
                      >
                        <span className="text-[7px] font-bold text-emerald-500 uppercase">
                          AI
                        </span>
                        <p className="leading-relaxed">
                          Outline generated. Section 01, 02, and 03 outlines
                          populated.
                        </p>
                      </motion.div>
                    )}

                    {/* AI tool feedback */}
                    {animationStep >= 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col gap-0.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2 font-mono text-[8px] text-emerald-600 dark:text-emerald-400"
                      >
                        <span className="text-[7px] font-bold text-emerald-500 uppercase">
                          Action
                        </span>
                        <p className="leading-relaxed">
                          Executing tool &apos;generate_slide&apos; on Section 03...
                          [Success]
                        </p>
                      </motion.div>
                    )}

                    {/* AI completion reaction */}
                    {animationStep >= 2 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-border bg-muted/30 text-muted-foreground mr-3 flex flex-col gap-0.5 rounded-lg border p-2"
                      >
                        <span className="text-[7px] font-bold text-emerald-500 uppercase">
                          AI
                        </span>
                        <p className="leading-relaxed">
                          I have generated the telemetry metrics layout for
                          Section 03. Live slide rendered in the feed.
                        </p>
                      </motion.div>
                    )}
                  </div>

                  <div className="border-border bg-background border-t p-2">
                    <div className="border-border bg-card text-muted-foreground/60 flex h-7 items-center justify-between rounded border px-2">
                      <span>Refining slide...</span>
                      <Icon icon="solar:send-linear" width="11" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Bubble Toggle Button */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-black shadow-lg">
              <Icon icon="solar:chat-line-linear" width="20" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
