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
  { title: 'Choose a repository', detail: 'Start with a public GitHub repository. CodeBrain filters generated files and other noise before it indexes the project.' },
  { title: 'Map the code', detail: 'TypeScript and JavaScript are parsed into functions, classes, and imports. The pieces follow the shape of the code.' },
  { title: 'Ask in plain language', detail: 'Ask about the project in everyday words. CodeBrain retrieves relevant code from the repository you selected.' },
  { title: 'Follow the answer', detail: 'Responses include file and line references, so you can check the explanation against the source.' },
]

interface Props {
  onOpenEditor: () => void
}

export default function PortfolioHome({ onOpenEditor }: Props) {
  const [activeStep, setActiveStep] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [showTechnicalNotes, setShowTechnicalNotes] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
      if (visible.length) {
        const current = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        setActiveSection(current.target.id)
      }
    }, { root: document.querySelector('.portfolio-home'), rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.25, 0.5] })

    sections.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
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

          <article className="work-card work-featured" id="codebrain">
            <div className="work-card-top"><span>01 <i>·</i> DEVELOPER TOOLS</span><span className="work-status"><i /> IN PROGRESS</span></div>
            <div className="work-featured-grid">
              <div className="work-copy">
                <p className="work-overline">A guide for the code you haven’t met yet</p>
                <h3>CodeBrain<span>.</span></h3>
                <p className="work-question">“Where do I even start?”</p>
                <p className="work-description">An unfamiliar project can feel like a map without a legend. CodeBrain lets you ask questions in plain language, then follow its answers back to the files and lines that support them.</p>
                <div className="work-actions">
                  <a className="button-solid" href="https://codebrain-gamma.vercel.app" target="_blank" rel="noopener noreferrer">Try CodeBrain <span>↗</span></a>
                  <a className="text-link" href="https://github.com/kasamthapa/codebrain" target="_blank" rel="noopener noreferrer">Read the source <span>↗</span></a>
                </div>
              </div>

              <div className="codebrain-explainer" aria-label="Interactive guide to how CodeBrain works">
                <div className="explainer-windowbar"><span><i /><i /><i /></span><span>HOW AN ANSWER TAKES SHAPE</span><span>CODEBRAIN / 01</span></div>
                <div className="explainer-body">
                  <div className="step-selector" role="group" aria-label="Choose a CodeBrain step">
                    {codeBrainSteps.map((step, i) => <button key={step.title} aria-pressed={activeStep === i} onClick={() => setActiveStep(i)}><span>0{i + 1}</span>{step.title}<i>↗</i></button>)}
                  </div>
                  <div className="step-detail" aria-live="polite">
                    <span className="step-detail-label">0{activeStep + 1} <i>/</i> 04 — THE PATH</span>
                    <p>{codeBrainSteps[activeStep].detail}</p>
                    <div className="step-progress" aria-hidden="true"><i style={{ width: `${((activeStep + 1) / codeBrainSteps.length) * 100}%` }} /></div>
                  </div>
                </div>
                <div className="explainer-foot"><span>INPUT <b>QUESTION</b></span><i>→</i><span>OUTPUT <b>GROUNDED ANSWER</b></span></div>
              </div>
            </div>
            <div className="project-principle"><span>THE IMPORTANT CHOICE</span><p>Break code at its structure—functions and classes—not arbitrary line counts. Keep answers traceable to their source.</p></div>
            <button className="technical-toggle" aria-expanded={showTechnicalNotes} onClick={() => setShowTechnicalNotes((visible) => !visible)}>{showTechnicalNotes ? 'Close builder notes' : 'For builders: decisions & trade-offs'} <span>{showTechnicalNotes ? '−' : '+'}</span></button>
            {showTechnicalNotes && <div className="technical-notes"><p>AST-aware chunking with <code>@typescript-eslint/parser</code> preserves code structure; PostgreSQL with <code>pgvector</code> keeps vectors beside the existing data; Gemini generates cited answers.</p><p><b>Current boundary:</b> parsing focuses on TypeScript and JavaScript. Other languages and longer-term conversation memory remain future work.</p><a href="https://github.com/kasamthapa/codebrain" target="_blank" rel="noopener noreferrer">Inspect the implementation on GitHub ↗</a></div>}
            <div className="work-card-footer"><span>TypeScript</span><span>Node.js</span><span>PostgreSQL + pgvector</span><span>Gemini API</span></div>
          </article>

          <div className="work-grid">
            <article className="work-card work-secondary">
              <div className="work-card-top"><span>02 <i>·</i> EDUCATION</span><span>NEPAL</span></div>
              <div className="sikshya-art" aria-label="The student journey through SikshyaNepal">
                <div className="artifact-topline"><span>SIKSHYANEPAL / FIELD GUIDE</span><span>02</span></div>
                <b>Make a big choice<br />one step at a time.</b>
                <div className="student-path"><span>COLLEGES</span><i /><span>ADMISSIONS</span><i /><span>UPDATES</span><i /><span>GUIDES</span></div>
                <small>COLLEGES · PROGRAMS · ADMISSIONS · GUIDES</small>
              </div>
              <h3>SikshyaNepal</h3>
              <p className="work-question">A clearer place to begin your next chapter.</p>
              <p className="work-description">Students and families shouldn’t have to piece together their options from scattered notices. SikshyaNepal brings college discovery, admissions, campus updates, and practical guides into one place.</p>
              <div className="project-principle"><span>DESIGNED AROUND</span><p>Finding options, understanding the process, then checking official sources before making a decision.</p></div>
              <a className="text-link project-link" href="https://shikshaxnepal.com" target="_blank" rel="noopener noreferrer">Explore SikshyaNepal <span>↗</span></a>
            </article>

            <article className="work-card work-secondary">
              <div className="work-card-top"><span>03 <i>·</i> DEVELOPER COMMUNITY</span><span>CRITCH</span></div>
              <div className="critch-art" aria-label="Critch's four project review areas">
                <div className="artifact-topline"><span>CRITCH / PROJECT REVIEW</span><span>03</span></div>
                <b>Make feedback<br />useful enough to act on.</b>
                <div className="review-dimensions"><span><i>01</i> IDEA</span><span><i>02</i> INTERFACE</span><span><i>03</i> CODE</span><span><i>04</i> DOCS</span></div>
                <small>FOUR LENSES · ONE CONVERSATION</small>
              </div>
              <h3>Critch</h3>
              <p className="work-question">A project review should leave you with a next move.</p>
              <p className="work-description">Critch helps developers share what they’re making and receive structured peer feedback on the idea, interface, code quality, and documentation.</p>
              <div className="project-principle"><span>DESIGNED AROUND</span><p>Four separate review areas make feedback specific. Threaded comments give a reviewer and builder somewhere to talk it through.</p></div>
              <div className="project-links">
                <a className="text-link project-link" href="https://critch-neon.vercel.app" target="_blank" rel="noopener noreferrer">See Critch in action <span>↗</span></a>
                <a className="text-link project-link" href="https://github.com/kasamthapa/critch" target="_blank" rel="noopener noreferrer">Read the source <span>↗</span></a>
              </div>
            </article>
          </div>
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
