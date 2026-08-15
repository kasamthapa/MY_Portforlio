import { useRef } from 'react'
import gsap from 'gsap'
import type { Project } from '../../types'

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  function onMouseMove(e: React.MouseEvent) {
    const card = cardRef.current
    if (!card) return
    const r = card.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    gsap.to(visualRef.current, {
      rotateX: py * -8,
      rotateY: px * 10,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  function onMouseLeave() {
    gsap.to(visualRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.6)' })
  }

  const reversed = index % 2 === 1

  return (
    <div
      data-reveal
      className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center py-16 md:py-24 border-b border-[var(--cn-border)] ${
        reversed ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        data-cursor
        className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--cn-border)]"
        style={{ perspective: 800 }}
      >
        <div
          ref={visualRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${index % 2 ? '#ff6b4a22' : '#8fd67a22'}, var(--cn-surface) 70%)`,
          }}
        >
          <span className="cn-display text-[22vw] md:text-[9vw] font-medium text-[var(--cn-text)] opacity-[0.06] select-none leading-none">
            {project.title.slice(0, 2).toUpperCase()}
          </span>
          <span className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.25em] text-[var(--cn-muted)]">
            0{index + 1}
          </span>
        </div>
      </div>

      <div>
        <h3 className="cn-display text-3xl md:text-5xl font-medium text-[var(--cn-text)] mb-4">{project.title}</h3>
        <p className="text-sm md:text-base text-[var(--cn-muted)] leading-relaxed max-w-md mb-6">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full border border-[var(--cn-border)] text-[var(--cn-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="text-[var(--cn-text)] hover:text-[var(--cn-accent)] transition-colors"
          >
            Visit live ↗
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="text-[var(--cn-muted)] hover:text-[var(--cn-text)] transition-colors"
          >
            Source ↗
          </a>
        </div>
      </div>
    </div>
  )
}
