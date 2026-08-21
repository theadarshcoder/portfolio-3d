import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Simplex-like 3D noise for gentle ambient drift
function pseudoNoise(x, y, z) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453123
  return (n - Math.floor(n)) * 2 - 1
}

function sampleDrift(x, y, z, t) {
  const s = 0.2
  const nx = Math.sin(x * s + t * 0.15) * Math.cos(z * s * 0.4) + pseudoNoise(x * 0.05, y * 0.05, z * 0.05) * 0.1
  const ny = Math.cos(y * s * 0.3 - t * 0.12) * Math.sin(x * s * 0.3) + Math.sin(t * 0.1 + x * 0.1) * 0.12
  const nz = Math.sin(z * s * 0.3 + t * 0.15) * Math.cos(y * s * 0.3)
  return { x: nx * 0.35, y: ny * 0.28, z: nz * 0.25 }
}

// Generate an asymmetric, elongated faceted crystal shard geometry (8-14 flat triangular faces)
function createCrystalGeometry() {
  const rawGeom = new THREE.IcosahedronGeometry(0.08, 0)
  const geom = rawGeom.toNonIndexed() // Non-indexed to guarantee independent flat facet specular flashes
  const posAttr = geom.attributes.position
  const vertex = new THREE.Vector3()

  for (let i = 0; i < posAttr.count; i++) {
    vertex.fromBufferAttribute(posAttr, i)

    // Elongated asymmetric shard shape
    vertex.y *= 2.3 + (pseudoNoise(vertex.x * 4, vertex.y * 4, i) * 0.35)
    vertex.x *= 0.8 + (pseudoNoise(vertex.z * 4, i, vertex.y * 4) * 0.2)
    vertex.z *= 0.8 + (pseudoNoise(i, vertex.x * 4, vertex.z * 4) * 0.2)

    if (vertex.y > 0.1) vertex.y *= 1.3
    if (vertex.y < -0.1) vertex.y *= 1.25

    posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z)
  }

  geom.computeVertexNormals()
  return geom
}

function InstancedShards({ count = 80 }) {
  const meshRef = useRef()
  const groupRef = useRef()
  const geometry = useMemo(() => createCrystalGeometry(), [])

  // Glassy/crystalline PBR material: low roughness, clearcoat, strong specular flash, deep dark falloff
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#FF8539',
      emissive: '#1a0802',
      emissiveIntensity: 0.25,
      roughness: 0.14,
      metalness: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      ior: 1.7,
      flatShading: true, // Guarantees flat facet flashing
    })
  }, [])

  // Edge-weighted spawn distribution with center 50% exclusion mask
  const particles = useMemo(() => {
    const data = []
    const dummy = new THREE.Object3D()

    // 8 edge/corner zones for guaranteed framing without center occlusion
    const zones = [
      // Top-Left Corner
      { xMin: -7.5, xMax: -3.8, yMin: 1.8, yMax: 4.2 },
      // Top-Right Corner
      { xMin: 3.8, xMax: 7.5, yMin: 1.8, yMax: 4.2 },
      // Bottom-Left Corner
      { xMin: -7.5, xMax: -3.6, yMin: -4.2, yMax: -1.8 },
      // Bottom-Right Corner
      { xMin: 3.6, xMax: 7.5, yMin: -4.2, yMax: -1.8 },
      // Left Margin
      { xMin: -7.8, xMax: -4.8, yMin: -2.0, yMax: 2.0 },
      // Right Margin
      { xMin: 4.8, xMax: 7.8, yMin: -2.0, yMax: 2.0 },
      // Top Outer Edge
      { xMin: -4.0, xMax: 4.0, yMin: 3.2, yMax: 4.4 },
      // Bottom Outer Edge
      { xMin: -4.0, xMax: 4.0, yMin: -4.4, yMax: -3.2 },
    ]

    for (let i = 0; i < count; i++) {
      // Pick an edge zone
      const zone = zones[i % zones.length]

      const baseX = zone.xMin + Math.random() * (zone.xMax - zone.xMin)
      const baseY = zone.yMin + Math.random() * (zone.yMax - zone.yMin)
      const baseZ = -3.5 + Math.random() * 6.5 // Deep Z-range for parallax depth

      // Refined accent scale
      const s = 0.6 + Math.random() * 0.7
      const scale = [
        s * (0.8 + Math.random() * 0.4),
        s * (1.2 + Math.random() * 0.8),
        s * (0.8 + Math.random() * 0.4),
      ]

      // Independent tumbling rates (0.04 to 0.18 rad/s per axis)
      const rotSpeed = [
        (Math.random() - 0.5) * 0.22,
        (Math.random() - 0.5) * 0.28,
        (Math.random() - 0.5) * 0.2,
      ]

      const initialRot = [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ]

      data.push({
        baseX,
        baseY,
        baseZ,
        x: baseX,
        y: baseY,
        z: baseZ,
        scale,
        rotSpeed,
        rot: initialRot,
        seed: Math.random() * 100,
      })
    }
    return { data, dummy }
  }, [count])

  // Ambient idle motion loop (slow drift, independent tumbles, cursor parallax)
  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return

    const t = state.clock.elapsedTime
    const { data, dummy } = particles

    // Smooth subtle scene-level mouse parallax tilt
    const lerpFactor = 1 - Math.exp(-3.5 * delta)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.15,
      lerpFactor
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.12,
      lerpFactor
    )

    // Update each crystal instance
    for (let i = 0; i < count; i++) {
      const p = data[i]

      // 1. Independent tumble rotation per axis
      p.rot[0] += p.rotSpeed[0] * delta
      p.rot[1] += p.rotSpeed[1] * delta
      p.rot[2] += p.rotSpeed[2] * delta

      // 2. Gentle ambient drift (low magnitude, slow curl-noise)
      const drift = sampleDrift(p.baseX + p.seed, p.baseY, p.baseZ, t)

      p.x = p.baseX + drift.x
      p.y = p.baseY + drift.y
      p.z = p.baseZ + drift.z

      // 3. Update matrix
      dummy.position.set(p.x, p.y, p.z)
      dummy.rotation.set(p.rot[0], p.rot[1], p.rot[2])
      dummy.scale.set(p.scale[0], p.scale[1], p.scale[2])
      dummy.updateMatrix()

      meshRef.current.setMatrixAt(i, dummy.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
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
 * CrystalShardField: Full-bleed WebGL canvas particle field.
 * Edge-framed background layer (z-0) with center 50% exclusion for UI readability.
 */
export default function CrystalShardField() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45, near: 0.1, far: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full pointer-events-none"
      >
        {/* Exponential fog for depth fade into #0a0908 */}
        <fogExp2 attach="fog" args={['#0a0908', 0.055]} />

        {/* Low Ambient fill so unlit facets go near-black for high contrast */}
        <ambientLight intensity={0.35} color="#1f0f04" />

        {/* Key Light from upper-right (matches headline lighting) */}
        <directionalLight
          position={[6, 8, 5]}
          intensity={4.8}
          color="#fff4ea"
          castShadow
        />

        {/* Powerful Secondary Rim Light from opposite behind angle for facet flash */}
        <directionalLight
          position={[-8, -4, -5]}
          intensity={6.2}
          color="#FF8539"
        />

        {/* Corner fill lights for edge facet highlights */}
        <pointLight position={[-6, 4, 3]} intensity={2.5} color="#ff9248" distance={10} />
        <pointLight position={[6, -4, 3]} intensity={2.5} color="#ff9248" distance={10} />

        {/* 80 Instanced Shards distributed along edges/corners */}
        <InstancedShards count={80} />
      </Canvas>
    </div>
  )
}
