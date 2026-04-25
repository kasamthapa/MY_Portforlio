import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINKS = [
  {
    label: 'GitHub',
    handle: '@kasamthapa',
    description: "Where the actual work lives. Commits don't lie.",
    url: 'https://github.com/kasamthapa',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    cta: 'Explore repos →',
  },
  {
    label: 'LinkedIn',
    handle: 'Kasam Thapa Magar',
    description: "Professional side. I'm more fun on GitHub, but reach out here.",
    url: 'https://www.linkedin.com/in/kasamthapamagar/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    cta: 'Connect →',
  },
  {
    label: 'X / Twitter',
    handle: '@kasamthapa89',
    description: "Thoughts, dev takes, and the occasional rant about TypeScript.",
    url: 'https://x.com/kasamthapa89',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.733l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
    cta: 'Follow →',
  },
]

export default function Connect() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true })

  return (
    <section id="connect" className="px-6 md:px-16 lg:px-24 py-24 md:py-32">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="font-mono text-sm" style={{ color: '#8BA888' }}>/ find me</span>
        <h2
          className="mt-3 font-serif text-4xl md:text-5xl font-bold"
          style={{ color: '#1A1A2E' }}
        >
          Let's build something.
        </h2>
        <p className="mt-3 font-sans text-base max-w-md" style={{ color: '#B8A9A0' }}>
          I'm always up for interesting work, collaboration, or just a good conversation about code.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl p-6 border flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg no-underline"
            style={{
              background: 'rgba(250, 247, 242, 0.6)',
              borderColor: '#E8E0D5',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ borderColor: '#E8704A' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: '#F5F0E8', color: '#E8704A' }}
            >
              {link.icon}
            </div>

            <div>
              <p className="font-sans font-semibold text-sm" style={{ color: '#1A1A2E' }}>
                {link.label}
              </p>
              <p className="font-mono text-xs mt-0.5" style={{ color: '#8BA888' }}>
                {link.handle}
              </p>
            </div>

            <p className="font-sans text-xs leading-relaxed flex-1" style={{ color: '#B8A9A0' }}>
              {link.description}
            </p>

            <span
              className="font-mono text-xs font-medium transition-colors"
              style={{ color: '#E8704A' }}
            >
              {link.cta}
            </span>
          </motion.a>
        ))}
      </div>

      {/* Email nudge */}
      <motion.div
        className="mt-12 max-w-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div
          className="rounded-2xl p-6 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: '#1A1A2E', borderColor: '#1A1A2E' }}
        >
          <div>
            <p className="font-serif text-xl font-semibold" style={{ color: '#FAF7F2' }}>
              Want to work together?
            </p>
            <p className="font-sans text-sm mt-1" style={{ color: '#B8A9A0' }}>
              Reach me via LinkedIn or find me on GitHub.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/kasamthapamagar/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: '#E8704A', color: '#FAF7F2' }}
          >
            Say hello →
          </a>
        </div>
      </motion.div>
    </section>
  )
}
