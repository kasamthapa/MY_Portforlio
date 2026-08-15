import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Manifesto from './sections/Manifesto'
import Projects from './sections/Projects'
import Stack from './sections/Stack'
import Now from './sections/Now'
import Contact from './sections/Contact'
import { useLenis } from './hooks/useLenis'

export default function CinematicApp() {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useLenis(!loading)

  useEffect(() => {
    setMounted(true)
    const prevOverflow = document.body.style.overflow
    const prevTitle = document.title
    document.body.style.overflow = 'auto'
    document.title = 'Kasam Thapa Magar — Cinematic'
    return () => {
      document.body.style.overflow = prevOverflow
      document.title = prevTitle
    }
  }, [])

  return (
    <div className="cinematic-root">
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div className="cn-grain" aria-hidden="true" />
      <Cursor />
      <Nav />

      <main>
        <Hero ready={mounted && !loading} />
        <Manifesto />
        <Projects />
        <Stack />
        <Now />
        <Contact />
      </main>
    </div>
  )
}
