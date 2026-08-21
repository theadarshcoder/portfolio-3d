import React, { useRef, useState } from 'react'
import { Flame, Activity, GitCommit, Coffee, Play } from 'lucide-react'

export default function Section5Personality() {
  const sectionRef = useRef(null)
  const [activeTab, setActiveTab] = useState('cricket')

  return (
    <section
      id="section-5"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden select-none bg-[#100904]"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#FF8539]/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Top Label */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#FF8539] tracking-widest uppercase font-semibold">
            05 // UNFILTERED LENS
          </span>
          <div className="h-[1px] w-12 bg-[#FF8539]/30" />
        </div>
        <span className="font-mono text-[11px] text-zinc-500 uppercase">
          SIDE QUESTS & CULTURE
        </span>
      </div>

      {/* Center Layout: Left Narrative + Right Phone Screenshot Mockup */}
      <div className="relative z-10 my-auto max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Personality Headline & Story */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF8539]/10 border border-[#FF8539]/25 text-xs font-mono text-[#FF8539]">
            <Flame className="w-3.5 h-3.5 text-[#FF8539]" />
            <span>ALGORITHM TAMER // VIRAL MOMENT</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-[0.95] font-display">
            When CS Theory Meets Cricket Seam Angles.
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            I don't just write algorithms for production backends. I built trajectory computer-vision models to analyze Jasprit Bumrah's release seam angle — creating a viral technical reel breakdown that resonated with over 100K+ engineers and sports analysts.
          </p>

          {/* Interactive Metric Pill Switcher */}
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { id: 'cricket', label: 'Bumrah Seam Model', icon: Activity },
              { id: 'git', label: '3 AM Git Commits', icon: GitCommit },
              { id: 'caffeine', label: 'Caffeine Latency', icon: Coffee },
            ].map((tab) => {
              const Icon = tab.icon
              const isSelected = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FF8539] text-black font-semibold shadow-lg shadow-[#FF8539]/20'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: Phone Mockup with Dotted Border */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative p-3 rounded-[40px] border-2 border-dashed border-[#FF8539]/40 bg-black/40 backdrop-blur-xl max-w-sm w-full shadow-2xl">
            {/* Inner Phone Frame */}
            <div className="relative rounded-[32px] overflow-hidden bg-zinc-950 border border-white/15 p-4 flex flex-col gap-4">
              {/* Phone Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF8539] to-amber-500 flex items-center justify-center font-bold text-xs text-white">
                    A.
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">adarsh.codes</span>
                      <span className="w-3 h-3 rounded-full bg-cyan-400 flex items-center justify-center text-[8px] text-black font-bold">✓</span>
                    </div>
                    <p className="text-[10px] font-mono text-zinc-500">Bumrah Seam Analysis</p>
                  </div>
                </div>
                {/* Inline Instagram SVG */}
                <svg className="w-4 h-4 text-zinc-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>

              {/* Dynamic Reel / Content Display based on activeTab */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-white/10 flex flex-col justify-between p-4">
                {activeTab === 'cricket' && (
                  <>
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>FPS: 120 • 4K SLOW-MO</span>
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">VIRAL REEL</span>
                    </div>

                    <div className="my-auto text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-[#FF8539]/20 border border-[#FF8539]/40 flex items-center justify-center mx-auto text-[#FF8539]">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                      <p className="text-sm font-bold text-white">SEAM ANGLE: 14.2° INSWING</p>
                      <p className="text-[11px] font-mono text-zinc-400">Magnus Effect Trajectory Simulation</p>
                    </div>

                    <div className="space-y-1.5 bg-black/60 p-2.5 rounded-xl border border-white/5 text-[11px] font-mono">
                      <div className="flex justify-between text-zinc-400">
                        <span>REACH:</span>
                        <span className="text-white font-bold">142,500+</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>SHARES:</span>
                        <span className="text-[#FF8539] font-bold">3,820</span>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'git' && (
                  <>
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>REPO: pgmpy-optimization</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">MERGED</span>
                    </div>

                    <div className="my-auto font-mono text-xs text-left bg-black/80 p-3.5 rounded-xl border border-white/10 space-y-1.5">
                      <p className="text-emerald-400">+ 1,420 lines Rust SIMD</p>
                      <p className="text-rose-400">- 3,890 lines Python loop</p>
                      <p className="text-zinc-400 text-[10px] pt-1">Commit: 3:42 AM • "Who needs sleep when memory is zero-alloc?"</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>SPEEDUP:</span>
                      <span className="text-emerald-400 font-bold">18.4x FASTER</span>
                    </div>
                  </>
                )}

                {activeTab === 'caffeine' && (
                  <>
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>RUNTIME TELEMETRY</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">PEAK FOCUS</span>
                    </div>

                    <div className="my-auto text-center space-y-2">
                      <Coffee className="w-10 h-10 text-amber-400 mx-auto" />
                      <p className="text-lg font-bold text-white">4 Double Espressos</p>
                      <p className="text-[11px] font-mono text-zinc-400">Fueling low-level performance tuning</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>HEART RATE:</span>
                      <span className="text-rose-400 font-bold">78 BPM (STABLE)</span>
                    </div>
                  </>
                )}
              </div>

              {/* Engagement Stats Footer */}
              <div className="flex items-center justify-around text-xs font-mono text-zinc-400 pt-1">
                <span>❤️ 12.4K</span>
                <span>💬 482</span>
                <span>🚀 100K+ EXP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs font-mono text-zinc-500">
        <span>CULTURE MOMENT // 100% AUTHENTIC CODE & CRICKET</span>
        <span className="text-zinc-400">SCROLL TO COVERFLOW</span>
      </div>
    </section>
  )
}
