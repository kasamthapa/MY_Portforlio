import { useEffect, useRef, useState } from 'react'
import { TsFileIcon, JsonFileIcon, SearchIcon } from './icons'
import { FILES } from '../../editor/registry'

interface Props {
  onOpenFile: (id: string) => void
  onClose: () => void
}

export default function CommandPalette({ onOpenFile, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = FILES.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    setIndex(0)
  }, [query])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const picked = results[index]
      if (picked) {
        onOpenFile(picked.id)
        onClose()
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4 bg-black/50 backdrop-blur-[2px] animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-lg overflow-hidden border border-[var(--vs-panel-border)] shadow-[0_16px_50px_-12px_rgba(0,0,0,0.7)] bg-[#252526]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-black/30 bg-[#1e1e1e]">
          <SearchIcon size={14} className="text-[var(--vs-muted)] shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Go to file…"
            className="flex-1 bg-transparent outline-none text-[13px] text-[var(--vs-text)] placeholder:text-[var(--vs-muted)]"
          />
          <kbd className="text-[10px] text-[var(--vs-muted)] border border-[var(--vs-panel-border)] rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto py-1">
          {results.length === 0 && (
            <p className="px-4 py-6 text-center text-[13px] text-[var(--vs-muted)]">No matching files</p>
          )}
          {results.map((file, i) => (
            <button
              key={file.id}
              onMouseEnter={() => setIndex(i)}
              onClick={() => {
                onOpenFile(file.id)
                onClose()
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-[13px] ${
                i === index ? 'bg-[#04395e] text-white' : 'text-[var(--vs-text)]'
              }`}
            >
              {file.language === 'json' ? <JsonFileIcon size={14} /> : <TsFileIcon size={14} />}
              <span>{file.name}</span>
              <span className="ml-auto text-[11px] text-[var(--vs-muted)]">{file.previewLabel}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
