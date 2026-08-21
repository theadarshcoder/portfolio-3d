import * as THREE from 'three'
import fs from 'fs'
import path from 'path'

function createCoffeeBeanGeometry() {
  const geom = new THREE.SphereGeometry(1.0, 48, 48)
  const pos = geom.attributes.position
  const uv = geom.attributes.uv
  const v = new THREE.Vector3()

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)

    // 1. Ellipsoid base proportions
    let x = v.x * 0.72
    let y = v.y * 1.35
    let z = v.z * 0.62

    // Slight tapered asymmetry along length
    const taper = 1.0 - (y * 0.08)
    x *= taper
    z *= taper

    // 2. Flatten the front face slightly
    if (z > 0) {
      z *= 0.85
    }

    // 3. Signature center crease / fissure along front (z > -0.1)
    const creaseOffset = Math.sin(y * 2.2) * 0.04
    const distFromCrease = Math.abs(x - creaseOffset)

    if (z > -0.1) {
      const creaseWidth = 0.22
      if (distFromCrease < creaseWidth) {
        // Deep indentation along the crease
        const depthFactor = Math.cos((distFromCrease / creaseWidth) * (Math.PI / 2))
        z -= Math.pow(depthFactor, 1.6) * 0.42

        // Pucker lips of the crease slightly
        const lipFactor = Math.sin((distFromCrease / creaseWidth) * Math.PI)
        z += lipFactor * 0.06
      }
    }

    // 4. Smooth organic curved back (convex dome)
    if (z < 0) {
      z *= 1.15
      const backRidge = Math.max(0, 1.0 - Math.abs(x) * 1.8)
      z -= backRidge * 0.08
    }

    pos.setXYZ(i, x, y, z)
  }

  geom.computeVertexNormals()
  return geom
}

// Convert BufferGeometry into a clean binary GLB file
function exportGeometryToGLB(geometry, outputPath) {
  const posAttr = geometry.attributes.position
  const normalAttr = geometry.attributes.normal
  const uvAttr = geometry.attributes.uv
  const indexAttr = geometry.index

  const numVertices = posAttr.count
  const numIndices = indexAttr ? indexAttr.count : 0

  // Pack buffer data
  const posBuffer = Buffer.from(posAttr.array.buffer, posAttr.array.byteOffset, posAttr.array.byteLength)
  const normBuffer = Buffer.from(normalAttr.array.buffer, normalAttr.array.byteOffset, normalAttr.array.byteLength)
  const uvBuffer = Buffer.from(uvAttr.array.buffer, uvAttr.array.byteOffset, uvAttr.array.byteLength)
  const indexBuffer = indexAttr ? Buffer.from(indexAttr.array.buffer, indexAttr.array.byteOffset, indexAttr.array.byteLength) : Buffer.alloc(0)

  // Align to 4 bytes
  function align4(buf) {
    const pad = (4 - (buf.length % 4)) % 4
    if (pad > 0) {
      return Buffer.concat([buf, Buffer.alloc(pad)])
    }
    return buf
  }

  const pBuf = align4(posBuffer)
  const nBuf = align4(normBuffer)
  const uBuf = align4(uvBuffer)
  const iBuf = align4(indexBuffer)

  const binBuffer = Buffer.concat([iBuf, pBuf, nBuf, uBuf])

  // Compute min/max for positions
  let min = [Infinity, Infinity, Infinity]
  let max = [-Infinity, -Infinity, -Infinity]
  for (let i = 0; i < numVertices; i++) {
    const x = posAttr.getX(i)
    const y = posAttr.getY(i)
    const z = posAttr.getZ(i)
    min[0] = Math.min(min[0], x); min[1] = Math.min(min[1], y); min[2] = Math.min(min[2], z)
    max[0] = Math.max(max[0], x); max[1] = Math.max(max[1], y); max[2] = Math.max(max[2], z)
  }

  const gltf = {
    asset: { version: '2.0', generator: 'ProceduralCoffeeBean' },
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0, name: 'CoffeeBean' }],
    meshes: [
      {
        name: 'CoffeeBeanMesh',
        primitives: [
          {
            attributes: {
              POSITION: 1,
              NORMAL: 2,
              TEXCOORD_0: 3,
            },
            indices: 0,
            material: 0,
          },
        ],
      },
    ],
    materials: [
      {
        name: 'RoastedCoffeeBean',
        pbrMetallicRoughness: {
          baseColorFactor: [0.18, 0.09, 0.04, 1.0], // Roasted dark coffee brown
          metallicFactor: 0.08,
          roughnessFactor: 0.3,
        },
      },
    ],
    accessors: [
      {
        bufferView: 0,
        byteOffset: 0,
        componentType: indexAttr.array instanceof Uint16Array ? 5123 : 5125,
        count: numIndices,
        type: 'SCALAR',
      },
      {
        bufferView: 1,
        byteOffset: 0,
        componentType: 5126,
        count: numVertices,
        type: 'VEC3',
        min: min,
        max: max,
      },
      {
        bufferView: 2,
        byteOffset: 0,
        componentType: 5126,
        count: numVertices,
        type: 'VEC3',
      },
      {
        bufferView: 3,
        byteOffset: 0,
        componentType: 5126,
        count: numVertices,
        type: 'VEC2',
      },
    ],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: indexBuffer.length, target: 34963 },
      { buffer: 0, byteOffset: iBuf.length, byteLength: posBuffer.length, target: 34962 },
      { buffer: 0, byteOffset: iBuf.length + pBuf.length, byteLength: normBuffer.length, target: 34962 },
      { buffer: 0, byteOffset: iBuf.length + pBuf.length + nBuf.length, byteLength: uvBuffer.length, target: 34962 },
    ],
    buffers: [{ byteLength: binBuffer.length }],
  }

  const jsonText = JSON.stringify(gltf)
  let jsonBuffer = Buffer.from(jsonText, 'utf8')
  // Align jsonBuffer to 4 bytes with spaces (0x20)
  const jsonPad = (4 - (jsonBuffer.length % 4)) % 4
  if (jsonPad > 0) {
    jsonBuffer = Buffer.concat([jsonBuffer, Buffer.from(' '.repeat(jsonPad), 'utf8')])
  }

  // GLB Header
  const totalByteLength = 12 + 8 + jsonBuffer.length + 8 + binBuffer.length
  const header = Buffer.alloc(12)
  header.writeUInt32LE(0x46546C67, 0) // 'glTF'
  header.writeUInt32LE(2, 4) // version 2
  header.writeUInt32LE(totalByteLength, 8)

  // JSON Chunk header
  const jsonChunkHeader = Buffer.alloc(8)
  jsonChunkHeader.writeUInt32LE(jsonBuffer.length, 0)
  jsonChunkHeader.writeUInt32LE(0x4E4F534A, 4) // 'JSON'

  // BIN Chunk header
  const binChunkHeader = Buffer.alloc(8)
  binChunkHeader.writeUInt32LE(binBuffer.length, 0)
  binChunkHeader.writeUInt32LE(0x004E4942, 4) // 'BIN\0'

  const glbBuffer = Buffer.concat([
    header,
    jsonChunkHeader,
    jsonBuffer,
    binChunkHeader,
    binBuffer,
  ])

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, glbBuffer)
  console.log('Successfully written GLB binary to', outputPath, 'Total size:', glbBuffer.length, 'bytes')
}

const geom = createCoffeeBeanGeometry()
exportGeometryToGLB(geom, path.resolve('public/models/coffee-bean.glb'))
