import { useScrollReveal } from '../hooks/useScrollReveal'

const NOW = [
  { label: 'Learning', value: 'DSA daily · NeetCode roadmap' },
  { label: 'Building', value: 'making CodeBrain production-grade' },
  { label: 'Target', value: 'remote full-stack role · open to opportunities' },
]

export default function Now() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section ref={ref} className="px-6 md:px-10 py-24 md:py-32 max-w-4xl mx-auto">
      <p data-reveal className="text-xs uppercase tracking-[0.3em] text-[var(--cn-muted)] mb-10">
        Right Now
      </p>

      <div data-reveal-group className="space-y-8">
        {NOW.map((row) => (
          <div
            key={row.label}
            data-reveal-item
            className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6 border-b border-[var(--cn-border)] pb-6"
          >
            <span className="cn-display text-sm md:text-base w-32 shrink-0 text-[var(--cn-accent)]">
              {row.label}
            </span>
            <span className="text-lg md:text-2xl text-[var(--cn-text)]">{row.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
