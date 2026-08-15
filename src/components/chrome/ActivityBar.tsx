import { FilesIcon, SearchIcon, GitBranchIconLarge, ExtensionsIcon, AccountIcon } from './icons'

export default function ActivityBar() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-between w-12 shrink-0 bg-[var(--vs-activity)] py-2">
      <div className="flex flex-col items-center gap-5">
        <button
          className="relative p-2 text-white"
          title="Explorer"
          aria-current="true"
        >
          <span className="absolute left-0 top-0 h-full w-0.5 bg-white" />
          <FilesIcon size={20} />
        </button>
        <button className="p-2 text-[#858585] hover:text-white transition-colors" title="Search">
          <SearchIcon size={20} />
        </button>
        <button className="p-2 text-[#858585] hover:text-white transition-colors" title="Source Control">
          <GitBranchIconLarge size={20} />
        </button>
        <button className="p-2 text-[#858585] hover:text-white transition-colors" title="Extensions">
          <ExtensionsIcon size={20} />
        </button>
      </div>
      <button className="p-2 text-[#858585] hover:text-white transition-colors mb-1" title="Account">
        <AccountIcon size={20} />
      </button>
    </div>
  )
}
