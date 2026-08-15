import { FilesIcon, SearchIcon, GitBranchIconLarge, ExtensionsIcon, AccountIcon } from './icons'

export default function ActivityBar({ onSearchClick }: { onSearchClick: () => void }) {
  return (
    <div className="hidden lg:flex flex-col items-center justify-between w-12 shrink-0 bg-[var(--vs-activity)] py-2">
      <div className="flex flex-col items-center gap-5">
        <button className="relative p-2 text-white" title="Explorer" aria-current="true">
          <span className="absolute left-0 top-0 h-full w-0.5 bg-white" />
          <FilesIcon size={20} />
        </button>
        <button
          onClick={onSearchClick}
          className="p-2 text-[#858585] hover:text-white transition-colors"
          title="Search files (⌘P)"
        >
          <SearchIcon size={20} />
        </button>
        <button
          className="p-2 text-[#4a4a4a] cursor-default"
          title="Source Control — not wired up, this is chrome"
          aria-disabled="true"
          tabIndex={-1}
        >
          <GitBranchIconLarge size={20} />
        </button>
        <button
          className="p-2 text-[#4a4a4a] cursor-default"
          title="Extensions — not wired up, this is chrome"
          aria-disabled="true"
          tabIndex={-1}
        >
          <ExtensionsIcon size={20} />
        </button>
      </div>
      <button
        className="p-2 text-[#4a4a4a] cursor-default mb-1"
        title="Account — not wired up, this is chrome"
        aria-disabled="true"
        tabIndex={-1}
      >
        <AccountIcon size={20} />
      </button>
    </div>
  )
}
