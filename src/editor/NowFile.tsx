import { CodeEditor, CodeLine, kw, str, type, vr, cm, pn } from '../components/chrome/CodeEditor'
import { useInView } from '../hooks/useInView'

const NOW = [
  { label: 'building', value: 'AI tools, full-stack products, and useful prototypes' },
  { label: 'recent', value: 'TrustLayer · explainable credit decisions for small merchants' },
  { label: 'recent', value: 'Rapporteur · multilingual meeting notes with quote matching' },
  { label: 'focus', value: 'TypeScript · React · Node.js · PostgreSQL · applied AI' },
  { label: 'open_to', value: 'collaborations and remote full-stack opportunities' },
]

const STORIES = [
  {
    title: 'TrustLayer · financial inclusion prototype',
    href: 'https://www.linkedin.com/posts/kasamthapamagar_trustlayer-kmchackverse2026-financialinclusion-activity-7474847759980855297-yLNv',
  },
  {
    title: 'Rapporteur · multilingual meeting notes',
    href: 'https://rapporteur.vercel.app',
  },
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
        <CodeLine n={4 + i} indent={1} key={`${row.label}-${i}`}>
          {vr(row.label)}
          {pn(':')} {str(`'${row.value}'`)}
          {pn(',')}
        </CodeLine>
      ))}
      <CodeLine n={4 + NOW.length}>{pn('}')}</CodeLine>
      <CodeLine n={5 + NOW.length} />
      <CodeLine n={6 + NOW.length}>{cm('// selected recent work')}</CodeLine>
      {STORIES.map((story, i) => (
        <CodeLine n={7 + NOW.length + i} key={story.title}>
          {vr(story.title)}
        </CodeLine>
      ))}
    </CodeEditor>
  )
}

function Preview() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className={`p-6 space-y-4 text-sm md:text-base ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
      {NOW.map((row, i) => (
        <div key={`${row.label}-${i}`} className="grid grid-cols-[90px_16px_1fr] md:grid-cols-[120px_20px_1fr]">
          <span className="text-[var(--vs-type)]">{row.label}</span>
          <span className="text-[var(--vs-muted)]">→</span>
          <span className="text-[var(--vs-text)]">{row.value}</span>
        </div>
      ))}
      <div className="pt-4 mt-2 border-t border-[var(--vs-border)] space-y-3">
        <p className="text-xs uppercase tracking-wide text-[var(--vs-muted)]">Selected recent work</p>
        {STORIES.map((story) => (
          <a
            key={story.title}
            href={story.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-[var(--vs-accent-bright)] hover:underline underline-offset-4"
          >
            {story.title} ↗
          </a>
        ))}
      </div>
    </div>
  )
}

export { Code as NowCode, Preview as NowPreview }
