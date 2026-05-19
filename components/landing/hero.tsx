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
            storyboard.io/project/martian-hydroponics
          </div>
          <div className="w-16"></div>
        </div>

        {/* Real ProjectView header mockup */}
        <div className="flex h-16 w-full items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-md text-xs font-semibold">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors">
              <Icon icon="solar:alt-arrow-left-linear" width="18" />
            </div>
            <div className="h-4 w-px bg-border"></div>
            <span className="text-sm font-bold tracking-tight text-foreground truncate max-w-[200px]">
              Martian Hydroponics Colony
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-[10px] opacity-60 sm:inline">80 credits remaining</span>
            <button className="flex h-9 items-center gap-2 rounded-full border border-border bg-background px-4 font-medium text-muted-foreground hover:bg-muted/50 transition-colors">
              <Icon icon="solar:upload-linear" width="14" />
              <span>Import</span>
            </button>
            <button className="flex h-9 items-center gap-2 rounded-full border border-border bg-background px-4 font-medium text-muted-foreground hover:bg-muted/50 transition-colors">
              <Icon icon="solar:download-linear" width="14" />
              <span>Export</span>
            </button>
            <button className="flex h-9 items-center gap-2 rounded-full bg-foreground text-background px-4 font-bold transition-all">
              <Icon icon="solar:play-linear" width="14" />
              <span>Present</span>
            </button>
          </div>
        </div>

        {/* Real ProjectView workspace: single scrollable main area */}
        <div className="relative flex h-[500px] w-full flex-col overflow-y-auto no-scrollbar bg-background text-left">
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
              <h1 className="text-2xl font-black tracking-tight text-foreground">
                Martian Hydroponics Colony
              </h1>
              <p className="text-xs leading-relaxed text-muted-foreground max-w-xl">
                A strategic outline detailing the food production, water recovery systems, and automated crop harvesters deployed for long-term Martian colony sustenance.
              </p>
            </div>

            {/* Sections / Slides list in vertical stack */}
            <div className="space-y-8">
              {/* Section 02 - Simple Summary */}
              <div className="flex flex-col gap-4 rounded-xl border border-border/40 bg-muted/10 p-5 md:flex-row">
                <div className="flex shrink-0 items-start gap-3 md:w-28">
                  <Icon icon="solar:menu-dots-bold" className="text-muted-foreground/30 mt-1" width="14" />
                  <span className="text-[10px] font-black text-muted-foreground/30">Section 02</span>
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-sm font-black text-foreground">Hydroponic Grid Assembly</h3>
                  <p className="text-xs text-muted-foreground">Setting up vertical growth towers and nutrient channels in Dome B.</p>
                </div>
              </div>

              {/* Section 03 - Active Animating Section */}
              <div className="group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-6 md:flex-row transition-colors">
                <div className="flex shrink-0 items-start gap-3 md:w-28">
                  <Icon icon="solar:menu-dots-bold" className="text-emerald-500/50 mt-1 cursor-grab" width="14" />
                  <span className="text-[10px] font-black text-emerald-500">Section 03</span>
                </div>

                <div className="flex-1 space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-foreground">Automated Harvesting Yields</h3>
                    <p className="text-xs text-muted-foreground">Calibration of autonomous gatherers and post-harvest caloric sorting analytics.</p>
                  </div>

                  {/* Inline Live Slide Preview frame */}
                  <div className="relative aspect-video w-full max-w-[460px] overflow-hidden rounded-xl border border-border bg-muted/20 shadow-lg">
                    <AnimatePresence mode="wait">
                      {animationStep === 0 && (
                        <motion.div
                          key="preview-empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-1.5"
                        >
                          <Icon icon="solar:shield-check-bold" className="text-muted-foreground/20 text-2xl" />
                          <p className="text-[10px] text-muted-foreground italic font-medium">Awaiting visual prompts for automated harvest...</p>
                        </motion.div>
                      )}

                      {animationStep === 1 && (
                        <motion.div
                          key="preview-loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-center bg-muted/40"
                        >
                          <div className="flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 rounded-lg text-emerald-500 font-mono text-[9px]">
                            <Icon icon="solar:magic-stick-linear" className="animate-spin" />
                            <span>AI Architect generating slide visuals...</span>
                          </div>
                        </motion.div>
                      )}

                      {(animationStep === 2 || animationStep === 3) && (
                        <motion.div
                          key="preview-ready"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-card p-4 flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between border-b border-border/50 pb-1.5">
                            <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-wider">Beat 3 / Caloric Yield</span>
                            <Icon icon="solar:shield-check-bold" className="text-emerald-500" width="12" />
                          </div>

                          <div className="grid grid-cols-3 gap-2 my-2 flex-grow">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="rounded border border-border bg-muted/50 p-1.5 flex flex-col justify-between"
                            >
                              <span className="text-[7px] text-muted-foreground">Harvest Rate</span>
                              <span className="text-[10px] font-mono font-bold text-emerald-500">840kg/day</span>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="rounded border border-border bg-muted/50 p-1.5 flex flex-col justify-between col-span-2"
                            >
                              <span className="text-[7px] text-muted-foreground">Automation Ratio</span>
                              <span className="text-[10px] font-mono font-bold text-foreground">99.4% Calibrated</span>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="rounded border border-border bg-muted/50 p-1.5 col-span-3 text-[8px] text-muted-foreground leading-normal"
                            >
                              Balancing caloric outputs from Dome B hydroponic nodes under telemetry automation rules.
                            </motion.div>
                          </div>

                          <div className="flex justify-between text-[7px] text-muted-foreground/60 border-t border-border/50 pt-1">
                            <span>Safe Zone active</span>
                            <span>960 x 540</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Real Section Toolbar at the bottom of the card */}
                  <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1 shadow-md w-max">
                    <button className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted text-muted-foreground">
                      <Icon icon="solar:compass-linear" width="13" />
                    </button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 font-bold transition-all">
                      <Icon icon="solar:wand-linear" width="13" className={animationStep === 1 ? "animate-spin" : ""} />
                    </button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted text-muted-foreground">
                      <Icon icon="solar:add-circle-linear" width="13" />
                    </button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted text-muted-foreground">
                      <Icon icon="solar:magic-stick-linear" width="13" />
                    </button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted text-muted-foreground">
                      <Icon icon="solar:trash-bin-trash-linear" width="13" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating AI Architect Chat widget (Bottom Right) */}
          <div className="absolute bottom-4 right-4 z-50 flex flex-col items-end gap-2">
            <AnimatePresence>
              {animationStep >= 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="flex h-[320px] w-[280px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl text-[10px]"
                >
                  <div className="flex items-center justify-between border-b border-border bg-muted/30 px-3 py-2.5 font-bold">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span>Project Assistant</span>
                    </div>
                  </div>

                  <div className="flex-grow overflow-y-auto no-scrollbar p-3 space-y-2.5">
                    {/* User Prompt */}
                    <div className="flex flex-col gap-0.5 rounded-lg p-2 border border-border bg-background/50 self-end ml-3">
                      <span className="text-[7px] font-bold text-muted-foreground uppercase">User</span>
                      <p className="leading-relaxed">Generate outline beats and create a metrics slide for automated harvesting yields.</p>
                    </div>

                    {/* AI outline reaction */}
                    {animationStep === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col gap-0.5 rounded-lg p-2 border border-border bg-muted/30 mr-3 text-muted-foreground"
                      >
                        <span className="text-[7px] font-bold text-emerald-500 uppercase">AI</span>
                        <p className="leading-relaxed">Outline generated. Section 01, 02, and 03 outlines populated.</p>
                      </motion.div>
                    )}

                    {/* AI tool feedback */}
                    {animationStep >= 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col gap-0.5 rounded-lg p-2 border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-mono text-[8px]"
                      >
                        <span className="text-[7px] font-bold text-emerald-500 uppercase">Action</span>
                        <p className="leading-relaxed">Executing tool 'generate_slide' on Section 03... [Success]</p>
                      </motion.div>
                    )}

                    {/* AI completion reaction */}
                    {animationStep >= 2 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col gap-0.5 rounded-lg p-2 border border-border bg-muted/30 mr-3 text-muted-foreground"
                      >
                        <span className="text-[7px] font-bold text-emerald-500 uppercase">AI</span>
                        <p className="leading-relaxed">I have generated the telemetry metrics layout for Section 03. Live slide rendered in the feed.</p>
                      </motion.div>
                    )}
                  </div>

                  <div className="border-t border-border p-2 bg-background">
                    <div className="flex h-7 items-center justify-between rounded border border-border bg-card px-2 text-muted-foreground/60">
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
