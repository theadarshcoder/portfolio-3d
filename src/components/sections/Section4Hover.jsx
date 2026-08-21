import React, { useState, useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

const CHANNELS = [
  {
    id: 'ch1',
    num: 'CH 01',
    title: 'PROOF OF WORK // RUST INFERENCE KERNEL',
    type: 'code',
    lines: [
      '// Vectorized Bayesian inference kernel (SIMD PyO3 extension)',
      '#[pyfunction]',
      'pub fn compute_marginal_likelihood(factors: Vec<Factor>) -> PyResult<f64> {',
      '    factors.par_iter()',
      '        .map(|factor| factor.vectorized_elimination())',
      '        .product()',
      '}',
    ],
  },
  {
    id: 'ch2',
    num: 'CH 02',
    title: 'STATEMENT // ENGINEERING PHILOSOPHY',
    type: 'quote',
    quote:
      '“I build software like a product launch — engineered for sub-millisecond execution, zero-alloc memory discipline, and memorable first impressions.”',
    author: 'ADARSH // CORE ARCHITECTURE',
  },
  {
    id: 'ch3',
    num: 'CH 03',
    title: 'BENCHMARK // PRODUCTION METRIC',
    type: 'stat',
    stat: '18.4x',
    statLabel: 'INFERENCE SPEEDUP',
    context:
      'Vectorized Rust SIMD dynamic elimination merged into the pgmpy Bayesian ML library.',
  },
]

export default function Section4Hover() {
  const [currentChannel, setCurrentChannel] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const [typedChars, setTypedChars] = useState(0)
  const timerRef = useRef(null)

  // Full code string for CH 01 typewriter
  const codeString = CHANNELS[0].lines.join('\n')

  // Auto-cycle channels every 8 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return

    timerRef.current = setInterval(() => {
      triggerChannelSwitch((prev) => (prev + 1) % CHANNELS.length)
    }, 8000)

    return () => clearInterval(timerRef.current)
  }, [isPaused])

  // Trigger CRT channel switch with brief horizontal glitch/tear
  const triggerChannelSwitch = (nextChannelIndexOrFn) => {
    setIsGlitching(true)
    setTimeout(() => {
      setCurrentChannel(nextChannelIndexOrFn)
      setTypedChars(0) // Reset typewriter for code channel
    }, 120)

    setTimeout(() => {
      setIsGlitching(false)
    }, 280)
  }

  // Typewriter effect when CH 01 is active
  useEffect(() => {
    if (currentChannel !== 0) return

    setTypedChars(0)
    let charIndex = 0
    const interval = setInterval(() => {
      charIndex += 2
      setTypedChars((prev) => Math.min(prev + 2, codeString.length))
      if (charIndex >= codeString.length) {
        clearInterval(interval)
      }
    }, 28)

    return () => clearInterval(interval)
  }, [currentChannel, codeString.length])

  const channel = CHANNELS[currentChannel]

  return (
    <section
      id="section-4"
      className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden select-none bg-[#100904]"
    >
      {/* Subtle atmospheric ambient warm glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#FF8539]/8 rounded-full blur-[160px]" />
      </div>

      {/* Top Section Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#FF8539] tracking-widest uppercase font-semibold">
            04 // BROADCAST LAB
          </span>
          <div className="h-[1px] w-12 bg-[#FF8539]/30" />
        </div>
        <div className="font-mono text-[11px] text-zinc-500 uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8539] animate-pulse" />
          <span>{isPaused ? 'FEED PAUSED (HOVER)' : 'FEED LIVE • 8S INTERVAL'}</span>
        </div>
      </div>

      {/* Center: The Minimal Retro CRT TV Panel */}
      <div className="relative z-10 my-auto max-w-4xl mx-auto w-full">
        {/* TV Container Bezel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-2xl sm:rounded-3xl border border-[#FF8539]/25 bg-black/90 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.08)] overflow-hidden transition-all duration-300 group"
        >
          {/* Terminal-Style Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.03] border-b border-white/10 select-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-3 font-mono text-xs text-zinc-400">adarsh@lab: ~</span>
            </div>

            {/* Top-Right Channel Badge */}
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:inline">
                {channel.title}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#FF8539]/15 border border-[#FF8539]/30 text-[#FF8539] font-bold text-[11px]">
                {channel.num}
              </span>
            </div>
          </div>

          {/* CRT Screen Viewport */}
          <div className="relative min-h-[300px] sm:min-h-[360px] p-6 sm:p-10 flex flex-col justify-between overflow-hidden bg-[#070605]">
            {/* Subtle Scanlines Overlay (~8% opacity) */}
            <div
              className="absolute inset-0 pointer-events-none z-20 opacity-[0.08]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)',
              }}
            />

            {/* Subtle Vignette & Inner Shadow */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, transparent 65%, rgba(0, 0, 0, 0.6) 100%)',
              }}
            />

            {/* CRT Channel Glitch/Tear Effect on Switch */}
            <div
              className={`absolute inset-0 pointer-events-none z-30 transition-opacity duration-150 ${
                isGlitching ? 'opacity-100 bg-[#FF8539]/15 backdrop-invert-[0.1]' : 'opacity-0'
              }`}
              style={{
                clipPath: isGlitching
                  ? 'polygon(0 15%, 100% 12%, 100% 45%, 0 48%, 0 65%, 100% 60%, 100% 90%, 0 92%)'
                  : 'none',
              }}
            />

            {/* Channel Content Layer */}
            <div className="relative z-10 my-auto w-full">
              {/* CH 01: Real Typed Code */}
              {channel.type === 'code' && (
                <div className="font-mono text-xs sm:text-sm text-zinc-200 leading-relaxed space-y-1">
                  <pre className="whitespace-pre-wrap font-mono">
                    <span className="text-[#FF8539]">
                      {codeString.slice(0, typedChars)}
                    </span>
                    <span className="inline-block w-2 h-4 bg-[#FF8539] ml-1 animate-pulse align-middle" />
                  </pre>
                </div>
              )}

              {/* CH 02: Large Clean Typography Quote */}
              {channel.type === 'quote' && (
                <div className="space-y-4 max-w-2xl">
                  <p className="text-xl sm:text-2xl md:text-3xl font-light text-white leading-relaxed tracking-tight">
                    {channel.quote}
                  </p>
                  <p className="font-mono text-xs text-[#FF8539] tracking-wider font-semibold">
                    — {channel.author}
                  </p>
                </div>
              )}

              {/* CH 03: Simple Big Metric */}
              {channel.type === 'stat' && (
                <div className="space-y-3">
                  <div className="text-6xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF8539] to-[#FF8539] tracking-tight font-display">
                    {channel.stat}
                  </div>
                  <p className="text-sm sm:text-base font-mono text-[#FF8539] font-bold tracking-widest uppercase">
                    {channel.statLabel}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-lg leading-relaxed">
                    {channel.context}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom CRT Screen Footer: Channel Indicator Dots */}
            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 text-xs font-mono">
              {/* Channel Selector Dots */}
              <div className="flex items-center gap-2">
                {CHANNELS.map((ch, idx) => {
                  const isActive = currentChannel === idx
                  return (
                    <button
                      key={ch.id}
                      onClick={() => triggerChannelSwitch(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'w-6 bg-[#FF8539] shadow-sm shadow-[#FF8539]/50'
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      title={`Switch to ${ch.num}`}
                      aria-label={`Switch to ${ch.num}`}
                    />
                  )
                })}
              </div>

              {/* Interaction Hint */}
              <span className="text-[11px] text-zinc-500">
                {isPaused ? 'HOVER PAUSED • CLICK DOTS TO SWITCH' : 'AUTO-SWITCHING • HOVER TO PAUSE'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs font-mono text-zinc-500">
        <span>MINIMAL BROADCAST CORE // 3 REAL CHANNELS</span>
        <a
          href="#section-5"
          className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
        >
          <span>NEXT // PERSONALITY ARTIFACT</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#FF8539]" />
        </a>
      </div>
    </section>
  )
}
