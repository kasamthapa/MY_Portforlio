import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import Minimap from './Minimap'

interface Props {
  code: ReactNode
  preview: ReactNode
  previewLabel?: string
}

function seedFrom(label: string) {
  return label.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
}

const MIN_PCT = 25
const MAX_PCT = 75
const STORAGE_KEY = 'vs-split-pct'

/**
 * Desktop: source on the left, a live-rendered "Preview" pane on the right —
 * same idea as VS Code's split markdown preview. The divider between them is
 * draggable, like a real editor split, and the ratio persists across files.
 * Mobile: one pane at a time behind a Preview/Code toggle (side-by-side doesn't fit).
 */
export default function SplitPane({ code, preview, previewLabel = 'Preview' }: Props) {
  const [view, setView] = useState<'preview' | 'code'>('preview')
  const [pct, setPct] = useState(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY))
    return saved >= MIN_PCT && saved <= MAX_PCT ? saved : 50
  })
  const pctRef = useRef(pct)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    pctRef.current = pct
  }, [pct])

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!draggingRef.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const raw = ((e.clientX - rect.left) / rect.width) * 100
      setPct(Math.min(MAX_PCT, Math.max(MIN_PCT, raw)))
    }
    function onUp() {
      if (draggingRef.current) {
        draggingRef.current = false
        setDragging(false)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
        localStorage.setItem(STORAGE_KEY, String(pctRef.current))
      }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  function startDrag(e: React.MouseEvent) {
    e.preventDefault()
    draggingRef.current = true
    setDragging(true)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  function onDividerKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') setPct((p) => Math.max(MIN_PCT, p - 2))
    else if (e.key === 'ArrowRight') setPct((p) => Math.min(MAX_PCT, p + 2))
    else return
    e.preventDefault()
  }

  return (
    <div
      ref={containerRef}
      className="h-full flex flex-col lg:flex-row animate-fade-in"
      style={{ '--split-pct': `${pct}%`, '--preview-pct': `${100 - pct}%` } as CSSProperties}
    >
      <div className="lg:hidden flex border-b border-[var(--vs-border)] text-xs shrink-0">
        <button
          onClick={() => setView('preview')}
          className={`px-4 py-2 border-r border-[var(--vs-border)] transition-colors duration-150 ${
            view === 'preview' ? 'text-[var(--vs-text)] bg-[var(--vs-hover)]' : 'text-[var(--vs-muted)]'
          }`}
        >
          ▷ {previewLabel}
        </button>
        <button
          onClick={() => setView('code')}
          className={`px-4 py-2 transition-colors duration-150 ${
            view === 'code' ? 'text-[var(--vs-text)] bg-[var(--vs-hover)]' : 'text-[var(--vs-muted)]'
          }`}
        >
          {'</>'} Source
        </button>
      </div>

      <div
        className={`${view === 'code' ? 'flex' : 'hidden'} lg:flex flex-1 lg:w-[var(--split-pct)] lg:flex-none min-w-0`}
      >
        <div className="flex-1 overflow-y-auto min-w-0">{code}</div>
        <Minimap seed={seedFrom(previewLabel)} />
      </div>

      {/* draggable divider */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize code and preview panes"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={MIN_PCT}
        aria-valuemax={MAX_PCT}
        tabIndex={0}
        onMouseDown={startDrag}
        onKeyDown={onDividerKeyDown}
        className={`hidden lg:block w-1 shrink-0 cursor-col-resize relative group focus:outline-none ${
          dragging ? 'bg-[var(--vs-accent-bright)]' : 'bg-[var(--vs-border)]'
        }`}
      >
        <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-[var(--vs-accent-bright)]/40" />
      </div>

      <div
        className={`${
          view === 'preview' ? 'flex' : 'hidden'
        } lg:flex flex-1 lg:w-[var(--preview-pct)] lg:flex-none overflow-y-auto flex-col min-w-0 relative`}
      >
        <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 border-b border-[var(--vs-border)] text-[11px] text-[var(--vs-muted)] shrink-0">
          <span>▷</span>
          <span>{previewLabel}</span>
        </div>
        <div
          className="pointer-events-none absolute -top-20 right-0 w-80 h-80 rounded-full opacity-[0.08] blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--vs-glow), transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="flex-1 min-h-0 relative">{preview}</div>
      </div>
    </div>
  )
}
