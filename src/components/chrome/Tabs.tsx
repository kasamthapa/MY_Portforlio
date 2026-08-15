import { useRef } from 'react'
import { CloseIcon, TsFileIcon, JsonFileIcon } from './icons'
import { FILES } from '../../editor/registry'

interface Props {
  openIds: string[]
  activeId: string
  onSelect: (id: string) => void
  onClose: (id: string) => void
  panelId: string
}

export default function Tabs({ openIds, activeId, onSelect, onClose, panelId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    let nextIndex: number | null = null
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % openIds.length
    else if (e.key === 'ArrowLeft') nextIndex = (index - 1 + openIds.length) % openIds.length
    else if (e.key === 'Home') nextIndex = 0
    else if (e.key === 'End') nextIndex = openIds.length - 1
    else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault()
      onClose(openIds[index])
      return
    }

    if (nextIndex !== null) {
      e.preventDefault()
      const nextId = openIds[nextIndex]
      onSelect(nextId)
      const btn = containerRef.current?.querySelector<HTMLButtonElement>(`[data-tab-id="${nextId}"]`)
      btn?.focus()
    }
  }

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Open files"
      className="h-9 shrink-0 flex bg-[var(--vs-sidebar)] overflow-x-auto"
    >
      {openIds.map((id, i) => {
        const file = FILES.find((f) => f.id === id)
        if (!file) return null
        const active = id === activeId

        return (
          <button
            key={id}
            data-tab-id={id}
            role="tab"
            id={`tab-${id}`}
            aria-selected={active}
            aria-controls={panelId}
            tabIndex={active ? 0 : -1}
            onClick={() => onSelect(id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`group shrink-0 flex items-center gap-2 pl-3 pr-2 h-full text-[13px] border-r border-[var(--vs-border)] transition-colors duration-150 ${
              active
                ? 'bg-[var(--vs-tab-active)] text-[var(--vs-tab-active-text)] border-t-2 border-t-[var(--vs-accent-bright)]'
                : 'bg-[var(--vs-tab-inactive)] text-[var(--vs-muted)] border-t-2 border-t-transparent hover:text-[var(--vs-text)]'
            }`}
          >
            {file.language === 'json' ? <JsonFileIcon size={14} /> : <TsFileIcon size={14} />}
            <span className="whitespace-nowrap">{file.name}</span>
            <span
              role="button"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation()
                onClose(id)
              }}
              className={`ml-1 p-0.5 rounded hover:bg-white/10 ${
                active ? 'opacity-70 hover:opacity-100' : 'opacity-0 group-hover:opacity-70 hover:!opacity-100'
              }`}
              aria-label={`Close ${file.name}`}
            >
              <CloseIcon size={11} />
            </span>
          </button>
        )
      })}
    </div>
  )
}
