import React from 'react'

export default function StudioLighting() {
  return (
    <>
      {/* Ambient warm fill */}
      <ambientLight intensity={1.6} color="#1c1008" />

      {/* Main Top-Right Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={3.8}
        color="#fff4eb"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Powerful #FF8539 Orange Rim Light (Left/Back) */}
      <directionalLight
        position={[-8, 4, -4]}
        intensity={5.5}
        color="#FF8539"
      />

      {/* Secondary #FF8539 Orange Rim Light (Right/Bottom) */}
      <directionalLight
        position={[8, -5, -4]}
        intensity={4.5}
        color="#FF8539"
      />

      {/* Front-Right Specular Fill highlighting laptop keyboard deck and trackpad */}
      <pointLight position={[1.5, 1.2, 3.5]} intensity={3.0} color="#ffcaa5" distance={10} />

      {/* Top Specular Accent */}
      <pointLight position={[0, 8, 2]} intensity={2.5} color="#FF8539" distance={15} />

      {/* Bottom Uplight Accent */}
      <pointLight position={[0, -6, 3]} intensity={2.0} color="#FF8539" distance={12} />
    </>
  )
}
