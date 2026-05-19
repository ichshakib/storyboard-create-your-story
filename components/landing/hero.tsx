"use client"

import React from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"

export function Hero() {
  const mockupSlides = [
    { idx: "01", title: "Strategic roadmap", active: false },
    { idx: "02", title: "GPU infrastructure", active: false },
    { idx: "03", title: "Model governance", active: true },
    { idx: "04", title: "Scalable deployment", active: false },
  ]

  const chatMessages = [
    { role: "User", text: "Add a bento grid metric card and change the theme to a sleek dark green vibe." },
    { role: "Action", text: "Executing tool 'update_slide' on slide 3... [Success]", isTool: true },
    { role: "AI", text: "I have updated slide 3. Applied the bento grid layout and dark green style matching your theme." },
  ]

  return (
    <section className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center gap-10 px-6 pt-16 pb-20 text-center lg:px-12 lg:pt-20 lg:pb-28">
      {/* Background glow behind text */}
      <div className="pointer-events-none absolute top-[-50px] left-1/2 z-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]"></div>

      {/* Eyebrow - Normal Case */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center gap-3"
      >
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-400">
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
        <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
          Creative Director intelligence. <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
            Scaled to your vision.
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base"
      >
        Translate scripts into storyboard outlines. Collaboratively edit, inject, and refine layouts through conversational Gemini 3 tool calling, and export perfect native-vector formats offscreen.
      </motion.p>

      {/* Action Buttons - Normal Case and Straightforward */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link href="/home">
          <button className="flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-md hover:bg-slate-200 transition-colors">
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
        className="relative z-10 mt-8 w-full max-w-[1200px] overflow-hidden rounded-2xl border border-white/10 bg-[#050C08]/90 shadow-2xl shadow-black/80"
        style={{
          boxShadow: "0 0 50px rgba(16, 185, 129, 0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Browser chrome header */}
        <div className="flex h-12 w-full items-center justify-between border-b border-white/5 bg-[#030605] px-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/30"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500/30"></div>
            <div className="h-3 w-3 rounded-full bg-emerald-500/30"></div>
          </div>
          <div className="flex h-6 w-80 items-center justify-center rounded bg-white/5 text-[10px] text-slate-500">
            storyboard.io/project/clq238hf00
          </div>
          <div className="w-16"></div>
        </div>

        {/* Workspace interface */}
        <div className="flex h-[500px] w-full text-left">
          {/* Left panel: Beat Outline */}
          <div className="hidden w-64 flex-col border-r border-white/5 bg-[#030604] p-4 md:flex">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Beat outline
              </span>
              <Icon icon="solar:menu-dots-bold" className="text-slate-500" />
            </div>
            <div className="space-y-1.5">
              {mockupSlides.map((slide, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-lg p-2.5 transition-colors ${
                    slide.active
                      ? "border border-emerald-500/20 bg-emerald-500/5 text-white"
                      : "text-slate-500 hover:bg-white/[0.02]"
                  }`}
                >
                  <span className={`text-xs font-semibold ${slide.active ? "text-emerald-400" : "text-slate-600"}`}>
                    {slide.idx}
                  </span>
                  <span className="text-xs font-medium truncate">{slide.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Canvas Slide rendering */}
          <div className="flex-1 bg-[#040806]/40 p-6 flex flex-col justify-center items-center relative overflow-hidden">
            {/* Aspect ratio frame preview wrapper representing 960x540 canvas */}
            <div
              className="relative w-full max-w-[560px] aspect-[960/540] overflow-hidden rounded-xl border border-[#10B981]/20 bg-[#0A0D0C] shadow-lg shadow-black/50"
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Outer grid decor */}
              <div className="absolute inset-0 bg-[#050A08] flex flex-col justify-between p-5">
                {/* Safe zone indicator border */}
                <div className="absolute inset-3 rounded-lg border border-dashed border-emerald-500/10 pointer-events-none"></div>

                {/* Top header beat area */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-semibold text-emerald-500">
                      Beat 3 / Ethics
                    </span>
                    <h2 className="text-xs font-semibold text-white">
                      Ethical model governance
                    </h2>
                  </div>
                  <Icon icon="solar:shield-check-linear" className="text-emerald-400 text-base" />
                </div>

                {/* Center visual: Bento Grid mockup */}
                <div className="relative z-10 grid grid-cols-3 gap-2.5 my-1">
                  <div className="rounded-lg border border-white/5 bg-[#09100D] p-2 space-y-1">
                    <span className="text-[8px] text-slate-500">Latency</span>
                    <p className="text-[10px] font-mono font-medium text-emerald-400">12ms</p>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-[#09100D] p-2 space-y-1 col-span-2">
                    <span className="text-[8px] text-slate-500">Ethics score</span>
                    <p className="text-[10px] font-mono font-medium text-white">99.8% compliance</p>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-[#09100D] p-2 space-y-1 col-span-3">
                    <p className="text-[9px] leading-relaxed text-slate-400">
                      Enforcing differential privacy bounds and zero-knowledge checkpoints natively across standard GPU pipeline partitions.
                    </p>
                  </div>
                </div>

                {/* Footer metrics */}
                <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-2">
                  <span className="text-[8px] text-slate-600">
                    Storyboard
                  </span>
                  <span className="text-[8px] font-medium text-emerald-500">
                    960 x 540 safe zone
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 text-[10px] text-slate-500 flex items-center gap-1.5">
              <Icon icon="solar:window-frame-linear" />
              Live canvas frame (slide 3)
            </div>
          </div>

          {/* Right panel: Floating Refinement chat feed */}
          <div className="hidden w-72 flex-col border-l border-white/5 bg-[#030604] p-4 lg:flex">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-slate-500">
                Creative director loop
              </span>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar pr-1 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1 rounded-xl p-3 ${
                    msg.role === "User"
                      ? "border border-white/10 bg-white/[0.01] self-end ml-4"
                      : msg.isTool
                        ? "border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-mono text-[10px] leading-normal"
                        : "border border-white/5 bg-white/[0.03] mr-4 text-slate-300"
                  }`}
                >
                  <span
                    className={`text-[8px] font-semibold uppercase ${
                      msg.role === "User" ? "text-slate-500" : "text-emerald-500"
                    }`}
                  >
                    {msg.role}
                  </span>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2 rounded-lg border border-white/10 bg-[#060D0A] p-2 items-center">
              <span className="text-[10px] text-slate-600 flex-1">Refine storyboard...</span>
              <Icon icon="solar:send-linear" className="text-slate-500" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
