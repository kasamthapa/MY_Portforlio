# Project system flows

Last reconciled with the portfolio definitions: **2026-10-24**.

## Purpose and placement

The carousel covers identify projects and flip to **one short brief**. Full explanations sit below them, one scrolling story per project. Each story contains a short introduction, a live-project link and a connected diagram. Keep those roles distinct; do not restore a second channel/modal that repeats the same detailed flow.

The diagrams explain actual implemented paths. They are not three isolated decorative scenes, a technology logo row, or a claim that the portfolio executes the projects. Keep the whole system visible while highlighting a stage, with arrows showing direction and branches showing real alternatives or side effects. Use the portfolio's charcoal, cream and light gold treatment, rather than copying the reference site's blue dashboard skin.

## Ownership

| File | Edit here for |
| --- | --- |
| `src/project-system-flows.ts` | Per-project nodes, edges, desktop/mobile geometry, step wording and highlighted sets |
| `src/components/ProjectSystemFlow.tsx` | Graph types, SVG generation, labels, keyboard/node selection, playback and lifecycle |
| `src/project-system-flow.css` | Terminal shapes, wires, arrows, active signal, typography, caption/transport layout and responsive graph choice |
| `src/components/PortfolioHome.tsx` | Project names, cover artwork, card briefs, one-line stories and public destination links |
| `src/crt-hud.css` | Width and placement of the story's introduction and graph within the CRT middle region |

## Current implemented flows

### CodeBrain

```text
Public GitHub repository → JS/TS code fragments → saved search index
                                                     │
Your question ───────────────────────────────────→ code matches
                                                     │
                                               answer builder
                                                     │
                                               answer + sources
```

The source path fetches a public repository, parses JavaScript/TypeScript into fragments retaining file paths and line ranges, creates embeddings, and stores them with pgvector in PostgreSQL. A question retrieves **up to five** matching fragments. The generator receives those fragments as context and streams an answer with file/line references.

Keep the index-to-retrieval connector: it explains why the question is answered from saved code rather than from the question alone. References are intended for the viewer to inspect; do not relabel them as independently verified answer correctness. Do not claim support for all programming languages or private repositories from this diagram.

Current definition: **7 nodes, 6 directed connectors, 6 stages**.

### SikshyaNepal

```text
Student search → filtered directory ← sourced college/program records
                         │
                    college profile
                    ├─ compare up to three colleges
                    ├─ save a private shortlist
                    └─ admission notice → private admission planner
```

This is an education discovery and planning path, not an automated university application service. Profiles expose source links and verification state. Comparison includes programs, reviews and scholarships. Saved colleges and the planner belong to the user's account; the planner tracks documents, deadlines and status.

Records have source/verification information; do not claim every record is verified or that dates and fees cannot change. Notices link to official sources for current details. The planner does **not** submit an application to a college automatically.

Current definition: **8 nodes, 7 directed connectors, 7 stages**.

### Critch

```text
Publish a project → public feed → peer review → review checks
                                                  │
                                           save in transaction
                                           ├─ project average
                                           ├─ owner reputation
                                           └─ saved/live notification
```

Peers review the **idea, UI, code and documentation**. The server rejects self-reviews and duplicate reviews before accepting feedback. Saving the review and recalculating project/owner scores are transaction work. Owner notification is a subsequent saved/live Socket.IO update; the graph is a conceptual branch map, not a claim all three branches are independent transactions.

Preserve the rating and reputation split, because it explains how one review affects the project and its owner. Do not turn the ending into a generic “AI improves the project” step. Optional README-related AI features are outside this concise flow.

Current definition: **8 nodes, 7 directed connectors, 7 stages**.

### Rapporteur

```text
Agenda + transcript → numbered lines → AI draft → structure validation
                                         ↑            │
                                         └─ retry once if invalid
                                                      │
                                                 quote check
                                                 ├─ agenda notes
                                                 └─ off-agenda notes
                                                      │
                                             source transcript lines
```

The transcript parser retains numbered lines, speakers and timestamps. The server extracts summaries, decisions and actions, validates the structured response, and retries an invalid draft **once**. Evidence checking compares a quoted claim with its named transcript line. Both agenda and off-agenda notes can lead the viewer back to the original discussion. An agenda can be provided or inferred from topics.

A quote match is an evidence badge, **not proof that an AI conclusion is true or complete**. Keep that distinction when rewriting the narration. The related project has a real meeting analysis endpoint; the portfolio's poster screenshot is explicitly an illustrative example. At the audit, newly created meeting records were stored in the related client's local storage, so do not invent persistent server-database storage in this diagram.

Current definition: **8 nodes, 9 directed connectors, 7 stages**.

## Graph data contract

Types are exported by `ProjectSystemFlow.tsx`:

```ts
interface FlowNode {
  id: string
  title: string
  detail: string
  kind?: string
  x: number
  y: number
  mobileX: number
  mobileY: number
  width?: number
  mobileWidth?: number
}

interface FlowEdge {
  id: string
  from: string
  to: string
  path: string
  mobilePath: string
  label?: string
  labelX?: number
  labelY?: number
  mobileLabelX?: number
  mobileLabelY?: number
}

interface FlowStep {
  title: string
  description: string
  nodes: string[]
  edges: string[]
}
```

`ProjectFlowDefinition` combines `id`, `name`, `nodes`, `edges`, `steps`, and `mobileHeight`. The current dictionary is keyed by the same stable `target` strings used in `showcaseProjects`.

### Geometry rules

- Desktop SVG coordinates use **960 × 430**. Mobile uses width **420** and a per-definition height (currently 590 or 600).
- Coordinates identify the node's top-left corner. Default terminal width is **176** and its outline height is **70** in both layouts.
- The terminal outline has clipped/chamfered corners, a fine top rule, optional kind label and a small status dot.
- `path` and `mobilePath` are explicit SVG paths; endpoints are **not calculated from `from`/`to`**. Moving a node requires moving all affected endpoints and any path labels.
- Start and finish connectors at terminal borders. Prefer clear orthogonal lanes and visible arrowheads. Route feedback loops outside terminals; do not cross through a title to save space.
- A label renders only when its applicable x/y pair exists. Desktop labels can be omitted on mobile to avoid overlap.
- Mobile is a deliberately rearranged graph, not a scaled copy of the wide layout. At 760px and below, CSS hides the desktop SVG and shows the mobile one.
- Both SVGs exist in the DOM, with instance-specific IDs from React `useId()` so marker/pattern IDs do not collide.
- Titles split into at most two lines; detail text is deliberately constrained. Keep labels short. A long sentence belongs in the narration, not inside a terminal.

### Stages and playback

The complete graph stays in view. A step lists the node and edge IDs to highlight in gold. Unselected paths remain visible in muted gray. During autoplay a small packet follows each active connector using SVG `animateMotion`; it is not an arbitrary path disconnected from the system.

- Every **4500ms**, the flow advances to the next stage while visible, enabled, playing, and the browser document is visible.
- Visibility is observed with `IntersectionObserver` at a 0.14 threshold.
- A diagram can be disabled by its `enabled` prop; the current stories use the default `true`.
- Previous/next controls wrap around and pause autoplay.
- Selecting a numbered stage pauses autoplay and changes its narration.
- Clicking or keyboard-activating a terminal chooses the **first stage containing that node**, then pauses. The node is not a link to a backend service.
- Enter and Space activate focused SVG terminals. Nodes and controls expose labels and selected/pressed state.
- Narration uses a polite live region when manually paused, while autoplay avoids repeatedly announcing updates.
- Reduced-motion preference pauses autoplay initially and suppresses moving packets and CSS transitions. Manual selection remains available; a visitor can still explicitly use playback controls.

## Source provenance and claim boundaries

These paths were audited against related local project checkouts on **2026-10-24**. They are **external provenance**, not files required to clone, build or deploy this portfolio. They are not imported by it. A future machine may not contain those repositories; obtain the source or ask for updated evidence before expanding technical claims.

| Related project | Source paths inspected during the audit |
| --- | --- |
| CodeBrain | `server/src/controllers/codebrain.controller.ts`; `server/src/services/` GitHub, chunking, storage, retrieval and LLM modules; client `api/askQuestion` |
| SikshyaNepal | `app/(main)/colleges/page.tsx`; `app/(main)/colleges/[slug]/page.tsx`; `app/api/colleges/compare`; `app/api/saved-colleges`; `app/api/admission-planner` |
| Critch | `server/src/controllers/project.controller.ts`; `server/src/utils/notify.ts` |
| Rapporteur | `server/src/lib/analyzeMeeting.ts`, `transcriptParser.ts`, `promptBuilder.ts`, `resultSchema.ts`, `verifyEvidence.ts`; `server/src/routes/meetings`; client `MeetingView`, `App` and `local/localMeetings` |

The diagrams intentionally omit unverified runtime/deployment guarantees, unsupported integrations and irrelevant implementation detail. A source audit establishes what the code implemented at that point; it does not promise an external live deployment remains available or unchanged.

The separate editor view's `src/data/projects.ts` has additional technical copy and limitations for three projects. Keep new claims consistent with it, but do not mistake that older list for the primary CRT's four-project registry.

## Editing checklist for a flow task

1. Establish what the actual source does and what the viewer needs to understand.
2. Update nodes, branches and stage narration together. Do not add a connector merely as decoration.
3. Keep all IDs unique within a definition. Every edge endpoint and every stage reference must name an existing node/edge.
4. Update both desktop and mobile geometry, including routed loops and labels.
5. Preserve concise intro copy and the single short card brief. Link to the actual project separately.
6. When validation is authorized, inspect the full diagram at desktop and narrow widths, manually step its branches, and respect reduced motion. The repository has no dedicated graph test script.
7. Record changes to audited project behavior here if they materially change the explanation or its claim boundaries.
