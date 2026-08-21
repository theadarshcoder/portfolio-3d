import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * HeroMesh: Flat circular disc / coin centerpiece for Oryzo aesthetic.
 * Occupies 25-30% of viewport width/height, positioned to sit alongside the headline text,
 * constrained to stay below the top navbar at all times.
 */
export default function HeroMesh({ mouseParallaxStrength = 0.25 }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const ringRef = useRef()
  const targetRotation = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!groupRef.current) return

    console.log('[3D Engine] Flat Disc HeroMesh initialized')

    // Initial starting state: offset to right side alongside headline text
    groupRef.current.position.set(1.35, -0.25, 0)
    groupRef.current.rotation.set(-0.35, 0.45, -0.15)
    groupRef.current.scale.set(1, 1, 1)

    // Scroll-Reactive Lift & Rotation via ScrollTrigger scrub: 1.2
    const triggerElement = document.getElementById('stage-3d-wrapper') || document.body

    const st = ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2, // Physical inertia lag
      onUpdate: (self) => {
        const progress = self.progress // 0 to 1
        if (groupRef.current) {
          // Bounded lift: moves from -0.25 to +0.25 max (stays safely below the nav bar at all times)
          gsap.to(groupRef.current.position, {
            x: 1.35 - progress * 0.15,
            y: -0.25 + progress * 0.5,
            z: progress * -0.8,
            ease: 'power2.out',
            duration: 0.2,
            overwrite: true,
          })
          gsap.to(groupRef.current.rotation, {
            y: 0.45 + progress * Math.PI * 1.5,
            x: -0.35 + progress * 0.3,
            ease: 'power2.out',
            duration: 0.2,
            overwrite: true,
          })
        }
      },
    })

    return () => st.kill()
  }, [])

  // Render loop: ONLY subtle breathing when idle + independent cursor parallax
  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Independent mouse-parallax tilt
    const pointerX = state.pointer.x
    const pointerY = state.pointer.y

    targetRotation.current.x = -pointerY * mouseParallaxStrength
    targetRotation.current.y = pointerX * mouseParallaxStrength

    const lerpFactor = 1 - Math.exp(-4 * delta)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      lerpFactor
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      lerpFactor
    )
  })

  return (
    <group ref={groupRef} position={[1.35, -0.25, 0]}>
      {/* 
        Thin, Flat Circular Disc / Coin Geometry 
        Viewed mostly face-on with a slight tilt
      */}
      <mesh ref={meshRef} castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.12, 64]} />
        <meshPhysicalMaterial
          color="#FF8539"
          emissive="#FF8539"
          emissiveIntensity={0.15}
          roughness={0.35}
          metalness={0.1}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Subtle outer edge rim highlight */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.16, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#FF8539"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  )
}
