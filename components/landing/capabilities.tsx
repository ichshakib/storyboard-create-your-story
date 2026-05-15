"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"

class GridLine {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  height: number
  width: number
  ctx: CanvasRenderingContext2D

  constructor(
    x: number,
    height: number,
    width: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x
    this.y = Math.random() * height
    this.length = Math.random() * 100 + 50
    this.speed = Math.random() * 1 + 0.5
    this.opacity = Math.random() * 0.5 + 0.1
    this.height = height
    this.width = width
    this.ctx = ctx
  }
  update() {
    this.y += this.speed
    if (this.y > this.height) {
      this.y = -this.length
      this.x = Math.random() * this.width
    }
  }
  draw() {
    if (!this.ctx) return
    this.ctx.beginPath()
    const gradient = this.ctx.createLinearGradient(
      this.x,
      this.y,
      this.x,
      this.y + this.length
    )
    gradient.addColorStop(0, `rgba(16, 185, 129, 0)`)
    gradient.addColorStop(0.5, `rgba(16, 185, 129, ${this.opacity * 0.5})`)
    gradient.addColorStop(1, `rgba(16, 185, 129, 0)`)
    this.ctx.strokeStyle = gradient
    this.ctx.lineWidth = 1
    this.ctx.moveTo(this.x, this.y)
    this.ctx.lineTo(this.x, this.y + this.length)
    this.ctx.stroke()
  }
}

export function Capabilities() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  // Handle Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let width: number, height: number
    let lines: GridLine[] = []
    let animationFrameId: number

    const initLines = () => {
      lines = []
      const numberOfLines = Math.floor(width / 30)
      for (let i = 0; i < numberOfLines; i++) {
        lines.push(new GridLine(Math.random() * width, height, width, ctx))
      }
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      initLines()
    }

    const animateCanvas = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw static vertical structural lines
      ctx.beginPath()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)"
      for (let i = 0; i < width; i += 100) {
        ctx.moveTo(i, 0)
        ctx.lineTo(i, height)
      }
      ctx.stroke()

      // Draw animated particles/lines
      lines.forEach((line) => {
        line.update()
        line.draw()
      })
      animationFrameId = requestAnimationFrame(animateCanvas)
    }

    window.addEventListener("resize", resize)
    resize()
    animateCanvas()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Handle Scroll Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden border-t border-white/5 bg-[#030706] font-sans text-neutral-200 selection:bg-[#10B981] selection:text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(16,185,129,0.015) 0, rgba(16,185,129,0.015) 1px, transparent 1px, transparent 12px)",
        }}
      ></div>

      <canvas
        ref={canvasRef}
        id="grid-canvas"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-40"
      ></canvas>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-4 py-24">
        {/* Framed Grid Container */}
        <div className="relative w-full p-6 md:p-12">
          {/* Container Lines & Corner Marks */}
          <div className="pointer-events-none absolute inset-0 z-0 border border-emerald-500/20"></div>

          {/* Mini corner squares */}
          <div className="absolute -top-1 -left-1 z-10 h-2 w-2 border border-emerald-500/50 bg-neutral-900"></div>
          <div className="absolute -top-1 -right-1 z-10 h-2 w-2 border border-emerald-500/50 bg-neutral-900"></div>
          <div className="absolute -bottom-1 -left-1 z-10 h-2 w-2 border border-emerald-500/50 bg-neutral-900"></div>
          <div className="absolute -right-1 -bottom-1 z-10 h-2 w-2 border border-emerald-500/50 bg-neutral-900"></div>

          {/* L-Brackets */}
          <div className="absolute top-0 left-0 z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 border-t-2 border-l-2 border-emerald-500/40"></div>
          <div className="absolute top-0 right-0 z-10 h-6 w-6 translate-x-1/2 -translate-y-1/2 border-t-2 border-r-2 border-emerald-500/40"></div>
          <div className="absolute bottom-0 left-0 z-10 h-6 w-6 -translate-x-1/2 translate-y-1/2 border-b-2 border-l-2 border-emerald-500/40"></div>
          <div className="absolute right-0 bottom-0 z-10 h-6 w-6 translate-x-1/2 translate-y-1/2 border-r-2 border-b-2 border-emerald-500/40"></div>

          {/* Header Section */}
          <div
            className={`relative mb-16 space-y-4 text-center transition-all duration-1000 ease-out ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-400 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
              Orchestration Capabilities
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Precision design at scale.
            </h2>
          </div>

          {/* Main Layout: Background Track for Desktop */}
          <div className="relative w-full">
            {/* Desktop Horizontal Track */}
            <div className="absolute top-1/2 z-0 hidden h-[280px] w-full -translate-y-1/2 rounded-2xl border border-emerald-500/10 bg-[#050C09]/80 backdrop-blur-md md:block"></div>

            {/* Grid Items Wrapper */}
            <div className="relative z-10 grid grid-cols-1 items-center gap-6 md:grid-cols-4 md:gap-0">
              {/* Item 1: Narrative Engine */}
              <div
                className={`group relative flex flex-col items-center justify-between py-10 transition-all delay-100 duration-700 ease-out md:h-[280px] md:border-r md:border-emerald-500/20 md:bg-transparent ${isInView ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-95 opacity-0"}`}
              >
                <div className="flex flex-col items-center space-y-8 text-center">
                  <h3 className="text-xs font-semibold tracking-[0.15em] text-emerald-600 uppercase transition-colors duration-300 group-hover:text-emerald-400">
                    Narrative Engine
                  </h3>
                  <Icon
                    icon="solar:target-linear"
                    className="text-5xl text-neutral-600 transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-emerald-500"
                  />
                </div>
              </div>

              {/* Item 2: High-Fidelity Editor (Elevated/Active) */}
              <div
                className={`relative z-20 flex h-[380px] flex-col items-center justify-between p-8 transition-all delay-200 duration-700 ease-out md:mx-[-1px] ${isInView ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-95 opacity-0"}`}
              >
                {/* Subtle Gradient Border Treatment */}
                <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-b from-emerald-500/60 via-emerald-800/20 to-neutral-900 p-[1px]">
                  <div className="h-full w-full rounded-[11px] bg-[#030706]"></div>
                </div>

                {/* Inner content wrapper */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-between">
                  <h3 className="mt-2 text-xs font-semibold tracking-[0.15em] text-white uppercase">
                    High-Fidelity Editor
                  </h3>

                  <div className="relative mt-4 flex h-24 w-24 items-center justify-center">
                    {/* Circular dashed line decoration */}
                    <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border-[1.5px] border-dashed border-emerald-500/40"></div>
                    <Icon
                      icon="solar:pen-new-square-linear"
                      className="text-6xl text-white drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    />
                  </div>

                  <Link href="/home" className="w-full">
                    <button className="group flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3.5 text-xs font-semibold text-black shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-colors duration-300 hover:bg-emerald-400">
                      Launch Editor
                      <Icon
                        icon="solar:arrow-right-linear"
                        className="text-sm transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Item 3: Design Intelligence */}
              <div
                className={`group relative flex flex-col items-center justify-between py-10 transition-all delay-300 duration-700 ease-out md:h-[280px] md:border-l md:border-emerald-500/20 md:bg-transparent ${isInView ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-95 opacity-0"}`}
              >
                <div className="flex flex-col items-center space-y-8 text-center">
                  <h3 className="text-xs font-semibold tracking-[0.15em] text-emerald-600 uppercase transition-colors duration-300 group-hover:text-emerald-400">
                    Design Intelligence
                  </h3>
                  <Icon
                    icon="solar:magic-stick-linear"
                    className="text-5xl text-neutral-600 transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-rose-500"
                  />
                </div>
              </div>

              {/* Item 4: Native Export */}
              <div
                className={`group relative flex flex-col items-center justify-between py-10 transition-all delay-500 duration-700 ease-out md:h-[280px] md:border-l md:border-emerald-500/20 md:bg-transparent ${isInView ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-95 opacity-0"}`}
              >
                <div className="flex flex-col items-center space-y-8 text-center">
                  <h3 className="text-xs font-semibold tracking-[0.15em] text-emerald-600 uppercase transition-colors duration-300 group-hover:text-emerald-400">
                    Native Export
                  </h3>
                  <Icon
                    icon="solar:download-square-linear"
                    className="text-5xl text-neutral-600 transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-rose-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}
