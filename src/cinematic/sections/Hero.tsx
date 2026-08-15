import { Suspense, lazy, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

gsap.registerPlugin(SplitText)

const HeroCanvas = lazy(() => import('../three/HeroCanvas'))

export default function Hero({ ready }: { ready: boolean }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!ready || !headingRef.current) return

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(['[data-fade]'], { opacity: 1, y: 0 })
        return
      }

      const split = new SplitText(headingRef.current, { type: 'chars,words', mask: 'chars' })
      const tl = gsap.timeline({ delay: 0.15 })
      tl.from(split.chars, {
        yPercent: 130,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.02,
      }).from(
        '[data-fade]',
        { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 },
        '-=0.5'
      )

      return () => split.revert()
    }, rootRef)

    return () => ctx.revert()
  }, [ready, reducedMotion])

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-70">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 20%, var(--cn-bg) 78%)' }}
      />

      <div className="relative z-10 text-center max-w-4xl">
        <p data-fade className="text-xs md:text-sm tracking-[0.3em] uppercase text-[var(--cn-muted)] mb-6">
          Full Stack Developer · Kathmandu, Nepal
        </p>

        <h1
          ref={headingRef}
          className="cn-display font-medium leading-[0.95] text-[clamp(2.75rem,9vw,7.5rem)] text-[var(--cn-text)]"
        >
          Kasam Thapa Magar
        </h1>

        <p data-fade className="mt-8 text-sm md:text-base text-[var(--cn-muted)] max-w-lg mx-auto leading-relaxed">
          I build AI-powered developer tools — RAG pipelines, backend systems, and interfaces
          people actually want to use.
        </p>

        <div data-fade className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#work"
            data-cursor
            className="text-xs uppercase tracking-widest px-6 py-3 rounded-full bg-[var(--cn-text)] text-[var(--cn-bg)] hover:bg-[var(--cn-accent)] transition-colors"
          >
            See the work
          </a>
          <a
            href="#contact"
            data-cursor
            className="text-xs uppercase tracking-widest px-6 py-3 rounded-full border border-[var(--cn-border)] text-[var(--cn-muted)] hover:text-[var(--cn-text)] hover:border-[var(--cn-accent)] transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div
        data-fade
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[var(--cn-faint)]"
      >
        <span>Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-[var(--cn-faint)] to-transparent" />
      </div>
    </section>
  )
}
