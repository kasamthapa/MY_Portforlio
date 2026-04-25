import { useState, useEffect } from 'react'

// ↑↑↓↓←→←→ba — the classic cheat code that opens the hidden terminal
const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function useKonamiCode() {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    let buffer: string[] = []
    const handler = (e: KeyboardEvent) => {
      buffer = [...buffer, e.key].slice(-SEQUENCE.length)
      if (buffer.join() === SEQUENCE.join()) setUnlocked(true)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return { unlocked, close: () => setUnlocked(false) }
}
