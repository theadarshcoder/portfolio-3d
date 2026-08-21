import React, { useRef, useEffect, useCallback, useState } from 'react'
import * as THREE from 'three'

/* ─────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────── */
const lerpRGB = (from, to, t) => {
  const p = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]
  const [ar,ag,ab] = p(from), [br,bg,bb] = p(to)
  return `rgb(${Math.round(ar+(br-ar)*t)},${Math.round(ag+(bg-ag)*t)},${Math.round(ab+(bb-ab)*t)})`
}
const smoothstep = t => t*t*(3-2*t)
const clamp = (v,lo,hi) => Math.max(lo, Math.min(hi, v))

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const PROJECTS = [
  {
    id:'vision-exam', number:'01', category:'SECURE CLIENT RUNTIME',
    title:'Vision Exam Browser',
    name:'Adarsh K.', role:'CS Engineer',
    quote:'"Built a sandboxed OS-level browser that catches cheating in real-time. Webcam gaze, audio anomalies — zero false negatives."',
    accentWords:['zero false negatives'],
    stars:5, rating:'5/5',
    link:'https://github.com', accent:'#e8843c',
    image:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
  },
  {
    id:'exploro', number:'02', category:'SPATIAL INTELLIGENCE',
    title:'Exploro Travel App',
    name:'Adarsh K.', role:'React Native Dev',
    quote:'"Multi-modal itinerary engine. Computes 4-city optimal routes in under 30ms, with offline vector maps cached locally."',
    accentWords:['under 30ms'],
    stars:5, rating:'5/5',
    link:'https://github.com', accent:'#3ce8a0',
    image:'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
  },
  {
    id:'examvault', number:'03', category:'DISTRIBUTED ARCHIVAL',
    title:'ExamVault Archive',
    name:'Adarsh K.', role:'Full-Stack',
    quote:'"10,000+ students. Millions of academic queries. Full-text fuzzy indexing with 38ms p99 latency at the edge."',
    accentWords:['38ms p99 latency'],
    stars:5, rating:'5/5',
    link:'https://github.com', accent:'#a78bfa',
    image:'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
  },
  {
    id:'pgmpy', number:'04', category:'OPEN-SOURCE ML SYSTEMS',
    title:'pgmpy Bayesian Engine',
    name:'Adarsh K.', role:'OSS Contributor',
    quote:'"18.4× faster Bayesian inference. Vectorized Rust FFI kernels replacing Python loops — I made pgmpy actually fast."',
    accentWords:['18.4× faster'],
    stars:5, rating:'5/5',
    link:'https://github.com', accent:'#e8843c',
    image:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  },
]

/* ─────────────────────────────────────────────
   ACCENT QUOTE
   ───────────────────────────────────────────── */
function RichQuote({ text, accentWords, accent }) {
  let parts = [{ str: text, isAccent: false }]
  accentWords.forEach(word => {
    const next = []
    parts.forEach(part => {
      if (part.isAccent) { next.push(part); return }
      const idx = part.str.toLowerCase().indexOf(word.toLowerCase())
      if (idx === -1) { next.push(part); return }
      if (idx > 0) next.push({ str: part.str.slice(0, idx), isAccent: false })
      next.push({ str: part.str.slice(idx, idx + word.length), isAccent: true })
      if (idx + word.length < part.str.length) next.push({ str: part.str.slice(idx + word.length), isAccent: false })
    })
    parts = next
  })
  return <span>{parts.map((p,i) => p.isAccent ? <span key={i} style={{ color:accent }}>{p.str}</span> : <span key={i}>{p.str}</span>)}</span>
}

/* ─────────────────────────────────────────────
   VISUAL CARDS
   ───────────────────────────────────────────── */
function TelemetryCard() {
  return (
    <div style={{ fontFamily:'monospace', fontSize:11, lineHeight:1.8 }}>
      <div style={{ color:'#e8843c', letterSpacing:2, fontSize:10, marginBottom:8 }}>● ACTIVE SECURE LOCKDOWN</div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
        <span style={{ color:'#8c8074' }}>PROCESS INTEGRITY</span><span style={{ color:'#3ce87c' }}>LOCKED // 0 LEAKS</span>
      </div>
      <div style={{ height:3, background:'#1a1208', borderRadius:2, marginBottom:10, overflow:'hidden' }}>
        <div style={{ height:'100%', width:'100%', background:'linear-gradient(90deg,#e8843c,#3ce87c)' }} />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
        {[['GAZE VECTOR','CENTER (0.98)'],['AUDIO LATENCY','14ms STREAM']].map(([l,v]) => (
          <div key={l} style={{ padding:'6px 8px', background:'rgba(255,255,255,0.04)', borderRadius:4 }}>
            <div style={{ color:'#8c8074', fontSize:9, marginBottom:1 }}>{l}</div>
            <div style={{ color:'#f3ede2', fontWeight:700 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
function MapCard() {
  const dots = Array.from({length:16},(_,i)=>({x:8+(i*43)%82,y:10+(i*53)%75,s:1.5+(i%3)}))
  return (
    <div style={{ fontFamily:'monospace', fontSize:11 }}>
      <div style={{ color:'#3ce8a0', letterSpacing:2, fontSize:10, marginBottom:8 }}>⊕ GEO-SPATIAL ROUTING</div>
      <div style={{ position:'relative', height:64, background:'rgba(60,232,160,0.04)', borderRadius:4, marginBottom:8, overflow:'hidden' }}>
        {dots.map((d,i) => <div key={i} style={{ position:'absolute', left:`${d.x}%`, top:`${d.y}%`, width:d.s, height:d.s, borderRadius:'50%', background:'#3ce8a0', opacity:0.5 }} />)}
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} viewBox="0 0 100 64">
          <polyline points="10,52 28,32 52,20 82,10" fill="none" stroke="#3ce8a0" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.65" />
        </svg>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:'#8c8074' }}>SFO→NRT→SIN→LHR</span><span style={{ color:'#e8843c' }}>-34% EMISSIONS</span></div>
    </div>
  )
}
function ArchiveCard() {
  return (
    <div style={{ fontFamily:'monospace', fontSize:11 }}>
      <div style={{ color:'#a78bfa', letterSpacing:2, fontSize:10, marginBottom:8 }}>≡ DISTRIBUTED SEARCH</div>
      <div style={{ marginBottom:8 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}><span style={{ color:'#8c8074' }}>SPEED p99</span><span style={{ color:'#e8843c' }}>38ms</span></div>
        <div style={{ height:3, background:'#1a1208', borderRadius:2, overflow:'hidden' }}><div style={{ height:'100%', width:'74%', background:'#e8843c' }} /></div>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ color:'#8c8074' }}>STUDENTS SERVED</span><span style={{ color:'#f3ede2', fontWeight:700 }}>10,482</span></div>
    </div>
  )
}
function TerminalCard() {
  return (
    <div style={{ fontFamily:'monospace', fontSize:11 }}>
      <div style={{ color:'#3ce87c', letterSpacing:2, fontSize:10, marginBottom:8 }}>$ PYO3 VECTORIZED KERNEL</div>
      <div style={{ padding:'8px 10px', background:'rgba(0,0,0,0.45)', borderRadius:4, lineHeight:1.9 }}>
        <div><span style={{ color:'#8c8074' }}>$ </span><span style={{ color:'#f3ede2' }}>cargo bench --bench inference</span></div>
        <div><span style={{ color:'#8c8074' }}>&gt; </span><span style={{ color:'#3ce87c' }}>Python: 1,842ms</span></div>
        <div><span style={{ color:'#8c8074' }}>&gt; </span><span style={{ color:'#e8843c' }}>Rust:   100ms</span></div>
        <div style={{ marginTop:4, color:'#f3ede2', fontWeight:800 }}>SPEEDUP: 18.4×</div>
      </div>
    </div>
  )
}
const VISUAL_MAP = { telemetry:TelemetryCard, map:MapCard, archive:ArchiveCard, terminal:TerminalCard }

/* ─────────────────────────────────────────────
   HIGH-QUALITY INTERACTIVE 3D COIN — Three.js
   ───────────────────────────────────────────── */
function useCoinScene(canvasRef) {
  const scrollDataRef = useRef({ progress: 0, scale: 1.0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = 380, H = 380
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H, false)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.45
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, W / H, 0.1, 100)
    camera.position.set(0, 0, 4.3)

    /* ─── VIBRANT STUDIO LIGHTING ─── */
    scene.add(new THREE.AmbientLight(0x5c381e, 1.4))

    const key = new THREE.DirectionalLight(0xfff0d0, 5.2)
    key.position.set(2, 5, 5)
    scene.add(key)

    const fill = new THREE.PointLight(0xff9933, 4.0, 20)
    fill.position.set(-4, -2, 4)
    scene.add(fill)

    const rim = new THREE.PointLight(0xffd599, 3.5, 15)
    rim.position.set(4, -3, 3)
    scene.add(rim)

    const topLight = new THREE.PointLight(0xffeedd, 3.2, 12)
    topLight.position.set(0, 4, 3)
    scene.add(topLight)

    /* ─── HIGH-CONTRAST TACTILE TEXTURE ─── */
    const SZ = 1024
    const tc = document.createElement('canvas')
    tc.width = SZ; tc.height = SZ
    const cx = tc.getContext('2d')

    // Rich metallic gold gradient
    const base = cx.createRadialGradient(512, 512, 0, 512, 512, 512)
    base.addColorStop(0,   '#f8d88c')
    base.addColorStop(0.3, '#dfab48')
    base.addColorStop(0.65,'#c48c2c')
    base.addColorStop(0.85,'#9c6518')
    base.addColorStop(1,   '#5c340c')
    cx.fillStyle = base
    cx.fillRect(0, 0, SZ, SZ)

    // Outer notched gear teeth (makes scroll rotation immediately noticeable)
    cx.save()
    cx.translate(512, 512)
    for (let i = 0; i < 72; i++) {
      const angle = (i * 360 / 72) * Math.PI / 180
      cx.beginPath()
      cx.arc(0, 0, 485, angle - 0.02, angle + 0.02)
      cx.lineWidth = 18
      cx.strokeStyle = i % 2 === 0 ? 'rgba(30,15,5,0.75)' : 'rgba(255,230,150,0.6)'
      cx.stroke()
    }

    // Outer dashed precision border
    cx.beginPath()
    cx.arc(0, 0, 460, 0, Math.PI * 2)
    cx.setLineDash([8, 6])
    cx.lineWidth = 3
    cx.strokeStyle = 'rgba(20,10,0,0.65)'
    cx.stroke()
    cx.setLineDash([])

    // Quadrant dividers & degree angle markings
    for (let deg = 0; deg < 360; deg += 45) {
      const rad = deg * Math.PI / 180
      cx.beginPath()
      cx.moveTo(Math.cos(rad) * 90, Math.sin(rad) * 90)
      cx.lineTo(Math.cos(rad) * 440, Math.sin(rad) * 440)
      cx.lineWidth = deg % 90 === 0 ? 2.5 : 1
      cx.strokeStyle = deg % 90 === 0 ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.18)'
      cx.stroke()

      if (deg % 90 === 0) {
        cx.save()
        cx.translate(Math.cos(rad) * 415, Math.sin(rad) * 415)
        cx.rotate(rad + Math.PI / 2)
        cx.fillStyle = 'rgba(40,20,5,0.75)'
        cx.font = 'bold 16px monospace'
        cx.textAlign = 'center'
        cx.fillText(`${deg}°`, 0, 0)
        cx.restore()
      }
    }

    // Concentric machined grooves
    for (let r = 80; r < 440; r += 24) {
      cx.beginPath()
      cx.arc(0, 0, r, 0, Math.PI * 2)
      cx.strokeStyle = r % 72 === 0 ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.12)'
      cx.lineWidth = r % 72 === 0 ? 2 : 0.8
      cx.stroke()
    }

    // Radial brushed metallic streaks
    for (let a = 0; a < 360; a += 1.5) {
      const rad = a * Math.PI / 180
      cx.beginPath()
      cx.moveTo(Math.cos(rad) * 85, Math.sin(rad) * 85)
      cx.lineTo(Math.cos(rad) * 450, Math.sin(rad) * 450)
      cx.strokeStyle = a % 3 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'
      cx.lineWidth = 0.5
      cx.stroke()
    }

    // Circular Arc Text
    cx.fillStyle = 'rgba(50,25,5,0.85)'
    cx.font = '900 22px monospace'
    cx.textAlign = 'center'
    const text = '★ ADARSH SHARMA • SYSTEM ARCHITECT • CORE 2026 ★'
    const charAngle = (Math.PI * 1.6) / text.length
    for (let i = 0; i < text.length; i++) {
      const theta = -Math.PI * 0.8 + i * charAngle
      cx.save()
      cx.translate(Math.cos(theta) * 310, Math.sin(theta) * 310)
      cx.rotate(theta + Math.PI / 2)
      cx.fillText(text[i], 0, 0)
      cx.restore()
    }

    // Center circular badge & monogram
    const badge = cx.createRadialGradient(0, 0, 0, 0, 0, 140)
    badge.addColorStop(0,   'rgba(255,240,180,0.7)')
    badge.addColorStop(0.7, 'rgba(210,150,50,0.4)')
    badge.addColorStop(1,   'rgba(60,30,5,0.85)')
    cx.fillStyle = badge
    cx.beginPath()
    cx.arc(0, 0, 130, 0, Math.PI * 2)
    cx.fill()
    cx.strokeStyle = 'rgba(255,255,255,0.3)'
    cx.lineWidth = 3
    cx.stroke()

    cx.fillStyle = 'rgba(40,18,5,0.9)'
    cx.font = 'bold 100px Georgia, serif'
    cx.textBaseline = 'middle'
    cx.fillText('A', 0, 8)
    cx.restore()

    // Fine organic noise
    const imgData = cx.getImageData(0, 0, SZ, SZ)
    const d = imgData.data
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * 18
      d[i]   = Math.max(0, Math.min(255, d[i] + n))
      d[i+1] = Math.max(0, Math.min(255, d[i+1] + n * 0.8))
      d[i+2] = Math.max(0, Math.min(255, d[i+2] + n * 0.4))
    }
    cx.putImageData(imgData, 0, 0)

    const texture = new THREE.CanvasTexture(tc)
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

    /* Normal Map for bevel & 3D micro-depth */
    const nm = document.createElement('canvas')
    nm.width = 512; nm.height = 512
    const nc = nm.getContext('2d')
    nc.fillStyle = '#8080ff'
    nc.fillRect(0, 0, 512, 512)
    nc.save(); nc.translate(256, 256)
    for (let r2 = 20; r2 < 245; r2 += 16) {
      nc.beginPath(); nc.arc(0, 0, r2, 0, Math.PI * 2)
      nc.strokeStyle = 'rgba(120,120,255,0.45)'; nc.lineWidth = 1.4; nc.stroke()
    }
    nc.restore()
    const normalMap = new THREE.CanvasTexture(nm)

    /* ─── COIN GEOMETRY ─── */
    const profile = []
    const R = 1.05, T = 0.12, B = 0.05
    profile.push(new THREE.Vector2(0.01,    -(T + B)))
    profile.push(new THREE.Vector2(R - B,   -(T + B)))
    profile.push(new THREE.Vector2(R,       -T))
    profile.push(new THREE.Vector2(R,        T))
    profile.push(new THREE.Vector2(R - B,    T + B))
    profile.push(new THREE.Vector2(0.01,     T + B))

    const geo = new THREE.LatheGeometry(profile, 128)
    geo.computeVertexNormals()

    const mat = new THREE.MeshStandardMaterial({
      map: texture,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(0.5, 0.5),
      metalness: 0.76,
      roughness: 0.28,
    })

    const coin = new THREE.Mesh(geo, mat)
    coin.castShadow = true
    coin.receiveShadow = true

    const group = new THREE.Group()
    group.add(coin)
    scene.add(group)

    /* ─── SCROLL-DRIVEN ANIMATION LOOP (CENTERED & SYNCHRONIZED ZOOM) ─── */
    let currentProgress = 0, currentScale = 1.0, alive = true
    const loop = () => {
      if (!alive) return
      requestAnimationFrame(loop)

      const target = scrollDataRef.current
      currentProgress += (target.progress - currentProgress) * 0.08
      currentScale += (target.scale - currentScale) * 0.08

      // Locked in dead center of screen
      group.position.set(0, 0, 0)
      group.rotation.set(1.05, 0, 0)
      group.scale.set(currentScale, currentScale, currentScale)

      // Continuous axial rotation tied to scroll
      coin.rotation.y = currentProgress * Math.PI * 4

      renderer.render(scene, camera)
    }
    loop()

    return () => {
      alive = false
      renderer.dispose()
    }
  }, [canvasRef])

  return scrollDataRef
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
export default function Section6Carousel() {
  const sectionRef    = useRef(null)
  const canvasRef     = useRef(null)
  const leftRefs      = useRef([])
  const rightRefs     = useRef([])
  const rafRef        = useRef(null)
  const scrollDataRef = useCoinScene(canvasRef)
  const [coinVisible, setCoinVisible] = useState(false)

  const frame = useCallback(() => {
    rafRef.current = requestAnimationFrame(frame)
    const section = sectionRef.current; if (!section) return
    const rect = section.getBoundingClientRect()
    const vh = window.innerHeight

    // Show coin only while section 6 is visible in viewport
    const inView = rect.top < vh && rect.bottom > 0
    setCoinVisible(inView)

    const progress = clamp(-rect.top / (rect.height - vh), 0, 1)
    const vcenter = vh / 2, falloff = vh * 0.40
    let maxCoinScale = 0.76

    PROJECTS.forEach((proj, i) => {
      const left = leftRefs.current[i], right = rightRefs.current[i]
      if (!left || !right) return
      const r = left.getBoundingClientRect()
      const cy = r.top + r.height / 2
      const raw = clamp(1 - Math.abs(cy - vcenter) / falloff, 0, 1)
      const t = smoothstep(raw)

      left.style.opacity  = (0.45 + t * 0.55).toFixed(3)
      right.style.opacity = (0.55 + t * 0.45).toFixed(3)

      const title = left.querySelector('.pj-title')
      const desc  = left.querySelector('.pj-desc')
      const cat   = left.querySelector('.pj-cat')
      const num   = left.querySelector('.pj-num')

      if (title) title.style.color = lerpRGB('#9c8e82','#ffffff',t)
      if (desc)  desc.style.color  = lerpRGB('#6c6056','#d8cec2',t)
      if (cat)   cat.style.color   = lerpRGB('#6c6056',proj.accent,t)
      if (num)   num.style.color   = lerpRGB('#5c5046',proj.accent,t)

      const enterRaw = cy <= vcenter ? 1 : clamp(1 - (cy - vcenter) / falloff, 0, 1)
      const enterT = smoothstep(enterRaw)
      const imgScale = 0.76 + enterT * 0.24
      const imgInner = right.querySelector('.img-inner')
      if (imgInner) {
        imgInner.style.transform = `scale(${imgScale.toFixed(4)})`
        const gray = (0.35 * (1 - t)).toFixed(3)
        const bright = (0.82 + t * 0.28).toFixed(3)
        const contrast = (1.04 + t * 0.16).toFixed(3)
        imgInner.style.filter = `grayscale(${gray}) brightness(${bright}) contrast(${contrast})`
      }

      if (t > 0.05) maxCoinScale = Math.max(maxCoinScale, 0.76 + t * 0.24)

      if (t > 0.65) {
        const b = (t - 0.65) / 0.35
        if (title) title.style.textShadow = `0 0 ${(b*24).toFixed(1)}px rgba(232,132,60,${(b*0.55).toFixed(2)}),0 0 ${(b*48).toFixed(1)}px rgba(232,132,60,${(b*0.22).toFixed(2)})`
      } else {
        if (title) title.style.textShadow = 'none'
      }
    })

    scrollDataRef.current = { progress, scale: maxCoinScale }
  }, [scrollDataRef, setCoinVisible])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [frame])

  const COL_LEFT = '30vw'
  const COL_CENTER = '40vw'
  const COL_RIGHT = '30vw'
  const ROW_H = '46vh'

  return (
    <>
      {/* ── COIN: position:fixed — always exactly centred in the viewport.
          Fades in/out based on Section 6 visibility so it never bleeds into other sections. ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 380,
          height: 380,
          pointerEvents: 'none',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: coinVisible ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <div style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(255,160,50,0.22) 0%, rgba(200,100,20,0.10) 35%, transparent 70%)',
          filter: 'blur(32px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(255,180,60,0.30) 0%, transparent 60%)',
          filter: 'blur(16px)',
          pointerEvents: 'none',
        }} />
        <canvas
          ref={canvasRef}
          width={380}
          height={380}
          style={{
            width: 380,
            height: 380,
            display: 'block',
            position: 'relative',
            zIndex: 2,
            filter: 'drop-shadow(0 24px 48px rgba(255,140,40,0.25)) drop-shadow(0 8px 20px rgba(0,0,0,0.8))',
          }}
        />
      </div>

      <section
        ref={sectionRef}
        id="section-6"
        style={{ background: '#0d0806', position: 'relative', width: '100%' }}
      >
      {/* ── Section header — edge to edge ── */}
      <div style={{
        display:'flex', alignItems:'center', gap:10,
        padding:'14px 3vw',
        borderBottom:'1px solid rgba(243,237,226,0.07)',
      }}>
        <span style={{ fontFamily:'monospace', fontSize:10, color:'#e8843c', letterSpacing:3 }}>06</span>
        <span style={{ width:24, height:1, background:'#e8843c', display:'inline-block' }} />
        <span style={{ fontFamily:'monospace', fontSize:10, color:'#5a504a', letterSpacing:3 }}>PROJECT SHOWCASE ROWS</span>
        <span style={{ marginLeft:'auto', fontFamily:'monospace', fontSize:10, color:'#2e2520', letterSpacing:2 }}>SCROLL-DRIVEN 3D CORE</span>
      </div>

      {/*
        Layout strategy:
        - Each project = one full-width div (natural full-width dotted border)
        - Inside each: 3-column CSS grid (left | center-spacer | right)
        - Coin = absolute overlay + inner sticky, visually centered over center-spacer column
      */}

      {/* ── Project rows ── */}
      {PROJECTS.map((proj, i) => {
        const Visual = VISUAL_MAP[proj.visual]
        return (
          <div
            key={proj.id}
            style={{
              borderTop: '1px dashed rgba(243,237,226,0.18)',
              display: 'grid',
              gridTemplateColumns: `${COL_LEFT} ${COL_CENTER} ${COL_RIGHT}`,
              width: '100%',
            }}
          >
            {/* ── Label sub-row (number + category) ── */}
            <div style={{ gridColumn:'1/-1', display:'grid', gridTemplateColumns:`${COL_LEFT} ${COL_CENTER} ${COL_RIGHT}` }}>
              <div style={{ padding:'7px 3vw', display:'flex', alignItems:'center', gap:8 }}>
                <span
                  className="pj-num"
                  style={{ fontFamily:'monospace', fontSize:10, color:'#3a2f28', fontWeight:700, transition:'color 0.05s' }}
                >
                  {proj.number}
                </span>
                <span
                  className="pj-cat"
                  style={{ fontFamily:'monospace', fontSize:10, color:'#4a3f38', letterSpacing:2, transition:'color 0.05s' }}
                >
                  {proj.category}
                </span>
              </div>
              <div />
              <div />
            </div>

            {/* ── LEFT content — compact: stars + quote + name at bottom ── */}
            <div
              ref={el => { leftRefs.current[i] = el }}
              style={{
                gridColumn:1, height:ROW_H, padding:'12px 3vw 18px',
                display:'flex', flexDirection:'column',
                opacity:0.45, boxSizing:'border-box',
              }}
            >
              {/* Stars */}
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                <div style={{ display:'flex', gap:2 }}>
                  {Array.from({length:5}).map((_,si) => (
                    <span key={si} style={{ color: si < proj.stars ? '#e8843c' : '#3a2f28', fontSize:12 }}>★</span>
                  ))}
                </div>
                <span style={{ fontFamily:'monospace', fontSize:10, color:'#5a504a' }}>[{proj.rating}]</span>
              </div>

              {/* Quote — bold display typography */}
              <p className="pj-title" style={{
                fontSize:'clamp(15px, 1.55vw, 21px)', fontWeight:700, lineHeight:1.35,
                margin:0, color:'#9c8e82', flex:1,
                transition:'color 0.05s, text-shadow 0.05s',
              }}>
                <RichQuote text={proj.quote} accentWords={proj.accentWords} accent={proj.accent} />
              </p>

              {/* Name + role pushed to bottom */}
              <div style={{ marginTop:10 }}>
                <div className="pj-desc" style={{ fontSize:11, fontWeight:700, color:'#6c6056', letterSpacing:0.3, transition:'color 0.05s' }}>{proj.name}</div>
                <div style={{ fontSize:10, color:'#5c5046', fontFamily:'monospace', letterSpacing:1 }}>{proj.role}</div>
              </div>
            </div>

            {/* ── CENTER spacer — coin floats here via overlay ── */}
            <div style={{ gridColumn:2, height:ROW_H }} />

            {/* ── RIGHT — framed image matching reference aspect ratio ── */}
            <div
              ref={el => { rightRefs.current[i] = el }}
              style={{
                gridColumn:3, height:ROW_H,
                padding:'12px 3vw 18px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                boxSizing:'border-box',
                opacity:0.55,
                transition:'opacity 0.05s',
              }}
            >
              <div
                style={{
                  width:'100%',
                  maxWidth:'420px',
                  aspectRatio:'16 / 10',
                  maxHeight:'90%',
                  position:'relative',
                  overflow:'hidden',
                  borderRadius:'4px',
                  background:'#1c130c',
                }}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  className="img-inner"
                  style={{
                    width:'100%',
                    height:'100%',
                    objectFit:'cover',
                    display:'block',
                    transform:'scale(0.76)',
                    transformOrigin:'center center',
                    filter:'grayscale(0.35) brightness(0.82) contrast(1.04)',
                    transition:'filter 0.05s',
                  }}
                  onError={(e) => {
                    // Fallback to high quality unsplash photo if any network issue
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80'
                  }}
                />
              </div>
            </div>
          </div>
        )
      })}

      {/* ── Closing bottom line ── */}
      <div style={{ borderTop:'1px dashed rgba(243,237,226,0.20)' }} />
    </section>
  </>
  )
}

