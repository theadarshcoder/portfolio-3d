import React, { useRef, useEffect } from 'react'
import { ArrowDown, Zap, Terminal } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef(null)
  const wordmarkRef = useRef(null)
  const taglineRef = useRef(null)
  const copyRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // 1. Initial wordmark entrance
      gsap.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 0.2 }
      )

      // 2. Subtle fade and translate on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '85% top',
          scrub: 1,
        },
      })

      tl.to([wordmarkRef.current, taglineRef.current, copyRef.current, labelRef.current], {
        opacity: 0,
        y: -40,
        stagger: 0.05,
        ease: 'power2.inOut',
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden select-none bg-[#100904]"
    >
      {/* Subtle Atmospheric Warm Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[#FF8539]/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#FF8539]/12 rounded-full blur-[140px]" />
      </div>

      {/* Top-Left Wordmark & Status Badge */}
      <div className="relative z-10 flex flex-col items-start gap-4 pt-16 md:pt-12 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-[#FF8539]/20 backdrop-blur-md text-[11px] font-mono tracking-widest text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8539] animate-pulse"></span>
          <span>ADARSH // PORTFOLIO 2026</span>
          <span className="text-zinc-600">/</span>
          <span className="text-[#FF8539] font-semibold">AVAILABLE</span>
        </div>

        {/* Large Wordmark with Tight Geometric Grotesque Style */}
        <div ref={wordmarkRef} className="max-w-2xl">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[900] tracking-[-0.04em] uppercase animate-text-shimmer leading-[0.88] font-display">
            ADARSH
          </h1>
        </div>
      </div>

      {/* Center-Right Tagline */}
      <div
        ref={taglineRef}
        className="relative z-10 my-auto flex flex-col items-start md:items-end self-end max-w-md text-left md:text-right pointer-events-auto pr-0 md:pr-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-[#FF8539]/25 backdrop-blur-lg mb-3 shadow-lg">
          <Zap className="w-3.5 h-3.5 text-[#FF8539]" />
          <span className="text-xs font-mono tracking-wider text-[#FF8539] uppercase font-semibold">Product Launch Aesthetic</span>
        </div>

        <p className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight leading-snug">
          "Built with <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FF8539] via-amber-300 to-white">code</span>, not luck."
        </p>
      </div>

      {/* Bottom Row */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-8 border-t border-white/10 pointer-events-auto">
        {/* Bottom-Left Editorial Label */}
        <div ref={labelRef} className="md:col-span-4 flex flex-col gap-1 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2 text-zinc-400">
            <Terminal className="w-3.5 h-3.5 text-[#FF8539]" />
            <span className="tracking-widest uppercase text-white font-semibold">01 // IDENTITY</span>
          </div>
          <p className="text-[11px] text-zinc-500 tracking-wider">
            CS STUDENT • DISTRIBUTED SYSTEMS • CREATIVE 3D
          </p>
        </div>

        {/* Center Scroll Indicator */}
        <div className="hidden md:flex md:col-span-4 justify-center">
          <a
            href="#section-2"
            onClick={(e) => {
              e.preventDefault()
              const nextEl = document.getElementById('section-2')
              if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer group px-3 py-1.5 rounded-full bg-white/[0.02] border border-[#FF8539]/20 hover:bg-[#FF8539]/10"
          >
            <span>SCROLL TO ADVANCE</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#FF8539] animate-bounce group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Bottom-Right Editorial Paragraph Copy */}
        <div ref={copyRef} className="md:col-span-4 flex flex-col gap-1 text-left md:text-right">
          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-sm ml-auto">
            Crafting software with real physical weight, low latency, and uncompromising interactive precision.
          </p>
        </div>
      </div>
    </section>
  )
}
