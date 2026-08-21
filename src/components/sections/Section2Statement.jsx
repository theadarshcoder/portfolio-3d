import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Section2Statement() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const subheadRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Slide-in headline animation from left
      gsap.fromTo(
        headlineRef.current,
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 25%',
            scrub: 0.8,
          },
        }
      )

      gsap.fromTo(
        [subheadRef.current, labelRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.8,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="section-2"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden select-none bg-transparent"
    >
      {/* Soft atmospheric amber spot glow on screen-left (Ambient Accent) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-[550px] h-[550px] bg-[#FF8539]/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Label */}
      <div ref={labelRef} className="relative z-10 flex items-center gap-3">
        <span className="font-mono text-xs text-[#FF8539] tracking-widest uppercase font-semibold">
          02 // MANIFESTO
        </span>
        <div className="h-[1px] w-16 bg-[#FF8539]/30" />
      </div>

      {/* Center Left Bold Headline */}
      <div className="relative z-10 my-auto max-w-4xl">
        <div ref={headlineRef} className="space-y-4">
          <p className="font-mono text-xs sm:text-sm text-zinc-400 tracking-wider uppercase">
            A PORTFOLIO SHOULD BE AN EXPERIENCE.
          </p>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-[900] tracking-[-0.04em] text-white uppercase leading-[0.92] font-display">
            ISN'T JUST <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF8539] to-[#FF8539]">
              A RESUME.
            </span>
          </h2>
        </div>

        <div ref={subheadRef} className="mt-8 max-w-xl space-y-4">
          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            Most portfolios are static catalogs of checkboxes. I build software like a product launch — engineered for raw speed, tactile physics, and unforgettable first impressions.
          </p>
          <div className="flex items-center gap-3 font-mono text-xs text-[#FF8539] pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8539] animate-ping" />
            <span>SUB-MILLISECOND EXECUTION • ZERO FLUFF</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs font-mono text-zinc-500">
        <span>CORE ARCHITECTURE // SYSTEM OPERATIONAL</span>
        <a
          href="#section-3"
          className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
        >
          <span>SCROLL TO IDENTITY</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FF8539]" />
        </a>
      </div>
    </section>
  )
}
