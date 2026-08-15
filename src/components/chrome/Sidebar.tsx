import { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon, FolderIcon, TsFileIcon, JsonFileIcon, CloseIcon, CircleDotIcon } from './icons'
import { FILES } from '../../editor/registry'

interface Props {
  activeId: string
  openIds: string[]
  onOpen: (id: string) => void
  onCloseTab: (id: string) => void
}

export default function Sidebar({ activeId, openIds, onOpen, onCloseTab }: Props) {
  const [srcOpen, setSrcOpen] = useState(true)
  const [editorsOpen, setEditorsOpen] = useState(true)

  return (
    <div className="h-full flex flex-col bg-[var(--vs-sidebar)] text-[13px]">
      <div className="px-4 pt-4 pb-2 text-[11px] tracking-widest text-[var(--vs-muted)] font-semibold">
        EXPLORER
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {/* OPEN EDITORS */}
        <button
          onClick={() => setEditorsOpen((v) => !v)}
          className="w-full flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-[var(--vs-text)] tracking-wide hover:bg-[var(--vs-hover)] transition-colors duration-150"
        >
          {editorsOpen ? <ChevronDownIcon size={12} /> : <ChevronRightIcon size={12} />}
          <span>OPEN EDITORS</span>
        </button>

        {editorsOpen && (
          <div className="mb-1">
            {openIds.map((id) => {
              const file = FILES.find((f) => f.id === id)
              if (!file) return null
              const active = id === activeId
              return (
                <button
                  key={id}
                  onClick={() => onOpen(id)}
                  className={`group w-full flex items-center gap-2 pl-6 pr-2 py-[3px] text-left italic transition-colors duration-150 ${
                    active ? 'bg-[#37373d] text-white' : 'text-[var(--vs-text)] hover:bg-[var(--vs-hover)]'
                  }`}
                >
                  {file.language === 'json' ? <JsonFileIcon size={13} /> : <TsFileIcon size={13} />}
                  <span className="truncate flex-1">{file.name}</span>
                  <span
                    role="button"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.stopPropagation()
                      onCloseTab(id)
                    }}
                    className="p-0.5 rounded hover:bg-white/10 opacity-0 group-hover:opacity-70 hover:!opacity-100 shrink-0"
                    aria-label={`Close ${file.name}`}
                  >
                    <CloseIcon size={10} />
                  </span>
                  {openIds.length > 1 && (
                    <CircleDotIcon size={7} className="text-[var(--vs-muted)] group-hover:hidden -ml-4 shrink-0" />
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* FOLDER TREE */}
        <div className="px-2 py-1 text-[11px] font-bold text-[var(--vs-text)] tracking-wide flex items-center gap-1">
          <ChevronDownIcon size={12} />
          <span>KASAM-PORTFOLIO</span>
        </div>

        <button
          onClick={() => setSrcOpen((v) => !v)}
          className="w-full flex items-center gap-1 pl-4 pr-2 py-1 hover:bg-[var(--vs-hover)] text-[var(--vs-text)] transition-colors duration-150"
        >
          {srcOpen ? <ChevronDownIcon size={12} /> : <ChevronRightIcon size={12} />}
          <FolderIcon size={15} open={srcOpen} />
          <span>src</span>
        </button>

        {srcOpen && (
          <div>
            {FILES.map((file) => {
              const active = file.id === activeId
              return (
                <button
                  key={file.id}
                  onClick={() => onOpen(file.id)}
                  className={`w-full flex items-center gap-2 pl-9 pr-2 py-1 text-left transition-colors duration-150 ${
                    active
                      ? 'bg-[#37373d] text-white'
                      : 'text-[var(--vs-text)] hover:bg-[var(--vs-hover)]'
                  }`}
                >
                  {file.language === 'json' ? <JsonFileIcon size={14} /> : <TsFileIcon size={14} />}
                  <span className="truncate">{file.name}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
