import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  active: boolean
  onToggle: () => void
}

export default function ScrappyToggle({ active, onToggle }: Props) {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-mono font-medium shadow-lg backdrop-blur-sm transition-colors"
      style={{
        background: active ? '#00FF41' : 'rgba(250, 247, 242, 0.85)',
        color: active ? '#0A0A0A' : '#2D3A3A',
        borderColor: active ? '#00FF41' : '#B8A9A0',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Toggle scrappy/dev mode"
    >
      <span>{active ? '⚡' : '🔧'}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={active ? 'on' : 'off'}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
        >
          {active ? 'scrappy on' : 'scrappy mode'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
