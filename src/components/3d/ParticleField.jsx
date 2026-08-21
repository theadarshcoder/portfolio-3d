import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function CoffeeBeanField({ count = 550 }) {
  const meshRef = useRef()
  const groupRef = useRef()
  const cursorLightRef = useRef()
  const mouseSmooth = useRef({ x: 0, y: 0 })
  const windowPointer = useRef({ x: 0, y: 0 })

  const { nodes } = useGLTF('/models/coffee-bean.glb')

  // Extract geometry from loaded GLB
  const geometry = useMemo(() => {
    let geom = null
    Object.values(nodes).forEach((node) => {
      if (node.isMesh && node.geometry) {
        geom = node.geometry
      }
    })
    return geom || new THREE.SphereGeometry(0.3, 32, 32)
  }, [nodes])

  // Glossy PBR Material with clearcoat for studio product shot specular sheen
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      roughness: 0.22,
      metalness: 0.06,
      clearcoat: 0.95,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      emissive: '#FF8539',
      emissiveIntensity: 0.09,
    })
  }, [])

  // Colors: dark roasted coffee brown at rest vs glowing #FF8539 at cursor
  const baseColor = useMemo(() => new THREE.Color('#382012'), [])
  const activeColor = useMemo(() => new THREE.Color('#FF8539'), [])

  // Window-level smooth pointer tracking
  useEffect(() => {
    const onPointerMove = (e) => {
      windowPointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      windowPointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  // Initialize 550 beans distributed evenly across center, corners, edges and 3D depth
  const particles = useMemo(() => {
    const data = []
    const dummy = new THREE.Object3D()

    for (let i = 0; i < count; i++) {
      // 1. Stratified & full-bleed spatial coverage across center, all 4 corners, and edges
      // Use uniform spread with slight organic jitter so all sectors are populated
      const baseX = (Math.random() - 0.5) * 23.5
      const baseY = (Math.random() - 0.5) * 24.5
      const baseZ = -6.0 + Math.random() * 8.2

      // 2. Varied natural sizes (background dust, midground beans, foreground hero floaters)
      let s = 0.032 + Math.random() * 0.038
      // ~15% foreground larger beans
      if (Math.random() < 0.15) {
        s = 0.068 + Math.random() * 0.045
      }
      // ~20% tiny deep background beans
      else if (Math.random() < 0.25) {
        s = 0.022 + Math.random() * 0.016
      }

      // Random tumbled initial 3D rotation
      const rot = [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ]

      // Slow, organic tumbling speeds
      const rotSpeed = [
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * 0.28,
      ]

      const scale = [
        s * (0.92 + Math.random() * 0.16),
        s * (1.0 + Math.random() * 0.2),
        s * (0.92 + Math.random() * 0.16),
      ]

      data.push({
        baseX,
        baseY,
        baseZ,
        offsetX: 0,
        offsetY: 0,
        rot,
        rotSpeed,
        scale,
        currentColor: baseColor.clone(),
        seed: Math.random() * 100,
      })
    }
    return { data, dummy }
  }, [count, baseColor])

  // Silky Smooth Frame Loop: Damped Cursor Flow + Radiant Cursor Glow
  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return

    const t = state.clock.elapsedTime
    const { data, dummy } = particles

    // 1. Damped cursor coordinates in 3D world space (extended range)
    const targetX = windowPointer.current.x * 7.5
    const targetY = windowPointer.current.y * 6.0

    mouseSmooth.current.x = THREE.MathUtils.damp(
      mouseSmooth.current.x,
      targetX,
      6.0,
      delta
    )
    mouseSmooth.current.y = THREE.MathUtils.damp(
      mouseSmooth.current.y,
      targetY,
      6.0,
      delta
    )

    // 2. Radiant #FF8539 point light tracks exact cursor position
    if (cursorLightRef.current) {
      cursorLightRef.current.position.set(
        mouseSmooth.current.x,
        mouseSmooth.current.y,
        2.2
      )
    }

    // 3. Smooth, subtle scene parallax
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      windowPointer.current.x * 0.15,
      4.0,
      delta
    )
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -windowPointer.current.y * 0.12,
      4.0,
      delta
    )

    // 4. Update individual coffee beans with smooth, non-shaking physics
    for (let i = 0; i < count; i++) {
      const p = data[i]

      // Gentle, continuous floating drift (smooth sinusoids, zero jitter)
      const driftX = Math.sin(t * 0.2 + p.seed) * 0.35
      const driftY = Math.cos(t * 0.16 + p.seed * 0.6) * 0.25
      const driftZ = Math.sin(t * 0.12 + p.seed * 0.8) * 0.18

      const curTargetX = p.baseX + driftX
      const curTargetY = p.baseY + driftY
      const curTargetZ = p.baseZ + driftZ

      // Distance from cursor
      const dx = curTargetX - mouseSmooth.current.x
      const dy = curTargetY - mouseSmooth.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      let targetOffsetX = 0
      let targetOffsetY = 0
      let glowFactor = 0

      if (dist < 3.2) {
        // Smooth quadratic falloff curve (zero derivative at edge -> no snapping/shaking)
        const proximity = Math.pow(1 - dist / 3.2, 1.6)
        const repelMagnitude = proximity * 1.4

        targetOffsetX = (dx / (dist + 0.25)) * repelMagnitude
        targetOffsetY = (dy / (dist + 0.25)) * repelMagnitude
        glowFactor = Math.pow(1 - dist / 3.2, 1.2)
      }

      // Smoothly damp offsets to eliminate any shake
      p.offsetX = THREE.MathUtils.damp(p.offsetX, targetOffsetX, 4.5, delta)
      p.offsetY = THREE.MathUtils.damp(p.offsetY, targetOffsetY, 4.5, delta)

      // Steady, smooth tumble rotation
      p.rot[0] += p.rotSpeed[0] * delta
      p.rot[1] += p.rotSpeed[1] * delta
      p.rot[2] += p.rotSpeed[2] * delta

      // Smooth color transition: glowing #FF8539 near cursor, roasted dark brown at rest
      const targetColor = glowFactor > 0.01 ? activeColor : baseColor
      const colorLerpSpeed = glowFactor > 0.01 ? 0.09 : 0.05
      p.currentColor.lerp(targetColor, colorLerpSpeed)

      // Final smooth 3D position
      const finalX = curTargetX + p.offsetX
      const finalY = curTargetY + p.offsetY
      const finalZ = curTargetZ

      // Apply matrix and color
      dummy.position.set(finalX, finalY, finalZ)
      dummy.rotation.set(p.rot[0], p.rot[1], p.rot[2])
      dummy.scale.set(p.scale[0], p.scale[1], p.scale[2])
      dummy.updateMatrix()

      meshRef.current.setMatrixAt(i, dummy.matrix)
      meshRef.current.setColorAt(i, p.currentColor)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {/* Radiant #FF8539 Point Light directly at the cursor */}
      <pointLight
        ref={cursorLightRef}
        intensity={9.5}
        color="#FF8539"
        distance={7.5}
        decay={2.0}
      />

      <instancedMesh
        ref={meshRef}
        args={[geometry, material, count]}
        castShadow
        receiveShadow
      />
    </group>
  )
}

/**
 * ParticleField: Full-bleed 3D coffee bean particle field.
 * Delicate reduced bean size, silky smooth damped cursor deflection, and radiant #FF8539 cursor glow.
 */
export default function ParticleField() {
  return (
    <div
      className="absolute left-0 right-0 w-full pointer-events-none select-none z-0"
      style={{
        top: '-45vh',
        height: 'calc(100% + 90vh)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45, near: 0.1, far: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full pointer-events-none"
      >
        {/* Low base ambient light */}
        <ambientLight intensity={0.3} color="#1c0e06" />

        {/* Key Spotlight for glossy specular highlights */}
        <spotLight
          position={[5, 10, 6]}
          intensity={8.0}
          angle={0.7}
          penumbra={0.6}
          color="#fff6ed"
        />

        {/* Secondary Front Fill Light */}
        <pointLight position={[-4, 4, 4]} intensity={3.8} color="#ffb080" distance={20} />

        {/* Warm #FF8539 Rim Backlight */}
        <directionalLight
          position={[-6, -4, -4]}
          intensity={5.0}
          color="#FF8539"
        />

        {/* 550 Instanced Coffee Beans — Dense Ribbon Stream & Ambient Field */}
        <CoffeeBeanField count={550} />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/coffee-bean.glb')
