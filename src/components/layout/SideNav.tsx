import { motion, AnimatePresence } from 'framer-motion'
import type { SectionId } from '../../types'

interface Props {
  active: SectionId
  sections: SectionId[]
  onNavigate: (id: SectionId) => void
  visible: boolean
}

const LABELS: Record<SectionId, string> = {
  hero: 'intro',
  story: 'story',
  projects: 'work',
  stack: 'tools',
  devlog: 'log',
  connect: 'find me',
}

export default function SideNav({ active, sections, onNavigate, visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="fixed right-6 top-1/2 z-40 -translate-y-1/2 flex flex-col gap-3 items-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          aria-label="Section navigation"
        >
          {sections.map((id) => {
            const isActive = id === active
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className="group flex items-center gap-2"
                aria-label={`Go to ${LABELS[id]}`}
              >
                <span
                  className="text-xs font-mono transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                  style={{ color: isActive ? '#E8704A' : '#B8A9A0' }}
                >
                  {LABELS[id]}
                </span>
                <motion.div
                  className="rounded-full"
                  animate={{
                    width: isActive ? 24 : 8,
                    height: isActive ? 8 : 8,
                    backgroundColor: isActive ? '#E8704A' : '#B8A9A0',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              </button>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
