import React from 'react'
import { ArrowUpRight, FolderGit2 } from 'lucide-react'

const PROJECTS = [
  {
    title: 'Aura GL',
    tagline: 'WebGL Shaders & Real-Time Physics Engine for Next-Gen Web Applications',
    description: 'A modular, high-performance library for simulating kinetic physics, particle fluid dynamics, and customizable PBR materials directly in the browser.',
    tags: ['WebGL', 'Three.js', 'GLSL', 'TypeScript'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
  {
    title: 'Nexus Data Pipeline',
    tagline: 'High-Throughput Stream Processing & Telemetry Engine',
    description: 'Ultra-low-latency event ingestion pipeline built in Go & Rust with sub-millisecond serialization and native Prometheus telemetry exports.',
    tags: ['Go', 'Rust', 'gRPC', 'Distributed Systems'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
  },
  {
    title: 'KubePulse CLI',
    tagline: 'Developer-First Observability & Cluster Health Terminal',
    description: 'Interactive TUI for visualizing cluster resource allocation, real-time log streaming, and automated anomaly detection for local Docker/k8s pods.',
    tags: ['TypeScript', 'Node.js', 'Docker', 'Kubernetes'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
  },
  {
    title: 'VoxelCraft Studio',
    tagline: 'Collaborative In-Browser 3D Voxel Sculpting Tool',
    description: 'Real-time multi-user voxel engine with hardware-accelerated raymarching, custom color palettes, and instant glTF/OBJ export capabilities.',
    tags: ['React', 'R3F', 'WebSockets', 'Canvas API'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: false,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-16 border-t border-white/5 bg-[#050507]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">02 // Selected Work</span>
            <div className="h-[1px] w-12 sm:w-24 bg-white/10"></div>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <span>VIEW GITHUB ARCHIVE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              className={`group relative p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                project.featured
                  ? 'bg-gradient-to-b from-indigo-950/20 to-white/[0.02] border border-indigo-500/20 hover:border-indigo-500/40 md:col-span-2'
                  : 'bg-white/[0.02] border border-white/5 hover:border-white/15'
              }`}
            >
              <div>
                {/* Card Top Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-mono text-zinc-500 tracking-wider">PROJECT 0{idx + 1}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                      aria-label="View Source on GitHub"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                      aria-label="View Live Project"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Project Title & Tagline */}
                <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-zinc-300 mt-1">
                  {project.tagline}
                </p>

                {/* Project Description */}
                <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] text-[11px] font-mono text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
