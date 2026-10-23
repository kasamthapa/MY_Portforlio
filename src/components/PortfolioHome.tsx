import { useEffect, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
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

const showcaseProjects = [
  { name: 'CodeBrain', kind: 'DEVELOPER TOOLS', note: 'Ask a codebase. Follow the answer to its source.', href: 'https://codebrain-gamma.vercel.app', target: 'codebrain' },
  { name: 'SikshyaNepal', kind: 'EDUCATION · NEPAL', note: 'Explore your options. Make the next step clearer.', href: 'https://shikshaxnepal.com', target: 'sikshyanepal' },
  { name: 'Critch', kind: 'PEER FEEDBACK', note: 'Turn “nice work” into a useful next move.', href: 'https://critch-neon.vercel.app', target: 'critch' },
]

interface Props {
  onOpenEditor: () => void
}

export default function PortfolioHome({ onOpenEditor }: Props) {
  const [activeStep, setActiveStep] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [monochrome, setMonochrome] = useState(false)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const updateClock = () => setClock(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()))
    updateClock()
    const clockTimer = window.setInterval(updateClock, 1000)
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
    document.querySelectorAll('.cb-pipeline, .education-flow, .critch-flow, .portfolio-hero, .section-heading, .case-study, .about-body, .portfolio-footer').forEach((flow) => flowObserver.observe(flow))
    return () => { observer.disconnect(); flowObserver.disconnect(); window.clearInterval(clockTimer) }
  }, [])

  const moveProject = (direction: number) => setActiveProject((current) => (current + direction + showcaseProjects.length) % showcaseProjects.length)
  const handleGalleryKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveProject(-1) }
    if (event.key === 'ArrowRight') { event.preventDefault(); moveProject(1) }
    const targetIsActiveCard = event.target instanceof Element && event.target.closest('.gallery-center') !== null
    if (event.key === 'Enter' && (event.target === event.currentTarget || targetIsActiveCard)) {
      event.preventDefault()
      window.location.assign(showcaseProjects[activeProject].href)
    }
  }
  const handleStagePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--light-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
    event.currentTarget.style.setProperty('--light-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
  }

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
        <section className="intro-experience" id="home" aria-labelledby="intro-title">
          <div className="intro-grain" aria-hidden="true" />
          <div className="intro-meta"><span><i /> INDEPENDENT DEVELOPER · KATHMANDU, NEPAL</span><span>27° 43′ N&nbsp;&nbsp; 85° 19′ E</span></div>
          <div className="intro-main">
            <div className="intro-copy">
              <p className="intro-kicker">HELLO, WORLD. I’M KASAM.</p>
              <h1 id="intro-title">I make<br />the <em>complex</em><br />feel clear<span>.</span></h1>
              <p className="intro-description">Full-stack developer building thoughtful tools for people finding their way through code, education, and everything in between.</p>
              <div className="intro-actions"><a href="#work" className="intro-primary">EXPLORE MY WORK <span>↘</span></a><a href="mailto:kasamthapamagar7@gmail.com" className="intro-contact">SAY HELLO ↗</a></div>
            </div>
            <div className="intro-object" aria-hidden="true">
              <div className="intro-orbit intro-orbit-one" /><div className="intro-orbit intro-orbit-two" />
              <div className="intro-portrait-card">
                <span className="intro-poster-kicker">KASAM / THAPA MAGAR</span>
                <div className="intro-poster-image"><span className="intro-poster-title">KASAM</span><div className="portrait-glyph">{PORTRAIT_BITS.map((bit, i) => <span key={i} style={{ top: `${(bit.r / PORTRAIT_ROWS) * 100}%`, left: `${(bit.c / PORTRAIT_COLS) * 100}%`, opacity: bit.op, '--portrait-alpha': bit.op } as CSSProperties}>{bit.ch}</span>)}</div><span className="intro-poster-coordinate">27° 43′ N&nbsp; / &nbsp;KTM</span></div>
                <div className="intro-poster-caption"><span>FULL-STACK DEVELOPER</span><i>INDEPENDENT · 2026</i></div>
              </div>
              <span className="intro-object-label">SOFTWARE, MADE<br />IN KATHMANDU</span>
            </div>
          </div>
          <div className="intro-bottom"><span>SOFTWARE WITH A HUMAN POINT OF VIEW</span><a href="#work"><span>SCROLL TO EXPLORE</span><i>↓</i></a><span>01 — 04 / INTRODUCTION</span></div>
        </section>

        <section className="portfolio-hero" id="work">
          <div className={`showcase-stage${monochrome ? ' is-mono' : ''}`} onKeyDown={handleGalleryKeyDown} onPointerMove={handleStagePointerMove} onPointerLeave={(event) => { event.currentTarget.style.setProperty('--light-x', '50%'); event.currentTarget.style.setProperty('--light-y', '42%') }} tabIndex={0} aria-label="Interactive project gallery. Use left and right arrow keys to change projects. Press Enter to open the selected project.">
            <div className="showcase-grain" aria-hidden="true" />
            <div className="showcase-topline"><span className="showcase-system"><i /> KASAM / WORKSPACE</span><span className="showcase-clock">{clock} <i>·</i> KTM</span><div className="showcase-tools"><button className="mono-toggle" aria-pressed={monochrome} onClick={() => setMonochrome((value) => !value)}><i /> B&W <b>{monochrome ? 'ON' : 'OFF'}</b></button><button onClick={onOpenEditor} className="showcase-source">&lt;/&gt; SOURCE</button></div></div>
            <div className="showcase-intro"><span>SELECTED WORK / 2024—26</span><p>Small tools for the moment you feel stuck.</p></div>
            <div className="showcase-carousel" aria-label="Project carousel">
              <button className="gallery-arrow gallery-previous" aria-label="Previous project" onClick={() => moveProject(-1)}>←</button>
              <div className="gallery-deck">
                {showcaseProjects.map((project, i) => {
                  const relative = (i - activeProject + showcaseProjects.length) % showcaseProjects.length
                  const position = relative === 0 ? 'center' : relative === 1 ? 'right' : 'left'
                  return <button key={project.name} className={`gallery-card gallery-${position}`} onClick={() => setActiveProject(i)} aria-pressed={activeProject === i} aria-label={`${project.name}, ${project.kind}. Select project`}>
                    <div className={`project-window project-window-${project.target}`}>
                      <div className="window-bar"><span><i /><i /><i /></span><b>{project.name.toUpperCase()}</b><span>↗</span></div>
                      {project.target === 'codebrain' && <div className="poster-art poster-brain"><div className="mock-kicker"><span>AI CODEBASE GUIDE</span><i>01 / 03</i></div><h2 className="mock-title">Understand<br /><em>the code.</em></h2><div className="mock-terminal"><div className="mock-terminal-top"><i /><i /><i /><span>codebrain — /usr/bin/env</span></div><div className="mock-terminal-copy"><small>loaded. paste a repository to begin.</small><b><i>›</i> codebrain --init</b><strong>Code<span>Brain</span></strong><div className="mock-prompt"><span>repo&gt;</span> github.com/…</div></div></div><div className="mock-footnote"><span>ASK → TRACE → UNDERSTAND</span><span>↗ 01</span></div></div>}
                      {project.target === 'sikshyanepal' && <div className="poster-art poster-education"><div className="mock-kicker"><span>STUDENT FIELD GUIDE / NP</span><i>02 / 03</i></div><h2 className="mock-title"><strong>+2 done.</strong><br /><em>Now what?</em></h2><p className="mock-description">Find what to study after +2, and where.</p><div className="mock-search"><span>⌕</span><i>e.g. BCA colleges in Kathmandu</i><b>Search&nbsp; →</b></div><div className="mock-chips"><span>IT &amp; Computing</span><span>Management</span><span>Humanities</span></div><div className="mock-notice"><small>◌ &nbsp;LATEST NOTICE</small><b>Admissions &amp; results, in one place.</b><span>VIEW OFFICIAL SOURCE&nbsp; ↗</span></div><div className="mock-footnote"><span>COLLEGES · PROGRAMS · NEXT STEPS</span><span>↗ 02</span></div></div>}
                      {project.target === 'critch' && <div className="poster-art poster-critch"><div className="mock-kicker"><span>CRITCH / EXPLORE</span><i>03 / 03</i></div><h2 className="mock-title">Projects<span>.</span></h2><p className="mock-description">Browse and review work from the developer community.</p><div className="mock-project-card"><div className="mock-project-art"><span>WORK IN PROGRESS</span><b>MAKE<br />SOMETHING<br /><em>MATTER.</em></b><i>PROJECT / 001</i></div><div className="mock-project-meta"><b>Personal project</b><span>IDEA&nbsp; · &nbsp;UI&nbsp; · &nbsp;CODE&nbsp; · &nbsp;DOCS</span><div><i>01</i><i>02</i><i>03</i><i>04</i></div></div></div><div className="mock-footnote"><span>SPECIFIC FEEDBACK. NEXT STEPS.</span><span>↗ 03</span></div></div>}
                    </div>
                    <span className="gallery-card-kind">{project.kind}</span>
                  </button>
                })}
              </div>
              <button className="gallery-arrow gallery-next" aria-label="Next project" onClick={() => moveProject(1)}>→</button>
            </div>
            <div className="showcase-caption"><div className="showcase-selected"><span>{String(activeProject + 1).padStart(2, '0')} / 03 · {showcaseProjects[activeProject].kind}</span><h1>{showcaseProjects[activeProject].name}<i>.</i></h1><p>{showcaseProjects[activeProject].note}</p></div><div className="showcase-actions"><a className="showcase-open" href={showcaseProjects[activeProject].href} target="_blank" rel="noopener noreferrer">OPEN PROJECT <span>↗</span></a><a className="showcase-case-link" href={`#${showcaseProjects[activeProject].target}`}>CASE NOTES ↓</a></div><div className="showcase-hint"><span>← →</span><small>MOVE THROUGH WORK</small><div>{showcaseProjects.map((project, i) => <button key={project.name} aria-label={`Show ${project.name}`} aria-current={i === activeProject ? 'true' : undefined} onClick={() => setActiveProject(i)} />)}</div></div></div>
            <div className="showcase-bottomline"><span>FULL-STACK DEVELOPER</span><span>KATHMANDU, NEPAL</span><a href="mailto:kasamthapamagar7@gmail.com">SAY HELLO ↗</a></div>
          </div>
        </section>

        <section className="work-section" id="case-studies">
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
          <div className="contact-copy"><span className="section-index">HAVE A GOOD PROBLEM?</span><h2>Let’s make it clearer.</h2><a className="contact-email" href="mailto:kasamthapamagar7@gmail.com">kasamthapamagar7@gmail.com <span>↗</span></a><nav className="contact-socials" aria-label="Find me online">{socials.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{item.label}<span>↗</span></a>)}</nav></div>
          <div className="footer-right"><span className="contact-index">KASAM / KTM&nbsp; · &nbsp;27° 43′ N</span><button className="source-switch" onClick={onOpenEditor}><span className="source-glyph">&lt;/&gt;</span> Explore source view</button><span>Thoughtful systems. Useful details.</span></div>
        </footer>
      </div>
    </main>
  )
}
