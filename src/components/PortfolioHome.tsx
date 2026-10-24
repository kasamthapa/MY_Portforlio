import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react'
import { gsap } from 'gsap'
import ProjectSystemFlow from './ProjectSystemFlow'
import { projectSystemFlows } from '../project-system-flows'

const socials = [
  { label: 'GitHub', href: 'https://github.com/kasamthapa' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kasamthapamagar' },
  { label: 'X', href: 'https://x.com/kasamthapa89' },
]

const sections = [
  { id: 'home', label: 'HOME' },
  { id: 'work', label: 'WORK' },
  { id: 'about', label: 'ABOUT' },
  { id: 'contact', label: 'CONTACT' },
]

const showcaseProjects = [
  { name: 'CodeBrain', kind: 'DEVELOPER TOOLS', note: 'Ask a codebase. Check the answer in its source.', brief: 'An AI codebase guide for developers. Add a public GitHub repository, ask a question, and follow file and line references back to the code.', href: 'https://codebrain-gamma.vercel.app', target: 'codebrain' },
  { name: 'SikshyaNepal', kind: 'EDUCATION · NEPAL', note: 'Find colleges and programs, then verify the latest details.', brief: 'A college and program directory for students in Nepal. Explore courses, compare colleges, check admission notices, and keep a shortlist for your next step.', href: 'https://shikshaxnepal.com', target: 'sikshyanepal' },
  { name: 'Critch', kind: 'PEER FEEDBACK', note: 'Get feedback you can act on.', brief: 'A peer review platform for developer projects. Share your work, get feedback on the idea, UI, code, and docs, and see ratings from the community.', href: 'https://critch-neon.vercel.app', target: 'critch' },
  { name: 'Rapporteur', kind: 'MEETING NOTES · AI', note: 'Meeting notes linked to what was said.', brief: 'A tool that turns meeting transcripts into decisions and follow-ups. Notes include source lines and quote checks so you can review them against the conversation.', href: 'https://rapporteur.vercel.app', target: 'rapporteur' },
]

interface Props {
  onOpenEditor: () => void
  isPoweringOn: boolean
}

export default function PortfolioHome({ onOpenEditor, isPoweringOn }: Props) {
  const [activeProject, setActiveProject] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [clock, setClock] = useState('')
  const [flippedProject, setFlippedProject] = useState<number | null>(null)
  const [dragging, setDragging] = useState(false)
  const [monochrome, setMonochrome] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<{ x: number; scrollLeft: number; pointerId: number; moved: boolean; captured: boolean } | null>(null)
  const suppressClick = useRef(0)

  useEffect(() => {
    const updateClock = () => setClock(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()))
    updateClock()
    const clockTimer = window.setInterval(updateClock, 1000)
    const scrollRoot = document.querySelector('.portfolio-scroll')
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
    document.querySelectorAll('.portfolio-hero, .section-heading, .about-body, .portfolio-footer').forEach((flow) => flowObserver.observe(flow))
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

  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.slice(1)
      if (!sections.some((section) => section.id === id)) return
      const target = document.getElementById(id)
      document.querySelector<HTMLElement>('.portfolio-scroll')?.scrollTo({ top: target?.offsetTop ?? 0, behavior: 'auto' })
      setActiveSection(id)
    }
    const frame = window.requestAnimationFrame(syncHash)
    window.addEventListener('popstate', syncHash)
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('popstate', syncHash) }
  }, [])

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    setActiveSection(id)
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
    const target = document.getElementById(id)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.querySelector<HTMLElement>('.portfolio-scroll')?.scrollTo({ top: target?.offsetTop ?? 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const continueToProjectStory = (index: number) => {
    setActiveProject(index)
    setFlippedProject(null)
    const targetId = `story-${showcaseProjects[index].target}`
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId)
      const scroller = document.querySelector<HTMLElement>('.portfolio-scroll')
      if (target && scroller) scroller.scrollTo({ top: target.offsetTop, behavior: reducedMotion ? 'auto' : 'smooth' })
    }))
  }

  const scrollToProject = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const carousel = carouselRef.current
    const card = carousel?.querySelector<HTMLElement>(`[data-project-index="${index}"]`)
    if (!carousel || !card) return
    const cardLeft = card.offsetLeft
    const cardRight = cardLeft + card.offsetWidth
    const visibleLeft = carousel.scrollLeft
    const visibleRight = visibleLeft + carousel.clientWidth
    const left = cardLeft < visibleLeft ? cardLeft : cardRight > visibleRight ? cardRight - carousel.clientWidth : visibleLeft
    carousel.scrollTo({ left, behavior })
    setActiveProject(index)
  }
  const flipProject = (index: number) => {
    if (index !== activeProject) scrollToProject(index)
    setFlippedProject((current) => current === index ? null : index)
  }
  const moveProject = (direction: number) => {
    const next = (activeProject + direction + showcaseProjects.length) % showcaseProjects.length
    setFlippedProject(null)
    scrollToProject(next)
  }
  const handleCarouselScroll = () => {
    const carousel = carouselRef.current
    if (!carousel) return
    const cards = Array.from(carousel.querySelectorAll<HTMLElement>('.gallery-card'))
    const visibleLeft = carousel.scrollLeft
    const visibleRight = visibleLeft + carousel.clientWidth
    const fullyVisible = (card: HTMLElement) => card.offsetLeft >= visibleLeft - 2 && card.offsetLeft + card.offsetWidth <= visibleRight + 2
    if (cards[activeProject] && fullyVisible(cards[activeProject])) return
    const next = cards.find(fullyVisible) ?? cards.reduce((nearest, card) => Math.abs(card.offsetLeft - visibleLeft) < Math.abs(nearest.offsetLeft - visibleLeft) ? card : nearest)
    setActiveProject(Number(next.dataset.projectIndex))
  }
  const handleGalleryKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveProject(-1) }
    if (event.key === 'ArrowRight') { event.preventDefault(); moveProject(1) }
    if (event.key === 'Escape') setFlippedProject(null)
  }
  const handleStagePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--light-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
    event.currentTarget.style.setProperty('--light-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
  }
  const handleDeckPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
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
    <main className={`portfolio-home${monochrome ? ' is-monochrome' : ''}${isPoweringOn ? ' is-powering-on' : ''}`} onPointerMove={(event) => {
      const bounds = event.currentTarget.getBoundingClientRect()
      event.currentTarget.style.setProperty('--lens-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`)
      event.currentTarget.style.setProperty('--lens-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`)
    }} onPointerLeave={(event) => {
      event.currentTarget.style.setProperty('--lens-x', '50%')
      event.currentTarget.style.setProperty('--lens-y', '42%')
    }}>
      <svg className="crt-filter-definitions" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="crt-lens-distortion" filterUnits="objectBoundingBox" primitiveUnits="objectBoundingBox" x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
            <feImage href="/crt-lens-map.png?v=bounded-1" x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="lens-map" />
            <feDisplacementMap in="SourceGraphic" in2="lens-map" scale="0.1" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="crt-lens-distortion-mobile" filterUnits="objectBoundingBox" primitiveUnits="objectBoundingBox" x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
            <feImage href="/crt-lens-map.png?v=bounded-1" x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="lens-map" />
            <feDisplacementMap in="SourceGraphic" in2="lens-map" scale="0.075" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <clipPath id="crt-glass-clip" clipPathUnits="objectBoundingBox">
            <path d="M .105 .024 C .35 -.003 .65 -.003 .895 .024 C .962 .031 .978 .07 .982 .135 C .998 .38 .998 .62 .982 .865 C .978 .93 .962 .969 .895 .976 C .65 1.003 .35 1.003 .105 .976 C .038 .969 .022 .93 .018 .865 C .002 .62 .002 .38 .018 .135 C .022 .07 .038 .031 .105 .024 Z" />
          </clipPath>
          <clipPath id="crt-glass-clip-mobile" clipPathUnits="objectBoundingBox">
            <path d="M .06 .008 C .3 -.002 .7 -.002 .94 .008 C .98 .012 .99 .03 .991 .065 C 1 .4 1 .6 .991 .935 C .99 .97 .98 .988 .94 .992 C .7 1.002 .3 1.002 .06 .992 C .02 .988 .01 .97 .009 .935 C 0 .6 0 .4 .009 .065 C .01 .03 .02 .012 .06 .008 Z" />
          </clipPath>
        </defs>
      </svg>
      {isPoweringOn && <div className="crt-power-on" aria-hidden="true">
        <span className="crt-power-static" />
        <span className="crt-power-shutter crt-power-shutter-top" />
        <span className="crt-power-shutter crt-power-shutter-bottom" />
        <span className="crt-power-bloom" />
        <span className="crt-power-beam" />
      </div>}
      <header className="crt-hud-header" aria-label="Portfolio navigation">
        <nav className="crt-hud-home" aria-label="Home">
          <a href="#home" onClick={(event) => navigateToSection(event, 'home')} aria-current={activeSection === 'home' ? 'location' : undefined}>HOME</a>
        </nav>
        <span className="crt-hud-clock" aria-label={`Kathmandu time ${clock}`}>{clock}</span>
        <a className="crt-hud-brand" href="#home" onClick={(event) => navigateToSection(event, 'home')} aria-label="Kasam Thapa Magar, home"><strong>KASAM</strong><small><span>KATHMANDU</span><span>{new Date().getFullYear()}</span></small></a>
        <nav className="crt-hud-nav" aria-label="Main navigation">
          {sections.slice(1).map((section) => (
            <a key={section.id} href={`#${section.id}`} onClick={(event) => navigateToSection(event, section.id)} aria-current={activeSection === section.id ? 'location' : undefined}>{section.label}</a>
          ))}
        </nav>
      </header>

      <div className="portfolio-scroll">
      <div className="portfolio-content">
        <section className="intro-experience" id="home" aria-labelledby="intro-title">
          <div className="intro-grain" aria-hidden="true" />
          <div className="intro-meta"><span><i /> SOFTWARE ENGINEER · KATHMANDU, NEPAL</span><span>27° 43′ N&nbsp;&nbsp; 85° 19′ E</span></div>
          <div className="intro-main">
            <div className="intro-portrait-stage">
              <div className="intro-proof intro-proof-left" aria-label="Selected work">
                <span>[ SELECTED WORK ]</span><b>CodeBrain</b><b>SikshyaNepal</b><b>Critch</b><b>Rapporteur</b>
              </div>
              <div className="intro-portrait-center">
                <figure className="intro-object">
                  <div className="intro-portrait-card">
                    <div className="intro-poster-image">
                      <img src="/kasam-portrait-vhs.jpg" alt="Portrait of Kasam Thapa Magar" fetchPriority="high" />
                    </div>
                    <div className="intro-poster-masthead" aria-hidden="true"><span>KASAM THAPA MAGAR</span><strong>Home Video</strong></div>
                    <span className="intro-poster-title" aria-hidden="true">KASAM</span>
                    <div className="intro-poster-stamps" aria-hidden="true">
                      <span className="intro-poster-vhs">VHS</span>
                      <span className="intro-poster-date">KTM / 2026</span>
                      <span className="intro-poster-seal"><i>K</i></span>
                    </div>
                    <span className="intro-poster-static" aria-hidden="true" />
                  </div>
                </figure>
              </div>
              <div className="intro-proof intro-proof-right" aria-label="Practice areas">
                <span>[ PRACTICE ]</span><b>Developer tools</b><b>Education</b><b>Useful AI</b><b>Human-centered software</b>
              </div>
            </div>
            <div className="intro-copy">
              <p className="intro-kicker">HELLO, WORLD. I’M KASAM.</p>
              <h1 id="intro-title">I make the <em>complex</em><br />feel clear<span>.</span></h1>
              <p className="intro-description">I design and build full-stack tools that make complex things easier to navigate.</p>
              <div className="intro-actions"><a href="#work" onClick={(event) => navigateToSection(event, 'work')} className="intro-primary">EXPLORE MY WORK <span>↘</span></a><a href="mailto:kasamthapa89@gmail.com" className="intro-contact">SAY HELLO ↗</a></div>
            </div>
          </div>
          <div className="intro-bottom"><span>SOFTWARE WITH A HUMAN POINT OF VIEW</span><a href="#work"><span>SCROLL TO EXPLORE</span><i>↓</i></a><span>01 — 04 / INTRODUCTION</span></div>
        </section>

        <section className="portfolio-hero" id="work">
            <div className="showcase-stage" onKeyDown={handleGalleryKeyDown} onPointerMove={handleStagePointerMove} onPointerLeave={(event) => { event.currentTarget.style.setProperty('--light-x', '50%'); event.currentTarget.style.setProperty('--light-y', '42%') }} tabIndex={0} aria-label="Project gallery. Use left and right arrow keys to browse. Select a card to flip it for a short project brief.">
            <div className="showcase-grain" aria-hidden="true" />
            <div className="showcase-intro"><span>FOUR PROJECTS / 2024—26</span><p>Click a card for a quick project brief.</p></div>
            <div ref={carouselRef} className={`showcase-carousel${dragging ? ' is-dragging' : ''}`} aria-label="Project carousel. Drag horizontally, swipe, or use the left and right arrow keys to browse." onScroll={handleCarouselScroll} onPointerDown={handleDeckPointerDown} onPointerMove={handleDeckPointerMove} onPointerUp={handleDeckPointerUp} onLostPointerCapture={(event) => { if (dragState.current?.pointerId === event.pointerId) { dragState.current = null; setDragging(false) } }} onPointerCancel={() => { dragState.current = null; setDragging(false) }} onWheel={handleDeckWheel}>
              <div className="gallery-deck">
                {showcaseProjects.map((project, i) => {
                  return <button key={project.name} data-project-index={i} className={`gallery-card${i === activeProject ? ' gallery-center' : ''}${flippedProject === i ? ' is-flipped' : ''}`} onClick={() => { if (Date.now() < suppressClick.current) return; flipProject(i) }} aria-label={`Project ${i + 1}: ${project.name}. ${flippedProject === i ? 'Brief showing. Flip back to the poster.' : 'Flip for a short project brief.'}`} aria-pressed={flippedProject === i} aria-describedby={flippedProject === i ? `project-brief-${project.target}` : undefined}>
                    <div className="gallery-card-inner">
                    <div className="gallery-card-face gallery-card-front" aria-hidden={flippedProject === i}>
                    <div className={`project-window project-window-${project.target}`}>
                      <div className="window-bar"><span><i /><i /><i /></span><b>{project.name.toUpperCase()}</b><span>↗</span></div>
                      {project.target === 'codebrain' && <div className="poster-art poster-brain"><div className="mock-kicker"><span>AI CODEBASE GUIDE</span><i>01 / 04</i></div><h2 className="mock-title">Understand<br /><em>the code.</em></h2><div className="mock-terminal"><div className="mock-terminal-top"><i /><i /><i /><span>codebrain — /usr/bin/env</span></div><div className="mock-terminal-copy"><small>loaded. paste a repository to begin.</small><b><i>›</i> codebrain --init</b><strong>Code<span>Brain</span></strong><div className="mock-prompt"><span>repo&gt;</span> github.com/…</div></div></div><div className="mock-footnote"><span>ASK → TRACE → UNDERSTAND</span><span>↗ 01</span></div></div>}
                      {project.target === 'sikshyanepal' && <div className="poster-art poster-education"><div className="mock-kicker"><span>STUDENT FIELD GUIDE / NP</span><i>02 / 04</i></div><h2 className="mock-title"><strong>+2 done.</strong><br /><em>Now what?</em></h2><p className="mock-description">Find what to study after +2, and where.</p><div className="mock-search"><span>⌕</span><i>e.g. BCA colleges in Kathmandu</i><b>Search&nbsp; →</b></div><div className="mock-chips"><span>IT &amp; Computing</span><span>Management</span><span>Humanities</span></div><div className="mock-notice"><small>◌ &nbsp;LATEST NOTICE</small><b>Admissions &amp; results, in one place.</b><span>VIEW OFFICIAL SOURCE&nbsp; ↗</span></div><div className="mock-footnote"><span>COLLEGES · PROGRAMS · NEXT STEPS</span><span>↗ 02</span></div></div>}
                      {project.target === 'critch' && <div className="poster-art poster-critch"><div className="mock-kicker"><span>CRITCH / EXPLORE</span><i>03 / 04</i></div><h2 className="mock-title">Projects<span>.</span></h2><p className="mock-description">Browse and review work from the developer community.</p><div className="mock-project-card"><div className="mock-project-art"><span>WORK IN PROGRESS</span><b>MAKE<br />SOMETHING<br /><em>MATTER.</em></b><i>PROJECT / 001</i></div><div className="mock-project-meta"><b>Personal project</b><span>IDEA&nbsp; · &nbsp;UI&nbsp; · &nbsp;CODE&nbsp; · &nbsp;DOCS</span><div><i>01</i><i>02</i><i>03</i><i>04</i></div></div></div><div className="mock-footnote"><span>SPECIFIC FEEDBACK. NEXT STEPS.</span><span>↗ 03</span></div></div>}
                      {project.target === 'rapporteur' && <div className="poster-art poster-rapporteur"><div className="mock-kicker"><span>MEETING / RECEIPTS</span><i>04 / 04</i></div><h2 className="mock-title">Notes that<br /><em>show their work.</em></h2><div className="rapporteur-note"><div className="rapporteur-note-top"><b>ILLUSTRATIVE EXAMPLE</b><span>AGENDA · TRANSCRIPT</span></div><div className="rapporteur-agenda"><small>01 / AGENDA ITEM</small><b>DECISION</b><p>Decision summary, linked to its source.</p><span>↳ SOURCE LINE · QUOTE CHECK</span></div><div className="rapporteur-agenda is-off"><small>OFF AGENDA</small><b>FOLLOW-UP</b><p>Action item kept outside the agenda.</p><span>↳ SOURCE LINE · REVIEW</span></div></div><div className="mock-footnote"><span>CLAIM → QUOTE → SOURCE LINE</span><span>↗ 04</span></div></div>}
                    </div>
                    <span className="gallery-card-kind">PROJECT {String(i + 1).padStart(2, '0')} / {project.kind}</span>
                    </div>
                    <div className="gallery-card-face gallery-card-back" aria-hidden={flippedProject !== i}>
                      <span className="flip-overline">PROJECT BRIEF&nbsp; / &nbsp;{String(i + 1).padStart(2, '0')}</span>
                      <span className="flip-title">{project.name}<i>.</i></span>
                      <span className="flip-note" id={`project-brief-${project.target}`}>{project.brief}</span>
                      <span className="flip-return">CLICK TO FLIP BACK <b>↻</b></span>
                    </div>
                    </div>
                  </button>
                })}
              </div>
            </div>
            <div className="showcase-caption"><div className="showcase-selected"><span>PROJECT {String(activeProject + 1).padStart(2, '0')} / {String(showcaseProjects.length).padStart(2, '0')} · {showcaseProjects[activeProject].kind}</span><h1>{showcaseProjects[activeProject].name}<i>.</i></h1><p>{showcaseProjects[activeProject].note}</p></div><div className="showcase-actions"><button className="showcase-open" aria-pressed={flippedProject === activeProject} onClick={() => flipProject(activeProject)}>{flippedProject === activeProject ? 'FLIP BACK TO ART' : 'FLIP FOR A BRIEF'} <span>↻</span></button><button className="showcase-case-link" onClick={() => continueToProjectStory(activeProject)}>HOW IT WORKS ↓</button></div><div className="showcase-hint"><span>DRAG / SWIPE TO BROWSE</span><small>SCROLL DOWN FOR THE SYSTEM FLOWS</small><div>{showcaseProjects.map((project, i) => <button key={project.name} aria-label={`Show ${project.name}`} aria-current={i === activeProject ? 'true' : undefined} onClick={() => { setFlippedProject(null); scrollToProject(i) }} />)}</div></div></div>
            <div className="showcase-bottomline"><span>FULL-STACK DEVELOPER</span><span>KATHMANDU, NEPAL</span><a href="mailto:kasamthapa89@gmail.com">SAY HELLO ↗</a></div>
          </div>
        </section>

        <div className="project-stories" aria-label="Project stories">
          {showcaseProjects.map((project, index) => (
            <section className={`project-story project-story-${project.target}`} id={`story-${project.target}`} key={project.target} aria-labelledby={`story-title-${project.target}`}>
              <div className="project-story-heading">
                <span>{String(index + 1).padStart(2, '0')} / {project.kind}</span>
                <span>HOW THE SYSTEM WORKS</span>
              </div>
              <div className="project-story-intro">
                <h2 id={`story-title-${project.target}`}>{project.name}<i>.</i></h2>
                <p>{project.note}</p>
                <a href={project.href} target="_blank" rel="noopener noreferrer">OPEN PROJECT <span>↗</span></a>
              </div>
              <div className="project-story-flow">
                <ProjectSystemFlow definition={projectSystemFlows[project.target]} />
              </div>
            </section>
          ))}
        </div>

        <section className="about-section" id="about">
          <div className="section-heading"><div><span className="section-index">ABOUT ME</span><h2>Software with a human point of view.</h2></div></div>
          <div className="about-body">
            <p>I’m Kasam, a software engineer in Kathmandu. I build across the stack, from clear interfaces to the systems behind them. My work helps developers understand code, students choose their next step, and makers get useful feedback.</p>
            <div className="about-facts">
              <div><span>RIGHT NOW</span><p>CodeBrain · SikshyaNepal</p></div>
              <div><span>TOOLS I REACH FOR</span><p>TypeScript · React · Node.js · PostgreSQL</p></div>
              <a href="https://github.com/kasamthapa" target="_blank" rel="noopener noreferrer">More experiments and code on GitHub ↗</a>
            </div>
          </div>
        </section>

        <footer className="portfolio-footer" id="contact">
          <div className="contact-copy"><span className="section-index">HAVE A GOOD PROBLEM?</span><h2>Let’s make it clearer.</h2><a className="contact-email" href="mailto:kasamthapa89@gmail.com">kasamthapa89@gmail.com <span>↗</span></a><nav className="contact-socials" aria-label="Find me online">{socials.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{item.label}<span>↗</span></a>)}</nav></div>
        </footer>
      </div>
      </div>
      <div className="crt-hud-footer" aria-label="Screen controls and contact">
        <span>{clock.slice(0, 5)} KTM</span>
        <button type="button" aria-pressed={monochrome} onClick={() => setMonochrome((value) => !value)}>B&amp;W [{monochrome ? 'ON' : 'OFF'}]</button>
        <button type="button" onClick={onOpenEditor}>SOURCE: CODE VIEW</button>
        <a href="mailto:kasamthapa89@gmail.com">EMAIL</a>
      </div>
    </main>
  )
}
