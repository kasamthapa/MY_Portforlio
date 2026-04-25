import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { stack, categories } from '../../data/stack'
import type { StackItem } from '../../types'

function ToolBadge({ item, index }: { item: StackItem; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative group cursor-default"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, rotate: [-1, 1, -0.5, 0] }}
    >
      <div
        className="rounded-xl px-4 py-3 border transition-all duration-200 text-center"
        style={{
          background: hovered ? '#1A1A2E' : 'rgba(250, 247, 242, 0.8)',
          borderColor: hovered ? '#E8704A' : '#E8E0D5',
        }}
      >
        <span className="text-2xl block mb-1">{item.icon}</span>
        <span
          className="font-mono text-xs font-medium block"
          style={{ color: hovered ? '#FAF7F2' : '#2D3A3A' }}
        >
          {item.name}
        </span>
      </div>

      {/* Tooltip */}
      {item.note && hovered && (
        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 font-mono text-xs pointer-events-none z-10"
          style={{ background: '#1A1A2E', color: '#FAF7F2' }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {item.note}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
            style={{ borderTopColor: '#1A1A2E' }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}

export default function Stack() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true })

  return (
    <section
      id="stack"
      className="px-6 md:px-16 lg:px-24 py-24 md:py-32"
      style={{ background: 'linear-gradient(to bottom, transparent, rgba(245, 240, 232, 0.5), transparent)' }}
    >
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="font-mono text-sm" style={{ color: '#8BA888' }}>/ the tools</span>
        <h2
          className="mt-3 font-serif text-4xl md:text-5xl font-bold"
          style={{ color: '#1A1A2E' }}
        >
          What's in the kit.
        </h2>
        <p className="mt-3 font-sans text-sm" style={{ color: '#B8A9A0' }}>
          hover to see notes
        </p>
      </motion.div>

      <div className="space-y-12 max-w-3xl">
        {categories.map((cat) => {
          const items = stack.filter((s) => s.category === cat)
          if (!items.length) return null
          return (
            <div key={cat}>
              <h3
                className="font-mono text-xs uppercase tracking-widest mb-4"
                style={{ color: '#B8A9A0' }}
              >
                {cat}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((item, i) => (
                  <ToolBadge key={item.name} item={item} index={i} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
