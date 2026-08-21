import React, { useState } from 'react'
import { Mail, Copy, Check, FileDown, ArrowUpRight } from 'lucide-react'

export default function Section7Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'adarsh.dev@example.com'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="section-7"
      className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden select-none bg-[#100904]"
    >
      {/* Background Night Studio Setup Photo */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <img
          src="/images/section7-closing.jpg"
          alt="Night workspace backdrop"
          className="w-full h-full object-cover filter brightness-30 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100904] via-[#100904]/80 to-[#100904]/90" />
      </div>

      {/* Top Label */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#FF8539] tracking-widest uppercase font-semibold">
            07 // CLOSING TRANSMISSION
          </span>
          <div className="h-[1px] w-12 bg-[#FF8539]/30" />
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>INBOX OPEN FOR OPPORTUNITIES</span>
        </div>
      </div>

      {/* Center Closing Hero Card */}
      <div className="relative z-10 my-auto max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] text-white uppercase leading-[0.9] font-display">
            Let's Build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF8539] to-[#FF8539]">
              Something Loud.
            </span>
          </h2>
          <p className="text-base sm:text-xl text-zinc-300 font-light max-w-xl mx-auto leading-relaxed pt-2">
            Available for high-impact software engineering roles, distributed systems design, and creative frontend direction.
          </p>
        </div>

        {/* Action Buttons: Email Copy + Resume Download */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* 1-Click Email Copy Button */}
          <button
            onClick={handleCopyEmail}
            className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#FF8539] hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all shadow-xl shadow-[#FF8539]/20 hover:scale-105 cursor-pointer w-full sm:w-auto justify-center"
          >
            <Mail className="w-4 h-4 text-black" />
            <span>{copied ? 'EMAIL COPIED TO CLIPBOARD' : email}</span>
            {copied ? (
              <Check className="w-4 h-4 text-black animate-bounce" />
            ) : (
              <Copy className="w-4 h-4 text-black/70 group-hover:text-black" />
            )}
          </button>

          {/* Resume Download CTA */}
          <a
            href="/resume.pdf"
            download="Adarsh_Resume_2026.pdf"
            className="flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-semibold transition-all hover:border-[#FF8539] w-full sm:w-auto justify-center cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-[#FF8539]" />
            <span>DOWNLOAD RESUME (PDF)</span>
          </a>
        </div>

        {/* Social Profile Links */}
        <div className="flex items-center justify-center gap-4 pt-6">
          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-[#FF8539]/10 border border-white/10 hover:border-[#FF8539]/40 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#FF8539] fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-[#FF8539]/10 border border-white/10 hover:border-[#FF8539]/40 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#FF8539] fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </a>

          {/* Twitter / X */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-[#FF8539]/10 border border-white/10 hover:border-[#FF8539]/40 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#FF8539] fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>Twitter / X</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </a>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <p>© 2026 ADARSH. CRAFTED WITH REACT 19 & TAILWIND CSS.</p>
        <p className="text-zinc-400">DESIGNED WITH ORYZO PRODUCT-LAUNCH AESTHETIC</p>
      </div>
    </section>
  )
}
