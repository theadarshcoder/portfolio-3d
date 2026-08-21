import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Left: Brand Monogram */}
        <a
          href="#hero-section"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-[#FF8539]/30 flex items-center justify-center font-mono font-bold text-sm tracking-tight text-white group-hover:border-[#FF8539] group-hover:bg-[#FF8539]/15 transition-all duration-300 shadow-md">
            A<span className="text-[#FF8539]">.</span>
          </div>
          <span className="text-sm font-bold tracking-tight uppercase text-zinc-300 group-hover:text-white transition-colors font-display">
            Adarsh
          </span>
        </a>

        {/* Center: Nav Pills */}
        <nav className={`hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'bg-[#180e07]/90 backdrop-blur-xl border-[#FF8539]/20 shadow-lg shadow-black/60'
            : 'bg-white/[0.02] backdrop-blur-md border-white/5'
        }`}>
          {[
            { label: 'Hero', href: '#hero-section' },
            { label: 'Manifesto', href: '#section-2' },
            { label: 'Stack', href: '#section-3' },
            { label: 'Lab', href: '#section-4' },
            { label: 'Culture', href: '#section-5' },
            { label: 'Projects', href: '#section-6' },
            { label: 'Contact', href: '#section-7' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-1 text-[11px] uppercase tracking-widest text-zinc-400 hover:text-[#FF8539] transition-colors font-mono rounded-full hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Availability Status & Socials */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF8539]/10 border border-[#FF8539]/25 text-[#FF8539] text-xs font-mono tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8539] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF8539]"></span>
            </span>
            <span>Available for work</span>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#FF8539]/50 hover:bg-[#FF8539]/10 transition-all cursor-pointer"
            aria-label="GitHub Profile"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
