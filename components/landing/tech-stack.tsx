"use client"

import React, { useEffect, useRef, useState } from "react"
import { Icon } from "@iconify/react"

export function TechStack() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Canvas Network Animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    interface Node {
      x: number
      y: number
      vx: number
      vy: number
      color: string
    }

    const nodes: Node[] = []
    const numNodes = Math.floor((width * height) / 20000)

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        color: Math.random() > 0.3 ? "#10B981" : "#047857",
      })
    }

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 - dist / 800})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-screen flex-col justify-center overflow-hidden bg-[#030706] py-32 selection:bg-[#10B981] selection:text-[#030706]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(16,185,129,0.01) 0px, rgba(16,185,129,0.01) 1px, transparent 1px, transparent 12px)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen"
      ></canvas>

      {/* Global Container Framing Lines */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-[5%] z-0 w-[1px] bg-emerald-500/5"></div>
      <div className="pointer-events-none absolute top-0 right-[5%] bottom-0 z-0 w-[1px] bg-emerald-500/5"></div>
      <div className="pointer-events-none absolute top-0 bottom-0 left-[15%] z-0 w-[1px] bg-emerald-500/[0.02]"></div>

      <div className="relative mx-auto w-full max-w-[1200px] px-6">
        {/* Header area */}
        <div
          className={`relative mb-20 pl-4 transition-all duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="absolute top-2 left-0 h-[2px] w-8 bg-[#10B981]"></div>
          <h2 className="mb-4 ml-8 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Narrative Infrastructure
          </h2>
          <p className="ml-8 max-w-xl text-sm leading-relaxed text-slate-400">
            Discover our unified stack designed for scalability, creative
            precision, and seamless scene orchestration across distributed
            projects.
          </p>
        </div>

        {/* Framed Grid Wrapper */}
        <div
          className={`relative transition-all delay-200 duration-1000 ease-out ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          {/* Structural Boundary Lines */}
          <div className="pointer-events-none absolute top-0 right-[-100vw] left-[-100vw] h-[1px] bg-emerald-500/10"></div>
          <div className="pointer-events-none absolute right-[-100vw] bottom-0 left-[-100vw] h-[1px] bg-emerald-500/10"></div>
          <div className="pointer-events-none absolute top-[-100vh] bottom-[-100vh] left-0 hidden w-[1px] bg-emerald-500/10 md:block"></div>
          <div className="pointer-events-none absolute top-[-100vh] right-0 bottom-[-100vh] hidden w-[1px] bg-emerald-500/10 md:block"></div>

          {/* Corner Nodes */}
          <div className="absolute top-[-2px] left-[-2px] hidden h-1 w-1 border border-[#10B981]/60 bg-[#030706] md:block"></div>
          <div className="absolute top-[-2px] right-[-2px] hidden h-1 w-1 border border-[#10B981]/60 bg-[#030706] md:block"></div>
          <div className="absolute bottom-[-2px] left-[-2px] hidden h-1 w-1 border border-[#10B981]/60 bg-[#030706] md:block"></div>
          <div className="absolute right-[-2px] bottom-[-2px] hidden h-1 w-1 border border-[#10B981]/60 bg-[#030706] md:block"></div>

          {/* L-Brackets */}
          <div className="absolute top-0 left-0 hidden h-4 w-4 -translate-x-full -translate-y-full border-t border-l border-[#10B981]/50 md:block"></div>
          <div className="absolute right-0 bottom-0 hidden h-4 w-4 translate-x-full translate-y-full border-r border-b border-[#10B981]/50 md:block"></div>

          {/* The Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3">
            {/* Inner Grid Dividers */}
            <div className="pointer-events-none absolute top-0 bottom-0 left-1/3 z-20 hidden w-[1px] bg-white/10 md:block"></div>
            <div className="pointer-events-none absolute top-0 bottom-0 left-2/3 z-20 hidden w-[1px] bg-white/10 md:block"></div>

            {/* Card 1: Creative Control */}
            <div
              className={`group flex flex-col items-center border-b border-white/10 bg-[#050C09]/50 p-8 text-center transition-all delay-300 duration-700 hover:bg-[#050C09] md:border-b-0 md:p-10 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
            >
              <div className="relative mb-8 flex h-56 w-full items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.4)_0%,transparent_60%)] opacity-20"></div>
                <div className="relative flex h-full w-full items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
                  <div className="absolute h-40 w-40 animate-[spin_20s_linear_infinite] rounded-full border border-dashed border-[#10B981]/30"></div>
                  <div className="absolute h-32 w-32 animate-[spin_15s_linear_infinite_reverse] rounded-full border border-[#047857]/50"></div>
                  <Icon
                    icon="solar:magic-stick-3-linear"
                    width="64"
                    className="text-[#10B981] drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  />
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-semibold tracking-tight text-white">
                Creative Control
              </h3>
              <p className="mb-8 flex-grow text-sm leading-relaxed text-slate-400">
                Implement consistent visual language and micro-segmentation of
                project beats natively.
              </p>
              <button className="group/btn flex w-full items-stretch border border-white/10 transition-colors hover:border-[#10B981]/50 md:w-auto">
                <span className="bg-white/5 px-5 py-3 text-xs font-semibold tracking-widest text-slate-300 uppercase transition-colors group-hover/btn:text-white">
                  Learn More
                </span>
                <span className="flex items-center justify-center overflow-hidden border-l border-white/10 bg-white/5 px-4 py-3 transition-colors group-hover/btn:bg-[#10B981]/20">
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="text-lg text-white transition-transform group-hover:translate-x-1"
                  />
                </span>
              </button>
            </div>

            {/* Card 2: Scene Orchestration */}
            <div
              className={`group relative flex flex-col items-center overflow-hidden border-b border-white/10 p-8 text-center transition-all delay-400 duration-700 md:border-b-0 md:p-10 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{
                background: "linear-gradient(180deg, #022c22 0%, #030706 100%)",
              }}
            >
              <div className="pointer-events-none absolute inset-0 z-10 border border-[#10B981]/30"></div>
              <div className="absolute inset-x-0 top-0 z-10 h-[1px] bg-gradient-to-r from-transparent via-[#10B981] to-transparent opacity-80"></div>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,transparent_70%)] opacity-30"></div>

              <div className="relative mb-8 flex h-56 w-full items-center justify-center perspective-[1000px]">
                <div
                  className="relative h-32 w-32 transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    transform: "rotateX(60deg) rotateZ(-45deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-md border-[#10B981]/40 bg-[#10B981]/10 backdrop-blur-sm"
                    style={{ transform: "translateZ(0px)" }}
                  ></div>
                  <div
                    className="absolute inset-[-10px] flex items-center justify-center rounded-md border-[#10B981]/80 bg-[#10B981]/20 shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-md"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded border border-white/30 bg-white/5"
                      style={{ transform: "rotateX(-60deg) rotateZ(45deg)" }}
                    >
                      <Icon
                        icon="solar:clapperboard-play-linear"
                        className="text-xl text-white"
                      />
                    </div>
                  </div>
                  <div
                    className="absolute inset-x-4 top-4 right-[-20px] bottom-[-20px] rounded-md border-white/20 bg-white/5 backdrop-blur-sm"
                    style={{ transform: "translateZ(60px)" }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 h-2 w-2 rounded-full bg-[#34d399] shadow-[0_0_10px_#34d399]"
                    style={{
                      transform:
                        "translateZ(15px) translateX(-5px) translateY(-5px)",
                    }}
                  ></div>
                  <div
                    className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-[#34d399] shadow-[0_0_10px_#34d399]"
                    style={{
                      transform:
                        "translateZ(45px) translateX(5px) translateY(5px)",
                    }}
                  ></div>
                </div>
              </div>

              <h3 className="relative z-20 mb-4 text-2xl font-semibold tracking-tight text-white">
                Scene Orchestration
              </h3>
              <p className="relative z-20 mb-8 flex-grow text-sm leading-relaxed text-slate-300">
                Automate composition checks and immediately refine layouts
                across your entire storyboard project.
              </p>

              <button className="group/btn relative z-20 flex w-full items-stretch border border-[#10B981]/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-colors hover:border-[#10B981] md:w-auto">
                <span className="bg-[#10B981]/10 px-5 py-3 text-xs font-semibold tracking-widest text-white uppercase transition-colors">
                  Start Project
                </span>
                <span className="flex items-center justify-center overflow-hidden border-l border-[#10B981]/50 bg-[#10B981]/20 px-4 py-3 transition-colors group-hover/btn:bg-[#10B981]/30">
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="text-lg text-white transition-transform group-hover:translate-x-1"
                  />
                </span>
              </button>
            </div>

            {/* Card 3: Neural Heuristics */}
            <div
              className={`group flex flex-col items-center bg-[#050C09]/50 p-8 text-center transition-all delay-500 duration-700 hover:bg-[#050C09] md:p-10 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
            >
              <div className="relative mb-8 flex h-56 w-full items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.3)_0%,transparent_50%)] opacity-20"></div>
                <div className="relative flex h-full w-full items-center justify-center transition-transform duration-700 ease-out group-hover:-translate-y-2">
                  <div className="absolute h-44 w-44 animate-[spin_25s_linear_infinite] rounded-full border border-dotted border-[#10B981]/30"></div>
                  <div className="absolute h-36 w-36 animate-[spin_30s_linear_infinite_reverse] rounded-full border border-dashed border-[#10B981]/20"></div>
                  <Icon
                    icon="solar:ranking-linear"
                    width="68"
                    className="text-[#10B981] drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  />
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-semibold tracking-tight text-white">
                Neural Heuristics
              </h3>
              <p className="mb-8 flex-grow text-sm leading-relaxed text-slate-400">
                Eliminate creative friction and preempt composition errors using
                visual models driven by neural heuristics.
              </p>
              <button className="group/btn flex w-full items-stretch border border-white/10 transition-colors hover:border-[#10B981]/50 md:w-auto">
                <span className="bg-white/5 px-5 py-3 text-xs font-semibold tracking-widest text-slate-300 uppercase transition-colors group-hover/btn:text-white">
                  Learn More
                </span>
                <span className="flex items-center justify-center overflow-hidden border-l border-white/10 bg-white/5 px-4 py-3 transition-colors group-hover/btn:bg-[#10B981]/20">
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="text-lg text-white transition-transform group-hover:translate-x-1"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
