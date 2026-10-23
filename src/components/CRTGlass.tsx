import { useEffect, useRef } from 'react'
import type * as ThreeTypes from 'three'

/** A restrained phosphor field over the portfolio's glass; content stays DOM and readable. */
export default function CRTGlass() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cancelled = false
    let teardown: (() => void) | undefined
    const boot = async () => {
    const THREE = await import('three')
    if (cancelled) return
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: ThreeTypes.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' })
    } catch {
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const geometry = new THREE.PlaneGeometry(2, 2)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uPointer: { value: new THREE.Vector2(.5, .5) },
        uMotion: { value: reducedMotion ? 0 : 1 },
      },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.0); }`,
      fragmentShader: `
        precision mediump float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uPointer;
        uniform float uMotion;
        float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123); }
        void main(){
          vec2 uv=vUv;
          vec2 curved=uv-0.5;
          float edge=dot(curved,curved);
          float vignette=1.0-smoothstep(0.12,0.52,edge);
          float scan=0.5+0.5*sin(uv.y*uResolution.y*3.14159);
          float pixel=0.5+0.5*sin(gl_FragCoord.x*3.14159);
          float grain=hash(floor(gl_FragCoord.xy)+floor(uTime*19.0))-0.5;
          float beamY=fract(uTime*0.035);
          float beam=(1.0-smoothstep(0.0,0.009,abs(uv.y-beamY)))*uMotion;
          float glow=exp(-length((uv-uPointer)*vec2(1.0,1.55))*5.0);
          float alpha=(0.012+scan*0.012+pixel*0.004+beam*0.032+glow*0.012+grain*0.004)*vignette;
          vec3 phosphor=vec3(0.79,0.77,0.68)+grain*0.08;
          gl_FragColor=vec4(phosphor,clamp(alpha,0.0,0.09));
        }
      `,
    })
    scene.add(new THREE.Mesh(geometry, material))
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace

    let frame = 0
    let inView = true
    const resize = () => {
      const bounds = canvas.parentElement?.getBoundingClientRect()
      if (!bounds) return
      renderer.setSize(Math.max(1, bounds.width), Math.max(1, bounds.height), false)
      material.uniforms.uResolution.value.set(bounds.width, bounds.height)
      if (inView) renderer.render(scene, camera)
    }
    const tick = (time: number) => {
      material.uniforms.uTime.value = time * .001
      if (inView && document.visibilityState === 'visible') renderer.render(scene, camera)
      if (!reducedMotion && inView && document.visibilityState === 'visible') frame = window.requestAnimationFrame(tick)
    }
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') { window.cancelAnimationFrame(frame); frame = 0 }
      else if (inView && !reducedMotion && !frame) frame = window.requestAnimationFrame(tick)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    const observer = new ResizeObserver(resize)
    if (canvas.parentElement) observer.observe(canvas.parentElement)
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) {
        renderer.render(scene, camera)
        if (!reducedMotion && !frame) frame = window.requestAnimationFrame(tick)
      } else {
        window.cancelAnimationFrame(frame)
        frame = 0
      }
    })
    if (canvas.parentElement) visibility.observe(canvas.parentElement)
    const pointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      material.uniforms.uPointer.value.set((event.clientX - bounds.left) / bounds.width, 1 - (event.clientY - bounds.top) / bounds.height)
    }
    canvas.parentElement?.addEventListener('pointermove', pointer, { passive: true })
    resize()
    if (!reducedMotion) frame = window.requestAnimationFrame(tick)

    teardown = () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      visibility.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      canvas.parentElement?.removeEventListener('pointermove', pointer)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
    }
    const timer = window.setTimeout(() => { void boot() }, 140)
    return () => { cancelled = true; window.clearTimeout(timer); teardown?.() }
  }, [])

  return <canvas ref={canvasRef} className="crt-glass" aria-hidden="true" />
}
