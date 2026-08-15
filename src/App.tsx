import { useState } from 'react'
import TitleBar from './components/chrome/TitleBar'
import ActivityBar from './components/chrome/ActivityBar'
import Sidebar from './components/chrome/Sidebar'
import Tabs from './components/chrome/Tabs'
import StatusBar from './components/chrome/StatusBar'
import TerminalPanel from './components/chrome/TerminalPanel'
import SplitPane from './components/chrome/SplitPane'
import { FILES, DEFAULT_FILE_ID } from './editor/registry'

export default function App() {
  const [activeId, setActiveId] = useState(DEFAULT_FILE_ID)
  const [openIds, setOpenIds] = useState([DEFAULT_FILE_ID])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)

  const activeFile = FILES.find((f) => f.id === activeId) ?? FILES[0]

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
    <div className="vscode-shell flex flex-col overflow-hidden">
      <TitleBar onMenuClick={() => setSidebarOpen((v) => !v)} />

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
              className="lg:hidden fixed inset-0 top-9 bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="lg:hidden fixed top-9 left-0 bottom-0 w-64 z-50 border-r border-black/40 animate-slide-in-left">
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

          {terminalOpen && <TerminalPanel onClose={() => setTerminalOpen(false)} />}
        </div>
      </div>

      <StatusBar
        language={activeFile.language === 'json' ? 'JSON' : 'TypeScript'}
        terminalOpen={terminalOpen}
        onToggleTerminal={() => setTerminalOpen((v) => !v)}
      />
    </div>
  )
}
