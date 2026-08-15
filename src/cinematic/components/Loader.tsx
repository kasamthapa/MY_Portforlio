import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      onDone()
      return
    }

    const counter = { value: 0 }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(panelRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
            onComplete: onDone,
          })
        },
      })
      tl.to(counter, {
        value: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => setPct(Math.round(counter.value)),
      })
    }, rootRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <div ref={rootRef} className="fixed inset-0 z-[90]">
      <div
        ref={panelRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[var(--cn-bg)]"
      >
        <p className="text-xs tracking-[0.3em] text-[var(--cn-muted)] uppercase">Kasam Thapa Magar</p>
        <p className="cn-display text-[clamp(4rem,14vw,9rem)] leading-none font-medium text-[var(--cn-text)] tabular-nums">
          {pct}
        </p>
        <div className="w-40 h-px bg-[var(--cn-border)] overflow-hidden">
          <div
            className="h-full bg-[var(--cn-accent)] transition-[width] duration-100"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
