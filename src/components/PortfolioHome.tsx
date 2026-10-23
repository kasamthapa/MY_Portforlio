import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { gsap } from 'gsap'

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

type TraceNode = { id: string; label: string; sub: string; x: number; y: number; icon: string }
type TraceStep = { title: string; detail: string; from: string; to: string; action: string }
const traces: Record<string, { nodes: TraceNode[]; steps: TraceStep[] }> = {
  codebrain: {
    nodes: [
      { id: 'repo', label: 'GitHub repo', sub: 'public source', x: 10, y: 50, icon: '⌘' },
      { id: 'parse', label: 'AST parser', sub: 'TS / JS structure', x: 29, y: 25, icon: '{ }' },
      { id: 'embed', label: 'Embeddings', sub: 'Gemini vectors', x: 48, y: 50, icon: '∿' },
      { id: 'store', label: 'pgvector', sub: 'code chunks', x: 68, y: 25, icon: '▤' },
      { id: 'retrieve', label: 'Top 5 match', sub: 'question → chunks', x: 68, y: 75, icon: '⌕' },
      { id: 'answer', label: 'Answer + source', sub: 'SSE · file · line', x: 90, y: 50, icon: '↗' },
    ],
    steps: [
      { title: 'Start with a repository', detail: 'The user provides a public GitHub URL. CodeBrain fetches the project before attempting to answer anything.', from: 'repo', to: 'parse', action: 'CLONE & WALK' },
      { title: 'Keep code in meaningful pieces', detail: 'TypeScript and JavaScript syntax is parsed so related code can stay together instead of splitting at arbitrary character counts.', from: 'parse', to: 'embed', action: 'PARSE → EMBED' },
      { title: 'Index chunks for retrieval', detail: 'Gemini embeddings are saved in PostgreSQL with pgvector, ready to compare against a question.', from: 'embed', to: 'store', action: 'STORE VECTORS' },
      { title: 'Retrieve the closest context', detail: 'A question is embedded and matched to the five closest code chunks before the answer is generated.', from: 'store', to: 'retrieve', action: 'SIMILARITY SEARCH' },
      { title: 'Return an answer you can inspect', detail: 'Gemini streams a plain-language response with file and line context, so the reader can open the source and judge it.', from: 'retrieve', to: 'answer', action: 'STREAM + CITE' },
    ],
  },
  sikshyanepal: {
    nodes: [
      { id: 'question', label: 'Student question', sub: 'what can I study?', x: 10, y: 50, icon: '?' },
      { id: 'browse', label: 'Browse', sub: 'colleges & programs', x: 30, y: 25, icon: '⌕' },
      { id: 'compare', label: 'Compare', sub: 'options side by side', x: 50, y: 50, icon: '⇄' },
      { id: 'source', label: 'Official notice', sub: 'dates · fees · entry', x: 70, y: 25, icon: '↗' },
      { id: 'plan', label: 'Next step', sub: 'keep a checklist', x: 90, y: 50, icon: '✓' },
    ],
    steps: [
      { title: 'Begin with a real question', detail: 'A student starts with a subject, location, or the question of what comes after +2.', from: 'question', to: 'browse', action: 'FIND OPTIONS' },
      { title: 'Discover colleges and programs', detail: 'College and program information is brought into one place so the search has a useful starting point.', from: 'browse', to: 'compare', action: 'NARROW THE FIELD' },
      { title: 'Compare the shortlist', detail: 'Students can weigh likely-fit programs and keep moving through the research journey.', from: 'compare', to: 'source', action: 'CHECK THE DETAILS' },
      { title: 'Verify changing details at source', detail: 'Dates, fees, and entry requirements can change. The institution’s original notice remains the authoritative reference.', from: 'source', to: 'plan', action: 'SAVE A NEXT STEP' },
    ],
  },
  critch: {
    nodes: [
      { id: 'maker', label: 'Maker', sub: 'shares a project', x: 10, y: 50, icon: '↗' },
      { id: 'work', label: 'Project page', sub: 'work + context', x: 30, y: 25, icon: '▧' },
      { id: 'review', label: 'Four lenses', sub: 'idea · UI · code · docs', x: 52, y: 50, icon: '◫' },
      { id: 'thread', label: 'Review thread', sub: 'comments + replies', x: 73, y: 25, icon: '···' },
      { id: 'next', label: 'Next iteration', sub: 'actionable feedback', x: 90, y: 50, icon: '↻' },
    ],
    steps: [
      { title: 'Put work in front of people', detail: 'A maker posts a project with enough context for another developer to understand what they are looking at.', from: 'maker', to: 'work', action: 'PUBLISH PROJECT' },
      { title: 'Make the review specific', detail: 'Reviewers consider the idea, interface, code, and documentation as separate parts of the work.', from: 'work', to: 'review', action: 'RATE FOUR AREAS' },
      { title: 'Keep the conversation attached', detail: 'Threaded replies let a reviewer clarify a point and the maker respond in the context of that project.', from: 'review', to: 'thread', action: 'DISCUSS THE REVIEW' },
      { title: 'Turn feedback into a next move', detail: 'The maker can take a concrete improvement into the next iteration. Reputation is tied to giving and receiving feedback.', from: 'thread', to: 'next', action: 'CHOOSE WHAT TO IMPROVE' },
    ],
  },
  rapporteur: {
    nodes: [
      { id: 'transcript', label: 'Transcript', sub: 'four input formats', x: 10, y: 50, icon: '≡' },
      { id: 'lines', label: 'Numbered lines', sub: 'normalize & locate', x: 30, y: 25, icon: '01' },
      { id: 'agenda', label: 'Agenda + Gemini', sub: 'decisions · actions', x: 52, y: 50, icon: '✳' },
      { id: 'validate', label: 'Zod + quote check', sub: 'validate exact words', x: 73, y: 25, icon: '✓' },
      { id: 'receipt', label: 'Jump to receipt', sub: 'claim → source line', x: 90, y: 50, icon: '↗' },
    ],
    steps: [
      { title: 'Bring the transcript in', detail: 'Rapporteur accepts four transcript formats and normalizes the content into addressable lines.', from: 'transcript', to: 'lines', action: 'NORMALIZE INPUT' },
      { title: 'Give the model an agenda', detail: 'Agenda-aware extraction asks Gemini for decisions and action items grouped under the relevant meeting topics.', from: 'lines', to: 'agenda', action: 'EXTRACT BY TOPIC' },
      { title: 'Validate structure and wording', detail: 'The response is checked against a Zod schema, with a retry when needed. Each quote is checked against its cited transcript line.', from: 'agenda', to: 'validate', action: 'VALIDATE & MATCH' },
      { title: 'Let readers inspect the receipt', detail: 'Selecting a claim takes the reader to its source line. An exact quote confirms the words match; it does not prove the interpretation is true.', from: 'validate', to: 'receipt', action: 'OPEN SOURCE LINE' },
    ],
  },
}

const showcaseProjects = [
  { name: 'CodeBrain', kind: 'DEVELOPER TOOLS', note: 'Ask a codebase. Follow the answer to its source.', href: 'https://codebrain-gamma.vercel.app', repo: 'https://github.com/kasamthapa/codebrain', target: 'codebrain', kicker: 'AI CODEBASE GUIDE', problem: 'A new codebase is hard to navigate when you do not know where the useful code lives.', approach: 'Index code by its structure, find relevant passages from a question, and return an answer with file and line citations.', detail: 'The answer is only the beginning: open the cited source to check what the code actually says.', limit: 'Current parsing focuses on TypeScript and JavaScript. The first manual retrieval evaluation exposed a gap that still needs work.', stack: 'React · TypeScript · Express · PostgreSQL · pgvector · Gemini', stages: ['Choose a public repository', 'Map related code', 'Ask in plain language', 'Open cited files and lines'] },
  { name: 'SikshyaNepal', kind: 'EDUCATION · NEPAL', note: 'Explore your options. Make the next step clearer.', href: 'https://shikshaxnepal.com', target: 'sikshyanepal', kicker: 'A STUDENT FIELD GUIDE', problem: 'Education information is scattered across college pages, notices, and admissions updates.', approach: 'Bring college and program discovery together with practical guides and visible links to official notices.', detail: 'A student can explore, compare options, verify details at the original source, and save a next step.', limit: 'Dates, fees, and entry requirements change; the official institution notice remains the source of truth.', stack: 'College discovery · Programs · Admissions · Student resources', stages: ['Explore colleges', 'Compare programs', 'Verify official notices', 'Plan a next step'] },
  { name: 'Critch', kind: 'PEER FEEDBACK', note: 'Turn “nice work” into a useful next move.', href: 'https://critch-neon.vercel.app', repo: 'https://github.com/kasamthapa/critch', target: 'critch', kicker: 'STRUCTURED PEER REVIEW', problem: 'Side projects often get compliments, but not the concrete feedback that helps someone improve.', approach: 'Ask reviewers to assess idea, UI, code, and documentation separately, then continue the conversation in a thread.', detail: 'One review per person, per project keeps the feedback focused and makes reputation more meaningful.', limit: 'The demo deployment has a cross-origin cookie constraint that can cause sessions to expire.', stack: 'React · TypeScript · Express · PostgreSQL · Prisma · Cloudinary', stages: ['Share a project', 'Review four areas', 'Discuss the feedback', 'Choose a next step'] },
  { name: 'Rapporteur', kind: 'MEETING NOTES · AI', note: 'Meeting notes that show their receipts.', href: 'https://rapporteur.vercel.app', repo: 'https://github.com/kasamthapa/Rapporteur', target: 'rapporteur', kicker: 'MEETING NOTES WITH RECEIPTS', problem: 'A summary can sound confident while hiding where each decision or action item came from.', approach: 'Give Rapporteur the agenda and transcript. It groups decisions and actions by agenda item, then checks each quote against the cited transcript line.', detail: 'Click a claim to jump to its source line. “Exact words found” means the words match; it does not prove the claim is true.', limit: 'No call bot, accounts, saved meetings, or live recording. The demo uses a prepared seed meeting; AI requests can be rate-limited.', stack: 'React · TypeScript · Node.js · Gemini · Zod', stages: ['Paste a transcript', 'Set the agenda', 'Review sourced claims', 'Jump to the exact line'] },
]

interface Props {
  onOpenEditor: () => void
}

export default function PortfolioHome({ onOpenEditor }: Props) {
  const [activeProject, setActiveProject] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [monochrome, setMonochrome] = useState(false)
  const [clock, setClock] = useState('')
  const [flippedProject, setFlippedProject] = useState<number | null>(null)
  const [dragging, setDragging] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<{ x: number; scrollLeft: number; pointerId: number; moved: boolean; captured: boolean } | null>(null)
  const suppressClick = useRef(0)

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

  useLayoutEffect(() => {
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const transition = gsap.timeline({ defaults: { ease: 'power3.out' } })
      transition
        .fromTo('.showcase-selected h1', { autoAlpha: 0, y: 13, filter: 'blur(7px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .54 })
        .fromTo('.gallery-center .project-window', { clipPath: 'inset(8% 0 0)', autoAlpha: .68 }, { clipPath: 'inset(0% 0 0)', autoAlpha: 1, duration: .72 }, 0)
      return () => transition.kill()
    })
    return () => motion.revert()
  }, [activeProject])

  const scrollToProject = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const carousel = carouselRef.current
    const card = carousel?.querySelector<HTMLElement>(`[data-project-index="${index}"]`)
    if (!carousel || !card) return
    carousel.scrollTo({ left: card.offsetLeft + card.offsetWidth / 2 - carousel.clientWidth / 2, behavior })
    setActiveProject(index)
  }
  const moveProject = (direction: number) => {
    const next = (activeProject + direction + showcaseProjects.length) % showcaseProjects.length
    setFlippedProject(null)
    scrollToProject(next)
  }
  const handleCarouselScroll = () => {
    const carousel = carouselRef.current
    if (!carousel) return
    const center = carousel.getBoundingClientRect().left + carousel.clientWidth / 2
    let nearest = 0
    let distance = Number.POSITIVE_INFINITY
    carousel.querySelectorAll<HTMLElement>('.gallery-card').forEach((card) => {
      const bounds = card.getBoundingClientRect()
      const nextDistance = Math.abs(bounds.left + bounds.width / 2 - center)
      if (nextDistance < distance) { nearest = Number(card.dataset.projectIndex); distance = nextDistance }
    })
    setActiveProject(nearest)
  }
  const handleGalleryKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveProject(-1) }
    if (event.key === 'ArrowRight') { event.preventDefault(); moveProject(1) }
    const targetIsActiveCard = event.target instanceof Element && event.target.closest('.gallery-center') !== null
    if (event.key === 'Enter' && (event.target === event.currentTarget || targetIsActiveCard)) {
      event.preventDefault()
      setFlippedProject((current) => current === activeProject ? null : activeProject)
    }
    if (event.key === 'Escape') setFlippedProject(null)
  }
  const handleStagePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--light-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
    event.currentTarget.style.setProperty('--light-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
    const activeCard = event.currentTarget.querySelector<HTMLElement>('.gallery-center')
    if (activeCard && !dragState.current?.moved) {
      const card = activeCard.getBoundingClientRect()
      const x = (event.clientX - card.left) / card.width - .5
      const y = (event.clientY - card.top) / card.height - .5
      activeCard.style.setProperty('--tilt-x', `${-y * 8}deg`)
      activeCard.style.setProperty('--tilt-y', `${x * 9}deg`)
    }
  }
  const handleDeckPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.pointerType === 'mouse' && event.button !== 0) || (event.target as HTMLElement).closest('button.gallery-arrow')) return
    dragState.current = { x: event.clientX, scrollLeft: event.currentTarget.scrollLeft, pointerId: event.pointerId, moved: false, captured: false }
  }
  const handleDeckPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = dragState.current
    if (!start || start.pointerId !== event.pointerId) return
    const dx = event.clientX - start.x
    if (Math.abs(dx) > 5) {
      start.moved = true
      if (!start.captured) { event.currentTarget.setPointerCapture(event.pointerId); start.captured = true }
      setDragging(true)
      event.currentTarget.scrollLeft = start.scrollLeft - dx
    }
  }
  const handleDeckPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = dragState.current
    if (!start || start.pointerId !== event.pointerId) return
    if (start.moved) { suppressClick.current = Date.now() + 260; setFlippedProject(null) }
    setDragging(false)
    dragState.current = null
  }
  const handleDeckWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX) && !event.shiftKey) return
    const delta = event.shiftKey ? event.deltaY : event.deltaX
    if (Math.abs(delta) > 2) { event.preventDefault(); event.currentTarget.scrollBy({ left: delta, behavior: 'auto' }) }
  }

  return (
    <main className="portfolio-home">
      <aside className="portfolio-rail" aria-label="Portfolio navigation">
        <div className="mac-window-lights" aria-hidden="true"><i /><i /><i /></div>
        <a className="portfolio-brand" href="#home" aria-label="Kasam Thapa Magar home">
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
              <svg className="intro-cassette" viewBox="0 0 560 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="tape-shell" x1="68" y1="38" x2="478" y2="330" gradientUnits="userSpaceOnUse"><stop stopColor="#37372F"/><stop offset=".46" stopColor="#1A1B18"/><stop offset="1" stopColor="#0D0E0D"/></linearGradient>
                  <linearGradient id="tape-label" x1="112" y1="77" x2="442" y2="178" gradientUnits="userSpaceOnUse"><stop stopColor="#D7D0B3" stopOpacity=".95"/><stop offset="1" stopColor="#A9A98E" stopOpacity=".88"/></linearGradient>
                  <radialGradient id="tape-reel"><stop stopColor="#C9C19F" stopOpacity=".24"/><stop offset=".44" stopColor="#C9C19F" stopOpacity=".08"/><stop offset=".47" stopColor="#11120F"/><stop offset="1" stopColor="#090A09"/></radialGradient>
                  <filter id="tape-shadow" x="12" y="10" width="536" height="352" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="16"/></filter>
                </defs>
                <ellipse cx="282" cy="293" rx="208" ry="29" fill="#000" fillOpacity=".6" filter="url(#tape-shadow)"/>
                <g className="cassette-float">
                  <path d="M67 61 456 43c13-.6 24 9 25 22l13 220c.8 13-9 24-22 25L82 329c-13 .7-24-9-25-22L44 87c-.8-13 9-25 23-26Z" fill="url(#tape-shell)" stroke="#C6C1A9" strokeOpacity=".68" strokeWidth="2"/>
                  <path d="m84 78 353-16 8 96-350 16-11-96Z" fill="url(#tape-label)"/>
                  <path d="m98 91 324-14M101 100l323-14M103 110l323-14" stroke="#34352E" strokeOpacity=".2"/>
                  <text x="110" y="145" fill="#272822" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="3">KASAM / FIELD NOTES</text>
                  <text x="391" y="145" fill="#272822" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="2">SIDE A</text>
                  <path d="m83 184 372-17 8 104-372 18-8-105Z" fill="#11120F" stroke="#55564B" strokeOpacity=".8"/>
                  <path d="m133 210 263-12 2 9-264 13-1-10Z" fill="#282923" stroke="#777561" strokeOpacity=".56"/>
                  <path d="m150 211 225-11" stroke="#C7BE9D" strokeOpacity=".5" strokeWidth="2"/>
                  <g className="cassette-reel cassette-reel-left" transform="translate(184 249)">
                    <circle r="36" fill="url(#tape-reel)" stroke="#8B876F" strokeOpacity=".75"/>
                    <circle r="22" stroke="#BEB694" strokeOpacity=".8" strokeWidth="2"/>
                    <circle r="7" fill="#C9C19F"/>
                    <path d="M0-29v13m25 16-12-7M-25 15l12-7" stroke="#C9C19F" strokeOpacity=".8" strokeWidth="3" strokeLinecap="round"/>
                  </g>
                  <g className="cassette-reel cassette-reel-right" transform="translate(355 242)">
                    <circle r="36" fill="url(#tape-reel)" stroke="#8B876F" strokeOpacity=".75"/>
                    <circle r="22" stroke="#BEB694" strokeOpacity=".8" strokeWidth="2"/>
                    <circle r="7" fill="#C9C19F"/>
                    <path d="M0-29v13m25 16-12-7M-25 15l12-7" stroke="#C9C19F" strokeOpacity=".8" strokeWidth="3" strokeLinecap="round"/>
                  </g>
                  <path d="m220 247 91-4 8-11 12 1-7 16-96 7-8 12-14-1 10-20Z" fill="#C9C19F" fillOpacity=".27" stroke="#BEB694" strokeOpacity=".55"/>
                  <circle cx="78" cy="84" r="3" fill="#D6CEAD"/><circle cx="459" cy="65" r="3" fill="#D6CEAD"/><circle cx="91" cy="306" r="3" fill="#D6CEAD"/><circle cx="478" cy="285" r="3" fill="#D6CEAD"/>
                </g>
              </svg>
              <span className="intro-object-caption">SIDE A&nbsp; / &nbsp;THOUGHTFUL SYSTEMS</span>
            </div>
          </div>
          <div className="intro-bottom"><span>SOFTWARE WITH A HUMAN POINT OF VIEW</span><a href="#work"><span>SCROLL TO EXPLORE</span><i>↓</i></a><span>01 — 04 / INTRODUCTION</span></div>
        </section>

        <section className="portfolio-hero" id="work">
            <div className={`showcase-stage${monochrome ? ' is-mono' : ''}`} onKeyDown={handleGalleryKeyDown} onPointerMove={handleStagePointerMove} onPointerLeave={(event) => { event.currentTarget.style.setProperty('--light-x', '50%'); event.currentTarget.style.setProperty('--light-y', '42%'); const card = event.currentTarget.querySelector<HTMLElement>('.gallery-center'); card?.style.setProperty('--tilt-x', '0deg'); card?.style.setProperty('--tilt-y', '0deg') }} tabIndex={0} aria-label="Interactive project gallery. Use left and right arrow keys to browse. Press Enter or select a card to flip its brief description.">
            <div className="showcase-grain" aria-hidden="true" />
            <div className="showcase-topline"><span className="showcase-system"><i /> KASAM / WORKSPACE</span><span className="showcase-clock">{clock} <i>·</i> KTM</span><div className="showcase-tools"><button className="mono-toggle" aria-pressed={monochrome} onClick={() => setMonochrome((value) => !value)}><i /> B&W <b>{monochrome ? 'ON' : 'OFF'}</b></button><button onClick={onOpenEditor} className="showcase-source">&lt;/&gt; SOURCE</button></div></div>
            <div className="showcase-intro"><span>SELECTED WORK / 2024—26</span><p>Small tools for the moment you feel stuck.</p></div>
            <div ref={carouselRef} className={`showcase-carousel${dragging ? ' is-dragging' : ''}`} aria-label="Project carousel. Drag horizontally with a mouse, swipe with a finger, scroll, or use the arrow buttons to browse." onScroll={handleCarouselScroll} onPointerDown={handleDeckPointerDown} onPointerMove={handleDeckPointerMove} onPointerUp={handleDeckPointerUp} onLostPointerCapture={(event) => { if (dragState.current?.pointerId === event.pointerId) { dragState.current = null; setDragging(false) } }} onPointerCancel={() => { dragState.current = null; setDragging(false) }} onWheel={handleDeckWheel}>
              <button className="gallery-arrow gallery-previous" aria-label="Previous project" onClick={() => moveProject(-1)}>←</button>
              <div className="gallery-deck">
                {showcaseProjects.map((project, i) => {
                  const relative = (i - activeProject + showcaseProjects.length) % showcaseProjects.length
                  const position = relative === 0 ? 'center' : relative === 1 ? 'right' : relative === showcaseProjects.length - 1 ? 'left' : 'far'
                  return <button key={project.name} data-project-index={i} className={`gallery-card gallery-${position}${flippedProject === i ? ' is-flipped' : ''}`} onClick={() => { if (Date.now() < suppressClick.current) return; if (i !== activeProject) scrollToProject(i); setFlippedProject((current) => current === i ? null : i) }} aria-pressed={flippedProject === i} aria-label={`${project.name}, ${flippedProject === i ? 'brief description shown; activate to return to artwork' : 'activate to see brief description'}`}>
                    <div className="gallery-card-inner">
                    <div className="gallery-card-face gallery-card-front">
                    <div className={`project-window project-window-${project.target}`}>
                      <div className="window-bar"><span><i /><i /><i /></span><b>{project.name.toUpperCase()}</b><span>↗</span></div>
                      {project.target === 'codebrain' && <div className="poster-art poster-brain"><div className="mock-kicker"><span>AI CODEBASE GUIDE</span><i>01 / 04</i></div><h2 className="mock-title">Understand<br /><em>the code.</em></h2><div className="mock-terminal"><div className="mock-terminal-top"><i /><i /><i /><span>codebrain — /usr/bin/env</span></div><div className="mock-terminal-copy"><small>loaded. paste a repository to begin.</small><b><i>›</i> codebrain --init</b><strong>Code<span>Brain</span></strong><div className="mock-prompt"><span>repo&gt;</span> github.com/…</div></div></div><div className="mock-footnote"><span>ASK → TRACE → UNDERSTAND</span><span>↗ 01</span></div></div>}
                      {project.target === 'sikshyanepal' && <div className="poster-art poster-education"><div className="mock-kicker"><span>STUDENT FIELD GUIDE / NP</span><i>02 / 04</i></div><h2 className="mock-title"><strong>+2 done.</strong><br /><em>Now what?</em></h2><p className="mock-description">Find what to study after +2, and where.</p><div className="mock-search"><span>⌕</span><i>e.g. BCA colleges in Kathmandu</i><b>Search&nbsp; →</b></div><div className="mock-chips"><span>IT &amp; Computing</span><span>Management</span><span>Humanities</span></div><div className="mock-notice"><small>◌ &nbsp;LATEST NOTICE</small><b>Admissions &amp; results, in one place.</b><span>VIEW OFFICIAL SOURCE&nbsp; ↗</span></div><div className="mock-footnote"><span>COLLEGES · PROGRAMS · NEXT STEPS</span><span>↗ 02</span></div></div>}
                      {project.target === 'critch' && <div className="poster-art poster-critch"><div className="mock-kicker"><span>CRITCH / EXPLORE</span><i>03 / 04</i></div><h2 className="mock-title">Projects<span>.</span></h2><p className="mock-description">Browse and review work from the developer community.</p><div className="mock-project-card"><div className="mock-project-art"><span>WORK IN PROGRESS</span><b>MAKE<br />SOMETHING<br /><em>MATTER.</em></b><i>PROJECT / 001</i></div><div className="mock-project-meta"><b>Personal project</b><span>IDEA&nbsp; · &nbsp;UI&nbsp; · &nbsp;CODE&nbsp; · &nbsp;DOCS</span><div><i>01</i><i>02</i><i>03</i><i>04</i></div></div></div><div className="mock-footnote"><span>SPECIFIC FEEDBACK. NEXT STEPS.</span><span>↗ 03</span></div></div>}
                      {project.target === 'rapporteur' && <div className="poster-art poster-rapporteur"><div className="mock-kicker"><span>MEETING / RECEIPTS</span><i>04 / 04</i></div><h2 className="mock-title">Notes that<br /><em>show their work.</em></h2><div className="rapporteur-note"><div className="rapporteur-note-top"><b>ILLUSTRATIVE EXAMPLE</b><span>AGENDA · TRANSCRIPT</span></div><div className="rapporteur-agenda"><small>01 / AGENDA ITEM</small><b>DECISION</b><p>Decision summary, linked to its source.</p><span>↳ SOURCE LINE · QUOTE CHECK</span></div><div className="rapporteur-agenda is-off"><small>OFF AGENDA</small><b>FOLLOW-UP</b><p>Action item kept outside the agenda.</p><span>↳ SOURCE LINE · REVIEW</span></div></div><div className="mock-footnote"><span>CLAIM → QUOTE → SOURCE LINE</span><span>↗ 04</span></div></div>}
                    </div>
                    <span className="gallery-card-kind">{project.kind}</span>
                    </div>
                    <div className="gallery-card-face gallery-card-back">
                      <span className="flip-overline">PROJECT NOTE&nbsp; / &nbsp;{String(i + 1).padStart(2, '0')}</span>
                      <span className="flip-title">{project.name}<i>.</i></span>
                      <span className="flip-note">{project.note}</span>
                      <span className="flip-rule" aria-hidden="true"><i /><i /><i /><i /></span>
                      <span className="flip-sequence" aria-label={project.stages.join(' then ')}>{project.stages.slice(0, 3).map((stage, step) => <span key={stage}><i>0{step + 1}</i>{stage.split(' ').slice(0, 2).join(' ')}</span>)}</span>
                      <span className="flip-return">TAP OR CLICK TO RETURN <b>↻</b></span>
                    </div>
                    </div>
                  </button>
                })}
              </div>
              <button className="gallery-arrow gallery-next" aria-label="Next project" onClick={() => moveProject(1)}>→</button>
            </div>
            <div className="showcase-caption"><div className="showcase-selected"><span>{String(activeProject + 1).padStart(2, '0')} / {String(showcaseProjects.length).padStart(2, '0')} · {showcaseProjects[activeProject].kind}</span><h1>{showcaseProjects[activeProject].name}<i>.</i></h1><p>{showcaseProjects[activeProject].note}</p></div><div className="showcase-actions"><a className="showcase-open" href={showcaseProjects[activeProject].href} target="_blank" rel="noopener noreferrer">OPEN PROJECT <span>↗</span></a><button className="showcase-case-link" aria-pressed={flippedProject === activeProject} onClick={() => setFlippedProject((current) => current === activeProject ? null : activeProject)}>{flippedProject === activeProject ? 'RETURN TO ART ↻' : 'FLIP FOR A NOTE ↻'}</button></div><div className="showcase-hint"><span>← → / SWIPE</span><small>DRAG TO MOVE · FLIP TO READ</small><div>{showcaseProjects.map((project, i) => <button key={project.name} aria-label={`Show ${project.name}`} aria-current={i === activeProject ? 'true' : undefined} onClick={() => { setFlippedProject(null); scrollToProject(i) }} />)}</div></div></div>
            <div className="showcase-bottomline"><span>FULL-STACK DEVELOPER</span><span>KATHMANDU, NEPAL</span><a href="mailto:kasamthapamagar7@gmail.com">SAY HELLO ↗</a></div>
          </div>
        </section>

        <section className="work-section" id="case-studies">
          <div className="section-heading">
            <div><span className="section-index">A FEW THINGS I’VE BUILT</span><h2>Work with a reason to exist.</h2></div>
            <span className="section-count">01 — 04</span>
          </div>

          <article className="case-study case-codebrain" id="codebrain">
            <div className="case-index"><span>01 / DEVELOPER TOOLS</span><span className="work-status"><i /> ACTIVE BUILD</span></div>
            <div className="case-intro"><div><p className="work-overline">FIND YOUR WAY THROUGH A NEW CODEBASE</p><h3>CodeBrain<span>.</span></h3></div><p>Ask a codebase a question. Follow the answer back to the code.</p></div>
            <TraceMap target="codebrain" compact />
            <div className="case-bottom"><span className="case-cta-note">Early tests exposed a retrieval gap.</span><div className="case-actions"><a className="button-solid" href="https://codebrain-gamma.vercel.app" target="_blank" rel="noopener noreferrer">Open CodeBrain <span>↗</span></a><a className="text-link" href="https://github.com/kasamthapa/codebrain" target="_blank" rel="noopener noreferrer">Source <span>↗</span></a></div></div>
            <details className="case-builder"><summary>How it works <span>CODE · SEARCH · TESTING</span></summary><div><p>TypeScript and JavaScript are split by syntax structure, embedded with Gemini, and stored in PostgreSQL / pgvector. A question retrieves the five closest code chunks, then Gemini streams an answer with file and line context.</p><p><b>First manual evaluation:</b> 0 of 20 expected chunks were retrieved across 14 questions; 13 of 14 answers were faithful to the supplied context. Known edges include missing expression-only statements, no-op re-indexing, and support for TS / JS only. Proposed retrieval fixes are still proposals.</p><p><b>Stack:</b> React · TypeScript · Express · PostgreSQL · pgvector · Gemini · server-sent events</p></div></details>
          </article>

          <article className="case-study case-sikshya" id="sikshyanepal">
            <div className="case-index"><span>02 / EDUCATION · NEPAL</span><span>STUDENT-FIRST GUIDE</span></div>
            <div className="case-intro"><div><p className="work-overline">MAKE THE EDUCATION JOURNEY EASIER TO FOLLOW</p><h3>SikshyaNepal<span>.</span></h3></div><p>Go from exploring colleges to planning your next step.</p></div>
            <TraceMap target="sikshyanepal" compact />
            <div className="education-source-note"><span>✓</span><p><b>Before you decide:</b> confirm dates, fees, and requirements with the institution’s official notice.</p></div>
            <div className="case-bottom"><span className="case-cta-note">A clearer place to research what comes next.</span><div className="case-actions"><a className="button-solid" href="https://shikshaxnepal.com" target="_blank" rel="noopener noreferrer">Visit SikshyaNepal <span>↗</span></a></div></div>
            <details className="case-builder"><summary>More about the product <span>FEATURES · SOURCES · STACK</span></summary><div><p>College and school discovery, program research, admission updates, source links, and a private checklist help students continue where they left off. Dates, fees, and requirements should be checked with the original institution notice.</p><p><b>Stack:</b> Next.js · React · TypeScript · Supabase · PostgreSQL</p></div></details>
          </article>

          <article className="case-study case-critch" id="critch">
            <div className="case-index"><span>03 / DEVELOPER COMMUNITY</span><span>STRUCTURED PEER REVIEW</span></div>
            <div className="case-intro"><div><p className="work-overline">TURN “NICE WORK” INTO USEFUL FEEDBACK</p><h3>Critch<span>.</span></h3></div><p>A simple path from sharing a project to knowing what to improve.</p></div>
            <TraceMap target="critch" compact />
            <div className="critch-rule-note">One review per person, per project. Reputation grows from giving and receiving feedback.</div>
            <div className="case-bottom"><span className="case-cta-note">Specific feedback. A conversation. A next step.</span><div className="case-actions"><a className="button-solid" href="https://critch-neon.vercel.app" target="_blank" rel="noopener noreferrer">Open Critch <span>↗</span></a><a className="text-link" href="https://github.com/kasamthapa/critch" target="_blank" rel="noopener noreferrer">Source <span>↗</span></a></div></div>
            <details className="case-builder"><summary>More about Critch <span>RULES · STACK · DEPLOYMENT</span></summary><div><p>Projects can be shared and discovered; signed-in users leave structured reviews, threaded replies, and public profiles. Reputation reflects reviews given and received.</p><p><b>Known demo limit:</b> without a shared custom domain, browser cookie restrictions can expire sessions after 15 minutes.</p><p><b>Stack:</b> React · TypeScript · Express · PostgreSQL · Prisma · Cloudinary · JWT</p></div></details>
          </article>

          <article className="case-study case-rapporteur" id="rapporteur">
            <div className="case-index"><span>04 / MEETING NOTES · AI</span><span>QUOTES WITH SOURCE LINES</span></div>
            <div className="case-intro"><div><p className="work-overline">MEETING NOTES THAT SHOW THEIR RECEIPTS</p><h3>Rapporteur<span>.</span></h3></div><p>Turn a transcript into decisions and action items that readers can check for themselves.</p></div>
            <TraceMap target="rapporteur" compact />
            <div className="rapporteur-truth"><span>THE RECEIPT</span><p>Each extracted decision or action item carries an exact quote and a transcript line. A quote match verifies the words, not whether the claim was interpreted correctly.</p></div>
            <div className="case-bottom"><span className="case-cta-note">No bot joins the call; there is no live recording.</span><div className="case-actions"><a className="button-solid" href="https://rapporteur.vercel.app" target="_blank" rel="noopener noreferrer">Visit Rapporteur <span>↗</span></a><a className="text-link" href="https://github.com/kasamthapa/Rapporteur" target="_blank" rel="noopener noreferrer">Source <span>↗</span></a></div></div>
            <details className="case-builder"><summary>Scope &amp; limitations <span>WHAT’S BUILT · WHAT’S NEXT</span></summary><div><p>Transcript parsing supports four formats. Agenda-aware extraction groups decisions and action items; a quote check compares model output against the cited line; selecting a claim jumps to that transcript line. The demo uses one prepared meeting whose participants agreed to share it.</p><p><b>Not built:</b> accounts, saved meetings, live recording, call integrations, or a database. The demo can be rate-limited and the server may sleep when idle.</p><p><b>Stack:</b> React · TypeScript · Node.js · Gemini · Zod</p></div></details>
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

function TraceMap({ target, compact = false }: { target: string; compact?: boolean }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const trace = traces[target]
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [visible, setVisible] = useState(false)
  const current = trace.steps[step]
  const byId = Object.fromEntries(trace.nodes.map((node) => [node.id, node]))
  const edgePath = (from: string, to: string) => {
    const a = byId[from], b = byId[to]
    const x1 = a.x * 10, y1 = a.y * 4.3, x2 = b.x * 10, y2 = b.y * 4.3
    const mid = (x1 + x2) / 2
    return `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`
  }
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(map)
    return () => observer.disconnect()
  }, [])
  useEffect(() => { setStep(0); setPlaying(true) }, [target])
  useEffect(() => {
    if (!playing || reduceMotion || !visible) return
    const timer = window.setInterval(() => setStep((active) => (active + 1) % trace.steps.length), 4200)
    return () => window.clearInterval(timer)
  }, [playing, reduceMotion, visible, trace.steps.length])
  const move = (delta: number) => setStep((active) => (active + delta + trace.steps.length) % trace.steps.length)
  const activeNodes = new Set([current.from, current.to])
  const selectedPath = edgePath(current.from, current.to)
  return <div ref={mapRef} className={`trace-map trace-${target}${compact ? ' trace-map-compact' : ''}`} aria-label={`${target} system flow`}>
    <div className="trace-map-head"><div><span>INSIDE THE SYSTEM</span><h4>Follow one action through the product.</h4></div><div className="trace-live"><i /> {reduceMotion ? 'MOTION REDUCED' : playing ? 'FLOW REPLAYING' : 'FLOW PAUSED'}</div></div>
    <div className="trace-canvas" role="img" aria-label={`${target} data flow: ${current.title}. ${current.detail}`}>
      <svg className="trace-wires" viewBox="0 0 1000 430" preserveAspectRatio="none" aria-hidden="true">
        <defs><filter id={`traceGlow-${target}`} x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        {trace.steps.map((item) => <path key={`${item.from}-${item.to}`} className="trace-wire" d={edgePath(item.from, item.to)} />)}
        <path className="trace-wire-active" d={selectedPath} />
        {playing && !reduceMotion && <circle className="trace-packet" r="5" filter={`url(#traceGlow-${target})`}><animateMotion dur="2.3s" repeatCount="indefinite" path={selectedPath} /></circle>}
      </svg>
      <div className="trace-grid" aria-hidden="true" />
      {trace.nodes.map((node, i) => <div key={node.id} className={`trace-node${i === 0 ? ' is-first' : ''}${i === trace.nodes.length - 1 ? ' is-last' : ''}${activeNodes.has(node.id) ? ' is-active' : ''}${node.id === current.to ? ' is-destination' : ''}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}>
        <span className="trace-node-index">{String(i + 1).padStart(2, '0')}</span><i>{node.icon}</i><b>{node.label}</b><small>{node.sub}</small>
      </div>)}
      <span className="trace-action-label" key={step}>{current.action}</span>
      <div className="trace-canvas-foot"><span>INPUT</span><i /><span>TRANSFORMATION</span><i /><span>USEFUL OUTPUT</span></div>
    </div>
    <div className="trace-story" aria-live="polite" key={`${target}-${step}`}><span>0{step + 1} / 0{trace.steps.length}</span><div><h5>{current.title}</h5><p>{current.detail}</p></div><div className="trace-controls"><button onClick={() => move(-1)} aria-label="Previous system step">←</button><button onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause system flow' : 'Play system flow'}>{playing ? 'Ⅱ' : '▶'}</button><button onClick={() => move(1)} aria-label="Next system step">→</button></div></div>
    <div className="trace-step-nav" aria-label="Choose a system step">{trace.steps.map((item, i) => <button key={item.title} className={step === i ? 'is-active' : ''} onClick={() => { setStep(i); if (!reduceMotion) setPlaying(false) }} aria-current={step === i ? 'step' : undefined}><span>0{i + 1}</span><b>{item.title}</b></button>)}</div>
  </div>
}
