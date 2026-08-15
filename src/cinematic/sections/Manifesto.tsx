import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger, SplitText)

const TEXT =
  "I don't chase tutorials. I pick a real problem, build the whole thing from scratch — no shortcuts, no boilerplate templates — and ship something people can actually use."

export default function Manifesto() {
  const pRef = useRef<HTMLParagraphElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!pRef.current) return

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(pRef.current, { opacity: 1 })
        return
      }

      const split = new SplitText(pRef.current, { type: 'words' })
      gsap.set(split.words, { opacity: 0.15 })
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 0.4,
        },
      })

      return () => split.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="px-6 md:px-10 py-32 md:py-48 max-w-5xl mx-auto">
      <p
        ref={pRef}
        className="cn-display text-[clamp(1.6rem,4.2vw,3.2rem)] leading-[1.3] font-medium text-[var(--cn-text)]"
      >
        {TEXT}
      </p>
    </section>
  )
}
