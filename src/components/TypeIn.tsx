import { useEffect, useState } from 'react'

interface Props {
  text: string
  speed?: number
  cursor?: boolean
  className?: string
  onDone?: () => void
}

export default function TypeIn({ text, speed = 28, cursor = false, className, onDone }: Props) {
  const [count, setCount] = useState(0)
  const done = count >= text.length

  useEffect(() => {
    if (done) {
      onDone?.()
      return
    }
    const t = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, done, speed])

  return (
    <span className={className}>
      {text.slice(0, count)}
      {cursor && <span className="animate-blink">{done ? '▌' : ''}</span>}
    </span>
  )
}
