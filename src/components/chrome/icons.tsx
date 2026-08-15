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

/** Explorer — the codicon "files" glyph: two overlapping document pages. */
export function FilesIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3.8 1.8h4l2.4 2.4v8a.9.9 0 0 1-.9.9H3.8a.9.9 0 0 1-.9-.9V2.7a.9.9 0 0 1 .9-.9z" opacity="0.5" />
      <path d="M6.2 4.2h4l2.4 2.4v8a.9.9 0 0 1-.9.9H6.2a.9.9 0 0 1-.9-.9V5.1a.9.9 0 0 1 .9-.9z" />
      <path d="M10.2 4.3v2.3h2.3" />
    </svg>
  )
}

export function SearchIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="6.6" cy="6.6" r="4.3" />
      <path d="M13.3 13.3 9.8 9.8" />
    </svg>
  )
}

/** Source Control — codicon "source-control": a repo network of three nodes. */
export function GitBranchIconLarge({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="4" cy="3.2" r="1.5" />
      <circle cx="4" cy="12.8" r="1.5" />
      <circle cx="12" cy="6.8" r="1.5" />
      <path d="M4 4.7V11.3" />
      <path d="M4 7.5c0 2 1.7 2.8 4 2.8h1.3" />
      <path d="M12 5.3V5.3" />
    </svg>
  )
}

/** Extensions — codicon "extensions": a proper puzzle piece. */
export function ExtensionsIcon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
      <path d="M6.2 2.2c0-.7.6-1.2 1.3-1.2s1.3.5 1.3 1.2v.9h1.6c.6 0 1.1.5 1.1 1.1v1.6h.9c.7 0 1.2.6 1.2 1.3s-.5 1.3-1.2 1.3h-.9v1.6c0 .6-.5 1.1-1.1 1.1H8.8v.9c0 .7-.6 1.2-1.3 1.2s-1.3-.5-1.3-1.2v-.9H4.6c-.6 0-1.1-.5-1.1-1.1v-1.7h-.9c-.7 0-1.2-.6-1.2-1.3S2 6.3 2.6 6.3h.9V4.6c0-.6.5-1.1 1.1-1.1h1.6v-1.3z" />
    </svg>
  )
}

export function AccountIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="8" cy="5.3" r="2.6" />
      <path d="M2.3 14c1-3.2 3.1-4.5 5.7-4.5s4.7 1.3 5.7 4.5" />
    </svg>
  )
}

/** Tree twisty — solid filled triangle, matching VS Code's explorer chevrons. */
export function ChevronRightIcon({ className, size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} fill="currentColor" stroke="none">
      <path d="M6 3.5 11 8l-5 4.5v-9z" />
    </svg>
  )
}

export function ChevronDownIcon({ className, size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} fill="currentColor" stroke="none">
      <path d="M3.5 6 8 11l4.5-5h-9z" />
    </svg>
  )
}

export function CloseIcon({ className, size = 12 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.4} className={className}>
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
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

/** codicon "terminal" — a plain ">_" prompt glyph, no frame. */
export function TerminalIconGlyph({ className, size = 14 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M2 3.5 6.2 8 2 12.5" />
      <path d="M8 12.5h6" />
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

export function ErrorIcon({ className, size = 12 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="8" cy="8" r="6.2" />
      <path d="M5.8 5.8l4.4 4.4M10.2 5.8l-4.4 4.4" />
    </svg>
  )
}

export function ZenIcon({ className, size = 12 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M2 5.5V2h3.5" />
      <path d="M14 5.5V2h-3.5" />
      <path d="M2 10.5V14h3.5" />
      <path d="M14 10.5V14h-3.5" />
    </svg>
  )
}

export function CheckIcon({ className, size = 12 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M2.5 8.3 6 11.8 13.5 4" />
    </svg>
  )
}

export function WarningIcon({ className, size = 12 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8 2.2 14.5 13H1.5L8 2.2z" />
      <path d="M8 6.5v3" />
      <circle cx="8" cy="11.3" r="0.15" fill="currentColor" />
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

/** Seti-theme folder colors — the icon set VS Code ships and enables by default. */
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
