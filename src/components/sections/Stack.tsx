import { useInView } from '../../hooks/useInView'

const STACK = [
  { label: 'strong', items: ['TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'] },
  { label: 'building', items: ['RAG pipelines', 'pgvector', 'Docker', 'system design'] },
]

export default function Stack() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section id="stack" className="px-6 md:px-12 lg:px-24 py-12 md:py-16 border-b border-[var(--border)]">
      <div ref={ref} className={inView ? 'animate-fade-in' : 'opacity-0'}>
        <h2 className="text-sm mb-8">
          <span className="text-[var(--accent)]">~/kasam</span>
          <span className="text-[var(--muted)]"> $ cat stack.txt</span>
        </h2>

        <div className="space-y-3 text-sm md:text-base">
          {STACK.map((row) => (
            <div key={row.label} className="grid grid-cols-[90px_16px_1fr] md:grid-cols-[120px_20px_1fr]">
              <span className="text-[var(--accent)]">{row.label}</span>
              <span className="text-[var(--muted)]">→</span>
              <span>{row.items.join(', ')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
