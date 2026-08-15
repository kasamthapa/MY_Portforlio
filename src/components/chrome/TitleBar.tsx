import { FilesIcon } from './icons'

export default function TitleBar({ onMenuClick }: { onMenuClick: () => void }) {
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

      <div className="flex-1 text-center truncate">kasam-portfolio — kasamthapa.com.np</div>

      <div className="w-24 lg:w-28" aria-hidden="true" />
    </div>
  )
}
