import { useState, type CSSProperties } from 'react'
import { CodeEditor, CodeLine, kw, str, type, num, vr, cm, pn } from '../components/chrome/CodeEditor'
import TypeIn from '../components/TypeIn'
import { PORTRAIT_BITS, PORTRAIT_COLS, PORTRAIT_ROWS } from '../data/portraitBits'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/kasamthapa' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kasamthapamagar' },
  { label: 'X', href: 'https://twitter.com/kasamthapa89' },
]

const GIT_LOG = [
  { hash: 'a3f9c12', msg: 'shipped codebrain — RAG pipeline over any GitHub repo' },
  { hash: 'b2e1d07', msg: 'shipped critch — peer review platform for developers' },
  { hash: 'c8f3a91', msg: 'learning DSA daily · building in public' },
]

function Code() {
  return (
    <CodeEditor>
      <CodeLine n={1}>{cm('// profile.ts')}</CodeLine>
      <CodeLine n={2} />
      <CodeLine n={3}>
        {kw('interface')} {type('Profile')} {pn('{')}
      </CodeLine>
      <CodeLine n={4} indent={1}>
        {vr('name')}
        {pn(':')} {type('string')}
      </CodeLine>
      <CodeLine n={5} indent={1}>
        {vr('role')}
        {pn(':')} {type('string')}
      </CodeLine>
      <CodeLine n={6} indent={1}>
        {vr('location')}
        {pn(':')} {type('string')}
      </CodeLine>
      <CodeLine n={7} indent={1}>
        {vr('focus')}
        {pn(':')} {type('string')}
        {pn('[]')}
      </CodeLine>
      <CodeLine n={8}>{pn('}')}</CodeLine>
      <CodeLine n={9} />
      <CodeLine n={10}>
        {kw('export const')} {vr('kasam')}
        {pn(':')} {type('Profile')} {pn('= {')}
      </CodeLine>
      <CodeLine n={11} indent={1}>
        {vr('name')}
        {pn(':')} {str("'Kasam Thapa Magar'")}
        {pn(',')}
      </CodeLine>
      <CodeLine n={12} indent={1}>
        {vr('role')}
        {pn(':')} {str("'Full Stack Developer'")}
        {pn(',')}
      </CodeLine>
      <CodeLine n={13} indent={1}>
        {vr('location')}
        {pn(':')} {str("'Kathmandu, Nepal'")}
        {pn(',')}
      </CodeLine>
      <CodeLine n={14} indent={1}>
        {vr('focus')}
        {pn(': [')}
      </CodeLine>
      <CodeLine n={15} indent={2}>
        {str("'AI developer tools'")}
        {pn(',')}
      </CodeLine>
      <CodeLine n={16} indent={2}>
        {str("'RAG pipelines'")}
        {pn(',')}
      </CodeLine>
      <CodeLine n={17} indent={2}>{str("'backend systems'")}</CodeLine>
      <CodeLine n={18} indent={1}>{pn('],')}</CodeLine>
      <CodeLine n={19}>{pn('}')}</CodeLine>
      <CodeLine n={20} />
      <CodeLine n={21}>{cm('// status: open to remote full-stack roles')}</CodeLine>
      <CodeLine n={22} />
      <CodeLine n={23}>
        {num('git')} {pn('log --oneline')}
      </CodeLine>
      {GIT_LOG.map((entry, i) => (
        <CodeLine n={24 + i} key={entry.hash}>
          <span style={{ color: 'var(--vs-comment)' }}>{entry.hash}</span> {entry.msg}
        </CodeLine>
      ))}
    </CodeEditor>
  )
}

const SUGGESTIONS = [
  { kind: 'M', color: '#b180d7', text: 'hire(): Promise<Yes>' },
  { kind: 'F', color: '#75beff', text: 'role: "Full Stack Developer"' },
  { kind: 'P', color: '#ee9d28', text: 'availability: "open"' },
]

function IntelliSense() {
  return (
    <div
      className="not-italic font-normal absolute left-0 top-full mt-1 w-72 max-w-[80vw] rounded-md border border-[var(--vs-panel-border)] bg-[var(--vs-palette-bg)] shadow-2xl overflow-hidden z-10 animate-suggest-in text-[12px] normal-case tracking-normal"
      aria-hidden="true"
    >
      {SUGGESTIONS.map((item, i) => (
        <div
          key={item.text}
          className={`flex items-center gap-2 px-2 py-1.5 ${i === 0 ? 'bg-[var(--vs-palette-selected-bg)]' : ''}`}
        >
          <span
            className="w-4 h-4 rounded-sm flex items-center justify-center text-[10px] font-bold shrink-0"
            style={{ background: `${item.color}33`, color: item.color }}
          >
            {item.kind}
          </span>
          <span className="text-[var(--vs-text)] truncate">{item.text}</span>
        </div>
      ))}
    </div>
  )
}

function Preview() {
  const [step, setStep] = useState(0)

  return (
    <div className="h-full flex flex-col justify-center px-6 md:px-10 py-10 lg:py-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-10">
        <div className="flex-1">
          <p className="text-[var(--vs-muted)] text-xs md:text-sm mb-4">
            <TypeIn text="~/kasam $ whoami" speed={35} cursor onDone={() => setStep(1)} />
          </p>

          <h1
            className="relative text-3xl md:text-5xl font-bold tracking-tight mb-3 min-h-[1.15em] bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, var(--vs-hero-grad-start) 30%, var(--vs-hero-grad-end) 100%)',
            }}
          >
            {step >= 1 && (
              <TypeIn
                text="Kasam Thapa Magar"
                speed={45}
                cursor
                cursorColor="var(--vs-hero-grad-end)"
                onDone={() => setStep(2)}
              />
            )}
            {step === 1 && <IntelliSense />}
          </h1>

          <p className="text-[var(--vs-muted)] text-sm md:text-base max-w-lg mb-6 min-h-[1.6em]">
            {step >= 2 && (
              <TypeIn
                text="Full stack developer from Kathmandu. Building AI developer tools."
                speed={14}
                cursor
                onDone={() => setStep(3)}
              />
            )}
          </p>

          <div
            className={`flex flex-wrap gap-3 text-xs md:text-sm transition-opacity duration-700 ${
              step >= 3 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 border border-[var(--vs-panel-border)] rounded-sm text-[var(--vs-accent-bright)] hover:border-[var(--vs-accent-bright)] hover:bg-[var(--vs-hover)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className={`mt-8 text-xs transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-[var(--vs-muted)] mb-1.5">
              <span style={{ color: 'var(--vs-comment)' }}>~/kasam</span> $ git log --oneline
            </p>
            <div className="space-y-1">
              {step >= 3 &&
                GIT_LOG.map((entry, i) => (
                  <p
                    key={entry.hash}
                    className="text-[var(--vs-muted)] animate-fade-in"
                    style={{ animationDelay: `${0.3 + i * 0.25}s` }}
                  >
                    <span style={{ color: 'var(--vs-number)' }}>{entry.hash}</span> {entry.msg}
                  </p>
                ))}
            </div>
          </div>

          <p
            className={`mt-5 text-sm transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: step >= 3 ? '1.1s' : '0s' }}
          >
            <span style={{ color: 'var(--vs-comment)' }}>~/kasam</span>
            <span className="text-[var(--vs-muted)]"> $ </span>
            <span className="animate-caret">▌</span>
          </p>
        </div>

        <div className="hidden lg:block relative shrink-0" style={{ width: 260, height: 260 }} aria-hidden="true">
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-25 -z-10"
            style={{ background: 'radial-gradient(circle, var(--vs-glow), transparent 65%)' }}
          />
          {step >= 3 &&
            PORTRAIT_BITS.map((bit, i) => (
              <span
                key={i}
                className="portrait-bit font-bold leading-none select-none"
                style={
                  {
                    top: `${(bit.r / PORTRAIT_ROWS) * 100}%`,
                    left: `${(bit.c / PORTRAIT_COLS) * 100}%`,
                    fontSize: 7,
                    color: bit.a ? 'var(--vs-glow)' : 'var(--vs-muted)',
                    '--op': bit.op,
                    animationDelay: `${0.3 + bit.r * 0.015}s`,
                  } as CSSProperties
                }
              >
                {bit.ch}
              </span>
            ))}
        </div>
      </div>
    </div>
  )
}

export { Code as HeroCode, Preview as HeroPreview }
