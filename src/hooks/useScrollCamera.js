import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollCamera & CameraScrollRig: Bound inside R3F Canvas to directly dolly
 * camera.position.z, y, and subtle pitch through true 3D Z-depth via ScrollTrigger.
 */
export function CameraScrollRig({ triggerRef }) {
  const { camera } = useThree()
  const tlRef = useRef(null)

  useEffect(() => {
    const triggerElement = triggerRef?.current || document.getElementById('stage-3d-wrapper') || document.body
    if (!triggerElement) return

    // Set initial camera perspective (clean framing at z: 5.8)
    camera.position.set(0, 0, 5.8)
    camera.lookAt(0, 0, 0)

    console.log('[3D Engine] Camera initialized at position:', camera.position, 'FOV:', camera.fov)

    // GSAP ScrollTrigger timeline dollying the camera through true 3D Z-depth across sections 1-3
    tlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2, // Smooth inertia scrub
        invalidateOnRefresh: true,
      },
    })

    tlRef.current
      .to(camera.position, {
        z: 4.8,
        y: -0.15,
        ease: 'power1.inOut',
      }, 0.5)
      .to(camera.position, {
        z: 3.8,
        y: -0.3,
        ease: 'power1.inOut',
      }, 1)
      .to(camera.rotation, {
        x: 0.1,
        y: -0.06,
        ease: 'power1.inOut',
      }, 0)

    return () => {
      if (tlRef.current) {
        tlRef.current.kill()
      }
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === triggerElement) st.kill()
      })
    }
  }, [camera, triggerRef])

  return null
}

export default CameraScrollRig
