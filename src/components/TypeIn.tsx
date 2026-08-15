import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface Props {
  text: string
  speed?: number
  cursor?: boolean
  trailingCursor?: boolean
  className?: string
  /** Explicit cursor color — needed when the parent uses a gradient/transparent text fill,
   *  since the cursor would otherwise inherit that (invisible) color. */
  cursorColor?: string
  onDone?: () => void
}

export default function TypeIn({
  text,
  speed = 28,
  cursor = false,
  trailingCursor = false,
  className,
  cursorColor,
  onDone,
}: Props) {
  const reducedMotion = usePrefersReducedMotion()
  const [count, setCount] = useState(reducedMotion ? text.length : 0)
  const done = count >= text.length

  useEffect(() => {
    if (reducedMotion) return
    if (done) {
      onDone?.()
      return
    }
    const t = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, done, speed, reducedMotion])

  // Reduced motion: skip straight to the finished state, once.
  useEffect(() => {
    if (reducedMotion) onDone?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  const showCursor = !reducedMotion && ((cursor && !done) || (trailingCursor && done))

  return (
    <span className={className}>
      {text.slice(0, count)}
      {showCursor && (
        <span className="animate-caret" style={cursorColor ? { color: cursorColor } : undefined}>
          ▌
        </span>
      )}
    </span>
  )
}
