import { motion } from 'framer-motion'
import TypeWriter from '../ui/TypeWriter'

// Sticky notes are pinned at random angles to break the grid rigidity on purpose.
const STICKY_NOTES = [
  { text: 'Nepal 🇳🇵', rotate: -3, x: '72%', y: '18%', color: '#FDE68A' },
  { text: 'Ships fast', rotate: 2, x: '78%', y: '55%', color: '#BBF7D0' },
  { text: 'Full stack', rotate: -2, x: '68%', y: '72%', color: '#FECACA' },
  { text: 'Real builder', rotate: 4, x: '82%', y: '35%', color: '#DDD6FE' },
]

const TYPEWRITER_WORDS = [
  'from Nepal.',
  'with curiosity.',
  'for real users.',
  'one commit at a time.',
  'from scratch.',
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Background grid — subtle ruled-paper feel */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#2D3A3A 1px, transparent 1px), linear-gradient(90deg, #2D3A3A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating sticky notes — desktop only to keep mobile clean */}
      {STICKY_NOTES.map((note, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block select-none"
          style={{
            left: note.x,
            top: note.y,
            transform: `rotate(${note.rotate}deg)`,
            background: note.color,
            '--rotate': `${note.rotate}deg`,
          } as React.CSSProperties}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.5, type: 'spring' }}
          whileHover={{ scale: 1.05, rotate: note.rotate * 0.5 }}
        >
          <div
            className="px-3 py-2 font-mono text-sm font-medium shadow-md"
            style={{
              color: '#2D3A3A',
              minWidth: '80px',
              boxShadow: '2px 3px 8px rgba(0,0,0,0.15)',
            }}
          >
            {note.text}
          </div>
          {/* Pin shadow at top */}
          <div
            aria-hidden="true"
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#E8704A] shadow-sm"
          />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-2xl">
        {/* Pre-heading label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2"
        >
          <span
            className="inline-block w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#8BA888' }}
          />
          <span className="font-mono text-sm" style={{ color: '#8BA888' }}>
            available for work
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-4"
          style={{ color: '#1A1A2E' }}
        >
          Kasam
          <br />
          <span style={{ color: '#E8704A' }}>Thapa Magar</span>
        </motion.h1>

        {/* Tagline with typewriter */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-sans text-xl md:text-2xl font-light mb-8 leading-relaxed"
          style={{ color: '#2D3A3A' }}
        >
          Building real things{' '}
          <TypeWriter
            words={TYPEWRITER_WORDS}
            className="font-medium"
            style={{ color: '#E8704A' }}
          />
        </motion.p>

        {/* One-liner bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-md font-sans text-base leading-relaxed"
          style={{ color: '#B8A9A0' }}
        >
          Full stack developer. I don't chase trends — I build what's needed,
          learn what's required, and ship what works.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: '#1A1A2E', color: '#FAF7F2' }}
          >
            See my work
            <span>→</span>
          </a>
          <a
            href="#connect"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-sm font-medium border transition-all duration-200 hover:-translate-y-0.5"
            style={{ borderColor: '#B8A9A0', color: '#2D3A3A' }}
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Scroll nudge */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="font-mono text-xs" style={{ color: '#B8A9A0' }}>scroll</span>
        <motion.div
          className="w-0.5 h-8 rounded-full"
          style={{ background: '#B8A9A0' }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.div>
    </section>
  )
}
