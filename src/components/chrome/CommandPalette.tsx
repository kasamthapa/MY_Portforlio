import { useEffect, useRef, useState } from 'react'
import { TsFileIcon, JsonFileIcon, SearchIcon } from './icons'
import { FILES } from '../../editor/registry'

export interface Command {
  id: string
  label: string
  detail?: string
  run: () => void
}

interface Props {
  commands: Command[]
  onOpenFile: (id: string) => void
  onClose: () => void
}

export default function CommandPalette({ commands, onOpenFile, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  const isCommandMode = query.startsWith('>')
  const term = isCommandMode ? query.slice(1).trim().toLowerCase() : query.toLowerCase()
  const words = term.split(/\s+/).filter(Boolean)
  const matches = (label: string) => {
    const lower = label.toLowerCase()
    return words.every((w) => lower.includes(w))
  }

  const fileResults = isCommandMode ? [] : FILES.filter((f) => matches(f.name))
  const commandResults = isCommandMode ? commands.filter((c) => matches(c.label)) : []
  const resultCount = isCommandMode ? commandResults.length : fileResults.length
  const activeOptionId = resultCount > 0 ? `palette-option-${index}` : undefined

  useEffect(() => {
    lastFocused.current = document.activeElement as HTMLElement
    inputRef.current?.focus()
    return () => {
      lastFocused.current?.focus?.()
    }
  }, [])

  useEffect(() => {
    setIndex(0)
  }, [query])

  function pick(i: number) {
    if (isCommandMode) {
      commandResults[i]?.run()
    } else {
      const f = fileResults[i]
      if (f) onOpenFile(f.id)
    }
    onClose()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => Math.min(i + 1, Math.max(resultCount - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      pick(index)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4 bg-black/50 backdrop-blur-[2px] animate-fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        className="w-full max-w-lg rounded-lg overflow-hidden border border-[var(--vs-panel-border)] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.75)] bg-[var(--vs-palette-bg)] animate-palette-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-black/30 bg-[var(--vs-palette-header-bg)]">
          <SearchIcon size={14} className="text-[var(--vs-muted)] shrink-0" />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-listbox"
            aria-autocomplete="list"
            aria-activedescendant={activeOptionId}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Go to file, or type > for commands…"
            className="flex-1 bg-transparent outline-none text-[13px] text-[var(--vs-text)] placeholder:text-[var(--vs-muted)]"
          />
          <kbd className="text-[10px] text-[var(--vs-muted)] border border-[var(--vs-panel-border)] rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>

        <div id="palette-listbox" role="listbox" aria-label="Results" className="max-h-72 overflow-y-auto py-1">
          {resultCount === 0 && (
            <p className="px-4 py-6 text-center text-[13px] text-[var(--vs-muted)]">
              {isCommandMode ? 'No matching commands' : 'No matching files'}
            </p>
          )}

          {!isCommandMode &&
            fileResults.map((file, i) => (
              <button
                key={file.id}
                id={`palette-option-${i}`}
                role="option"
                aria-selected={i === index}
                onMouseEnter={() => setIndex(i)}
                onClick={() => pick(i)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-[13px] ${
                  i === index
                    ? 'bg-[var(--vs-palette-selected-bg)] text-[var(--vs-palette-selected-text)]'
                    : 'text-[var(--vs-text)]'
                }`}
              >
                {file.language === 'json' ? <JsonFileIcon size={14} /> : <TsFileIcon size={14} />}
                <span>{file.name}</span>
                <span className="ml-auto text-[11px] text-[var(--vs-muted)]">{file.previewLabel}</span>
              </button>
            ))}

          {isCommandMode &&
            commandResults.map((cmd, i) => (
              <button
                key={cmd.id}
                id={`palette-option-${i}`}
                role="option"
                aria-selected={i === index}
                onMouseEnter={() => setIndex(i)}
                onClick={() => pick(i)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-[13px] ${
                  i === index
                    ? 'bg-[var(--vs-palette-selected-bg)] text-[var(--vs-palette-selected-text)]'
                    : 'text-[var(--vs-text)]'
                }`}
              >
                <span className="text-[var(--vs-keyword)]">❯</span>
                <span>{cmd.label}</span>
                {cmd.detail && <span className="ml-auto text-[11px] text-[var(--vs-muted)]">{cmd.detail}</span>}
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}
