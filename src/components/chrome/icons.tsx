type IconProps = { className?: string; size?: number }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export function FilesIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M2 2h6l2 2h4v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
    </svg>
  )
}

export function SearchIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="6.7" cy="6.7" r="4.2" />
      <path d="M13.5 13.5 10 10" />
    </svg>
  )
}

export function GitBranchIconLarge({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="4" cy="3" r="1.6" />
      <circle cx="4" cy="13" r="1.6" />
      <circle cx="12" cy="6.5" r="1.6" />
      <path d="M4 4.6V11.4" />
      <path d="M4 8c0 2.5 2 3.5 4.5 3.5H12" />
      <path d="M12 8V8" />
    </svg>
  )
}

export function ExtensionsIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M9.5 2.5v2h-2v-2a1.5 1.5 0 0 0-3 0v2H3a1 1 0 0 0-1 1v1.5h2a1.5 1.5 0 0 1 0 3H2V13a1 1 0 0 0 1 1h1.5v-2a1.5 1.5 0 0 1 3 0v2H10a1 1 0 0 0 1-1v-1.5a1.5 1.5 0 0 1 3 0V13a1 1 0 0 0-1-1v-2a1.5 1.5 0 0 0-3 0V8.5a1 1 0 0 0-1-1z" />
    </svg>
  )
}

export function AccountIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M2.5 14c1-3 3-4.3 5.5-4.3S13 11 14 14" />
    </svg>
  )
}

export function ChevronRightIcon({ className, size = 14 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5.5 3 10 8l-4.5 5" />
    </svg>
  )
}

export function ChevronDownIcon({ className, size = 14 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 5.5 8 10l5-4.5" />
    </svg>
  )
}

export function CloseIcon({ className, size = 12 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 3l10 10M13 3 3 13" />
    </svg>
  )
}

export function CircleDotIcon({ className, size = 8 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className}>
      <circle cx="4" cy="4" r="3.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TerminalIconGlyph({ className, size = 14 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="1.5" y="2.5" width="13" height="11" rx="1" />
      <path d="M4 6.5 6.5 8.5 4 10.5" />
      <path d="M8.5 10.5h3" />
    </svg>
  )
}

export function BellIcon({ className, size = 14 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 6.5a4 4 0 0 1 8 0c0 3 1 3.8 1 3.8H3s1-.8 1-3.8Z" />
      <path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" />
    </svg>
  )
}

export function SyncIcon({ className, size = 12 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M13 4.5A5.5 5.5 0 0 0 3.6 3" />
      <path d="M3 2v3h3" />
      <path d="M3 11.5A5.5 5.5 0 0 0 12.4 13" />
      <path d="M13 14v-3h-3" />
    </svg>
  )
}

export function TsFileIcon({ className, size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
      <rect x="1" y="1" width="14" height="14" rx="2" fill="#3178c6" />
      <text x="8" y="11.5" fontSize="7.5" fontWeight="700" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">
        TS
      </text>
    </svg>
  )
}

export function JsonFileIcon({ className, size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
      <path d="M4 1.5h5l3 3v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1z" fill="#cbcb41" opacity="0.15" />
      <text x="8" y="11.5" fontSize="6.2" fontWeight="700" fill="#cbcb41" textAnchor="middle" fontFamily="Arial, sans-serif">
        {'{}'}
      </text>
    </svg>
  )
}

export function FolderIcon({ className, size = 15, open }: IconProps & { open?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className}>
      <path
        d={open ? 'M1.5 4.5h4l1.2 1.3H14v1.2H2.3z' : 'M1.5 4.5h4l1.2 1.3H14.5v8H1.5z'}
        fill="#c09553"
      />
      {open && <path d="M1.5 5.5h13L13 13H1.8z" fill="#dcb67a" />}
    </svg>
  )
}
