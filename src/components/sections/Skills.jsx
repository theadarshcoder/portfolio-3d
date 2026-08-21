import React from 'react'
import { Terminal, Box, Database, Cpu, Code, Shield } from 'lucide-react'

const SKILL_CATEGORIES = [
  {
    category: '3D Graphics & Creative Tech',
    icon: Box,
    color: 'text-indigo-400',
    skills: ['Three.js', 'React Three Fiber', '@react-three/drei', 'GLSL / Shaders', 'GSAP & ScrollTrigger', 'WebGL Pipelines', 'Blender basics'],
  },
  {
    category: 'Languages & Core CS',
    icon: Code,
    color: 'text-cyan-400',
    skills: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'C / C++', 'Rust', 'Go', 'Data Structures & Algorithms'],
  },
  {
    category: 'Frontend & UI Engineering',
    icon: Cpu,
    color: 'text-violet-400',
    skills: ['React 19', 'Next.js', 'Tailwind CSS', 'Vite', 'State Management (Zustand)', 'Web Audio & Canvas API', 'Responsive Layouts'],
  },
  {
    category: 'Backend & Infrastructure',
    icon: Database,
    color: 'text-emerald-400',
    skills: ['Node.js', 'REST & gRPC APIs', 'PostgreSQL', 'Redis', 'Docker & Containers', 'Git & CI/CD', 'Linux Environment'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 md:px-16 border-t border-white/5 bg-[#07070a]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-mono text-xs text-violet-400 tracking-widest uppercase">03 // Technical Stack</span>
          <div className="h-[1px] flex-1 bg-white/10"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
