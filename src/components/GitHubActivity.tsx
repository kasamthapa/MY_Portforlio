import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { contributionCalendar, contributionStats, formatActivityDate, GITHUB_PROFILE, GITHUB_USERNAME, initialGitHubActivity, loadGitHubActivity } from '../lib/githubActivity'

const number = new Intl.NumberFormat('en')
const month = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' })

export default function GitHubActivity() {
  const [activity, setActivity] = useState(initialGitHubActivity)
  const [loading, setLoading] = useState(true)
  const [retry, setRetry] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const selectionId = useId()
  const stats = useMemo(() => contributionStats(activity.contributions), [activity.contributions])
  const { weeks, months } = useMemo(() => contributionCalendar(activity.contributions), [activity.contributions])
  const selected = activity.contributions.find((day) => day.date === selectedDate)
  const firstDate = activity.contributions[0].date
  const lastDate = activity.contributions[activity.contributions.length - 1].date

  useEffect(() => {
    let current = true
    setLoading(true)
    loadGitHubActivity(retry > 0).then((data) => {
      if (current) { setActivity(data); setLoading(false) }
    })
    return () => { current = false }
  }, [retry])

  useEffect(() => {
    const scroller = scrollRef.current
    if (scroller) scroller.scrollLeft = scroller.scrollWidth
  }, [activity.contributions])

  useEffect(() => {
    const scroller = scrollRef.current
    const cell = scroller?.querySelector<HTMLElement>(`[data-date="${selectedDate}"]`)
    if (!scroller || !cell) return
    const viewport = scroller.getBoundingClientRect()
    const bounds = cell.getBoundingClientRect()
    if (bounds.left < viewport.left + 40) scroller.scrollLeft += bounds.left - viewport.left - 40
    else if (bounds.right > viewport.right - 8) scroller.scrollLeft += bounds.right - viewport.right + 8
  }, [selectedDate])

  function exploreDay(event: KeyboardEvent<HTMLDivElement>) {
    const offset = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 }[event.key]
    if (offset === undefined && event.key !== 'Home' && event.key !== 'End') return
    event.preventDefault()
    const current = Math.max(0, activity.contributions.findIndex((day) => day.date === (selectedDate ?? lastDate)))
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? activity.contributions.length - 1 : Math.max(0, Math.min(activity.contributions.length - 1, current + (offset ?? 0)))
    setSelectedDate(activity.contributions[next].date)
  }

  return (
    <section className="github-activity" id="github-activity" aria-labelledby="github-activity-title">
      <div className="github-activity-heading">
        <span className="section-index">THE WORK BETWEEN THE RELEASES</span>
        <h2 id="github-activity-title">GitHub activity.</h2>
        <p>A year of building, contributing, and showing up.</p>
      </div>
      <div className="github-activity-panel" aria-busy={loading}>
        <div className="github-activity-summary">
          <div className="github-activity-identity">
            <span>@{GITHUB_USERNAME.toUpperCase()}</span>
            <h3><b>{number.format(stats.total)} contributions</b> <span>in the last 12 months</span></h3>
          </div>
          <div className="github-activity-stats">
            <dl>
              <div><dt>Active days</dt><dd>{stats.activeDays}</dd></div>
              <div><dt>Longest streak</dt><dd>{stats.longestStreak} <small>days</small></dd></div>
              <div><dt>Best day</dt><dd>{stats.bestDay}</dd></div>
            </dl>
          </div>
        </div>
        <div ref={scrollRef} className="github-calendar-scroll" tabIndex={0} role="group" aria-label={`GitHub contribution calendar for ${GITHUB_USERNAME}. ${number.format(stats.total)} contributions. Use arrow keys to explore days; Home and End move to the first and last day.`} aria-describedby={selectionId} onKeyDown={exploreDay} onFocus={() => setSelectedDate((date) => date ?? lastDate)}>
          <div className="github-calendar" style={{ '--week-count': weeks.length } as CSSProperties}>
            <div className="github-calendar-months" aria-hidden="true">
              {months.map((entry) => <span key={entry.date} style={{ gridColumn: `${entry.week + 1} / span ${Math.min(3, weeks.length - entry.week)}` }}>{month.format(new Date(`${entry.date}T00:00:00Z`))}</span>)}
            </div>
            <div className="github-calendar-body" aria-hidden="true">
              <div className="github-calendar-weekdays"><span style={{ gridRow: 2 }}>Mon</span><span style={{ gridRow: 4 }}>Wed</span><span style={{ gridRow: 6 }}>Fri</span></div>
              <div className="github-calendar-weeks">
                {weeks.map((week, index) => <div className="github-calendar-week" key={index}>{week.map((day, row) => <span className="github-calendar-day" key={day?.date ?? `padding-${row}`} data-level={day?.level ?? 0} data-date={day?.date} data-padding={!day ? 'true' : undefined} data-selected={selectedDate === day?.date ? 'true' : undefined} />)}</div>)}
              </div>
            </div>
          </div>
        </div>
        <div className="github-calendar-selection" id={selectionId} aria-live="polite" aria-atomic="true">
          {selected ? <><strong>{number.format(selected.count)} {selected.count === 1 ? 'contribution' : 'contributions'}</strong> on {formatActivityDate(selected.date, true)}</> : 'Swipe to browse. Focus the calendar and use arrow keys for daily counts.'}
        </div>
        <div className="github-calendar-footer">
          <a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">github.com/{GITHUB_USERNAME} <span aria-hidden="true">↗</span></a>
          <div className="github-calendar-legend" aria-label="Contribution intensity, from less to more"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} className="github-calendar-swatch" data-level={level} aria-hidden="true" />)}<span>More</span></div>
        </div>
        <p className="github-activity-status" role="status">
          <span>{formatActivityDate(firstDate)} — {formatActivityDate(lastDate)}</span>
          <span>{loading ? 'Refreshing activity…' : activity.refreshFailed ? 'Saved activity · latest refresh unavailable' : activity.source === 'snapshot' ? 'Saved activity snapshot' : 'Public GitHub profile activity'}</span>
          <span>Fetched {formatActivityDate(activity.fetchedAt.slice(0, 10))}</span>
        </p>
        {activity.refreshFailed && <button className="github-activity-retry" type="button" disabled={loading} onClick={() => setRetry((value) => value + 1)}>Try refreshing activity ↻</button>}
      </div>
    </section>
  )
}
