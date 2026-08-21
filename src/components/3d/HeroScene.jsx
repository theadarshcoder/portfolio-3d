import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import StudioLighting from './StudioLighting'
import LaptopModel from './LaptopModel'

/**
 * HeroScene: Persistent full-page 3D scene container.
 * Houses the persistent 3D Laptop artifact across the entire page flow.
 */
export default function HeroScene() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-20 overflow-hidden">
      <Canvas
        camera={{
          position: [0, 0, 5.8],
          fov: 40,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]} // Performance: Cap at 2 to protect high-DPI and mobile devices
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full pointer-events-auto"
      >
        <Suspense fallback={null}>
          <StudioLighting />
          <LaptopModel mouseParallaxStrength={0.25} />
        </Suspense>
      </Canvas>
    </div>
  )
}
