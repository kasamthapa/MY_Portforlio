import { useState, useEffect } from 'react'

interface Props {
  words: string[]
  speed?: number
  pause?: number
  className?: string
  style?: React.CSSProperties
}

export default function TypeWriter({ words, speed = 80, pause = 2000, className, style }: Props) {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]

    if (!deleting && displayed === word) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }

    if (deleting && displayed === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
      return
    }

    const t = setTimeout(
      () => {
        setDisplayed((s) =>
          deleting ? s.slice(0, -1) : word.slice(0, s.length + 1)
        )
      },
      deleting ? speed / 2 : speed
    )
    return () => clearTimeout(t)
  }, [displayed, deleting, wordIndex, words, speed, pause])

  return (
    <span className={className} style={style}>
      {displayed}
      <span className="animate-blink">|</span>
    </span>
  )
}
