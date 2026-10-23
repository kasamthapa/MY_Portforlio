const socials = [
  { label: 'GitHub', href: 'https://github.com/kasamthapa' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kasamthapamagar' },
  { label: 'X', href: 'https://x.com/kasamthapa89' },
]

interface Props {
  onOpenEditor: () => void
}

export default function PortfolioHome({ onOpenEditor }: Props) {
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
        <div className="portfolio-hero-note" aria-label="My approach">
          <span className="note-index">A NOTE ON HOW I BUILD</span>
          <p>Start with the real problem.<br />Make the next step obvious.<br />Show your work.</p>
          <span className="note-signature">— Kasam</span>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div><span className="section-index">SELECTED WORK</span><h2>Things I’ve made</h2></div>
          <span className="section-count">01 — 03</span>
        </div>

        <article className="work-card work-featured">
          <div className="work-card-top"><span>01 / DEVELOPER TOOLS</span><span className="work-status"><i /> IN PROGRESS</span></div>
          <div className="work-featured-grid">
            <div className="work-copy">
              <h3>CodeBrain</h3>
              <p className="work-question">“What does this codebase actually do?”</p>
              <p className="work-description">CodeBrain lets you ask questions about a GitHub project and get answers grounded in its code, with links to the files and lines behind them. It’s built to make an unfamiliar codebase less intimidating.</p>
              <div className="work-actions">
                <a className="button-solid" href="https://codebrain-gamma.vercel.app" target="_blank" rel="noopener noreferrer">Try CodeBrain <span>↗</span></a>
                <a className="text-link" href="https://github.com/kasamthapa/codebrain" target="_blank" rel="noopener noreferrer">See the project code <span>↗</span></a>
              </div>
            </div>
            <div className="codebrain-explainer" aria-label="How CodeBrain works">
              <div className="explainer-head"><span>HOW IT WORKS</span><span>IN THREE STEPS</span></div>
              <div className="explainer-step"><span className="step-number">01</span><div><b>Choose a repository</b><small>Point CodeBrain at a public GitHub project.</small></div></div>
              <div className="step-connector" />
              <div className="explainer-step"><span className="step-number">02</span><div><b>Ask in plain language</b><small>No need to know where the answer lives.</small></div></div>
              <div className="step-connector" />
              <div className="explainer-step"><span className="step-number">03</span><div><b>Follow the answer back</b><small>See the source files and line references.</small></div></div>
            </div>
          </div>
          <div className="work-card-footer"><span>React</span><span>TypeScript</span><span>Node.js</span><span>PostgreSQL + pgvector</span><span>Retrieval augmented generation</span></div>
        </article>

        <div className="work-grid">
          <article className="work-card work-secondary">
            <div className="work-card-top"><span>02 / EDUCATION</span><span>NEPAL</span></div>
            <h3>SikshyaNepal</h3>
            <p className="work-question">A clearer starting point for students.</p>
            <p className="work-description">Find colleges and programs, follow admissions and campus updates, and get practical student guides—all in one place, with links back to official sources.</p>
            <a className="text-link" href="https://shikshaxnepal.com" target="_blank" rel="noopener noreferrer">Visit SikshyaNepal <span>↗</span></a>
          </article>
          <article className="work-card work-secondary">
            <div className="work-card-top"><span>03 / DEVELOPER COMMUNITY</span><span>BUILT TOGETHER</span></div>
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
          <p>I’m a full-stack developer based in Kathmandu, Nepal. I like working across the whole product: understanding the problem, shaping the experience, building the system, and making the details feel considered.</p>
          <div className="about-facts"><span>Usually working with</span><p>TypeScript · React · Node.js · PostgreSQL</p><span>Interested in</span><p>Developer tools · useful AI · education</p></div>
        </div>
      </section>

      <footer className="portfolio-footer" id="contact">
        <div><span className="section-index">HAVE A GOOD PROBLEM?</span><h2>Let’s make it clearer.</h2><a href="mailto:kasamthapamagar7@gmail.com">kasamthapamagar7@gmail.com <span>↗</span></a></div>
        <div className="footer-right"><button className="source-switch" onClick={onOpenEditor}><span className="source-glyph">&lt;/&gt;</span> Open VS Code view</button><div className="footer-socials">{socials.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{item.label} ↗</a>)}</div><small>Designed and built by Kasam · Kathmandu, Nepal</small></div>
      </footer>
    </main>
  )
}
