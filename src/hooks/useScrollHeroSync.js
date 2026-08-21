import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollHeroSync: Lightweight hook for synchronizing HTML typography overlay
 * with the hero scroll track. Pure GSAP, zero Three.js dependency.
 */
export function useScrollHeroSync(containerRef, textGroupRef, badgesRef) {
  useEffect(() => {
    const container = containerRef?.current || document.getElementById('hero-trigger')
    if (!container) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '80% top',
          scrub: 0.8,
        },
      })

      if (textGroupRef?.current) {
        tl.to(textGroupRef.current, {
          opacity: 0,
          y: -80,
          scale: 0.94,
          filter: 'blur(8px)',
          ease: 'power2.inOut',
        }, 0)
      }

      if (badgesRef?.current) {
        tl.to(badgesRef.current, {
          opacity: 0,
          y: -40,
          ease: 'power2.inOut',
        }, 0)
      }
    }, container)

    return () => ctx.revert()
  }, [containerRef, textGroupRef, badgesRef])
}
