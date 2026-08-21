import React from 'react'
import Navbar from './components/sections/Navbar'
import HeroSection from './components/sections/HeroSection'
import Section2Statement from './components/sections/Section2Statement'
import Section3SkillsReveal from './components/sections/Section3SkillsReveal'
import Section4Hover from './components/sections/Section4Hover'
import Section6Carousel from './components/sections/Section6Carousel'
import Section7Contact from './components/sections/Section7Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-[#100904] text-[#ececee] selection:bg-[#FF8539]/30 selection:text-[#FF8539]">
      {/* Global Pinned Header */}
      <Navbar />

      {/* All Page Content Sections in Flow */}
      <main className="relative z-10">
        {/* Section 1: Hero with 3D Coffee Bean Particle Field */}
        <HeroSection />

        {/* Section 2: Transition / Statement */}
        <Section2Statement />

        {/* Section 3: Skills / Identity Reveal */}
        <Section3SkillsReveal />

        {/* Section 4: Hover Interaction */}
        <Section4Hover />

        {/* Section 6: Projects Showcase */}
        <Section6Carousel />

        {/* Section 7: Contact / Closing */}
        <Section7Contact />
      </main>
    </div>
  )
}
