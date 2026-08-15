import { useState, type ReactNode } from 'react'
import { CodeEditor, CodeLine, kw, str, type, vr, cm, pn } from '../components/chrome/CodeEditor'
import { useInView } from '../hooks/useInView'
import { projects } from '../data/projects'
import { WarningIcon, ChevronRightIcon } from '../components/chrome/icons'

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
    <div
      key={project.id}
      className="animate-fade-in border border-[var(--vs-panel-border)] rounded-md overflow-hidden bg-[var(--vs-bg)]"
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[var(--vs-palette-bg)] border-b border-[var(--vs-border)]">
        <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
        <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-xs text-[var(--vs-muted)]">{project.title}</span>
      </div>

      <div className="p-5 md:p-7 grid md:grid-cols-[210px_1fr] gap-6 md:gap-10">
        {/* meta column */}
        <div className="md:border-r border-[var(--vs-border)] md:pr-8">
          <h2 className="text-xl font-semibold text-[var(--vs-text)] mb-2">{project.title}</h2>
          <p className="text-sm text-[var(--vs-muted)] leading-relaxed mb-5">{project.tagline}</p>

          <div className="flex flex-wrap md:flex-col gap-1.5 mb-6">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="w-fit text-[11px] border border-[var(--vs-panel-border)] text-[var(--vs-type)] px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex md:flex-col gap-4 md:gap-2 text-sm">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--vs-accent-bright)] hover:underline underline-offset-4"
            >
              live →
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--vs-muted)] hover:text-[var(--vs-accent-bright)] hover:underline underline-offset-4"
            >
              github →
            </a>
          </div>
        </div>

        {/* narrative column */}
        <div className="min-w-0">
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

          <div className="flex gap-2.5 p-3 rounded-md border border-[var(--vs-panel-border)] bg-[var(--vs-hover)]">
            <WarningIcon size={14} className="text-[var(--vs-warning-icon)] shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] uppercase tracking-wide text-[var(--vs-muted)] mb-1">Known limitation</p>
              <p className="text-sm text-[var(--vs-text)] leading-relaxed">{project.limitation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Preview() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [index, setIndex] = useState(0)
  const project = projects[index]

  function go(delta: number) {
    setIndex((i) => (i + delta + projects.length) % projects.length)
  }

  return (
    <div ref={ref} className={`h-full flex flex-col p-6 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="flex items-center justify-between gap-4 mb-5 shrink-0">
        <div className="flex gap-2 overflow-x-auto">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setIndex(i)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                i === index
                  ? 'border-[var(--vs-accent-bright)] text-[var(--vs-accent-bright)] bg-[var(--vs-hover)]'
                  : 'border-[var(--vs-panel-border)] text-[var(--vs-muted)] hover:text-[var(--vs-text)]'
              }`}
            >
              0{i + 1} · {p.title}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="p-1.5 rounded hover:bg-[var(--vs-hover)] text-[var(--vs-muted)] hover:text-[var(--vs-text)] rotate-180"
          >
            <ChevronRightIcon size={13} />
          </button>
          <span className="text-[11px] text-[var(--vs-muted)] w-10 text-center tabular-nums">
            0{index + 1} / 0{projects.length}
          </span>
          <button
            onClick={() => go(1)}
            aria-label="Next project"
            className="p-1.5 rounded hover:bg-[var(--vs-hover)] text-[var(--vs-muted)] hover:text-[var(--vs-text)]"
          >
            <ChevronRightIcon size={13} />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <ProjectCard project={project} />
      </div>
    </div>
  )
}

export { Code as ProjectsCode, Preview as ProjectsPreview }
