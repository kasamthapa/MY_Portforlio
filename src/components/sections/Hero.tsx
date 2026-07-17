import { useState, type CSSProperties } from 'react'
import TypeIn from '../TypeIn'
import { PORTRAIT_BITS, PORTRAIT_COLS, PORTRAIT_ROWS } from '../../data/portraitBits'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/kasamthapa' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kasamthapamagar' },
  { label: 'X', href: 'https://twitter.com/kasamthapa89' },
]

const GIT_LOG = [
  { hash: 'a3f9c12', msg: 'shipped codebrain — RAG pipeline over any GitHub repo' },
  { hash: 'b2e1d07', msg: 'shipped critch — peer review platform for developers' },
  { hash: 'c8f3a91', msg: 'learning DSA daily · building in public' },
]

export default function Hero() {
  const [step, setStep] = useState(0)

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 border-b border-[var(--border)]"
    >
      <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
        <div className="lg:flex-1">
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
            className={`flex flex-wrap gap-3 text-xs md:text-sm transition-opacity duration-700 ${
              step >= 3 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 border border-[var(--border)] rounded-sm text-[var(--accent)] hover:border-[var(--accent)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className={`mt-10 text-xs md:text-sm transition-opacity duration-500 ${
              step >= 3 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-[var(--muted)] mb-2">
              <span className="text-[var(--accent)]">~/kasam</span> $ git log --oneline
            </p>
            <div className="space-y-1">
              {step >= 3 &&
                GIT_LOG.map((entry, i) => (
                  <p
                    key={entry.hash}
                    className="text-[var(--muted)] animate-fade-in-delayed"
                    style={{ animationDelay: `${0.3 + i * 0.25}s` }}
                  >
                    <span className="text-[var(--accent)]">{entry.hash}</span> {entry.msg}
                  </p>
                ))}
            </div>
          </div>

          <p
            className={`mt-6 text-sm transition-opacity duration-500 ${
              step >= 3 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: step >= 3 ? '1.1s' : '0s' }}
          >
            <span className="text-[var(--accent)]">~/kasam</span>
            <span className="text-[var(--muted)]"> $ </span>
            <span className="animate-blink">_</span>
          </p>
        </div>

        <div
          className="hidden lg:block relative shrink-0"
          style={{ width: 340, height: 340 }}
          aria-hidden="true"
        >
          {step >= 3 &&
            PORTRAIT_BITS.map((bit, i) => (
              <span
                key={i}
                className="portrait-bit font-bold leading-none select-none"
                style={
                  {
                    top: `${(bit.r / PORTRAIT_ROWS) * 100}%`,
                    left: `${(bit.c / PORTRAIT_COLS) * 100}%`,
                    fontSize: 9,
                    color: bit.a ? 'var(--accent)' : 'var(--muted)',
                    '--op': bit.op,
                    animationDelay: `${0.3 + bit.r * 0.015}s`,
                  } as CSSProperties
                }
              >
                {bit.ch}
              </span>
            ))}
        </div>
      </div>
    </section>
  )
}
