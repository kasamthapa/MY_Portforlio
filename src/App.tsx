import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Stack from './components/sections/Stack'
import Now from './components/sections/Now'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <Projects />
        <Stack />
        <Now />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
