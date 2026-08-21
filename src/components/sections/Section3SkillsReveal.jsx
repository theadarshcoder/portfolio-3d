import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Layers, Terminal, Sparkles, Cpu, Code2, Database } from 'lucide-react'
import ParticleField from '../3d/ParticleField'

gsap.registerPlugin(ScrollTrigger)

const SKILL_PILLS = [
  { name: 'React 19 & Next.js', tag: 'UI / FRAMEWORKS', icon: Code2 },
  { name: 'Three.js & WebGL', tag: 'GRAPHICS', icon: Sparkles },
  { name: 'Rust & Go', tag: 'HIGH PERFORMANCE', icon: Cpu },
  { name: 'Probabilistic ML (pgmpy)', tag: 'RESEARCH', icon: Terminal },
  { name: 'Distributed Pipelines', tag: 'SYSTEMS', icon: Database },
  { name: 'GSAP Motion Physics', tag: 'CHOREOGRAPHY', icon: Layers },
]

export default function Section3SkillsReveal() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const pillsRef = useRef(null)
  const footnoteRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Animate headline in with scale and depth
      gsap.fromTo(
        headlineRef.current,
        { scale: 0.9, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 25%',
            scrub: 0.8,
          },
        }
      )

      // Animate skill pills stagger
      gsap.fromTo(
        pillsRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            end: 'top 15%',
            scrub: 0.8,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="section-3"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-visible select-none bg-[#0a0908]"
    >
      {/* 
        3D SCATTERED COFFEE BEAN PARTICLE FIELD:
        Full-bleed WebGL background layer (z-0) with smaller roasted coffee beans, smooth cursor deflection, and #FF8539 radiant glow.
      */}
      <ParticleField />

      {/* Top Label */}
      <div className="relative z-10 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#FF8539] tracking-widest uppercase font-semibold">
            03 // IDENTITY & STACK
          </span>
          <div className="h-[1px] w-12 bg-[#FF8539]/30" />
        </div>
        <span className="font-mono text-[11px] text-zinc-400 uppercase">
          COFFEE BEAN FIELD ACTIVE
        </span>
      </div>

      {/* Main Center Reveal (Dom UI rendered completely on top) */}
      <div className="relative z-10 my-auto max-w-4xl mx-auto text-center pointer-events-auto">
        <div ref={headlineRef} className="space-y-4">
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[900] tracking-[-0.04em] text-white uppercase leading-[0.9] font-display drop-shadow-2xl">
            Built Different<span className="text-[#FF8539]">*</span>
          </h2>
          <p className="text-base sm:text-xl text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed pt-2">
            Engineering at the intersection of low-level systems speed and high-fidelity creative frontend architectures.
          </p>
        </div>

        {/* Skill Pills Grid */}
        <div
          ref={pillsRef}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto"
        >
          {SKILL_PILLS.map((pill, idx) => {
            const Icon = pill.icon
            return (
              <div
                key={idx}
                className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-black/60 hover:bg-black/90 border border-[#FF8539]/25 hover:border-[#FF8539] backdrop-blur-xl transition-all duration-300 cursor-default shadow-xl shadow-black/40"
              >
                <div className="p-1.5 rounded-lg bg-[#FF8539]/15 text-[#FF8539] group-hover:bg-[#FF8539] group-hover:text-black transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-white tracking-wide">{pill.name}</p>
                  <p className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors uppercase tracking-wider">{pill.tag}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footnote with Dry Humor */}
      <div
        ref={footnoteRef}
        className="relative z-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400 pointer-events-auto"
      >
        <div className="flex items-start gap-2 max-w-xl">
          <span className="text-[#FF8539] font-bold">*</span>
          <p className="text-[11px] leading-relaxed text-zinc-400">
            <strong className="text-zinc-200">Footnote:</strong> Not your standard boilerplate wrapper engineer. Obsessed with zero-alloc pipelines, kinetic shaders, and systems that don't fall over when actual production traffic hits.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-500 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#FF8539] animate-pulse" />
          <span>95 COFFEE BEANS</span>
        </div>
      </div>
    </section>
  )
}
