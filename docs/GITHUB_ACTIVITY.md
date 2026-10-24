# GitHub activity

Implementation notes reconciled with source on **2026-10-24**. This documents the feature; it does not establish that a particular commit has been deployed.

## Placement and ownership

The public screen shows **GitHub activity** after About and before Contact, inside the same scrolling middle region and convex glass. The existing HOME / WORK / ABOUT / CONTACT navigation stays unchanged. The section uses warm gold intensity levels, cream typography and fine rules rather than a new enclosing screen or a green GitHub-style panel.

| File | Responsibility |
| --- | --- |
| `src/components/GitHubActivity.tsx` | Section markup, summary, keyboard exploration, fetched/status text, retry and profile link |
| `src/lib/githubActivity.ts` | Username/endpoint, response validation, cache/fallback loading, UTC window and metric helpers |
| `src/github-activity.css` | Component layout, color ramp, cell sizing, horizontal overflow and focus styles |
| `src/data/github-activity.json` | Real contribution dates/counts/levels and the timestamp when they were fetched |
| `scripts/update-github-activity.mjs` | Explicit maintenance command to replace that real snapshot |
| `src/components/PortfolioHome.tsx` | Mounts the section between About and Contact |
| `src/main.tsx` | Imports its CSS after `project-system-flow.css` |

## Source and limits

The configured profile is [github.com/kasamthapa](https://github.com/kasamthapa). The browser requests:

```text
https://github-contributions-api.jogruber.de/v4/kasamthapa?y=last
```

This is the public, third-party [GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api), which reads GitHub contribution calendars. It is not a GitHub-operated API. Its [server implementation](https://github.com/grubersjoe/github-contributions-api/blob/main/src/app.ts) enables CORS, allowing the static client to read the response. The app sends no credentials and requires no personal access token, portfolio backend or environment variables.

The calendar represents what the profile's contribution graph exposes, not every Git event or a measure of code quality. GitHub applies its own eligibility and visibility rules; see [GitHub's contribution reference](https://docs.github.com/en/account-and-profile/reference/profile-contributions-reference). Avoid relabeling all contributions as commits or promising instant synchronization. The upstream service has its own caching and availability, separate from the app's local cache.

## Data contract and validation

The app consumes `contributions`, an array of `{ date, count, level }` records. It ignores the feed's separate `total` field when calculating the visible summary. A saved record also has `username` and `fetchedAt`.

The runtime reader requires:

- An array of 300–400 records before normalization.
- Exact valid `YYYY-MM-DD` dates; normalization must not turn an invalid day into a different date.
- Nonnegative integer counts and integer levels from 0 through 4.
- No conflicting records for the same date. Identical duplicates are deduplicated.
- A complete consecutive date window after sorting and trimming. Missing dates reject the refresh; they are not replaced with fabricated zero-contribution days.
- Saved records for the configured username with a valid fetch timestamp, no more than five minutes in the future.

Bundled and locally cached records pass through the same runtime calendar reader as a network result. A malformed/blocked local cache is ignored. Keep the bundled snapshot valid because it is the final fallback.

## The displayed window and metrics

All calendar arithmetic and formatting use **UTC civil dates**. A contribution recorded for a date must not shift into its neighbor when the viewer is in another time zone.

The final returned contribution date determines the window end. The start is the day after its previous-year anniversary, with that anniversary clamped to the available day in the previous year's month for a leap day. This produces a full rolling 12-month window of 365 or 366 consecutive days. It does not force stale saved data to end today or silently extend it with zeroes. Both displayed bounds and the fetch date remain visible.

Metrics are derived only from those displayed dates:

| Metric | Calculation |
| --- | --- |
| Contributions | Sum of daily counts |
| Active days | Number of dates with a count greater than zero |
| Longest streak | Longest consecutive run of positive-count days inside the window; zero or a date gap breaks the run |
| Best day | Highest daily contribution count |

The graph lays out Sunday-first weeks with seven rows. Leading/trailing week padding is `null` and invisible, distinct from genuine dates with zero activity. Month labels mark month starts; an overlapping initial partial-month label is omitted. Intensity levels come from the feed's `level`, not a new locally invented threshold scale.

## Loading, caching and failure behavior

1. On mount, render whichever validated saved record has the newer `fetchedAt`: the local cache or the real bundled snapshot. Counts are available while a refresh runs, and an old local cache cannot replace a newer deployment snapshot.
2. `loadGitHubActivity` reuses a successful local cache fetched less than one hour ago. Otherwise it requests the public feed with a 12-second timeout.
3. A validated success replaces the displayed calendar and attempts to save it under `github-activity:kasamthapa:v1` in `localStorage`. Storage is optional; a denied or full store does not fail the feed result.
4. Concurrent calls share one pending request, including React StrictMode's repeated development mount/effect cycle.
5. A network, timeout or validation failure keeps the newer valid saved record, shows **Saved activity · latest refresh unavailable**, and offers **Try refreshing activity**. Retry bypasses the one-hour local freshness check.

The UI shows the date range, fetched date and whether it is refreshing, showing saved data after failure, or using profile activity. This is not a polling service: the cache age is checked on loading the component, and a failed request can be retried manually. No background timer continually fetches contributions.

## Interaction and narrow screens

The graph is one focusable `role="group"`, with a summary/instructions label and a live count narration below it. Calendar cells are passive spans, not hundreds of buttons. This is intentional: the CRT displacement moves painted pixels without relocating HTML hit boxes, making tiny cell pointer targets unreliable.

- Focus selects the latest date initially.
- Left/right move seven days; up/down move one day, clamped to the window bounds.
- Home/End select the first/last displayed date.
- The selected cell receives an outline and the narration gives its full date and contribution count.
- Selection adjusts only the calendar's horizontal position as needed; it must not scroll the whole page with every key press.
- Small screens keep readable cells and horizontal browsing, initially positioned at the latest dates. Calendar overflow must not widen the whole portfolio.
- The profile link and failure retry retain generous transparent pointer targets and visible keyboard focus.

## Refresh the bundled fallback

From the repository root, using Node.js with built-in `fetch` support:

```sh
node scripts/update-github-activity.mjs
```

The script fetches the configured profile's real calendar with a 20-second timeout, checks valid dates/counts/levels and a 365–400 record limit, sorts records, and rejects missing or duplicate dates before writing `src/data/github-activity.json` with a new `fetchedAt`. The runtime loader additionally normalizes and validates the complete 12-month window described above. A fetch or validation failure happens before writing, preserving the prior file.

Review the resulting JSON change, then include the source snapshot in the normal authorized release. Do not replace it with random heatmap cells or hard-coded display totals. The update command is not part of `npm run build`, and a build does not need network access to the feed. Changes to the username require coordinating the loader constant, script constant, real snapshot and cache identity.
