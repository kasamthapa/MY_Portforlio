import type { CSSProperties } from 'react'
import { CodeEditor, CodeLine, kw, str, type, vr, cm, pn } from '../components/chrome/CodeEditor'
import { PORTRAIT_BITS, PORTRAIT_COLS, PORTRAIT_ROWS } from '../data/portraitBits'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/kasamthapa' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kasamthapamagar' },
  { label: 'X', href: 'https://x.com/kasamthapa89' },
]

const WORK = [
  { name: 'CodeBrain', msg: 'ask a codebase; follow answers to the source' },
  { name: 'SikshyaNepal', msg: 'find colleges, admissions, and student guides' },
  { name: 'Critch', msg: 'turn project feedback into a next move' },
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
        {pn(':')} {str("'Full-Stack Developer'")}
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
        {str("'education technology'")}
        {pn(',')}
      </CodeLine>
      <CodeLine n={17} indent={2}>{str("'backend systems'")}</CodeLine>
      <CodeLine n={18} indent={1}>{pn('],')}</CodeLine>
      <CodeLine n={19}>{pn('}')}</CodeLine>
      <CodeLine n={20} />
      <CodeLine n={21}>{cm('// status: open to remote full-stack roles')}</CodeLine>
      <CodeLine n={22} />
      <CodeLine n={23}>{cm('// selected work')}</CodeLine>
      {WORK.map((entry, i) => (
        <CodeLine n={24 + i} key={entry.name}>
          <span style={{ color: 'var(--vs-type)' }}>{entry.name}</span> {pn('·')} {entry.msg}
        </CodeLine>
      ))}
    </CodeEditor>
  )
}

function Preview() {
  return (
    <div className="hero-stage">
      <section className="hero-intro">
        <div className="hero-intro-copy">
          <p className="hero-eyebrow"><span className="hero-pulse" /> SOFTWARE FOR THE MOMENT YOU FEEL STUCK <span className="hero-slash">/</span> KATHMANDU, NEPAL</p>
          <h1>Make the next step<br /><span>easier to see.</span></h1>
          <p className="hero-summary">I’m Kasam. I build useful software for two moments of uncertainty: opening a codebase you don’t know, and figuring out where your education could take you.</p>
          <div className="hero-actions">
            <a href="https://codebrain-gamma.vercel.app" target="_blank" rel="noopener noreferrer" className="hero-primary">Explore CodeBrain <span>↗</span></a>
            <a href="mailto:kasamthapamagar7@gmail.com" className="hero-secondary">Let’s talk <span>↗</span></a>
          </div>
          <div className="hero-socials">
            {LINKS.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span>↗</span></a>
            ))}
          </div>
        </div>
        <div className="hero-portrait" aria-hidden="true">
          <div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" />
          <div className="portrait-glow" />
          {PORTRAIT_BITS.map((bit, i) => (
            <span key={i} className="portrait-bit font-bold leading-none select-none" style={{
              top: `${(bit.r / PORTRAIT_ROWS) * 100}%`, left: `${(bit.c / PORTRAIT_COLS) * 100}%`, fontSize: 7,
              color: bit.a ? 'var(--vs-glow)' : 'var(--vs-muted)', '--op': bit.op,
              animationDelay: `${0.2 + bit.r * 0.015}s`,
            } as CSSProperties}>{bit.ch}</span>
          ))}
          <span className="portrait-caption">KTM · 27.7172° N</span>
        </div>
      </section>

      <section className="featured-build">
        <div className="featured-heading"><div><span className="featured-kicker">01 / FEATURED BUILD</span><h2>CodeBrain<span className="featured-dot">.</span></h2></div><span className="featured-live"><i /> LIVE PROJECT</span></div>
        <p className="featured-description">An unfamiliar project can feel like a map without a legend. Ask a question in plain language, then follow the answer back to the source.</p>
        <div className="brain-demo">
          <div className="brain-demo-top"><span className="brain-mark">⌘</span><div><strong>codebrain</strong><small>repository intelligence</small></div><span className="brain-demo-status"><i /> indexed</span></div>
          <div className="brain-question"><span className="brain-prompt">EXAMPLE</span><span>Why split code by syntax instead of line count?</span><span className="brain-cursor" /></div>
          <div className="brain-answer"><span className="answer-spark">✳</span><div><p>Functions and classes keep their meaning as a unit, so the answer can point you to useful code instead of a random slice of lines.</p><div className="citation-row"><span className="citation-file">◈ source-grounded response</span><span className="citation-line">file + line citations</span><span className="citation-confidence">traceable to code</span></div></div></div>
          <div className="brain-process"><span><b>01</b> repo map</span><i /><span><b>02</b> AST chunks</span><i /><span><b>03</b> cited answer</span></div>
        </div>
        <div className="featured-footer"><span><span className="stack-dot" /> TypeScript <span className="stack-dot" /> RAG built from scratch <span className="stack-dot" /> pgvector</span><a href="https://github.com/kasamthapa/codebrain" target="_blank" rel="noopener noreferrer">Inspect the source <span>↗</span></a></div>
      </section>

      <section className="side-projects">
        <div className="side-project-heading"><span className="featured-kicker">BUILT FOR PEOPLE, NOT JUST SCREENS</span><span>More projects <span>↓</span></span></div>
        <div className="side-project-grid">
          <a className="side-project-card sikshya-card" href="https://shikshaxnepal.com" target="_blank" rel="noopener noreferrer">
            <span className="side-project-index">02 / EDUCATION</span><span className="side-project-arrow">↗</span><h3>Sikshya<span>Nepal</span></h3><p>College discovery, admissions, campus updates, and practical student guides in one place.</p><span className="side-project-link">Explore the platform <b>↗</b></span>
          </a>
          <a className="side-project-card critch-card" href="https://critch-neon.vercel.app" target="_blank" rel="noopener noreferrer">
            <span className="side-project-index">03 / DEVELOPER COMMUNITY</span><span className="side-project-arrow">↗</span><h3>critch<span>.</span></h3><p>Real feedback for developers who are brave enough to ship.</p><span className="side-project-link">See the project <b>↗</b></span>
          </a>
        </div>
      </section>
    </div>
  )
}

export { Code as HeroCode, Preview as HeroPreview }
