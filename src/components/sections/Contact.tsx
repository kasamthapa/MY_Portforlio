import { useInView } from '../../hooks/useInView'

const LINKS = [
  { label: 'github', href: 'https://github.com/kasamthapa', display: 'github.com/kasamthapa' },
  {
    label: 'linkedin',
    href: 'https://linkedin.com/in/kasamthapamagar',
    display: 'linkedin.com/in/kasamthapamagar',
  },
  { label: 'x', href: 'https://twitter.com/kasamthapa89', display: 'twitter.com/kasamthapa89' },
  { label: 'email', href: 'mailto:kasamthapamagar7@gmail.com', display: 'kasamthapamagar7@gmail.com' },
]

export default function Contact() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section id="contact" className="px-6 md:px-12 lg:px-24 py-12 md:py-16">
      <div ref={ref} className={inView ? 'animate-fade-in' : 'opacity-0'}>
        <h2 className="text-sm mb-8">
          <span className="text-[var(--accent)]">~/kasam</span>
          <span className="text-[var(--muted)]"> $ cat contact.txt</span>
        </h2>

        <div className="space-y-3 text-sm md:text-base">
          {LINKS.map((row) => (
            <div key={row.label} className="grid grid-cols-[90px_16px_1fr] md:grid-cols-[120px_20px_1fr]">
              <span className="text-[var(--accent)]">{row.label}</span>
              <span className="text-[var(--muted)]">→</span>
              <a
                href={row.href}
                target={row.label === 'email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="w-fit hover:text-[var(--accent)] hover:underline underline-offset-4"
              >
                {row.display}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
