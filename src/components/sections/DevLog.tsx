import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { devlog } from '../../data/devlog'

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  meta: { bg: '#DDD6FE', color: '#5B21B6' },
  dev: { bg: '#DBEAFE', color: '#1D4ED8' },
  learning: { bg: '#BBF7D0', color: '#166534' },
  shipped: { bg: '#FDE68A', color: '#92400E' },
}

export default function DevLog() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true })

  return (
    <section id="devlog" className="px-6 md:px-16 lg:px-24 py-24 md:py-32">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="font-mono text-sm" style={{ color: '#8BA888' }}>/ field notes</span>
        <h2
          className="mt-3 font-serif text-4xl md:text-5xl font-bold"
          style={{ color: '#1A1A2E' }}
        >
          Dev log.
        </h2>
        <p className="mt-3 font-sans text-base max-w-sm" style={{ color: '#B8A9A0' }}>
          Unfiltered. The kind of stuff I'd write in a margin.
        </p>
      </motion.div>

      {/* Notepad style container */}
      <div
        className="max-w-2xl rounded-2xl overflow-hidden border"
        style={{ borderColor: '#E8E0D5', background: '#FAF7F2' }}
      >
        {/* Notepad header */}
        <div
          className="px-6 py-4 border-b flex items-center gap-3"
          style={{ borderColor: '#E8E0D5', background: 'rgba(245, 240, 232, 0.8)' }}
        >
          <span className="text-lg">📓</span>
          <span className="font-mono text-sm font-medium" style={{ color: '#2D3A3A' }}>
            kasam's dev journal
          </span>
          <span className="ml-auto font-mono text-xs" style={{ color: '#B8A9A0' }}>
            {devlog.length} entries
          </span>
        </div>

        {/* Entries */}
        <div className="divide-y" style={{ borderColor: '#F0E8DC' }}>
          {devlog.map((entry, i) => {
            const tag = entry.tag ? TAG_COLORS[entry.tag] : null
            return (
              <motion.div
                key={entry.id}
                className="px-6 py-5"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base leading-none">{entry.mood}</span>
                  <span className="font-mono text-xs" style={{ color: '#B8A9A0' }}>
                    {entry.date}
                  </span>
                  {tag && entry.tag && (
                    <span
                      className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full"
                      style={{ background: tag.bg, color: tag.color }}
                    >
                      #{entry.tag}
                    </span>
                  )}
                </div>
                <p className="font-sans text-sm leading-relaxed" style={{ color: '#2D3A3A' }}>
                  {entry.content}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
