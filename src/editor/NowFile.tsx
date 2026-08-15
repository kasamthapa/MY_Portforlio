import { CodeEditor, CodeLine, kw, str, type, vr, cm, pn } from '../components/chrome/CodeEditor'
import { useInView } from '../hooks/useInView'

const NOW = [
  { label: 'learning', value: 'DSA daily · NeetCode roadmap' },
  { label: 'building', value: 'making CodeBrain production-grade' },
  { label: 'target', value: 'remote full-stack role · open to opportunities' },
]

function Code() {
  return (
    <CodeEditor>
      <CodeLine n={1}>{cm('// now.ts — last updated this week')}</CodeLine>
      <CodeLine n={2} />
      <CodeLine n={3}>
        {kw('export const')} {vr('now')}
        {pn(': {')} {type('learning')}
        {pn(':')} {type('string')}
        {pn('; ...} = {')}
      </CodeLine>
      {NOW.map((row, i) => (
        <CodeLine n={4 + i} indent={1} key={row.label}>
          {vr(row.label)}
          {pn(':')} {str(`'${row.value}'`)}
          {pn(',')}
        </CodeLine>
      ))}
      <CodeLine n={4 + NOW.length}>{pn('}')}</CodeLine>
    </CodeEditor>
  )
}

function Preview() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className={`p-6 space-y-4 text-sm md:text-base ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
      {NOW.map((row) => (
        <div key={row.label} className="grid grid-cols-[90px_16px_1fr] md:grid-cols-[120px_20px_1fr]">
          <span className="text-[var(--vs-type)]">{row.label}</span>
          <span className="text-[var(--vs-muted)]">→</span>
          <span className="text-[var(--vs-text)]">{row.value}</span>
        </div>
      ))}
    </div>
  )
}

export { Code as NowCode, Preview as NowPreview }
