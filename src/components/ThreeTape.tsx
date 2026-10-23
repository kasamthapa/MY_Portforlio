import { useEffect, useRef } from 'react'
import type * as ThreeTypes from 'three'
import { gsap } from 'gsap'

function makeLabel(THREE: typeof import('three')) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const context = canvas.getContext('2d')
  if (!context) return new THREE.CanvasTexture(canvas)
  context.fillStyle = '#c9c2a8'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#171816'
  context.fillRect(18, 18, 988, 476)
  context.strokeStyle = 'rgba(221,216,194,.58)'
  context.lineWidth = 2
  context.strokeRect(39, 39, 946, 434)
  context.fillStyle = '#c9c2a8'
  context.font = '500 23px monospace'
  context.fillText('KASAM / THAPA MAGAR', 72, 94)
  context.textAlign = 'right'
  context.fillText('INDEPENDENT · KTM', 950, 94)
  context.textAlign = 'left'
  context.fillStyle = '#eee9d8'
  context.font = '400 104px Georgia, serif'
  context.fillText('Useful things.', 69, 245)
  context.fillStyle = '#beb79d'
  context.font = 'italic 70px Georgia, serif'
  context.fillText('Made with care.', 71, 335)
  context.strokeStyle = 'rgba(221,216,194,.4)'
  context.beginPath()
  context.moveTo(70, 383)
  context.lineTo(952, 383)
  context.stroke()
  context.font = '500 20px monospace'
  context.fillStyle = '#c9c2a8'
  context.fillText('CODE · EDUCATION · PEOPLE', 72, 425)
  context.textAlign = 'right'
  context.fillText('SIDE A / 2026', 950, 425)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

/** A small, custom VHS object: one tactile introduction to the portfolio's tape motif. */
export default function ThreeTape() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let cancelled = false
    let teardown: (() => void) | undefined
    const boot = async () => {
    const THREE = await import('three')
    if (cancelled) return
    let renderer: ThreeTypes.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      host.classList.add('tape-fallback')
      return
    }
    host.classList.add('is-ready')
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.18
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, .1, 100)
    camera.position.set(0, 0, 8.4)
    const ambient = new THREE.AmbientLight(0xe8e3d1, 2.0)
    const key = new THREE.DirectionalLight(0xf0dfb3, 3.2)
    key.position.set(-3, 5, 6)
    const rim = new THREE.DirectionalLight(0x9ea98f, 2.4)
    rim.position.set(3, -2, -4)
    scene.add(ambient, key, rim)

    const tape = new THREE.Group()
    const shellShape = new THREE.Shape()
    const w = 3.4, h = 2.18, radius = .12
    shellShape.moveTo(-w/2 + radius, -h/2)
    shellShape.lineTo(w/2 - radius, -h/2); shellShape.quadraticCurveTo(w/2, -h/2, w/2, -h/2 + radius)
    shellShape.lineTo(w/2, h/2 - radius); shellShape.quadraticCurveTo(w/2, h/2, w/2 - radius, h/2)
    shellShape.lineTo(-w/2 + radius, h/2); shellShape.quadraticCurveTo(-w/2, h/2, -w/2, h/2 - radius)
    shellShape.lineTo(-w/2, -h/2 + radius); shellShape.quadraticCurveTo(-w/2, -h/2, -w/2 + radius, -h/2)
    const shellGeo = new THREE.ExtrudeGeometry(shellShape, { depth: .34, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: .045, bevelThickness: .035 })
    shellGeo.translate(0, 0, -.17)
    const shell = new THREE.Mesh(shellGeo, new THREE.MeshStandardMaterial({ color: 0x171918, roughness: .32, metalness: .48 }))
    tape.add(shell)

    const edge = new THREE.Mesh(new THREE.BoxGeometry(3.08, 1.93, .012), new THREE.MeshStandardMaterial({ color: 0x383a34, roughness: .35, metalness: .28 }))
    edge.position.z = .19
    tape.add(edge)

    const label = new THREE.Mesh(new THREE.PlaneGeometry(2.55, 1.28), new THREE.MeshBasicMaterial({ map: makeLabel(THREE) }))
    label.position.set(0, .13, .203)
    tape.add(label)

    const reelMaterial = new THREE.MeshStandardMaterial({ color: 0x080909, roughness: .48, metalness: .24 })
    const hubMaterial = new THREE.MeshStandardMaterial({ color: 0xbdb69c, roughness: .35, metalness: .5 })
    const reels: ThreeTypes.Group[] = []
    for (const x of [-.79, .79]) {
      const reel = new THREE.Group()
      reel.position.set(x, -.61, .22)
      const outer = new THREE.Mesh(new THREE.CircleGeometry(.34, 48), reelMaterial)
      const ring = new THREE.Mesh(new THREE.RingGeometry(.2, .29, 48), new THREE.MeshStandardMaterial({ color: 0x5c5b50, roughness: .4, metalness: .45, side: THREE.DoubleSide }))
      ring.position.z = .008
      const hub = new THREE.Mesh(new THREE.CircleGeometry(.115, 32), hubMaterial)
      hub.position.z = .012
      reel.add(outer, ring, hub)
      for (let spoke = 0; spoke < 6; spoke++) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(.035, .15, .008), hubMaterial)
        bar.position.set(0, .205, .016)
        bar.rotation.z = spoke * Math.PI / 3
        reel.add(bar)
      }
      reels.push(reel)
      tape.add(reel)
    }

    const cassetteWindow = new THREE.Mesh(new THREE.BoxGeometry(1.48, .16, .018), new THREE.MeshStandardMaterial({ color: 0x292a26, roughness: .2, metalness: .32 }))
    cassetteWindow.position.set(0, -.61, .205)
    tape.add(cassetteWindow)
    const screws = new THREE.MeshStandardMaterial({ color: 0x77756b, roughness: .32, metalness: .68 })
    for (const x of [-1.48, 1.48]) for (const y of [-.91, .91]) {
      const screw = new THREE.Mesh(new THREE.CylinderGeometry(.035, .035, .012, 12), screws)
      screw.rotation.x = Math.PI / 2
      screw.position.set(x, y, .2)
      tape.add(screw)
    }

    const shadow = new THREE.Mesh(new THREE.CircleGeometry(2.15, 64), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .18, depthWrite: false }))
    shadow.position.set(.06, -1.17, -.3)
    shadow.scale.set(1.2, .32, 1)
    tape.add(shadow)
    tape.rotation.set(-.08, -.21, -.035)
    scene.add(tape)

    const resize = () => {
      const bounds = host.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      renderer.setSize(bounds.width, bounds.height, false)
      camera.aspect = bounds.width / bounds.height
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animation = gsap.timeline({ repeat: reducedMotion ? 0 : -1, yoyo: true, defaults: { ease: 'sine.inOut' } })
    const reelAnimations: gsap.core.Tween[] = []
    if (!reducedMotion) {
      animation.to(tape.position, { y: .08, duration: 2.8 }, 0).to(tape.rotation, { z: .025, y: .17, duration: 3.5 }, 0)
      reels.forEach((reel, i) => reelAnimations.push(gsap.to(reel.rotation, { z: Math.PI * 2, duration: 24 + i * 7, repeat: -1, ease: 'none' })))
    }
    const pointerMove = (event: PointerEvent) => {
      if (reducedMotion) return
      const bounds = host.getBoundingClientRect()
      gsap.to(tape.rotation, { x: -.08 + ((event.clientY - bounds.top) / bounds.height - .5) * .14, y: -.21 + ((event.clientX - bounds.left) / bounds.width - .5) * .28, duration: .8, ease: 'power3.out', overwrite: 'auto' })
    }
    host.addEventListener('pointermove', pointerMove, { passive: true })
    resize()
    let frame = 0
    let inView = false
    const render = () => {
      if (!inView || document.visibilityState !== 'visible') return
      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      animation.paused(!inView || reducedMotion)
      reelAnimations.forEach((tween) => tween.paused(!inView || reducedMotion))
      if (inView) {
        renderer.render(scene, camera)
        if (!reducedMotion && !frame && document.visibilityState === 'visible') frame = requestAnimationFrame(render)
      } else {
        cancelAnimationFrame(frame)
        frame = 0
      }
    })
    visibility.observe(host)
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') { cancelAnimationFrame(frame); frame = 0 }
      else if (inView && !reducedMotion && !frame) frame = requestAnimationFrame(render)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    teardown = () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      visibility.disconnect()
      animation.kill()
      reelAnimations.forEach((tween) => tween.kill())
      document.removeEventListener('visibilitychange', onVisibilityChange)
      host.removeEventListener('pointermove', pointerMove)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((item) => { if ('map' in item && item.map) item.map.dispose(); item.dispose() })
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
    }
    const timer = window.setTimeout(() => { void boot() }, 90)
    return () => { cancelled = true; window.clearTimeout(timer); teardown?.() }
  }, [])

  return <div ref={hostRef} className="three-tape" role="img" aria-label="A custom three-dimensional VHS tape labelled Useful things. Made with care." />
}
