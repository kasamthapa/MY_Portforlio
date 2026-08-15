import type { ReactNode } from 'react'
import { CodeEditor, CodeLine, kw, str, type, vr, cm, pn } from '../components/chrome/CodeEditor'
import { useInView } from '../hooks/useInView'
import { projects } from '../data/projects'
import { WarningIcon } from '../components/chrome/icons'

interface Line {
  content?: ReactNode
  indent?: number
}

function strList(items: string[], indent: number, lines: Line[]) {
  items.forEach((item, i) => {
    lines.push({
      indent,
      content: (
        <>
          {str(`'${item.slice(0, 64)}${item.length > 64 ? '…' : ''}'`)}
          {i < items.length - 1 ? pn(',') : ''}
        </>
      ),
    })
  })
}

function buildLines(): Line[] {
  const lines: Line[] = []
  lines.push({ content: cm('// projects.ts') })
  lines.push({})
  lines.push({ content: <>{kw('interface')} {type('Project')} {pn('{')}</> })
  lines.push({ indent: 1, content: <>{vr('title')}{pn(':')} {type('string')}</> })
  lines.push({ indent: 1, content: <>{vr('problem')}{pn(':')} {type('string')}</> })
  lines.push({ indent: 1, content: <>{vr('decisions')}{pn(':')} {type('string')}{pn('[]')}</> })
  lines.push({ indent: 1, content: <>{vr('limitation')}{pn(':')} {type('string')}</> })
  lines.push({ indent: 1, content: <>{vr('stack')}{pn(':')} {type('string')}{pn('[]')}</> })
  lines.push({ content: pn('}') })
  lines.push({})
  lines.push({ content: <>{kw('export const')} {vr('projects')}{pn(':')} {type('Project')}{pn('[] = [')}</> })

  projects.forEach((p) => {
    lines.push({ indent: 1, content: pn('{') })
    lines.push({ indent: 2, content: <>{vr('title')}{pn(':')} {str(`'${p.title}'`)}{pn(',')}</> })
    lines.push({ indent: 2, content: <>{vr('problem')}{pn(':')} {str(`'${p.problem.slice(0, 56)}…'`)}{pn(',')}</> })
    lines.push({ indent: 2, content: <>{vr('decisions')}{pn(': [')}</> })
    strList(p.decisions, 3, lines)
    lines.push({ indent: 2, content: pn('],') })
    lines.push({ indent: 2, content: <>{vr('limitation')}{pn(':')} {str(`'${p.limitation.slice(0, 48)}…'`)}{pn(',')}</> })
    lines.push({ indent: 1, content: pn('},') })
  })

  lines.push({ content: pn(']') })
  return lines
}

function Code() {
  const lines = buildLines()
  return (
    <CodeEditor>
      {lines.map((l, i) => (
        <CodeLine n={i + 1} key={i} indent={l.indent}>
          {l.content}
        </CodeLine>
      ))}
    </CodeEditor>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="border border-[var(--vs-panel-border)] hover:border-[var(--vs-accent-bright)] rounded-md overflow-hidden flex flex-col transition-colors duration-300 bg-[var(--vs-bg)]">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[var(--vs-palette-bg)] border-b border-[var(--vs-border)]">
        <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
        <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-xs text-[var(--vs-muted)]">{project.title}</span>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-[var(--vs-text)] mb-1">{project.title}</h3>
        <p className="leading-relaxed mb-5 text-sm text-[var(--vs-muted)]">{project.tagline}</p>

        <div className="mb-5">
          <p className="text-[11px] uppercase tracking-wide text-[var(--vs-accent-bright)] mb-1.5">The problem</p>
          <p className="text-sm text-[var(--vs-text)] leading-relaxed">{project.problem}</p>
        </div>

        <div className="mb-5">
          <p className="text-[11px] uppercase tracking-wide text-[var(--vs-accent-bright)] mb-2">Key decisions</p>
          <ul className="space-y-2">
            {project.decisions.map((d) => (
              <li key={d} className="flex gap-2 text-sm text-[var(--vs-text)] leading-relaxed">
                <span className="text-[var(--vs-type)] shrink-0">▸</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-5 flex gap-2.5 p-3 rounded-md border border-[var(--vs-panel-border)] bg-[var(--vs-hover)]">
          <WarningIcon size={14} className="text-[#e0a458] shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] uppercase tracking-wide text-[var(--vs-muted)] mb-1">Known limitation</p>
            <p className="text-sm text-[var(--vs-text)] leading-relaxed">{project.limitation}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="text-[11px] border border-[var(--vs-panel-border)] text-[var(--vs-type)] px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-5 text-sm mt-auto pt-1 border-t border-[var(--vs-border)] -mx-5 md:-mx-6 px-5 md:px-6">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--vs-accent-bright)] hover:underline underline-offset-4 pt-4"
          >
            live →
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--vs-muted)] hover:text-[var(--vs-accent-bright)] hover:underline underline-offset-4 pt-4"
          >
            github →
          </a>
        </div>
      </div>
    </div>
  )
}

function Preview() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className={`p-6 flex flex-col gap-6 max-w-2xl mx-auto ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export { Code as ProjectsCode, Preview as ProjectsPreview }
