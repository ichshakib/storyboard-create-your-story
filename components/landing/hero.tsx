"use client"

import React from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"

export function Hero() {
  return (
    <section className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center gap-16 px-6 py-12 lg:flex-row lg:px-12 lg:py-20">
      {/* Left side: Framed Visual */}
      <div className="relative flex w-full flex-col items-center lg:w-1/2 lg:items-start">
        <div className="border-gradient border-gradient-purple group relative aspect-square w-full max-w-[500px] rounded-2xl p-1">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#060D0A]">
            {/* Inner texture and frame */}
            <div className="dotted-texture absolute inset-4 rounded-xl border border-emerald-500/10 opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/5"></div>

            {/* Center Graphic */}
            <div className="relative z-10 flex h-48 w-48 items-center justify-center rounded-full border border-emerald-500/10 transition-transform duration-700 ease-out group-hover:scale-105">
              <div className="flex h-32 w-32 animate-[spin_60s_linear_infinite] items-center justify-center rounded-full border border-emerald-500/20">
                <div className="h-20 w-20 animate-[spin_20s_linear_infinite_reverse] rounded-full border border-dashed border-emerald-500/40"></div>
              </div>
              <Icon
                icon="solar:videocamera-record-linear"
                width="64"
                className="absolute text-emerald-400 opacity-80 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              />
            </div>

            {/* L-Brackets */}
            <div className="absolute top-8 left-8 h-4 w-4 border-t-2 border-l-2 border-emerald-500/50"></div>
            <div className="absolute right-8 bottom-8 h-4 w-4 border-r-2 border-b-2 border-emerald-500/50"></div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 ml-4 flex gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></div>
          <div className="h-2 w-2 rounded-full bg-slate-700"></div>
          <div className="h-2 w-2 rounded-full bg-slate-700"></div>
        </div>
      </div>

      {/* Right side: Content */}
      <div className="z-10 flex w-full flex-col items-start lg:w-1/2">
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-emerald-500"></div>
          <span className="text-[10px] font-medium tracking-[0.2em] text-emerald-500">
            AI-Powered Storyboard Intelligence
          </span>
        </div>

        {/* Massive Title */}
        <div className="mb-10 flex items-end gap-6">
          <h1 className="text-7xl leading-none font-medium tracking-tight text-white lg:text-8xl">
            V1
          </h1>
          <div className="mb-2 h-16 w-px bg-white/20"></div>
          <div className="mb-2 flex flex-col">
            <span className="text-xl font-light tracking-wider text-slate-300 lg:text-2xl">
              Storyboard
            </span>
            <span className="text-xl font-semibold tracking-widest text-white uppercase lg:text-2xl">
              Architect
            </span>
          </div>
        </div>

        {/* Feature List */}
        <ul className="mb-10 flex w-full max-w-md flex-col gap-5">
          {[
            {
              icon: "solar:magic-stick-linear",
              text: "Automated Scene Generation",
            },
            {
              icon: "solar:bill-list-linear",
              text: "Script-to-Visual Orchestration",
            },
            {
              icon: "solar:export-linear",
              text: "Production-Ready PDF Exports",
            },
          ].map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                <Icon
                  icon={feature.icon}
                  width="16"
                  className="text-emerald-500"
                />
              </div>
              <span className="text-sm text-slate-300">{feature.text}</span>
            </li>
          ))}
        </ul>

        {/* Metric Bars */}
        <div className="mb-12 w-full max-w-md space-y-4">
          {[
            { label: "Narrative Cohesion", val: 99.8 },
            { label: "Asset Fidelity", val: 95 },
            { label: "Render Velocity", val: 12 },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] font-medium tracking-widest text-slate-400">
                <span>{stat.label}</span>
                <span className="text-white">
                  {stat.val}
                  {i === 2 ? "" : "%"}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500/50 to-emerald-500"
                  style={{ width: `${i === 2 ? 96 : stat.val}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/home">
            <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-colors hover:bg-slate-200">
              Start Your Project
              <Icon icon="solar:arrow-right-linear" width="18" />
            </button>
          </Link>
          <div className="flex gap-2">
            <span className="rounded-md border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs text-emerald-400">
              V1.0.4 Release
            </span>
            <span className="rounded-md border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs text-emerald-400">
              Beta Access
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
