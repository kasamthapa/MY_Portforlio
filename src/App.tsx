import { useEffect, useMemo, useRef, useState } from 'react'
import TitleBar from './components/chrome/TitleBar'
import ActivityBar from './components/chrome/ActivityBar'
import Sidebar from './components/chrome/Sidebar'
import Tabs from './components/chrome/Tabs'
import StatusBar from './components/chrome/StatusBar'
import TerminalPanel from './components/chrome/TerminalPanel'
import SplitPane from './components/chrome/SplitPane'
import CommandPalette, { type Command } from './components/chrome/CommandPalette'
import { CheckIcon } from './components/chrome/icons'
import { FILES, DEFAULT_FILE_ID } from './editor/registry'

const EASE = 'cubic-bezier(0.16,1,0.3,1)'

export default function App() {
  const [activeId, setActiveId] = useState(DEFAULT_FILE_ID)
  const [openIds, setOpenIds] = useState([DEFAULT_FILE_ID])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalMounted, setTerminalMounted] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [zenMode, setZenMode] = useState(false)
  const [booted, setBooted] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>()

  const activeFile = FILES.find((f) => f.id === activeId) ?? FILES[0]

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 550)
    return () => clearTimeout(t)
  }, [])

  function showToast(message: string) {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }

  function toggleTerminal() {
    if (terminalOpen) {
      setTerminalOpen(false)
    } else {
      setTerminalMounted(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setTerminalOpen(true)))
    }
  }

  const commands: Command[] = useMemo(
    () => [
      {
        id: 'zen',
        label: zenMode ? 'View: Exit Zen Mode' : 'View: Toggle Zen Mode',
        detail: 'Esc',
        run: () => setZenMode((v) => !v),
      },
      { id: 'terminal', label: 'View: Toggle Terminal', detail: 'Ctrl+`', run: toggleTerminal },
      {
        id: 'github',
        label: 'Open: GitHub Profile',
        run: () => window.open('https://github.com/kasamthapa', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'linkedin',
        label: 'Open: LinkedIn Profile',
        run: () => window.open('https://linkedin.com/in/kasamthapamagar', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'email',
        label: 'Copy: Email Address',
        run: () => {
          navigator.clipboard?.writeText('kasamthapamagar7@gmail.com')
          showToast('Email copied to clipboard')
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [zenMode, terminalOpen]
  )

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey
      if (meta && (e.key === 'p' || e.key === 'k')) {
        e.preventDefault()
        setPaletteOpen(true)
        return
      }
      if (e.key === 'Escape' && zenMode && !paletteOpen) {
        setZenMode(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [zenMode, paletteOpen])

  function openFile(id: string) {
    setActiveId(id)
    setOpenIds((ids) => (ids.includes(id) ? ids : [...ids, id]))
    setSidebarOpen(false)
  }

  function closeTab(id: string) {
    setOpenIds((ids) => {
      const next = ids.filter((x) => x !== id)
      if (next.length === 0) {
        setActiveId(DEFAULT_FILE_ID)
        return [DEFAULT_FILE_ID]
      }
      if (id === activeId) {
        const closedIndex = ids.indexOf(id)
        setActiveId(next[Math.max(0, closedIndex - 1)])
      }
      return next
    })
  }

  return (
    <div className="vscode-shell flex flex-col overflow-hidden relative">
      <div
        className={`absolute inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-[var(--vs-bg)] transition-opacity duration-500 ${
          booted ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden={booted}
      >
        <div className="w-8 h-8 rounded-full border-2 border-[var(--vs-panel-border)] border-t-[#3794ff] animate-spin" />
        <p className="text-xs text-[var(--vs-muted)] tracking-wide">kasam-portfolio</p>
      </div>

      {zenMode ? (
        <div className="flex-1 min-h-0 relative animate-fade-in">
          <activeFile.Preview />
          <button
            onClick={() => setZenMode(false)}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#252526] border border-[var(--vs-panel-border)] text-[11px] text-[var(--vs-muted)] shadow-lg hover:text-[var(--vs-text)] transition-colors"
            style={{ transitionTimingFunction: EASE }}
          >
            <kbd className="border border-[var(--vs-panel-border)] rounded px-1.5 py-0.5">esc</kbd>
            <span>Exit Zen Mode</span>
          </button>
        </div>
      ) : (
        <>
          <TitleBar onMenuClick={() => setSidebarOpen((v) => !v)} onQuickOpen={() => setPaletteOpen(true)} />

          <div className="flex-1 flex min-h-0 relative">
            <ActivityBar />

            {/* desktop sidebar */}
            <div className="hidden lg:block w-60 shrink-0 border-r border-black/40">
              <Sidebar activeId={activeId} openIds={openIds} onOpen={openFile} onCloseTab={closeTab} />
            </div>

            {/* mobile sidebar drawer */}
            {sidebarOpen && (
              <>
                <div
                  className="lg:hidden fixed inset-0 top-9 bg-black/50 backdrop-blur-[1px] z-40 animate-fade-in"
                  onClick={() => setSidebarOpen(false)}
                />
                <div className="lg:hidden fixed top-9 left-0 bottom-0 w-64 z-50 border-r border-black/40 shadow-[8px_0_30px_-10px_rgba(0,0,0,0.6)] animate-slide-in-left">
                  <Sidebar activeId={activeId} openIds={openIds} onOpen={openFile} onCloseTab={closeTab} />
                </div>
              </>
            )}

            <div className="flex-1 flex flex-col min-w-0">
              <Tabs openIds={openIds} activeId={activeId} onSelect={setActiveId} onClose={closeTab} />

              <div className="flex-1 min-h-0">
                <SplitPane
                  key={activeFile.id}
                  previewLabel={activeFile.previewLabel}
                  code={<activeFile.Code />}
                  preview={<activeFile.Preview />}
                />
              </div>

              {terminalMounted && (
                <div
                  className={`shrink-0 overflow-hidden transition-[height] duration-300 ${
                    terminalOpen ? 'h-44 md:h-52' : 'h-0'
                  }`}
                  style={{ transitionTimingFunction: EASE }}
                  onTransitionEnd={() => {
                    if (!terminalOpen) setTerminalMounted(false)
                  }}
                >
                  <TerminalPanel onClose={() => setTerminalOpen(false)} />
                </div>
              )}
            </div>
          </div>

          <StatusBar
            language={activeFile.language === 'json' ? 'JSON' : 'TypeScript'}
            terminalOpen={terminalOpen}
            onToggleTerminal={toggleTerminal}
            onToggleZen={() => setZenMode(true)}
          />
        </>
      )}

      {paletteOpen && (
        <CommandPalette commands={commands} onOpenFile={openFile} onClose={() => setPaletteOpen(false)} />
      )}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#252526] border border-[var(--vs-panel-border)] text-[12px] text-[var(--vs-text)] shadow-lg animate-toast-in">
          <CheckIcon size={13} className="text-[#89d185]" />
          {toast}
        </div>
      )}
    </div>
  )
}
