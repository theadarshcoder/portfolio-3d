import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// 3D Pencil Component built with exact geometric parts
function PencilMesh({ progressRef }) {
  const groupRef = useRef()
  const currentRotZ = useRef(0)

  // Four keyframe stops defined by user specification:
  // Step 1: p in [0, 0.15] -> rotZ = 0 (vertical, tip down)
  // Step 2: p in [0.15, 0.4] -> rotZ = Math.PI / 2 (horizontal, 90 deg)
  // Step 3: p in [0.4, 0.65] -> rotZ = Math.PI * 0.75 (diagonal 135 deg, tip to upper-right)
  // Step 4: p in [0.65, 1.0] -> rotZ = Math.PI * 1.1 (steep diagonal 198 deg)
  const ROTATION_STOPS = useMemo(() => [
    { p: 0.0, z: 0 },
    { p: 0.15, z: 0 },
    { p: 0.4, z: Math.PI / 2 },
    { p: 0.65, z: (3 * Math.PI) / 4 },
    { p: 1.0, z: Math.PI * 1.1 },
  ], [])

  function getTargetRotationZ(progress) {
    const p = Math.max(0, Math.min(1, progress))
    let i = 0
    while (i < ROTATION_STOPS.length - 1 && ROTATION_STOPS[i + 1].p <= p) {
      i++
    }
    const a = ROTATION_STOPS[i]
    const b = ROTATION_STOPS[Math.min(i + 1, ROTATION_STOPS.length - 1)]

    if (a.p === b.p) return a.z
    const t = (p - a.p) / (b.p - a.p)
    // Smooth cosine interpolation
    const easeT = (1 - Math.cos(t * Math.PI)) / 2
    return a.z + (b.z - a.z) * easeT
  }

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const p = progressRef.current || 0
    const targetZ = getTargetRotationZ(p)

    // Smooth scrub damping (~1.2s lag feel)
    currentRotZ.current = THREE.MathUtils.damp(currentRotZ.current, targetZ, 4.5, delta)

    // Apply rotation only to Z axis (as strictly specified: x/y fixed, only rotation.z changes)
    groupRef.current.rotation.set(0, 0, currentRotZ.current)
  })

  // Materials
  const hexBodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d97724', // Warm orange/amber hexagonal pencil body
    roughness: 0.35,
    metalness: 0.05,
    flatShading: true, // Highlights the 6-sided hexagonal bevels
  }), [])

  const woodConeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#edd5be', // Natural sharpened cedar wood
    roughness: 0.6,
    metalness: 0.0,
  }), [])

  const graphiteMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1e', // Dark graphite core
    roughness: 0.2,
    metalness: 0.8,
  }), [])

  const ferruleMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#e4e4e7', // Brushed metallic silver ferrule band
    roughness: 0.2,
    metalness: 0.85,
  }), [])

  const eraserMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FF8539', // Vibrant #FF8539 accent eraser
    roughness: 0.5,
    metalness: 0.0,
  }), [])

  return (
    <group ref={groupRef} scale={[1.4, 1.4, 1.4]}>
      {/* 1. Hexagonal Wooden Shaft (6-sided cylinder) */}
      <mesh position={[0, 0, 0]} material={hexBodyMat} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.13, 2.1, 6]} />
      </mesh>

      {/* 2. Sharpened Wood Collar (Cone pointing down) */}
      <mesh position={[0, -1.25, 0]} rotation={[Math.PI, 0, 0]} material={woodConeMat} castShadow>
        <coneGeometry args={[0.13, 0.4, 32]} />
      </mesh>

      {/* 3. Graphite Tip (Cone tip at the very bottom) */}
      <mesh position={[0, -1.35, 0]} rotation={[Math.PI, 0, 0]} material={graphiteMat} castShadow>
        <coneGeometry args={[0.048, 0.2, 32]} />
      </mesh>

      {/* 4. Metal Ferrule Band (Near the top) */}
      <mesh position={[0, 1.15, 0]} material={ferruleMat} castShadow>
        <cylinderGeometry args={[0.136, 0.136, 0.2, 32]} />
      </mesh>

      {/* 5. Eraser Tip (At the very top) */}
      <mesh position={[0, 1.35, 0]} material={eraserMat} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.2, 32]} />
      </mesh>
    </group>
  )
}

/**
 * ShowcaseRotatingObject: Centered 3D pencil that stays fixed in screen position (320px x 320px, camera z=4.5)
 * and continuously rotates exclusively on Z axis based on scroll progress.
 */
export default function ShowcaseRotatingObject({ containerRef }) {
  const progressRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalScrollable = rect.height - windowHeight

      if (totalScrollable > 0) {
        // Calculate progress [0, 1] as container passes through viewport
        const current = -rect.top / totalScrollable
        progressRef.current = Math.max(0, Math.min(1, current))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [containerRef])

  return (
    <div className="w-[320px] h-[320px] pointer-events-none select-none flex items-center justify-center mx-auto">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} color="#1c0e06" />
        {/* Key Studio Light */}
        <directionalLight position={[4, 5, 4]} intensity={4.5} color="#fff6ed" />
        {/* Soft Fill Light */}
        <directionalLight position={[-3, 2, 3]} intensity={2.5} color="#ffbe99" />
        {/* Warm #FF8539 Rim Backlight */}
        <directionalLight position={[-4, -4, -3]} intensity={3.5} color="#FF8539" />

        <PencilMesh progressRef={progressRef} />
      </Canvas>
    </div>
  )
}
