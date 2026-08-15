import { CloseIcon, TsFileIcon, JsonFileIcon } from './icons'
import { FILES } from '../../editor/registry'

interface Props {
  openIds: string[]
  activeId: string
  onSelect: (id: string) => void
  onClose: (id: string) => void
}

export default function Tabs({ openIds, activeId, onSelect, onClose }: Props) {
  return (
    <div className="h-9 shrink-0 flex bg-[var(--vs-sidebar)] overflow-x-auto">
      {openIds.map((id) => {
        const file = FILES.find((f) => f.id === id)
        if (!file) return null
        const active = id === activeId

        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`group shrink-0 flex items-center gap-2 pl-3 pr-2 h-full text-[13px] border-r border-[var(--vs-border)] transition-colors duration-150 ${
              active
                ? 'bg-[var(--vs-tab-active)] text-white border-t-2 border-t-[#3794ff]'
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
