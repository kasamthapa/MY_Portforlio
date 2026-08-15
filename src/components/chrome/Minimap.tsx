/** Decorative minimap strip — the small "at a glance" code silhouette real editors show. */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const COLORS = ['var(--vs-keyword)', 'var(--vs-string)', 'var(--vs-func)', 'var(--vs-type)', 'var(--vs-text)']

export default function Minimap({ seed = 1, lines = 42 }: { seed?: number; lines?: number }) {
  const rows = Array.from({ length: lines }, (_, i) => {
    const r = seededRandom(seed * 97 + i * 13.37)
    const width = 20 + r * 65
    const blank = seededRandom(seed * 51 + i) < 0.14
    const color = COLORS[Math.floor(seededRandom(seed * 7 + i) * COLORS.length)]
    return { width: blank ? 0 : width, color }
  })

  return (
    <div
      className="hidden lg:flex flex-col gap-[3px] w-16 shrink-0 pt-3 px-2 border-l border-[var(--vs-border)] opacity-70"
      aria-hidden="true"
    >
      {rows.map((row, i) => (
        <div
          key={i}
          style={{ width: `${row.width}%`, backgroundColor: row.color }}
          className="h-[2px] rounded-full opacity-60"
        />
      ))}
    </div>
  )
}
