import { useState, type CSSProperties } from 'react'
import { PORTRAIT_BITS, PORTRAIT_COLS, PORTRAIT_ROWS } from '../data/portraitBits'

const socials = [
  { label: 'GitHub', href: 'https://github.com/kasamthapa' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kasamthapamagar' },
  { label: 'X', href: 'https://x.com/kasamthapa89' },
]

const codeBrainSteps = [
  { title: 'Pick a repository', detail: 'Start with a public GitHub repository. CodeBrain filters out generated files and other noise before indexing.' },
  { title: 'Map the code', detail: 'TypeScript and JavaScript are parsed into meaningful pieces—functions, classes, and imports—instead of arbitrary line ranges.' },
  { title: 'Ask a question', detail: 'Your question is matched against the repository’s code so the response stays tied to the project you chose.' },
  { title: 'Follow the sources', detail: 'Answers point back to files and line ranges, so you can inspect the code for yourself.' },
]

interface Props {
  onOpenEditor: () => void
}

export default function PortfolioHome({ onOpenEditor }: Props) {
  const [activeStep, setActiveStep] = useState(0)
  const [showTechnicalNotes, setShowTechnicalNotes] = useState(false)

  return (
    <main className="portfolio-home">
      <header className="portfolio-header">
        <a className="portfolio-brand" href="#home" aria-label="Kasam Thapa Magar home">
          <span className="brand-mark">K</span>
          <span>Kasam Thapa Magar<small>Developer · Kathmandu, Nepal</small></span>
        </a>
        <nav className="portfolio-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="source-switch" onClick={onOpenEditor}>
          <span className="source-glyph">&lt;/&gt;</span> Open VS Code view
        </button>
      </header>

      <section className="portfolio-hero" id="home">
        <div className="portfolio-hero-copy">
          <p className="portfolio-eyebrow"><span /> FULL-STACK DEVELOPER <i>·</i> KATHMANDU, NEPAL</p>
          <h1>I make software<br />that makes sense.</h1>
          <p className="portfolio-lede">
            I’m Kasam. I turn messy, real-world problems into clear, useful products—from helping developers understand code to helping students find their next step.
          </p>
          <div className="portfolio-hero-actions">
            <a className="button-solid" href="#work">See what I’ve built <span>↓</span></a>
            <a className="text-link" href="mailto:kasamthapamagar7@gmail.com">Get in touch <span>↗</span></a>
          </div>
        </div>
        <div className="portrait-figure" aria-label="A portrait drawn with code characters">
          <div className="portrait-glyph" aria-hidden="true">
            {PORTRAIT_BITS.map((bit, i) => (
              <span key={i} style={{
                top: `${(bit.r / PORTRAIT_ROWS) * 100}%`, left: `${(bit.c / PORTRAIT_COLS) * 100}%`,
                opacity: bit.op, '--portrait-alpha': bit.op,
              } as CSSProperties}>{bit.ch}</span>
            ))}
          </div>
          <div className="portrait-figure-caption"><span>BUILT FROM BITS</span><b>KASAM / KTM</b><i>∞ 0001 1010</i></div>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div><span className="section-index">SELECTED WORK</span><h2>Things I’ve made</h2></div>
          <span className="section-count">01 — 03</span>
        </div>

        <article className="work-card work-featured">
          <div className="work-card-top"><span>01 / DEVELOPER TOOLS</span><span className="work-status"><i /> BUILDING IN PUBLIC</span></div>
          <div className="work-featured-grid">
            <div className="work-copy">
              <h3>CodeBrain</h3>
              <p className="work-question">“Where do I even start?”</p>
              <p className="work-description">When you open a project you don’t know, finding the right file can take longer than understanding the problem. CodeBrain lets you ask a repository questions in plain language and follow answers back to the code that supports them.</p>
              <div className="work-actions">
                <a className="button-solid" href="https://codebrain-gamma.vercel.app" target="_blank" rel="noopener noreferrer">Try CodeBrain <span>↗</span></a>
                <a className="text-link" href="https://github.com/kasamthapa/codebrain" target="_blank" rel="noopener noreferrer">Browse project source <span>↗</span></a>
              </div>
            </div>
            <div className="codebrain-explainer" aria-label="How CodeBrain works">
              <div className="explainer-head"><span>FROM QUESTION TO SOURCE</span><span>SELECT A STEP</span></div>
              <div className="step-selector" role="group" aria-label="Choose a CodeBrain step">
                {codeBrainSteps.map((step, i) => <button key={step.title} aria-pressed={activeStep === i} onClick={() => setActiveStep(i)}><span>0{i + 1}</span>{step.title}</button>)}
              </div>
              <div className="step-detail" aria-live="polite"><span>0{activeStep + 1} / 04</span><p>{codeBrainSteps[activeStep].detail}</p></div>
            </div>
          </div>
          <button className="technical-toggle" aria-expanded={showTechnicalNotes} onClick={() => setShowTechnicalNotes((visible) => !visible)}>{showTechnicalNotes ? 'Hide' : 'For developers: how it’s built'} <span>{showTechnicalNotes ? '−' : '+'}</span></button>
          {showTechnicalNotes && <div className="technical-notes"><p>Built without a framework for retrieval: AST-aware chunking with <code>@typescript-eslint/parser</code>, embeddings stored in PostgreSQL with <code>pgvector</code>, and cited answers generated through the Gemini API.</p><a href="https://github.com/kasamthapa/codebrain" target="_blank" rel="noopener noreferrer">Explore the implementation on GitHub ↗</a></div>}
          <div className="work-card-footer"><span>React</span><span>TypeScript</span><span>Node.js</span><span>PostgreSQL + pgvector</span><span>Gemini API</span></div>
        </article>

        <div className="work-grid">
          <article className="work-card work-secondary">
            <div className="work-card-top"><span>02 / EDUCATION</span><span>NEPAL</span></div>
            <div className="sikshya-art" aria-hidden="true"><span>STUDENT GUIDE</span><b>Find your<br />next step.</b><i>COLLEGES · PROGRAMS · NOTICES</i><small>↗</small></div>
            <h3>SikshyaNepal</h3>
            <p className="work-question">A clearer starting point for students.</p>
            <p className="work-description">Find colleges and programs, follow admissions and campus updates, and get practical student guides—all in one place, with links back to official sources.</p>
            <a className="text-link" href="https://shikshaxnepal.com" target="_blank" rel="noopener noreferrer">Visit SikshyaNepal <span>↗</span></a>
          </article>
          <article className="work-card work-secondary">
            <div className="work-card-top"><span>03 / DEVELOPER COMMUNITY</span><span>BUILT TOGETHER</span></div>
            <div className="critch-art" aria-hidden="true"><span>PROJECT REVIEW / 01</span><b>Clear feedback,<br />made useful.</b><div><i /><i /><i /><i /></div><small>IDEA <span>INTERFACE</span> CODE <span>DOCS</span></small></div>
            <h3>Critch</h3>
            <p className="work-question">Feedback that gives you something to work with.</p>
            <p className="work-description">A place to share a developer project and get structured reviews on the idea, interface, code quality, and documentation.</p>
            <a className="text-link" href="https://critch-neon.vercel.app" target="_blank" rel="noopener noreferrer">Visit Critch <span>↗</span></a>
          </article>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="section-heading"><div><span className="section-index">A LITTLE CONTEXT</span><h2>About me</h2></div></div>
        <div className="about-body">
          <p>I’m a full-stack developer based in Kathmandu, Nepal. I learn by shipping real things, listening to how people use them, and improving the parts that get in the way. I care about the whole path—from the first question to the last small detail.</p>
          <div className="about-facts"><span>What I’m building</span><p>CodeBrain · SikshyaNepal</p><span>Tools I reach for</span><p>TypeScript · React · Node.js · PostgreSQL</p><span>How I work</span><p>Start small. Explain the tradeoffs. Keep learning.</p></div>
        </div>
      </section>

      <footer className="portfolio-footer" id="contact">
        <div><span className="section-index">HAVE A GOOD PROBLEM?</span><h2>Let’s make it clearer.</h2><a href="mailto:kasamthapamagar7@gmail.com">kasamthapamagar7@gmail.com <span>↗</span></a></div>
        <div className="footer-right"><button className="source-switch" onClick={onOpenEditor}><span className="source-glyph">&lt;/&gt;</span> Open VS Code view</button><div className="footer-socials">{socials.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{item.label} ↗</a>)}</div><small>Designed and built by Kasam · Kathmandu, Nepal</small></div>
      </footer>
    </main>
  )
}
