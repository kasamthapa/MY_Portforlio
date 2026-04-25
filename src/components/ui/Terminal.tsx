import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onClose: () => void
}

const RESPONSES: Record<string, string | string[]> = {
  whoami: 'kasam thapa magar — full stack developer, nepal',
  pwd: '/home/kasam/workshop',
  ls: [
    'drwxr-xr-x  projects/',
    'drwxr-xr-x  stack/',
    '-rw-r--r--  README.md',
    '-rw-r--r--  curiosity.txt',
    '-rw-r--r--  work-in-progress.log',
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
  'hire kasam': [
    '> Initiating contact sequence...',
    '> Opening LinkedIn...',
    '> Status: Available for interesting work ✓',
  ],
  cat: 'cat what? try: cat README.md',
  'cat README.md': [
    '# kasam thapa magar',
    '',
    'builds real things from scratch.',
    'based in nepal. works with curiosity.',
    'ships. learns. repeats.',
    '',
    'contact: linkedin.com/in/kasamthapamagar',
  ],
  'cat curiosity.txt': '"The best code I ever wrote started as a stupid idea."',
  help: [
    'available commands:',
    '  whoami       — who is this person',
    '  ls           — what\'s in the workshop',
    '  skills       — tech stack',
    '  hire kasam   — let\'s work together',
    '  cat README.md',
    '  cat curiosity.txt',
    '  clear        — clear the terminal',
    '  exit         — close this panel',
  ],
  clear: '__clear__',
  exit: '__exit__',
}

export default function Terminal({ onClose }: Props) {
  const [history, setHistory] = useState<{ cmd: string; out: string | string[] }[]>([
    { cmd: '', out: ['Welcome to the workshop terminal.', 'Type "help" to see available commands.', ''] },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    inputRef.current?.focus()
  }, [history])

  const run = (cmd: string) => {
    const key = cmd.trim().toLowerCase()
    if (!key) return

    const response = RESPONSES[key]

    if (response === '__exit__') { onClose(); return }
    if (response === '__clear__') { setHistory([]); return }

    const out = response ?? `command not found: ${key}. try "help"`
    setHistory((h) => [...h, { cmd, out }])
    setInput('')
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl"
          style={{ background: '#0A0A0A', border: '1px solid #333' }}
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#222]">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FF5F57] hover:opacity-80 transition-opacity" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="ml-2 text-[#666] text-xs font-mono">kasam@workshop ~ terminal</span>
          </div>

          {/* Output */}
          <div className="h-80 overflow-y-auto p-4 font-mono text-sm leading-relaxed">
            {history.map((entry, i) => (
              <div key={i}>
                {entry.cmd && (
                  <p className="text-[#64FFDA]">
                    <span className="text-[#E8704A]">kasam@workshop</span>
                    <span className="text-[#666]">:~$ </span>
                    {entry.cmd}
                  </p>
                )}
                {Array.isArray(entry.out)
                  ? entry.out.map((line, j) => <p key={j} className="text-[#B0B0B0] pl-2">{line}</p>)
                  : <p className="text-[#B0B0B0] pl-2">{entry.out as string}</p>
                }
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-[#222]">
            <span className="text-[#E8704A] font-mono text-sm">kasam@workshop</span>
            <span className="text-[#666] font-mono text-sm">:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && run(input)}
              className="flex-1 bg-transparent text-[#64FFDA] font-mono text-sm outline-none caret-[#64FFDA]"
              placeholder="type a command..."
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
