import { projects } from '../../data/projects'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <section id="work" ref={ref} className="px-6 md:px-10 max-w-6xl mx-auto">
      <p data-reveal className="text-xs uppercase tracking-[0.3em] text-[var(--cn-muted)] mb-2">
        Selected Work
      </p>
      <h2 data-reveal className="cn-display text-3xl md:text-5xl font-medium text-[var(--cn-text)] mb-4">
        Built from scratch, shipped for real.
      </h2>

      <div className="mt-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
