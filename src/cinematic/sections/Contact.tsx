import { useRef } from 'react'
import gsap from 'gsap'
import { useScrollReveal } from '../hooks/useScrollReveal'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/kasamthapa' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kasamthapamagar' },
  { label: 'X', href: 'https://twitter.com/kasamthapa89' },
]

function MagneticEmail() {
  const ref = useRef<HTMLAnchorElement>(null)

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.25
    const y = (e.clientY - r.top - r.height / 2) * 0.4
    gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' })
  }

  function onLeave() {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <a
      ref={ref}
      href="mailto:kasamthapamagar7@gmail.com"
      data-cursor
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="cn-display inline-block text-[clamp(2rem,7vw,5.5rem)] font-medium text-[var(--cn-text)] hover:text-[var(--cn-accent)] transition-colors break-all"
    >
      kasamthapamagar7@gmail.com
    </a>
  )
}

export default function Contact() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="contact" ref={ref} className="px-6 md:px-10 py-32 md:py-48 text-center">
      <p data-reveal className="text-xs uppercase tracking-[0.3em] text-[var(--cn-muted)] mb-6">
        Let's Talk
      </p>
      <div data-reveal>
        <MagneticEmail />
      </div>

      <div data-reveal className="mt-14 flex items-center justify-center gap-8 text-sm">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="text-[var(--cn-muted)] hover:text-[var(--cn-text)] transition-colors"
          >
            {s.label}
          </a>
        ))}
      </div>

      <p data-reveal className="mt-20 text-[11px] text-[var(--cn-faint)]">
        Kasam Thapa Magar · Kathmandu, Nepal · {new Date().getFullYear()}
      </p>
    </section>
  )
}
