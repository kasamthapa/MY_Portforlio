import { useScrollReveal } from '../hooks/useScrollReveal'

const ROW_1 = ['TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma']
const ROW_2 = ['RAG Pipelines', 'pgvector', 'Docker', 'System Design', 'Gemini API']

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden py-3">
      <div
        className="cn-marquee-track"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="cn-display shrink-0 px-6 text-[clamp(2rem,6vw,4.5rem)] font-medium text-[var(--cn-text)] whitespace-nowrap"
          >
            {item}
            <span className="text-[var(--cn-accent)] ml-6">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Stack() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="stack" ref={ref} className="py-24 md:py-32 border-y border-[var(--cn-border)]">
      <p data-reveal className="text-xs uppercase tracking-[0.3em] text-[var(--cn-muted)] mb-8 px-6 md:px-10">
        Using · Building
      </p>
      <div data-reveal>
        <Marquee items={ROW_1} />
        <Marquee items={ROW_2} reverse />
      </div>
    </section>
  )
}
