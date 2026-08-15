import type { ReactNode } from 'react'

/** One line of source inside a CodeEditor: gutter number + hand-tokenized content. */
export function CodeLine({ n, children, indent = 0 }: { n: number; children?: ReactNode; indent?: number }) {
  return (
    <div className="flex hover:bg-[var(--vs-hover)]">
      <span className="w-10 shrink-0 text-right pr-3 select-none text-[var(--vs-linenum)]">{n}</span>
      <span className="whitespace-pre" style={{ paddingLeft: indent * 16 }}>
        {children ?? ' '}
      </span>
    </div>
  )
}

export function CodeEditor({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`font-mono text-[13px] leading-[1.7] py-3 ${className}`}>
      {children}
    </div>
  )
}

/* ---- syntax token helpers ---- */
export const kw = (s: string) => <span style={{ color: 'var(--vs-keyword)' }}>{s}</span>
export const str = (s: string) => <span style={{ color: 'var(--vs-string)' }}>{s}</span>
export const fn = (s: string) => <span style={{ color: 'var(--vs-func)' }}>{s}</span>
export const type = (s: string) => <span style={{ color: 'var(--vs-type)' }}>{s}</span>
export const num = (s: string) => <span style={{ color: 'var(--vs-number)' }}>{s}</span>
export const vr = (s: string) => <span style={{ color: 'var(--vs-variable)' }}>{s}</span>
export const cm = (s: string) => <span style={{ color: 'var(--vs-comment)' }}>{s}</span>
export const pn = (s: string) => <span style={{ color: 'var(--vs-punct)' }}>{s}</span>
