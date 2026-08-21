import React, { useRef } from 'react'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import { useScrollHeroSync } from '../../hooks/useScrollHeroSync'

export default function HeroOverlay({ triggerRef }) {
  const textGroupRef = useRef(null)
  const badgesRef = useRef(null)
  const bottomRef = useRef(null)

  // Synchronize overlay fade & translate with GSAP ScrollTrigger timeline
  useScrollHeroSync(triggerRef, textGroupRef, badgesRef)

  return (
    <div className="relative z-10 w-full h-full min-h-screen flex flex-col justify-between px-6 md:px-16 pt-28 pb-12 pointer-events-none select-none">
      {/* Top Tagline & Status */}
      <div ref={badgesRef} className="flex flex-col items-start gap-3 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono tracking-wider text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>PORTFOLIO // VOL. 2026</span>
          <span className="text-zinc-600">/</span>
          <span className="text-indigo-300">CORE LAB</span>
        </div>
      </div>

      {/* Main Headline & Identity */}
      <div ref={textGroupRef} className="my-auto max-w-4xl pointer-events-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05]">
          Adarsh
        </h1>
        
        <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-light text-zinc-300 tracking-tight leading-relaxed max-w-2xl">
          Builder, CS student <span className="text-zinc-600">&</span> open source engineer.
        </p>

        <p className="mt-3 text-sm sm:text-base text-zinc-400 font-normal max-w-xl leading-relaxed">
          Crafting high-performance systems, intuitive developer tooling, and immersive computational interfaces.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-all duration-200 shadow-lg shadow-white/10"
          >
            <span>Explore Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all duration-200 backdrop-blur-sm"
          >
            <span>Get in touch</span>
          </a>
        </div>
      </div>

      {/* Bottom Footer Indicators */}
      <div ref={bottomRef} className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto border-t border-white/5 pt-6">
        <div className="flex items-center gap-6 text-xs text-zinc-500 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            THREE.JS // R3F
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            GSAP SCROLLRIG
          </span>
        </div>

        <a
          href="#about"
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span>Scroll to dolly</span>
          <ArrowDown className="w-3.5 h-3.5 text-indigo-400 animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  )
}
