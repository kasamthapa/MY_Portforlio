import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/** Custom magnetic cursor: a tight dot plus a lagging ring that expands over anything with [data-cursor]. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' })
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' })

    function onMove(e: MouseEvent) {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest('[data-cursor]')
      ring?.classList.toggle('is-active', !!target)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cn-cursor-dot hidden md:block" aria-hidden="true" />
      <div ref={ringRef} className="cn-cursor-ring hidden md:block" aria-hidden="true" />
    </>
  )
}
