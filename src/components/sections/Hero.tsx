import { useState } from 'react'
import TypeIn from '../TypeIn'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/kasamthapa' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kasamthapamagar' },
  { label: 'X', href: 'https://twitter.com/kasamthapa89' },
]

export default function Hero() {
  const [step, setStep] = useState(0)

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 border-b border-[var(--border)]"
    >
      <p className="text-[var(--muted)] text-sm md:text-base mb-6">
        <TypeIn text="~/kasam $ whoami" speed={35} cursor onDone={() => setStep(1)} />
      </p>

      <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 min-h-[1.15em]">
        {step >= 1 && (
          <TypeIn text="Kasam Thapa Magar" speed={45} cursor onDone={() => setStep(2)} />
        )}
      </h1>

      <p className="text-[var(--muted)] text-base md:text-lg max-w-xl mb-8 min-h-[1.6em]">
        {step >= 2 && (
          <TypeIn
            text="Full stack developer from Kathmandu. Building AI developer tools."
            speed={14}
            cursor
            onDone={() => setStep(3)}
          />
        )}
      </p>

      <div
        className={`flex flex-wrap gap-x-6 gap-y-2 text-sm transition-opacity duration-700 ${
          step >= 3 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline underline-offset-4"
          >
            [{link.label}]
          </a>
        ))}
      </div>

      <p className="mt-16 text-sm">
        <span className="text-[var(--accent)]">~/kasam</span>
        <span className="text-[var(--muted)]"> $ </span>
        <span className="animate-blink">_</span>
      </p>
    </section>
  )
}
