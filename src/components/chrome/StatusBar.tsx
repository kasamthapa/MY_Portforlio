import {
  GitBranchIconLarge,
  SyncIcon,
  BellIcon,
  TerminalIconGlyph,
  ErrorIcon,
  WarningIcon,
  SunIcon,
  MoonIcon,
} from './icons'

interface Props {
  language: string
  terminalOpen: boolean
  theme: 'dark' | 'light'
  onToggleTerminal: () => void
  onToggleTheme: () => void
}

export default function StatusBar({ language, terminalOpen, theme, onToggleTerminal, onToggleTheme }: Props) {
  return (
    <div className="h-6 shrink-0 flex items-center justify-between bg-[var(--vs-accent)] text-white text-[11px] px-2 select-none">
      <div className="flex items-center gap-3 min-w-0">
        <span className="flex items-center gap-1">
          <GitBranchIconLarge size={13} />
          main
        </span>
        <SyncIcon size={11} className="hidden sm:block" />
        <span className="hidden sm:flex items-center gap-2.5">
          <span className="flex items-center gap-1">
            <ErrorIcon size={12} />0
          </span>
          <span className="flex items-center gap-1">
            <WarningIcon size={12} />0
          </span>
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleTheme}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/15"
          title={theme === 'dark' ? 'Switch to Light+ Theme' : 'Switch to Dark+ Theme'}
        >
          {theme === 'dark' ? <MoonIcon size={12} /> : <SunIcon size={12} />}
          <span className="hidden sm:inline">{theme === 'dark' ? 'Dark+' : 'Light+'}</span>
        </button>
        <button
          onClick={onToggleTerminal}
          title={terminalOpen ? 'Hide Terminal' : 'Show Terminal'}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/15 ${
            terminalOpen ? 'bg-white/15' : ''
          }`}
        >
          <TerminalIconGlyph size={12} />
          <span className="hidden sm:inline">Terminal</span>
        </button>
        <span className="hidden md:inline">Ln 1, Col 1</span>
        <span className="hidden md:inline">UTF-8</span>
        <span className="hidden md:inline">LF</span>
        <span>{language}</span>
        <BellIcon size={12} className="hidden sm:block" />
      </div>
    </div>
  )
}
