// Refresh the real, dated fallback. The browser separately refreshes live data.
import { writeFile } from 'node:fs/promises'

const username = 'kasamthapa'
const url = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
const response = await fetch(url, { signal: AbortSignal.timeout(20000) })
if (!response.ok) throw new Error(`Activity fetch failed (${response.status})`)
const payload = await response.json()
const dateStamp = (date) => Date.parse(`${date}T00:00:00Z`)
const isDay = (day) => day && typeof day.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(day.date) && Number.isFinite(dateStamp(day.date)) && new Date(dateStamp(day.date)).toISOString().slice(0, 10) === day.date && Number.isInteger(day.count) && day.count >= 0 && Number.isInteger(day.level) && day.level >= 0 && day.level <= 4
if (!Array.isArray(payload?.contributions) || payload.contributions.length < 365 || payload.contributions.length > 400 || !payload.contributions.every(isDay)) throw new Error('Invalid contribution calendar; snapshot left unchanged')
const contributions = [...payload.contributions].sort((a, b) => a.date.localeCompare(b.date))
if (contributions.some((day, index) => index > 0 && dateStamp(day.date) - dateStamp(contributions[index - 1].date) !== 86400000)) throw new Error('Missing or duplicate calendar dates; snapshot left unchanged')
const output = `{
  "username": ${JSON.stringify(username)},
  "fetchedAt": ${JSON.stringify(new Date().toISOString())},
  "contributions": [
${contributions.map((day) => `    ${JSON.stringify({ date: day.date, count: day.count, level: day.level })}`).join(',\n')}
  ]
}\n`
await writeFile(new URL('../src/data/github-activity.json', import.meta.url), output)
console.log(`Saved ${contributions.length} GitHub calendar days for ${username}.`)
