import { Link } from 'react-router-dom'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-6 md:px-10 py-5 md:py-6">
      <Link to="/" data-cursor className="text-sm tracking-wide text-[var(--cn-text)] hover:text-[var(--cn-accent)] transition-colors">
        kasam<span className="text-[var(--cn-accent)]">.</span>
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-[var(--cn-muted)]">
        {LINKS.map((link) => (
          <a key={link.label} href={link.href} data-cursor className="hover:text-[var(--cn-text)] transition-colors">
            {link.label}
          </a>
        ))}
      </nav>

      <Link
        to="/"
        data-cursor
        className="text-xs border border-[var(--cn-border)] rounded-full px-4 py-2 text-[var(--cn-muted)] hover:text-[var(--cn-text)] hover:border-[var(--cn-accent)] transition-colors"
      >
        {'</> Code Mode'}
      </Link>
    </header>
  )
}
