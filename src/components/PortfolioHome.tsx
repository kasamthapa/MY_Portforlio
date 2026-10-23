import { useEffect, useState, type CSSProperties } from 'react'
import { PORTRAIT_BITS, PORTRAIT_COLS, PORTRAIT_ROWS } from '../data/portraitBits'

const socials = [
  { label: 'GitHub', href: 'https://github.com/kasamthapa' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kasamthapamagar' },
  { label: 'X', href: 'https://x.com/kasamthapa89' },
]

const sections = [
  { id: 'home', label: 'Introduction', number: '00' },
  { id: 'work', label: 'Selected work', number: '01' },
  { id: 'about', label: 'A little about me', number: '02' },
  { id: 'contact', label: 'Get in touch', number: '03' },
]

const codeBrainSteps = [
  { title: 'Choose a project', detail: 'Pick a public GitHub repository.' },
  { title: 'Map the code', detail: 'Group TypeScript and JavaScript by structure.' },
  { title: 'Ask a question', detail: 'Find code related to your question.' },
  { title: 'Check the answer', detail: 'Open the cited files and lines.' },
]

const educationSteps = [
  { number: '01', title: 'Explore', text: 'Find colleges and programs' },
  { number: '02', title: 'Compare', text: 'Review your options' },
  { number: '03', title: 'Verify', text: 'Check the official notice' },
  { number: '04', title: 'Plan', text: 'Save your next step' },
]

const pipelineNodes = [
  { title: 'Choose project', note: 'Public GitHub repo', verb: 'READ', icon: '⌘' },
  { title: 'Map code', note: 'Group related code', verb: 'INDEX', icon: 'lines' },
  { title: 'Ask question', note: 'Find matching parts', verb: 'ANSWER', icon: '•••' },
  { title: 'Check sources', note: 'Files + line numbers', verb: '', icon: '[ ↗ ]' },
]

interface Props {
  onOpenEditor: () => void
}

export default function PortfolioHome({ onOpenEditor }: Props) {
  const [activeStep, setActiveStep] = useState(0)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const scrollRoot = document.querySelector('.portfolio-home')
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
      if (visible.length) {
        const current = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        setActiveSection(current.target.id)
      }
    }, { root: scrollRoot, rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.25, 0.5] })

    sections.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    const flowObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('has-entered')
          flowObserver.unobserve(entry.target)
        }
      })
    }, { root: scrollRoot, threshold: 0.18 })
    document.querySelectorAll('.cb-pipeline, .education-flow, .critch-flow').forEach((flow) => flowObserver.observe(flow))
    return () => { observer.disconnect(); flowObserver.disconnect() }
  }, [])

  return (
    <main className="portfolio-home">
      <aside className="portfolio-rail" aria-label="Portfolio navigation">
        <a className="portfolio-brand" href="#home" aria-label="Kasam Thapa Magar home">
          <span className="brand-mark">K<span>.</span></span>
          <span>Kasam Thapa Magar<small>Developer · Kathmandu, Nepal</small></span>
        </a>

        <div className="rail-intro">
          <span className="rail-label">A PRACTICE IN PROGRESS</span>
          <p>Developer working across tools, education, and early-stage products.</p>
        </div>

        <nav className="portfolio-nav" aria-label="Main navigation">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} onClick={() => setActiveSection(section.id)} aria-current={activeSection === section.id ? 'location' : undefined}>
              <span>{section.number}</span>{section.label}
            </a>
          ))}
        </nav>

        <a className="rail-now" href="#work">
          <span className="rail-label"><i /> RIGHT NOW</span>
          <b>CodeBrain</b>
          <span>Helping people find their bearings inside unfamiliar code.</span>
          <span className="rail-now-link">See the project <span>↘</span></span>
        </a>

        <div className="rail-bottom">
          <div className="footer-socials">{socials.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{item.label} ↗</a>)}</div>
          <button className="source-switch" onClick={onOpenEditor}><span className="source-glyph">&lt;/&gt;</span> Explore source view</button>
          <small>BASED IN KATHMANDU · NEPAL</small>
        </div>
      </aside>

      <div className="portfolio-content">
        <section className="portfolio-hero" id="home">
          <div className="portfolio-hero-copy">
            <p className="portfolio-eyebrow"><span /> SOFTWARE FOR THE MOMENT YOU FEEL STUCK</p>
            <h1>Make the next step<br /><em>easier to see.</em></h1>
            <p className="portfolio-lede">
              I’m Kasam. I build useful software for two moments of uncertainty: opening a codebase you don’t know, and figuring out where your education could take you.
            </p>
            <div className="portfolio-hero-actions">
              <a className="button-solid" href="#work">Explore the work <span>↓</span></a>
              <a className="text-link" href="mailto:kasamthapamagar7@gmail.com">Start a conversation <span>↗</span></a>
            </div>
            <div className="hero-caption"><span>01—03</span><span>Small products for real questions.</span></div>
          </div>
          <figure className="portrait-figure" aria-label="A portrait of Kasam drawn with code characters">
            <div className="portrait-figure-orbit" aria-hidden="true" />
            <div className="portrait-glyph" aria-hidden="true">
              {PORTRAIT_BITS.map((bit, i) => (
                <span key={i} style={{
                  top: `${(bit.r / PORTRAIT_ROWS) * 100}%`, left: `${(bit.c / PORTRAIT_COLS) * 100}%`,
                  opacity: bit.op, '--portrait-alpha': bit.op,
                } as CSSProperties}>{bit.ch}</span>
              ))}
            </div>
            <figcaption><span>BIT BY BIT</span><b>KASAM / KTM</b><i>27° 43′ N</i></figcaption>
          </figure>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading">
            <div><span className="section-index">A FEW THINGS I’VE BUILT</span><h2>Work with a reason to exist.</h2></div>
            <span className="section-count">01 — 03</span>
          </div>

          <article className="case-study case-codebrain" id="codebrain">
            <div className="case-index"><span>01 / DEVELOPER TOOLS</span><span className="work-status"><i /> ACTIVE BUILD</span></div>
            <div className="case-intro"><div><p className="work-overline">FIND YOUR WAY THROUGH A NEW CODEBASE</p><h3>CodeBrain<span>.</span></h3></div><p>Ask a codebase a question. Follow the answer back to the code.</p></div>
            <div className="case-visual cb-visual" aria-label="Diagram of CodeBrain's indexing and question answering flow">
              <div className="visual-heading"><span>HOW AN ANSWER HAPPENS</span><span>SELECT A STEP</span></div>
              <div className="cb-pipeline" role="group" aria-label="Choose a CodeBrain pipeline stage">
                {pipelineNodes.map((node, i) => <div className="cb-stage-wrap" key={node.title}>
                  <button className={`cb-node cb-node-${i + 1}`} aria-pressed={activeStep === i} onClick={() => setActiveStep(i)}><span className="node-number">0{i + 1}</span><b>{node.title}</b><small>{node.note}</small><i className={i === 1 ? 'code-lines' : `node-icon icon-${i + 1}`}>{i === 1 ? <><em /><em /><em /></> : node.icon}</i></button>
                  {i < pipelineNodes.length - 1 && <div className="cb-connector"><i>{node.verb}</i><span>→</span></div>}
                </div>)}
              </div>
              <div className="cb-stage-detail" aria-live="polite"><span>0{activeStep + 1} / 04</span><p>{codeBrainSteps[activeStep].detail}</p></div>
              <div className="cb-result"><span>THE RESULT</span><b>A plain-language answer with links to the source code.</b><i>↗</i></div>
            </div>
            <div className="case-bottom"><span className="case-cta-note">Early tests exposed a retrieval gap.</span><div className="case-actions"><a className="button-solid" href="https://codebrain-gamma.vercel.app" target="_blank" rel="noopener noreferrer">Open CodeBrain <span>↗</span></a><a className="text-link" href="https://github.com/kasamthapa/codebrain" target="_blank" rel="noopener noreferrer">Source <span>↗</span></a></div></div>
            <details className="case-builder"><summary>How it works <span>CODE · SEARCH · TESTING</span></summary><div><p>TypeScript and JavaScript are split by syntax structure, embedded with Gemini, and stored in PostgreSQL / pgvector. A question retrieves the five closest code chunks, then Gemini streams an answer with file and line context.</p><p><b>First manual evaluation:</b> 0 of 20 expected chunks were retrieved across 14 questions; 13 of 14 answers were faithful to the supplied context. Known edges include missing expression-only statements, no-op re-indexing, and support for TS / JS only. Proposed retrieval fixes are still proposals.</p><p><b>Stack:</b> React · TypeScript · Express · PostgreSQL · pgvector · Gemini · server-sent events</p></div></details>
          </article>

          <article className="case-study case-sikshya" id="sikshyanepal">
            <div className="case-index"><span>02 / EDUCATION · NEPAL</span><span>STUDENT-FIRST GUIDE</span></div>
            <div className="case-intro"><div><p className="work-overline">MAKE THE EDUCATION JOURNEY EASIER TO FOLLOW</p><h3>SikshyaNepal<span>.</span></h3></div><p>Go from exploring colleges to planning your next step.</p></div>
            <div className="education-flow" aria-label="Student journey: explore, compare, verify, plan">
              {educationSteps.map((step, i) => <div className="education-flow-step" key={step.number}><span>{step.number}</span><b>{step.title}</b><small>{step.text}</small>{i < educationSteps.length - 1 && <i aria-hidden="true">→</i>}</div>)}
            </div>
            <div className="education-source-note"><span>✓</span><p><b>Before you decide:</b> confirm dates, fees, and requirements with the institution’s official notice.</p></div>
            <div className="case-bottom"><span className="case-cta-note">A clearer place to research what comes next.</span><div className="case-actions"><a className="button-solid" href="https://shikshaxnepal.com" target="_blank" rel="noopener noreferrer">Visit SikshyaNepal <span>↗</span></a></div></div>
            <details className="case-builder"><summary>More about the product <span>FEATURES · SOURCES · STACK</span></summary><div><p>College and school discovery, program research, admission updates, source links, and a private checklist help students continue where they left off. Dates, fees, and requirements should be checked with the original institution notice.</p><p><b>Stack:</b> Next.js · React · TypeScript · Supabase · PostgreSQL</p></div></details>
          </article>

          <article className="case-study case-critch" id="critch">
            <div className="case-index"><span>03 / DEVELOPER COMMUNITY</span><span>STRUCTURED PEER REVIEW</span></div>
            <div className="case-intro"><div><p className="work-overline">TURN “NICE WORK” INTO USEFUL FEEDBACK</p><h3>Critch<span>.</span></h3></div><p>A simple path from sharing a project to knowing what to improve.</p></div>
            <div className="critch-flow" aria-label="Critch process: share a project, get structured feedback, discuss it, improve">
              <div className="critch-flow-step"><span>01</span><b>Share</b><small>Post your project</small></div>
              <div className="critch-flow-step"><span>02</span><b>Review</b><small>Idea · UI · code · docs</small></div>
              <div className="critch-flow-step"><span>03</span><b>Discuss</b><small>Reply in a thread</small></div>
              <div className="critch-flow-step"><span>04</span><b>Improve</b><small>Leave with a next step</small></div>
            </div>
            <div className="critch-rule-note">One review per person, per project. Reputation grows from giving and receiving feedback.</div>
            <div className="case-bottom"><span className="case-cta-note">Specific feedback. A conversation. A next step.</span><div className="case-actions"><a className="button-solid" href="https://critch-neon.vercel.app" target="_blank" rel="noopener noreferrer">Open Critch <span>↗</span></a><a className="text-link" href="https://github.com/kasamthapa/critch" target="_blank" rel="noopener noreferrer">Source <span>↗</span></a></div></div>
            <details className="case-builder"><summary>More about Critch <span>RULES · STACK · DEPLOYMENT</span></summary><div><p>Projects can be shared and discovered; signed-in users leave structured reviews, threaded replies, and public profiles. Reputation reflects reviews given and received.</p><p><b>Known demo limit:</b> without a shared custom domain, browser cookie restrictions can expire sessions after 15 minutes.</p><p><b>Stack:</b> React · TypeScript · Express · PostgreSQL · Prisma · Cloudinary · JWT</p></div></details>
          </article>
        </section>

        <section className="about-section" id="about">
          <div className="section-heading"><div><span className="section-index">THE PERSON BEHIND THE BUILDS</span><h2>Curious about the whole path.</h2></div></div>
          <div className="about-body">
            <p>I’m a full-stack developer in Kathmandu, Nepal. I like the moment a confusing problem becomes a useful tool: working out what people need, making the system dependable, and explaining how the pieces fit together.</p>
            <div className="about-facts">
              <div><span>RIGHT NOW</span><p>CodeBrain · SikshyaNepal</p></div>
              <div><span>TOOLS I REACH FOR</span><p>TypeScript · React · Node.js · PostgreSQL</p></div>
              <div><span>WHAT I CARE ABOUT</span><p>Developer tools · education · useful AI</p></div>
              <a href="https://github.com/kasamthapa" target="_blank" rel="noopener noreferrer">More experiments and code on GitHub ↗</a>
            </div>
          </div>
        </section>

        <footer className="portfolio-footer" id="contact">
          <div><span className="section-index">HAVE A GOOD PROBLEM?</span><h2>Let’s make it clearer.</h2><a href="mailto:kasamthapamagar7@gmail.com">kasamthapamagar7@gmail.com <span>↗</span></a></div>
          <div className="footer-right"><button className="source-switch" onClick={onOpenEditor}><span className="source-glyph">&lt;/&gt;</span> Explore source view</button><span>Thoughtful systems. Useful details.</span></div>
        </footer>
      </div>
    </main>
  )
}
