import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import Noise from './components/ui/Noise'
import ScrappyToggle from './components/ui/ScrappyToggle'
import Terminal from './components/ui/Terminal'
import SideNav from './components/layout/SideNav'
import Footer from './components/layout/Footer'

import Hero from './components/sections/Hero'
import Story from './components/sections/Story'
import Projects from './components/sections/Projects'
import Stack from './components/sections/Stack'
import DevLog from './components/sections/DevLog'
import Connect from './components/sections/Connect'

import { useScrappyMode } from './hooks/useScrappyMode'
import { useActiveSection } from './hooks/useActiveSection'
import { useKonamiCode } from './hooks/useKonamiCode'

export default function App() {
  const { scrappy, toggle } = useScrappyMode()
  const { active, scrollTo, sections } = useActiveSection()
  const { unlocked, close } = useKonamiCode()

  // Only show side nav after the user has scrolled past the hero
  const [navVisible, setNavVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > window.innerHeight * 0.4)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Washi-paper grain texture */}
      <Noise />

      {/* Floating section indicator (right side) */}
      <SideNav
        active={active}
        sections={sections}
        onNavigate={scrollTo}
        visible={navVisible}
      />

      {/* Scrappy mode toggle (bottom-right) */}
      <ScrappyToggle active={scrappy} onToggle={toggle} />

      {/* Konami code terminal easter egg */}
      <AnimatePresence>
        {unlocked && <Terminal onClose={close} />}
      </AnimatePresence>

      {/* Main content */}
      <main>
        <Hero />
        <Story />
        <Projects />
        <Stack />
        <DevLog />
        <Connect />
      </main>

      <Footer />
    </>
  )
}
