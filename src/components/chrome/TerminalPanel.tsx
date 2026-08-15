import { useState } from 'react'
import TypeIn from '../TypeIn'
import { TerminalIconGlyph, CloseIcon } from './icons'

const LINES = [
  { cmd: 'whoami', out: 'Kasam Thapa Magar — full stack developer, Kathmandu' },
  { cmd: 'cat philosophy.txt', out: 'build real things people can actually use. ship, then improve.' },
  { cmd: 'echo "thanks for opening the terminal"', out: 'thanks for opening the terminal' },
]

export default function TerminalPanel({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  // step counts typed segments: cmd0, out0, cmd1, out1, ...

  const doneSegments = Math.floor(step / 2)
  const typingOut = step % 2 === 1

  return (
    <div className="h-44 md:h-52 shrink-0 flex flex-col bg-[var(--vs-bg)] border-t border-[var(--vs-panel-border)]">
      <div className="h-8 shrink-0 flex items-center justify-between px-3 border-b border-[var(--vs-border)] text-[11px]">
        <div className="flex items-center gap-4 text-[var(--vs-muted)]">
          <span className="text-[var(--vs-text)] flex items-center gap-1.5">
            <TerminalIconGlyph size={12} />
            TERMINAL
          </span>
          <span className="hidden sm:inline opacity-60">PROBLEMS</span>
          <span className="hidden sm:inline opacity-60">OUTPUT</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded text-[var(--vs-muted)]" aria-label="Close terminal">
          <CloseIcon size={12} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 font-mono text-[12px] leading-6">
        {LINES.slice(0, doneSegments + 1).map((line, i) => {
          const isCurrent = i === doneSegments
          return (
            <div key={i}>
              <p>
                <span style={{ color: 'var(--vs-comment)' }}>kasam@portfolio</span>
                <span className="text-[var(--vs-muted)]">:~$ </span>
                {isCurrent && !typingOut ? (
                  <TypeIn text={line.cmd} speed={22} cursor onDone={() => setStep((s) => s + 1)} />
                ) : (
                  line.cmd
                )}
              </p>
              {(i < doneSegments || (isCurrent && typingOut)) && (
                <p className="text-[var(--vs-text)] pb-1.5">
                  {isCurrent && typingOut ? (
                    <TypeIn text={line.out} speed={10} cursor onDone={() => setStep((s) => s + 1)} />
                  ) : (
                    line.out
                  )}
                </p>
              )}
            </div>
          )
        })}
        {doneSegments >= LINES.length && (
          <p>
            <span style={{ color: 'var(--vs-comment)' }}>kasam@portfolio</span>
            <span className="text-[var(--vs-muted)]">:~$ </span>
            <span className="animate-caret">▌</span>
          </p>
        )}
      </div>
    </div>
  )
}
