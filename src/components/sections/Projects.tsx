import { projects } from '../../data/projects'
import { useInView } from '../../hooks/useInView'
import type { Project } from '../../types'

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border border-[var(--border)] rounded-md overflow-hidden flex flex-col">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--border)]">
        <span className="w-2.5 h-2.5 rounded-full border border-[var(--muted)]" />
        <span className="w-2.5 h-2.5 rounded-full border border-[var(--muted)]" />
        <span className="w-2.5 h-2.5 rounded-full border border-[var(--muted)]" />
        <span className="ml-3 text-xs text-[var(--muted)]">{project.title}</span>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <p className="leading-relaxed mb-5 text-sm md:text-base">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="text-xs border border-[var(--border)] text-[var(--accent)] px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-6 text-sm mt-auto">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline underline-offset-4"
          >
            live →
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] hover:text-[var(--accent)] hover:underline underline-offset-4"
          >
            github →
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section
      id="projects"
      className="px-6 md:px-12 lg:px-24 py-20 md:py-28 border-b border-[var(--border)]"
    >
      <div ref={ref} className={inView ? 'animate-fade-in' : 'opacity-0'}>
        <h2 className="text-sm mb-10">
          <span className="text-[var(--accent)]">~/kasam</span>
          <span className="text-[var(--muted)]"> $ ls projects/</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
