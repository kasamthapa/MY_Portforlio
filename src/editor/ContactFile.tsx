import { CodeEditor, CodeLine, kw, str, type, vr, cm, pn } from '../components/chrome/CodeEditor'
import { useInView } from '../hooks/useInView'

const LINKS = [
  { label: 'github', href: 'https://github.com/kasamthapa', display: 'github.com/kasamthapa' },
  {
    label: 'linkedin',
    href: 'https://linkedin.com/in/kasamthapamagar',
    display: 'linkedin.com/in/kasamthapamagar',
  },
  { label: 'x', href: 'https://twitter.com/kasamthapa89', display: 'twitter.com/kasamthapa89' },
  { label: 'email', href: 'mailto:kasamthapamagar7@gmail.com', display: 'kasamthapamagar7@gmail.com' },
]

function Code() {
  return (
    <CodeEditor>
      <CodeLine n={1}>{cm('// contact.ts')}</CodeLine>
      <CodeLine n={2} />
      <CodeLine n={3}>
        {kw('export const')} {vr('contact')}
        {pn(': {')} {type('label')}
        {pn(':')} {type('string')}
        {pn('; href:')} {type('string')}
        {pn('}[] = [')}
      </CodeLine>
      {LINKS.map((row, i) => (
        <CodeLine n={4 + i} indent={1} key={row.label}>
          {pn('{')} {vr('label')}
          {pn(':')} {str(`'${row.label}'`)}
          {pn(', href:')} {str(`'${row.href}'`)}
          {pn('},')}
        </CodeLine>
      ))}
      <CodeLine n={4 + LINKS.length}>{pn(']')}</CodeLine>
    </CodeEditor>
  )
}

function Preview() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className={`p-6 space-y-4 text-sm md:text-base ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
      <p className="text-[var(--vs-muted)] text-xs mb-4">Open to remote full-stack roles — reach out.</p>
      {LINKS.map((row) => (
        <div key={row.label} className="grid grid-cols-[90px_16px_1fr] md:grid-cols-[120px_20px_1fr]">
          <span className="text-[var(--vs-type)]">{row.label}</span>
          <span className="text-[var(--vs-muted)]">→</span>
          <a
            href={row.href}
            target={row.label === 'email' ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="w-fit text-[var(--vs-text)] hover:text-[var(--vs-accent-bright)] hover:underline underline-offset-4"
          >
            {row.display}
          </a>
        </div>
      ))}
    </div>
  )
}

export { Code as ContactCode, Preview as ContactPreview }
