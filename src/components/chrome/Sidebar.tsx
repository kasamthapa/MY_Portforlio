import { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon, FolderIcon, TsFileIcon, JsonFileIcon } from './icons'
import { FILES } from '../../editor/registry'

interface Props {
  activeId: string
  onOpen: (id: string) => void
}

export default function Sidebar({ activeId, onOpen }: Props) {
  const [srcOpen, setSrcOpen] = useState(true)

  return (
    <div className="h-full flex flex-col bg-[var(--vs-sidebar)] text-[13px]">
      <div className="px-4 pt-4 pb-2 text-[11px] tracking-widest text-[var(--vs-muted)] font-semibold">
        EXPLORER
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        <div className="px-2 py-1 text-[11px] font-bold text-[var(--vs-text)] tracking-wide flex items-center gap-1">
          <ChevronDownIcon size={12} />
          <span>KASAM-PORTFOLIO</span>
        </div>

        <button
          onClick={() => setSrcOpen((v) => !v)}
          className="w-full flex items-center gap-1 pl-4 pr-2 py-1 hover:bg-[var(--vs-hover)] text-[var(--vs-text)]"
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
                  className={`w-full flex items-center gap-2 pl-9 pr-2 py-1 text-left ${
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
