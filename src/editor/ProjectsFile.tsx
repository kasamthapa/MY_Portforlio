import type { ReactNode } from 'react'
import { CodeEditor, CodeLine, kw, str, type, vr, cm, pn } from '../components/chrome/CodeEditor'
import { useInView } from '../hooks/useInView'
import { projects } from '../data/projects'

interface Line {
  content?: ReactNode
  indent?: number
}

function buildLines(): Line[] {
  const lines: Line[] = []
  lines.push({ content: cm('// projects.ts') })
  lines.push({})
  lines.push({ content: <>{kw('interface')} {type('Project')} {pn('{')}</> })
  lines.push({ indent: 1, content: <>{vr('title')}{pn(':')} {type('string')}</> })
  lines.push({ indent: 1, content: <>{vr('description')}{pn(':')} {type('string')}</> })
  lines.push({ indent: 1, content: <>{vr('stack')}{pn(':')} {type('string')}{pn('[]')}</> })
  lines.push({ indent: 1, content: <>{vr('live')}{pn(':')} {type('string')}</> })
  lines.push({ indent: 1, content: <>{vr('github')}{pn(':')} {type('string')}</> })
  lines.push({ content: pn('}') })
  lines.push({})
  lines.push({ content: <>{kw('export const')} {vr('projects')}{pn(':')} {type('Project')}{pn('[] = [')}</> })

  projects.forEach((p) => {
    lines.push({ indent: 1, content: pn('{') })
    lines.push({ indent: 2, content: <>{vr('title')}{pn(':')} {str(`'${p.title}'`)}{pn(',')}</> })
    lines.push({ indent: 2, content: <>{vr('description')}{pn(':')} {str(`'${p.description.slice(0, 46)}…'`)}{pn(',')}</> })
    lines.push({ indent: 2, content: <>{vr('stack')}{pn(': [')}{p.stack.map((s) => str(`'${s}'`)).reduce((acc, el, i) => (i === 0 ? [el] : [...acc, pn(', '), el]), [] as ReactNode[])}{pn('],')}</> })
    lines.push({ indent: 2, content: <>{vr('live')}{pn(':')} {str(`'${p.live}'`)}{pn(',')}</> })
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
    <div className="border border-[var(--vs-panel-border)] hover:border-[#3794ff] rounded-md overflow-hidden flex flex-col transition-colors duration-300 bg-[#1e1e1e]">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#252526] border-b border-[var(--vs-border)]">
        <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
        <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-xs text-[var(--vs-muted)]">{project.title}</span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="leading-relaxed mb-4 text-sm text-[var(--vs-text)]">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="text-[11px] border border-[var(--vs-panel-border)] text-[var(--vs-type)] px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-5 text-sm mt-auto">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3794ff] hover:underline underline-offset-4"
          >
            live →
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--vs-muted)] hover:text-[#3794ff] hover:underline underline-offset-4"
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
    <div ref={ref} className={`p-6 grid gap-5 sm:grid-cols-2 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export { Code as ProjectsCode, Preview as ProjectsPreview }
