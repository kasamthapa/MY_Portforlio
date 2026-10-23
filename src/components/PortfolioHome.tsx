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

const educationSteps = [
  { number: '01', title: 'Explore', text: 'Start with a place, subject, or kind of study you have in mind.' },
  { number: '02', title: 'Compare', text: 'Bring programs, costs, and requirements into the same view.' },
  { number: '03', title: 'Verify', text: 'Open the original institution notice before relying on a date or requirement.' },
  { number: '04', title: 'Plan', text: 'Save options and keep the next research step somewhere you can find it.' },
]

const pipelineNodes = [
  { title: 'Public repo', note: 'Choose a GitHub project', verb: 'FETCH', icon: '⌘' },
  { title: 'Code map', note: 'Keep meaningful TS / JS units', verb: 'INDEX', icon: 'lines' },
  { title: 'Searchable memory', note: 'Embeddings in Postgres', verb: 'RETRIEVE', icon: '•••' },
  { title: 'Answer + sources', note: 'Read the cited files yourself', verb: '', icon: '[ ↗ ]' },
]

interface Props {
  onOpenEditor: () => void
}

export default function PortfolioHome({ onOpenEditor }: Props) {
  const [activeStep, setActiveStep] = useState(0)
  const [activeSection, setActiveSection] = useState('home')

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

          <article className="case-study case-codebrain" id="codebrain">
            <div className="case-index"><span>01 / DEVELOPER TOOLS</span><span className="work-status"><i /> ACTIVE BUILD</span></div>
            <div className="case-intro"><div><p className="work-overline">WHEN THE REPOSITORY IS NEW, BUT THE QUESTION IS URGENT</p><h3>CodeBrain<span>.</span></h3></div><p>“Where is this behavior coming from?” CodeBrain lets you ask a public GitHub project that question in everyday language, then inspect the files it used to answer.</p></div>
            <div className="case-visual cb-visual" aria-label="Diagram of CodeBrain's indexing and question answering flow">
              <div className="visual-heading"><span>FROM REPOSITORY TO A TRACEABLE ANSWER</span><span>THE PRODUCT, UNDER THE HOOD</span></div>
              <div className="cb-pipeline" role="group" aria-label="Choose a CodeBrain pipeline stage">
                {pipelineNodes.map((node, i) => <div className="cb-stage-wrap" key={node.title}>
                  <button className={`cb-node cb-node-${i + 1}`} aria-pressed={activeStep === i} onClick={() => setActiveStep(i)}><span className="node-number">0{i + 1}</span><b>{node.title}</b><small>{node.note}</small><i className={i === 1 ? 'code-lines' : `node-icon icon-${i + 1}`}>{i === 1 ? <><em /><em /><em /></> : node.icon}</i></button>
                  {i < pipelineNodes.length - 1 && <div className="cb-connector"><i>{node.verb}</i><span>→</span></div>}
                </div>)}
              </div>
              <div className="cb-stage-detail" aria-live="polite"><span>0{activeStep + 1} / 04</span><p>{codeBrainSteps[activeStep].detail}</p></div>
              <div className="cb-query"><span>YOU ASK</span><p>“Where does this app define its routes?”</p><span className="query-send">↗</span></div>
              <div className="cb-source-result"><span>RETRIEVED SOURCE</span><code>src/routes/index.ts <b>· lines 12–38</b></code><span className="source-check">OPEN SOURCE ↗</span></div>
              <small className="visual-caption">Illustrates the intended flow. The retrieved-file example is illustrative, not a measured demo result.</small>
            </div>
            <div className="case-story-grid">
              <section><span className="case-label">THE PROBLEM</span><h4>A codebase has answers.<br />They’re just hard to find.</h4><p>Joining a project means tracing routes, data, and functions through files you’ve never seen. Search helps when you know the right word; it does less when you don’t know what the code calls the thing you’re looking for.</p></section>
              <section><span className="case-label">THE PRODUCT CHOICE</span><h4>Keep the code’s shape.</h4><p>Split TypeScript and JavaScript by syntax structures—functions, classes, and declarations—instead of chopping at arbitrary character counts. A relevant code unit can then be retrieved and cited as a whole.</p></section>
            </div>
            <div className="case-insight"><span>WHAT TESTING REVEALED</span><div><b>The first retrieval evaluation missed its target.</b><p>Across 14 manually checked questions, 0 of 20 expected chunks appeared in the baseline retrieval set. The model was faithful to the supplied context in 13 of 14 answers, which pointed to retrieval—not answer fluency—as the first bottleneck to fix.</p></div><div className="eval-score"><b>0<span>/20</span></b><small>EXPECTED CHUNKS<br />RETRIEVED IN BASELINE</small></div></div>
            <div className="case-bottom"><div className="case-tech"><span>BUILT WITH</span><p>React · TypeScript · Express · PostgreSQL / pgvector · Gemini · Server-sent events</p></div><div className="case-actions"><a className="button-solid" href="https://codebrain-gamma.vercel.app" target="_blank" rel="noopener noreferrer">Open CodeBrain <span>↗</span></a><a className="text-link" href="https://github.com/kasamthapa/codebrain" target="_blank" rel="noopener noreferrer">Source + evaluation notes <span>↗</span></a></div></div>
            <details className="case-builder"><summary>Engineering notes <span>RETRIEVAL · CHUNKING · LIMITS</span></summary><div><p>The indexer fetches GitHub blobs in batches, filters generated files and lockfiles, parses TypeScript / JavaScript with <code>@typescript-eslint/parser</code>, embeds chunks with Gemini, and stores vectors in Postgres. Questions retrieve the five nearest chunks using cosine similarity, then stream a Gemini response with file and line context.</p><p><b>Known edges:</b> expression-only statements such as <code>router.post(...)</code> are not currently indexed as chunks; re-indexing an existing repository is a no-op; only TS / JS files produce chunks. The README’s proposed retrieval improvements are still proposed, not shipped.</p></div></details>
          </article>

          <article className="case-study case-sikshya" id="sikshyanepal">
            <div className="case-index"><span>02 / EDUCATION · NEPAL</span><span>STUDENT-FIRST GUIDE</span></div>
            <div className="case-intro"><div><p className="work-overline">FOR THE BIG DECISION THAT’S REALLY MANY SMALL ONES</p><h3>SikshyaNepal<span>.</span></h3></div><p>A student-first guide to exploring colleges and programs, following admissions, and keeping research in one place—while pointing back to official sources for the details that matter.</p></div>
            <div className="case-education-layout">
              <div className="education-map" aria-label="Four-stage student research journey">
                <div className="visual-heading"><span>A RESEARCH JOURNEY, MADE VISIBLE</span><span>EXPLORE / CHECK / PLAN</span></div>
                <div className="education-stages">{educationSteps.map((step, i) => <div className={`education-stage ${i === 2 ? 'is-verify' : ''}`} key={step.number}><span>{step.number}</span><div><b>{step.title}</b><p>{step.text}</p></div>{i < educationSteps.length - 1 && <i aria-hidden="true">↓</i>}</div>)}</div>
                <div className="official-source"><span className="official-seal">✓</span><div><b>Official source, before a decision</b><p>Dates, fees, eligibility, and seats can change. Follow the institution’s own notice to confirm.</p></div><span className="source-arrow">↗</span></div>
                <small className="visual-caption">A product journey, not a claim that a specific school or fee is verified here.</small>
              </div>
              <div className="student-interface">
                <div className="student-interface-top"><span>MY PATH</span><span>YOUR RESEARCH, IN ONE PLACE</span></div>
                <div className="path-card"><span className="path-step">NEXT STEP · 01</span><b>Shortlist what you want to explore</b><p>Keep colleges and programs together while you compare your options.</p><div className="path-tags"><i>College</i><i>Program</i><i>Saved option</i></div></div>
                <div className="path-card path-card-muted"><span className="path-step">THEN</span><b>Check the admission notice</b><p>Save the source and note what you still need to confirm.</p></div>
                <div className="path-progress"><span>YOUR PLAN</span><div><i /></div><b>One step at a time</b></div>
              </div>
            </div>
            <div className="case-story-grid">
              <section><span className="case-label">THE PROBLEM</span><h4>Useful information lives<br />in too many places.</h4><p>Students and families move between directories, college sites, admission announcements, and notices. The work of finding options is hard enough; losing track of what to verify makes it harder.</p></section>
              <section><span className="case-label">THE PRODUCT CHOICE</span><h4>Organize around the student’s next step.</h4><p>Explore institutions and programs, follow admissions and campus updates, then keep a shortlist and checklist to make research easier to resume.</p></section>
            </div>
            <div className="education-principle"><span>TRUST IS PART OF THE INTERFACE</span><p>Show where changing information came from. Treat official notices as the source of truth; don’t let a polished summary look more authoritative than the institution that issued it.</p></div>
            <div className="case-bottom"><div className="case-tech"><span>PRODUCT AREAS</span><p>College discovery · programs · admissions · notices · saved research</p></div><div className="case-actions"><a className="button-solid" href="https://shikshaxnepal.com" target="_blank" rel="noopener noreferrer">Visit SikshyaNepal <span>↗</span></a></div></div>
            <details className="case-builder"><summary>How it’s put together <span>WEB · DATA · SOURCES</span></summary><div><p>The product brings together college and school discovery, program research, admission updates, source links, and a private “My Path” checklist. The interface needs to make it clear which information is guidance and which details need confirmation from the original notice.</p><p><b>Built with:</b> Next.js · React · TypeScript · Supabase · PostgreSQL</p></div></details>
          </article>

          <article className="case-study case-critch" id="critch">
            <div className="case-index"><span>03 / DEVELOPER COMMUNITY</span><span>STRUCTURED PEER REVIEW</span></div>
            <div className="case-intro"><div><p className="work-overline">A COMPLIMENT FEELS NICE. USEFUL FEEDBACK MOVES THE WORK.</p><h3>Critch<span>.</span></h3></div><p>Share a project, invite a thoughtful review, and turn “looks great” into clear notes on what to improve. One reviewer, four lenses, and room to discuss the details.</p></div>
            <div className="critch-product" aria-label="Illustrative Critch project review interface">
              <div className="critch-chrome"><span><i /><i /><i /></span><b>PROJECT / PEER REVIEW</b><span>CRITCH</span></div>
              <div className="critch-screen">
                <aside className="critch-sidebar"><span>REVIEW AREAS</span><b className="selected">01&nbsp; The idea</b><b>02&nbsp; The interface</b><b>03&nbsp; The code</b><b>04&nbsp; The docs</b></aside>
                <div className="critch-main"><div className="critch-title"><span>REVIEW 01 · PROJECT FEEDBACK</span><b>A clearer next move.</b></div><div className="review-note"><span>THE IDEA</span><p>“The problem is easy to understand. I’d make the intended audience more specific on the project page.”</p><small>REVIEWER NOTE · REPLY IN THREAD ↘</small></div><div className="reply-note"><span>BUILDER REPLY</span><p>“That’s helpful. I’ll update the opening copy and ask one person from that audience to review it.”</p></div></div>
              </div>
              <div className="critch-foot"><span>ONE REVIEW PER PERSON / PROJECT</span><span>FOCUSED FEEDBACK → DISCUSSION → NEXT CHANGE</span></div>
              <small className="visual-caption">Interface illustration. Example comments are written to demonstrate the review flow.</small>
            </div>
            <div className="case-story-grid">
              <section><span className="case-label">THE PROBLEM</span><h4>“Nice work” doesn’t say<br />what to do next.</h4><p>Side projects are public, but helpful review is often unstructured. A single score collapses the idea, design, implementation, and explanation into one vague judgment.</p></section>
              <section><span className="case-label">THE PRODUCT CHOICE</span><h4>Separate the lenses. Keep the conversation.</h4><p>Four review categories—idea, interface, code, and documentation—make feedback easier to place. Threaded replies let the reviewer and builder clarify what a note means.</p></section>
            </div>
            <div className="critch-rules"><div><b>01</b><span>One review per person<br />for a project</span></div><div><b>02</b><span>Four distinct feedback<br />areas</span></div><div><b>03</b><span>Replies stay with<br />the review</span></div><div><b>04</b><span>Reputation reflects<br />giving + receiving</span></div></div>
            <div className="case-bottom"><div className="case-tech"><span>BUILT WITH</span><p>React · TypeScript · Express · PostgreSQL · Prisma · Cloudinary · JWT</p></div><div className="case-actions"><a className="button-solid" href="https://critch-neon.vercel.app" target="_blank" rel="noopener noreferrer">Open Critch <span>↗</span></a><a className="text-link" href="https://github.com/kasamthapa/critch" target="_blank" rel="noopener noreferrer">Read the source <span>↗</span></a></div></div>
            <details className="case-builder"><summary>Engineering notes <span>AUTH · DATA · DEPLOYMENT</span></summary><div><p>The app combines project publishing and discovery with authenticated structured reviews, nested comment threads, public profiles, and dashboards. Review uniqueness is enforced at the person/project level; reputation is computed from reviews given and received.</p><p><b>Known deployment limitation:</b> refresh-token cookies are constrained across origins. Without a shared custom domain, the demo session can expire after 15 minutes.</p></div></details>
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
