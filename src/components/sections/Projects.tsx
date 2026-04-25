import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '../../data/projects'
import type { Project } from '../../types'

const STATUS_STYLES = {
  live: { label: 'live', bg: '#BBF7D0', color: '#166534' },
  wip: { label: 'wip', bg: '#FDE68A', color: '#92400E' },
  archived: { label: 'archived', bg: '#E5E7EB', color: '#6B7280' },
}

function ProjectLog({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const status = STATUS_STYLES[project.status]

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative rounded-2xl p-7 md:p-10 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: 'rgba(250, 247, 242, 0.6)',
        borderColor: '#E8E0D5',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className="font-mono text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: status.bg, color: status.color }}
            >
              {status.label}
            </span>
            <span className="font-mono text-xs" style={{ color: '#B8A9A0' }}>
              {project.year}
            </span>
          </div>
          <h3
            className="font-serif text-2xl md:text-3xl font-semibold"
            style={{ color: '#1A1A2E' }}
          >
            {project.title}
          </h3>
          <p className="mt-1 font-sans text-sm italic" style={{ color: '#8BA888' }}>
            {project.tagline}
          </p>
        </div>

        {/* External link */}
        <motion.a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs font-medium border transition-colors hover:border-terracotta"
          style={{ borderColor: '#E8E0D5', color: '#2D3A3A' }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          view live
          <span>↗</span>
        </motion.a>
      </div>

      {/* Story */}
      <p className="font-sans text-base leading-relaxed mb-6" style={{ color: '#2D3A3A' }}>
        {project.story}
      </p>

      {/* AI note — shown honestly, not hidden */}
      {project.aiNote && (
        <div
          className="mb-6 flex gap-3 rounded-xl p-4 text-sm"
          style={{ background: '#F5F0E8', borderLeft: '3px solid #E8704A' }}
        >
          <span className="text-lg leading-none">🤖</span>
          <p className="font-sans leading-relaxed" style={{ color: '#B8A9A0' }}>
            <span className="font-medium" style={{ color: '#E8704A' }}>AI note: </span>
            {project.aiNote}
          </p>
        </div>
      )}

      {/* Tech stack pills */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-xs px-3 py-1 rounded-full border"
            style={{ borderColor: '#E8E0D5', color: '#8BA888' }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Decorative corner accent */}
      <div
        aria-hidden="true"
        className="absolute bottom-4 right-4 font-mono text-5xl opacity-5 select-none group-hover:opacity-10 transition-opacity"
        style={{ color: '#E8704A' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true })

  return (
    <section id="projects" className="px-6 md:px-16 lg:px-24 py-24 md:py-32">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="font-mono text-sm" style={{ color: '#8BA888' }}>/ the work</span>
        <h2
          className="mt-3 font-serif text-4xl md:text-5xl font-bold"
          style={{ color: '#1A1A2E' }}
        >
          Things I've shipped.
        </h2>
        <p className="mt-3 font-sans text-base max-w-md" style={{ color: '#B8A9A0' }}>
          Presented as build logs — because the story of how something got made matters as much as what it is.
        </p>
      </motion.div>

      <div className="flex flex-col gap-6 max-w-3xl">
        {projects.map((p, i) => (
          <ProjectLog key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
