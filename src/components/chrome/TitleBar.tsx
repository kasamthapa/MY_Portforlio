import { FilesIcon, SearchIcon } from './icons'

interface Props {
  onMenuClick: () => void
  onQuickOpen: () => void
}

export default function TitleBar({ onMenuClick, onQuickOpen }: Props) {
  return (
    <div className="h-9 shrink-0 flex items-center bg-[var(--vs-titlebar)] border-b border-black/40 px-3 text-[12px] text-[var(--vs-muted)] select-none">
      <div className="flex items-center gap-1.5 w-24 lg:w-28">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>

      <button
        onClick={onMenuClick}
        className="lg:hidden p-1 -ml-1 mr-2 text-[var(--vs-text)] hover:bg-white/10 rounded"
        aria-label="Toggle explorer"
      >
        <FilesIcon size={15} />
      </button>

      <div className="flex-1 flex justify-center">
        <button
          onClick={onQuickOpen}
          className="hidden sm:flex items-center gap-2 px-3 py-0.5 rounded-md bg-black/25 hover:bg-black/40 transition-colors text-[11px] max-w-xs w-full justify-center"
        >
          <SearchIcon size={11} />
          <span className="truncate">kasam-portfolio — kasamthapa.com.np</span>
          <kbd className="ml-1 text-[9px] border border-white/10 rounded px-1 py-px opacity-70">⌘P</kbd>
        </button>
        <span className="sm:hidden truncate">kasam-portfolio</span>
      </div>

      <div className="w-24 lg:w-28" aria-hidden="true" />
    </div>
  )
}
