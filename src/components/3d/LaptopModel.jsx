import React, { useRef, useMemo, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Keyframe stops across the entire document scroll progress (0.0 to 1.0)
const STOPS = [
  {
    p: 0.0, // Hero Top: closed, resting on right
    pos: [1.35, -0.3, 0],
    rot: [0.38, -0.72, 0.05],
    scale: 0.065,
    screenAngle: 0.0, // Closed flat
  },
  {
    p: 0.14, // Hero Advance: screen lid swings wide open (~108 deg)
    pos: [1.2, 0.0, 0.15],
    rot: [0.25, -0.58, 0.02],
    scale: 0.075,
    screenAngle: 1.9, // Fully open
  },
  {
    p: 0.32, // Manifesto (Section 2): rotated 90-deg side profile alongside headline
    pos: [1.0, 0.3, -0.2],
    rot: [0.05, -1.55, -0.08],
    scale: 0.07,
    screenAngle: 1.85,
  },
  {
    p: 0.52, // Stack & Lab (Sections 3 & 4): angled top-down floating perspective
    pos: [0.7, -0.25, 0.45],
    rot: [-0.42, 0.82, -0.22],
    scale: 0.078,
    screenAngle: 1.85,
  },
  {
    p: 0.74, // Projects Carousel (Section 6): side elevation on screen-left
    pos: [-1.3, 0.2, 0.2],
    rot: [0.18, 1.15, 0.08],
    scale: 0.075,
    screenAngle: 1.85,
  },
  {
    p: 1.0, // Contact (Section 7): settles cleanly on right
    pos: [1.15, -0.25, 0.1],
    rot: [0.28, -0.42, 0.05],
    scale: 0.068,
    screenAngle: 1.85,
  },
]

function interpolateStop(progress) {
  const p = Math.max(0, Math.min(1, progress))

  let i = 0
  while (i < STOPS.length - 1 && STOPS[i + 1].p <= p) {
    i++
  }
  const a = STOPS[i]
  const b = STOPS[Math.min(i + 1, STOPS.length - 1)]

  if (a.p === b.p) {
    return { pos: a.pos, rot: a.rot, scale: a.scale, screenAngle: a.screenAngle }
  }

  // Smooth cubic ease-in-out factor
  const rawT = (p - a.p) / (b.p - a.p)
  const t = rawT < 0.5 ? 2 * rawT * rawT : -1 + (4 - 2 * rawT) * rawT

  const pos = [
    a.pos[0] + (b.pos[0] - a.pos[0]) * t,
    a.pos[1] + (b.pos[1] - a.pos[1]) * t,
    a.pos[2] + (b.pos[2] - a.pos[2]) * t,
  ]

  const rot = [
    a.rot[0] + (b.rot[0] - a.rot[0]) * t,
    a.rot[1] + (b.rot[1] - a.rot[1]) * t,
    a.rot[2] + (b.rot[2] - a.rot[2]) * t,
  ]

  const scale = a.scale + (b.scale - a.scale) * t
  const screenAngle = a.screenAngle + (b.screenAngle - a.screenAngle) * t

  return { pos, rot, scale, screenAngle }
}

/**
 * LaptopModel: Persistent 3D MacBook Pro driven continuously by page scroll.
 * Includes cursor-reactive #FF8539 emissive glow on the screen and bezel materials.
 */
export default function LaptopModel({ mouseParallaxStrength = 0.25 }) {
  const groupRef = useRef()
  const screenNodeRef = useRef()
  const scrollProgressRef = useRef(0)
  const currentProgress = useRef(0)
  const targetParallax = useRef({ x: 0, y: 0 })

  // Material refs for cursor-reactive glow
  const screenMatRef = useRef()
  const bezelMatRef = useRef()
  const currentGlow = useRef(0.5) // Resting ambient intensity
  const projectedScreenPos = useRef(new THREE.Vector3())
  const windowPointer = useRef({ x: 0, y: 0 })

  const { scene } = useGLTF('/models/laptop.glb')

  // Global window listeners for scroll and pointer coordinates
  useEffect(() => {
    const updateScroll = () => {
      const docEl = document.documentElement
      const scrollY = window.pageYOffset || docEl.scrollTop || document.body.scrollTop || 0
      const maxScroll = Math.max(1, (docEl.scrollHeight || document.body.scrollHeight) - window.innerHeight)
      scrollProgressRef.current = Math.min(1, Math.max(0, scrollY / maxScroll))
    }

    const onPointerMove = (e) => {
      windowPointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      windowPointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    updateScroll()

    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  // Clone and style materials with #100904 body and #FF8539 accents
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true)

    cloned.traverse((child) => {
      if (child.name === 'screen') {
        screenNodeRef.current = child
      }

      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true

        const name = (child.name || '').toLowerCase()
        const matName = (child.material?.name || '').toLowerCase()

        // 'matte' is the screen display surface in laptop.glb
        if (name.includes('matte') || name.includes('screen') || matName.includes('screen') || matName.includes('matte')) {
          const mat = new THREE.MeshPhysicalMaterial({
            color: '#120803',
            emissive: new THREE.Color('#FF8539'),
            emissiveIntensity: 0.5,
            roughness: 0.12,
            metalness: 0.15,
            clearcoat: 1.0,
            clearcoatRoughness: 0.04,
          })
          child.material = mat
          screenMatRef.current = mat
        } else if (name.includes('back') || matName.includes('aluminium')) {
          // 'back' is the screen lid and bezel rim
          const mat = new THREE.MeshPhysicalMaterial({
            color: '#1c120a',
            emissive: new THREE.Color('#FF8539'),
            emissiveIntensity: 0.1,
            roughness: 0.28,
            metalness: 0.88,
            clearcoat: 0.6,
            clearcoatRoughness: 0.1,
          })
          child.material = mat
          bezelMatRef.current = mat
        } else if (name.includes('body')) {
          // 'body' is the lower chassis and keyboard deck
          child.material = new THREE.MeshPhysicalMaterial({
            color: '#181008',
            emissive: new THREE.Color('#FF8539'),
            emissiveIntensity: 0.04,
            roughness: 0.35,
            metalness: 0.75,
            clearcoat: 0.4,
          })
        } else {
          child.material = new THREE.MeshStandardMaterial({
            color: '#100905',
            roughness: 0.6,
            metalness: 0.3,
          })
        }
      }
    })

    return cloned
  }, [scene])

  // Continuous frame loop: Scroll motion + Cursor-reactive glow
  useFrame((state, delta) => {
    if (!groupRef.current) return

    // ─────────────────────────────────────────────────────────────
    // 1. SCROLL-DRIVEN MOTION LAYER (Independent)
    // ─────────────────────────────────────────────────────────────
    currentProgress.current = THREE.MathUtils.damp(
      currentProgress.current,
      scrollProgressRef.current,
      6.0,
      delta
    )

    const { pos, rot, scale, screenAngle } = interpolateStop(currentProgress.current)

    // Update screen hinge angle
    if (screenNodeRef.current) {
      screenNodeRef.current.rotation.x = screenAngle
    }

    // Update position and scale
    groupRef.current.position.set(pos[0], pos[1], pos[2])
    groupRef.current.scale.set(scale, scale, scale)

    // Independent mouse parallax tilt
    const pointerX = windowPointer.current.x
    const pointerY = windowPointer.current.y
    targetParallax.current.x = -pointerY * mouseParallaxStrength
    targetParallax.current.y = pointerX * mouseParallaxStrength

    const lerpFactor = 1 - Math.exp(-6 * delta)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      rot[0] + targetParallax.current.x * 0.05,
      lerpFactor
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rot[1] + targetParallax.current.y * 0.05,
      lerpFactor
    )
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      rot[2],
      lerpFactor
    )

    // ─────────────────────────────────────────────────────────────
    // 2. CURSOR-REACTIVE GLOW LAYER (Independent)
    // ─────────────────────────────────────────────────────────────
    if (groupRef.current && state.camera) {
      // Find screen 3D world position and project to NDC [-1, 1]
      const targetObj = screenNodeRef.current || groupRef.current
      targetObj.getWorldPosition(projectedScreenPos.current)
      projectedScreenPos.current.project(state.camera)

      const dx = pointerX - projectedScreenPos.current.x
      const dy = pointerY - projectedScreenPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      // When cursor is near/over laptop screen area (<0.75 NDC distance), brighten emissive glow
      const proximity = Math.max(0, 1 - dist / 0.75)
      // Resting intensity: 0.5, Peak active glow: 3.5
      const targetIntensity = 0.5 + Math.pow(proximity, 1.5) * 3.0

      // Damped smooth transition using ~0.09 lerp rate
      currentGlow.current = THREE.MathUtils.lerp(
        currentGlow.current,
        targetIntensity,
        0.09
      )

      // Apply to screen emissive material
      if (screenMatRef.current) {
        screenMatRef.current.emissiveIntensity = currentGlow.current
      }

      // Apply to bezel rim material
      if (bezelMatRef.current) {
        bezelMatRef.current.emissiveIntensity = 0.1 + (currentGlow.current - 0.5) * 0.35
      }
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  )
}

useGLTF.preload('/models/laptop.glb')
