import React from 'react'
import { Cpu, Globe, Layers, Zap, Terminal, Sparkles } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 md:px-16 border-t border-white/5 bg-[#07070a]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-indigo-400 tracking-widest uppercase">01 // Background</span>
          <div className="h-[1px] flex-1 bg-white/10"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Statement */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Obsessed with speed, tactile physics, and scalable software architecture.
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              I am a Computer Science student and software engineer who bridges the gap between low-level performance and polished creative frontend experiences. My work spans distributed backend systems, real-time 3D graphics, and open-source developer tooling.
            </p>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              When I'm not writing code, you'll find me exploring computer graphics pipelines, optimizing database queries, or breaking down how modern product companies create magnetic interactive moments.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              {['Systems Architecture', 'Interactive WebGL', 'Distributed Computing', 'Clean Code'].map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-1.5 rounded-md bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Metric / Feature Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-500 uppercase">Focus Area</span>
                <Cpu className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Full-Stack & Systems</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Building reliable distributed systems, clean REST/gRPC APIs, and reactive client applications.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-500 uppercase">Craft</span>
                <Layers className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Creative 3D & Interfaces</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Transforming standard web applications into sensory, physics-driven product launch moments with WebGL and shaders.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-500 uppercase">Ethos</span>
                <Terminal className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Open Source First</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Actively contributing to developer libraries, tooling, and sharing knowledge with the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
