import { useEffect, useState } from 'react'
import TitleBar from './components/chrome/TitleBar'
import ActivityBar from './components/chrome/ActivityBar'
import Sidebar from './components/chrome/Sidebar'
import Tabs from './components/chrome/Tabs'
import StatusBar from './components/chrome/StatusBar'
import TerminalPanel from './components/chrome/TerminalPanel'
import SplitPane from './components/chrome/SplitPane'
import CommandPalette from './components/chrome/CommandPalette'
import { FILES, DEFAULT_FILE_ID } from './editor/registry'

export default function App() {
  const [activeId, setActiveId] = useState(DEFAULT_FILE_ID)
  const [openIds, setOpenIds] = useState([DEFAULT_FILE_ID])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalMounted, setTerminalMounted] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [booted, setBooted] = useState(false)

  const activeFile = FILES.find((f) => f.id === activeId) ?? FILES[0]

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 550)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey
      if (meta && (e.key === 'p' || e.key === 'k')) {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

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

  function toggleTerminal() {
    if (terminalOpen) {
      setTerminalOpen(false)
    } else {
      setTerminalMounted(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setTerminalOpen(true)))
    }
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

      <TitleBar onMenuClick={() => setSidebarOpen((v) => !v)} onQuickOpen={() => setPaletteOpen(true)} />

      <div className="flex-1 flex min-h-0 relative">
        <ActivityBar />

        {/* desktop sidebar */}
        <div className="hidden lg:block w-60 shrink-0 border-r border-black/40">
          <Sidebar activeId={activeId} onOpen={openFile} />
        </div>

        {/* mobile sidebar drawer */}
        {sidebarOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 top-9 bg-black/50 backdrop-blur-[1px] z-40 animate-fade-in"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="lg:hidden fixed top-9 left-0 bottom-0 w-64 z-50 border-r border-black/40 shadow-[8px_0_30px_-10px_rgba(0,0,0,0.6)] animate-slide-in-left">
              <Sidebar activeId={activeId} onOpen={openFile} />
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
              className={`shrink-0 overflow-hidden transition-[height] duration-300 ease-out ${
                terminalOpen ? 'h-44 md:h-52' : 'h-0'
              }`}
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
      />

      {paletteOpen && <CommandPalette onOpenFile={openFile} onClose={() => setPaletteOpen(false)} />}
    </div>
  )
}
