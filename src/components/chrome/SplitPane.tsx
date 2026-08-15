import { useState, type ReactNode } from 'react'
import Minimap from './Minimap'

interface Props {
  code: ReactNode
  preview: ReactNode
  previewLabel?: string
}

function seedFrom(label: string) {
  return label.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
}

/**
 * Desktop: source on the left, a live-rendered "Preview" pane on the right —
 * same idea as VS Code's split markdown preview.
 * Mobile: one pane at a time behind a Preview/Code toggle (side-by-side doesn't fit).
 */
export default function SplitPane({ code, preview, previewLabel = 'Preview' }: Props) {
  const [view, setView] = useState<'preview' | 'code'>('preview')

  return (
    <div className="h-full flex flex-col lg:flex-row animate-fade-in">
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
        className={`${
          view === 'code' ? 'flex' : 'hidden'
        } lg:flex flex-1 lg:w-1/2 lg:border-r border-[var(--vs-border)] min-w-0`}
      >
        <div className="flex-1 overflow-y-auto min-w-0">{code}</div>
        <Minimap seed={seedFrom(previewLabel)} />
      </div>

      <div
        className={`${
          view === 'preview' ? 'flex' : 'hidden'
        } lg:flex flex-1 lg:w-1/2 overflow-y-auto flex-col min-w-0 relative`}
      >
        <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 border-b border-[var(--vs-border)] text-[11px] text-[var(--vs-muted)] shrink-0">
          <span>▷</span>
          <span>{previewLabel}</span>
        </div>
        <div
          className="pointer-events-none absolute -top-20 right-0 w-80 h-80 rounded-full opacity-[0.08] blur-3xl"
          style={{ background: 'radial-gradient(circle, #3794ff, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="flex-1 min-h-0 relative">{preview}</div>
      </div>
    </div>
  )
}
