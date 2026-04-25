import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Each beat is a chapter in the story — written like a dev commit log message
const BEATS = [
  {
    marker: '01',
    heading: 'Started from zero.',
    body: "No computer science degree. No bootcamp. Just a laptop, bad internet, and the kind of stubborn curiosity that makes you debug until 2am. I learned by building things that broke, then fixing them.",
  },
  {
    marker: '02',
    heading: 'Found the full stack.',
    body: 'Frontend first — React clicked fast. Then backend: Node, Express, routing, databases. The more I learned, the more I realized I wanted to understand the whole system, not just a slice of it.',
  },
  {
    marker: '03',
    heading: 'Started building for real people.',
    body: "School websites. Client portfolios. Projects that real users open on real phones. There's a different weight to code when someone actually depends on it. I learned to respect that weight.",
  },
  {
    marker: '04',
    heading: 'Still learning. Always.',
    body: "PostgreSQL last quarter. TypeScript strict mode before that. I don't know everything — but I know how to figure things out, and I'm honest about the difference between those two states.",
  },
]

function Beat({ marker, heading, body, index }: typeof BEATS[0] & { index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr] gap-6 md:gap-10"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Left: marker + line */}
      <div className="flex flex-col items-center">
        <span
          className="font-mono text-xs font-medium mb-2 leading-none"
          style={{ color: '#E8704A' }}
        >
          {marker}
        </span>
        <div className="w-px flex-1 mt-1" style={{ background: '#E8E0D5' }} />
      </div>

      {/* Right: content */}
      <div className="pb-16">
        <h3
          className="font-serif text-2xl md:text-3xl font-semibold mb-4 leading-snug"
          style={{ color: '#1A1A2E' }}
        >
          {heading}
        </h3>
        <p className="font-sans text-base leading-relaxed max-w-lg" style={{ color: '#B8A9A0' }}>
          {body}
        </p>
      </div>
    </motion.div>
  )
}

export default function Story() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true })

  return (
    <section id="story" className="min-h-screen px-6 md:px-16 lg:px-24 py-24 md:py-32">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <span className="font-mono text-sm" style={{ color: '#8BA888' }}>
          / the story
        </span>
        <h2
          className="mt-3 font-serif text-4xl md:text-5xl font-bold"
          style={{ color: '#1A1A2E' }}
        >
          How I got here.
        </h2>
      </motion.div>

      <div className="max-w-2xl">
        {BEATS.map((beat, i) => (
          <Beat key={beat.marker} {...beat} index={i} />
        ))}
      </div>
    </section>
  )
}
