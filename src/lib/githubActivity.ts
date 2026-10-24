import snapshot from '../data/github-activity.json'

export const GITHUB_USERNAME = 'kasamthapa'
export const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`
export const GITHUB_ACTIVITY_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
const CACHE_KEY = `github-activity:${GITHUB_USERNAME}:v1`
const CACHE_TTL = 60 * 60 * 1000
const DAY = 24 * 60 * 60 * 1000

export interface ContributionDay {
  date: string
  count: number
  level: number
}

interface ActivityRecord {
  username: string
  fetchedAt: string
  contributions: ContributionDay[]
}

export interface GitHubActivityData extends ActivityRecord {
  source: 'live' | 'cache' | 'snapshot'
  refreshFailed: boolean
}

const dateStamp = (date: string) => Date.parse(`${date}T00:00:00Z`)
const isoDate = (stamp: number) => new Date(stamp).toISOString().slice(0, 10)

// Preserve GitHub's civil dates. Local time zones must not shift calendar cells.
function readContributions(payload: unknown): ContributionDay[] {
  if (!payload || typeof payload !== 'object' || !('contributions' in payload) || !Array.isArray(payload.contributions)) throw new Error('Invalid activity response')
  const entries = payload.contributions as unknown[]
  if (entries.length < 300 || entries.length > 400) throw new Error('Incomplete activity calendar')
  const unique = new Map<string, ContributionDay>()
  for (const entry of entries) {
    if (!entry || typeof entry !== 'object') throw new Error('Invalid contribution')
    const { date, count, level } = entry as Record<string, unknown>
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(dateStamp(date)) || isoDate(dateStamp(date)) !== date || typeof count !== 'number' || !Number.isInteger(count) || count < 0 || typeof level !== 'number' || !Number.isInteger(level) || level < 0 || level > 4) throw new Error('Invalid contribution')
    const existing = unique.get(date)
    if (existing && (existing.count !== count || existing.level !== level)) throw new Error('Conflicting activity dates')
    unique.set(date, { date, count, level })
  }
  const sorted = Array.from(unique.values()).sort((a, b) => a.date.localeCompare(b.date))
  const end = new Date(dateStamp(sorted[sorted.length - 1].date))
  const previousYear = end.getUTCFullYear() - 1
  const month = end.getUTCMonth()
  const anniversaryDay = Math.min(end.getUTCDate(), new Date(Date.UTC(previousYear, month + 1, 0)).getUTCDate())
  const start = Date.UTC(previousYear, month, anniversaryDay) + DAY
  const days = sorted.filter((day) => dateStamp(day.date) >= start)
  // A missing date is missing data, not a fabricated zero-contribution day.
  if (!days.length || dateStamp(days[0].date) !== start || days.some((day, i) => i > 0 && dateStamp(day.date) - dateStamp(days[i - 1].date) !== DAY)) throw new Error('Incomplete activity dates')
  return days
}

function readRecord(value: unknown): ActivityRecord {
  if (!value || typeof value !== 'object') throw new Error('Invalid saved activity')
  const item = value as Record<string, unknown>
  if (item.username !== GITHUB_USERNAME || typeof item.fetchedAt !== 'string' || !Number.isFinite(Date.parse(item.fetchedAt)) || Date.parse(item.fetchedAt) > Date.now() + 5 * 60 * 1000) throw new Error('Invalid saved activity')
  return { username: GITHUB_USERNAME, fetchedAt: item.fetchedAt, contributions: readContributions(item) }
}

function readCache(): ActivityRecord | null {
  try {
    const saved = localStorage.getItem(CACHE_KEY)
    return saved ? readRecord(JSON.parse(saved)) : null
  } catch { return null }
}

export function initialGitHubActivity(): GitHubActivityData {
  const cached = readCache()
  const bundled = readRecord(snapshot)
  const useCache = cached && Date.parse(cached.fetchedAt) >= Date.parse(bundled.fetchedAt)
  return { ...(useCache ? cached : bundled), source: useCache ? 'cache' : 'snapshot', refreshFailed: false }
}

let pendingRequest: Promise<GitHubActivityData> | null = null

export function loadGitHubActivity(force = false): Promise<GitHubActivityData> {
  if (pendingRequest) return pendingRequest
  const saved = initialGitHubActivity()
  if (!force && saved.source === 'cache' && Date.now() - Date.parse(saved.fetchedAt) < CACHE_TTL) return Promise.resolve(saved)
  pendingRequest = (async () => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 12000)
    try {
      const response = await fetch(GITHUB_ACTIVITY_URL, { signal: controller.signal, credentials: 'omit' })
      if (!response.ok) throw new Error('Activity feed unavailable')
      const record: ActivityRecord = { username: GITHUB_USERNAME, fetchedAt: new Date().toISOString(), contributions: readContributions(await response.json()) }
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(record)) } catch { /* Storage is optional. */ }
      return { ...record, source: 'live' as const, refreshFailed: false }
    } catch {
      return { ...saved, refreshFailed: true }
    } finally { window.clearTimeout(timeout) }
  })().finally(() => { pendingRequest = null })
  return pendingRequest
}

export function contributionStats(days: ContributionDay[]) {
  let total = 0, activeDays = 0, bestDay = 0, streak = 0, longestStreak = 0
  days.forEach((day, index) => {
    total += day.count
    bestDay = Math.max(bestDay, day.count)
    if (day.count > 0) {
      activeDays += 1
      streak = index === 0 || dateStamp(day.date) - dateStamp(days[index - 1].date) === DAY ? streak + 1 : 1
      longestStreak = Math.max(longestStreak, streak)
    } else streak = 0
  })
  return { total, activeDays, bestDay, longestStreak }
}

export function contributionCalendar(days: ContributionDay[]) {
  const padding = new Date(dateStamp(days[0].date)).getUTCDay()
  const cells: (ContributionDay | null)[] = [...Array<null>(padding).fill(null), ...days]
  while (cells.length % 7) cells.push(null)
  const weeks: (ContributionDay | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  const months: { week: number; date: string }[] = []
  weeks.forEach((week, index) => {
    const monthStart = week.find((day) => day?.date.endsWith('-01'))
    const first = index === 0 ? week.find(Boolean) : null
    const date = monthStart?.date ?? first?.date
    if (date) months.push({ week: index, date })
  })
  if (months.length > 1 && months[1].week - months[0].week < 3) months.shift()
  return { weeks, months }
}

export function formatActivityDate(date: string, long = false): string {
  return new Intl.DateTimeFormat('en', { timeZone: 'UTC', month: long ? 'long' : 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateStamp(date)))
}
