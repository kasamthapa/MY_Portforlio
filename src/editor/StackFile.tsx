import { Fragment } from 'react'
import { CodeEditor, CodeLine, str, pn } from '../components/chrome/CodeEditor'
import { useInView } from '../hooks/useInView'

const STACK = [
  { label: 'using', items: ['TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'] },
  { label: 'building', items: ['RAG pipelines', 'pgvector', 'Docker', 'system design'] },
]

function Code() {
  let n = 1
  return (
    <CodeEditor>
      <CodeLine n={n++}>{pn('{')}</CodeLine>
      {STACK.map((row, ri) => (
        <Fragment key={row.label}>
          <CodeLine n={n++} indent={1}>
            {str(`"${row.label}"`)}
            {pn(': [')}
          </CodeLine>
          {row.items.map((item, i) => (
            <CodeLine n={n++} indent={2} key={item}>
              {str(`"${item}"`)}
              {i < row.items.length - 1 ? pn(',') : ''}
            </CodeLine>
          ))}
          <CodeLine n={n++} indent={1}>
            {ri < STACK.length - 1 ? pn('],') : pn(']')}
          </CodeLine>
        </Fragment>
      ))}
      <CodeLine n={n++}>{pn('}')}</CodeLine>
    </CodeEditor>
  )
}

function Preview() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className={`p-6 space-y-8 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
      {STACK.map((row) => (
        <div key={row.label}>
          <p className="text-xs uppercase tracking-wide text-[var(--vs-muted)] mb-3">{row.label}</p>
          <div className="flex flex-wrap gap-2">
            {row.items.map((item) => (
              <span
                key={item}
                className="text-sm px-3 py-1.5 rounded-md border border-[var(--vs-panel-border)] text-[var(--vs-type)] bg-[var(--vs-palette-bg)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export { Code as StackCode, Preview as StackPreview }
