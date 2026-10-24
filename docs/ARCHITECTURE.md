# Architecture and maintenance map

Last reconciled with source: **2026-10-24**.

This is a client-rendered React and TypeScript portfolio, built with Vite. The public experience is a single curved CRT screen. A secondary editor-inspired experience remains available through **SOURCE: CODE VIEW**. This repository does not run the showcased projects' backends or call their APIs; their diagrams and poster interfaces are explanatory UI.

Read this together with [the design system](DESIGN_SYSTEM.md) and [project flow notes](PROJECT_FLOWS.md). Start with the root `AGENTS.md` when continuing work as a coding agent.

## Run commands

Use the lockfile and the existing npm scripts:

```sh
npm ci
npm run dev
npm run build
npm run preview
```

- `dev` starts Vite; use the URL it prints. The usual development port is 5173, but it can change if occupied.
- `build` runs TypeScript checking, then emits the production bundle to ignored `dist/`.
- `preview` serves that built bundle locally. It is not a production deployment command.
- There are currently **no test or lint npm scripts**. Do not report either as passing without adding and actually running an appropriate setup under an authorized task.
- There is no portfolio API server, database, or required `.env` configuration in the current implementation. External project links are ordinary links.

## File map

| Location | Responsibility |
| --- | --- |
| `index.html` | Document metadata, canonical URL, fonts, icons, social preview, Person JSON-LD, pre-paint editor theme choice |
| `src/main.tsx` | React root under `StrictMode`; global stylesheet import order |
| `src/App.tsx` | CRT/editor mode switch, startup state, editor tabs and theme, command palette, terminal and toast state |
| `src/components/PortfolioHome.tsx` | Public CRT markup; four sections; project posters, briefs and stories; nested navigation and carousel behavior; SVG lens definitions |
| `src/components/ProjectSystemFlow.tsx` | Typed SVG graph renderer, node and stage selection, autoplay and transport controls |
| `src/project-system-flows.ts` | Four project-specific graphs, explicit desktop/mobile paths, narration and active stage sets |
| `src/index.css` | Tailwind entry, editor variables, base styles, and accumulated portfolio/layout history |
| `src/poster-theme.css` | Public charcoal, cream and gold palette; final glass silhouette, gutters and filter attachment |
| `src/portrait-poster.css` | Distressed portrait, torn/deckled edge treatment, masthead, title and VHS stamps |
| `src/crt-hud.css` | Current three-row screen layout, transparent stationary HUD, scrolling middle, current carousel alignment, project story layout, contact hit areas and power-on animation |
| `src/project-system-flow.css` | Diagram terminals, connectors, active signal, captions, controls and responsive graph selection |
| `src/editor/registry.tsx` | File tabs for the secondary editor experience |
| `src/editor/*File.tsx` | Code-like content and rendered preview for each editor tab |
| `src/data/projects.ts` and `src/types/index.ts` | Older, separate typed project content consumed by editor Projects view |
| `src/components/chrome/` | Editor shell: title bar, sidebar, tabs, split pane, minimap, terminal, palette and status bar |
| `src/hooks/` | Reusable reduced-motion and in-view behavior, mainly used by secondary views |
| `public/` | Assets copied to the deployment root: portrait images, lens map, icons, social preview, manifest and crawler files |
| `scripts/generate-crt-lens-map.py` | Standard-library-only generator for the active `public/crt-lens-map.png` |
| `vite.config.ts`, `tsconfig*.json`, `tailwind.config.js`, `postcss.config.js` | Build and styling configuration |

## Public screen structure

```text
App
└─ PortfolioHome (one clipped and filtered glass surface)
   ├─ SVG filter and clip definitions
   ├─ temporary CRT power-on overlay
   ├─ crt-hud-header                 stationary transparent navigation
   ├─ portfolio-scroll              the sole vertical page scroller
   │  └─ portfolio-content
   │     ├─ home                    portrait, identity and introduction
   │     ├─ work                    horizontally scrollable poster carousel
   │     ├─ story-codebrain         brief introduction + connected system flow
   │     ├─ story-sikshyanepal       brief introduction + connected system flow
   │     ├─ story-critch            brief introduction + connected system flow
   │     ├─ story-rapporteur        brief introduction + connected system flow
   │     ├─ about                   software engineer positioning
   │     └─ contact                 email and external social links
   └─ crt-hud-footer                time, B&W, code view, email
```

The header and footer are stationary because they occupy rows 1 and 3 of a viewport-sized grid. They are not opaque bars over a scrolling document. `.portfolio-scroll` occupies row 2 and owns `overflow-y: auto`; its `min-height: 0` is necessary for grid containment. The page should continue to feel like one screen, without a second bezel around each section.

### Navigation and section state

- Supported public navigation hashes are `#home`, `#work`, `#about`, and `#contact`.
- `navigateToSection` updates history and scrolls `.portfolio-scroll` to the target's `offsetTop`, smoothly unless reduced motion is requested.
- Initial loading and browser back/forward synchronize these hashes using an animation frame and `popstate`.
- An `IntersectionObserver` rooted in `.portfolio-scroll` updates the current navigation marker for the four main sections.
- Project stories have stable `story-*` element IDs. **HOW IT WORKS** uses `continueToProjectStory`, then scrolls the same middle region to that story. The current hash synchronization does not treat story IDs as main routes.
- Do not switch these calls to `window.scrollTo`: the browser document is not the active page scroller.

### Carousel behavior to preserve

The project carousel remains a native horizontal overflow strip, enhanced with pointer dragging and scroll snapping. Its width calculations use container query units (`cqw`), with `container-type: inline-size` on `.showcase-carousel`.

- Current layout shows three equal-width covers on large screens, two at widths up to 1100px, and one with a small continuation cue at widths up to 760px.
- The first cover begins at a small normal edge inset. There is no center-padding spacer before it, no inactive-cover shrink, and no floating previous/next arrow UI.
- The current cover drives the caption and small project-position buttons. Left/right keys still browse when the gallery has focus.
- Clicking a cover **only flips that cover to a short brief**. Clicking it again flips back. Only one brief is open at a time; Escape closes it.
- Pointer movement over five pixels is treated as a drag. A short post-drag click suppression prevents accidental flips.
- Touch/trackpad horizontal movement and Shift+wheel browse the strip; ordinary vertical wheel input continues down the page.
- Detailed connected diagrams live **below the carousel**. The previous separate project channel/modal was removed to avoid explaining the same project twice.

### Startup and motion lifecycle

`App` initializes `crtPoweringOn` for visitors without a reduced-motion preference. `PortfolioHome` receives that flag and renders a noninteractive, decorative overlay. In `crt-hud.css`, a phosphor dot stretches into a scan line, shutters open, and the picture settles with a restrained static/bloom effect. CSS runs for 1400ms; `App` removes the overlay after 1500ms. A page reload replays it; it is not persisted in session storage. Entering code view clears the power-on flag, so returning to the CRT view does not replay it.

The 550ms `booted` state in `App` controls the separate editor loading overlay. Do not confuse it with the public CRT startup effect. GSAP animates changes to the gallery caption/poster only when reduced motion is not requested; cleanup uses `gsap.matchMedia().revert()`.

## Lens and asset ownership

The convex appearance combines an actual SVG displacement filter, a bowed clip path, edge darkening, faint reflections and scan lines. A border radius alone does not implement this design.

- Filter definitions and desktop/mobile clip paths are inline in `PortfolioHome.tsx`.
- The filter reads **`/crt-lens-map.png?v=bounded-1` from `public/`**, not the older `src/assets/crt-lens-map.png` copy.
- The desktop displacement scale is `0.1`; mobile is `0.075`. The generator currently uses curvature `0.065` and assumes desktop scale `0.1`.
- The field returns toward neutral at the rim, keeping the HUD inside the glass. If tuning it, keep the generator and filter scales coordinated.
- Regenerate the served asset with `python3 scripts/generate-crt-lens-map.py`; Python's standard library is sufficient. This writes `public/crt-lens-map.png`.
- `--lens-x` and `--lens-y` follow pointer position and reset on leave; these drive reflection placement, not DOM layout.
- SVG displacement changes the painted location of content. Preserve generous link hit areas, especially the contact links. Decorative layers must remain `pointer-events: none`.

The active portrait is `/kasam-portrait-vhs.jpg`. `portrait-poster.css` supplies its print treatment and stamps; the original `/kasam-portrait.jpg` and torn mask are retained assets. Do not replace the designed print with an unstyled portrait or add a thick device case around the screen.

## Styling order and history

`src/main.tsx` declares these global imports in this order:

1. `index.css`
2. `poster-theme.css`
3. `portrait-poster.css`
4. `crt-hud.css`
5. `project-system-flow.css`

The graph component also imports its own stylesheet. All are global CSS, not CSS modules. Inspect computed styles and the later, more specific overrides when changing a component. In particular, old centered coverflow and section sizing rules in `index.css` are overridden by the current `.portfolio-home ...` rules in `crt-hud.css`.

Historical CSS remains for `.portfolio-rail`, `.case-*`, `.trace-*`, `.project-film*` and `.project-channel*`. Those selectors are not evidence that those older UI features are currently rendered. Search the current JSX before changing or restoring one. A broad CSS deletion or reordering can affect the retained editor mode; consolidate only as a deliberate refactor.

## Secondary editor experience

`editorMode` is local React state, not a route or a saved default. It starts false. `SOURCE: CODE VIEW` opens the editor; the title bar's portfolio action returns to the CRT view.

The registry has five entries: `profile.ts`, `projects.ts`, `stack.json`, `now.ts`, and `contact.ts`. Each provides a `Code` component and a `Preview` component. This is an interactive presentation of portfolio content, **not a general-purpose source editor or executable terminal**. `TerminalPanel.tsx` types a predetermined sequence.

- `App` manages open tabs, the active tab, mobile sidebar, command palette and terminal mount/close transitions.
- Editor dark/light choice is saved under `localStorage['vs-theme']` and applied before first paint by `index.html`.
- The split pane persists its own percentage in `SplitPane.tsx`.
- Cmd/Ctrl+P and Cmd/Ctrl+K open the command palette. Palette commands include theme, terminal, profile links and email copy.
- `src/data/projects.ts` currently has **three** editor project records; the primary CRT has **four**, including Rapporteur. They are not a shared source of truth yet. Synchronize intentionally when a content task affects both experiences.

## Contact, metadata and public identity

Canonical owner contact: **kasamthapa89@gmail.com**.

Public profiles:

- GitHub: `https://github.com/kasamthapa`
- LinkedIn: `https://linkedin.com/in/kasamthapamagar`
- X: `https://x.com/kasamthapa89`

The primary screen presents Kasam as a **software engineer in Kathmandu** working across the stack. Contact data is currently repeated in `PortfolioHome.tsx`, `App.tsx`, `HeroFile.tsx`, and `ContactFile.tsx`; search all source files when updating it.

Canonical site URL is currently `https://www.kasamthapa.com.np/`. Coordinate URL changes across `index.html` (canonical, Open Graph and JSON-LD), `public/sitemap.xml`, `public/robots.txt`, and any relevant hosting configuration. Both SVG and PNG social preview assets exist, but `index.html` currently points social metadata to **`og-image.svg`**. The web manifest is presentation metadata; this repository does not register a service worker or implement offline caching.

## Common change recipes

### Change a brief or project link

Edit `showcaseProjects` in `PortfolioHome.tsx`; `note` is the short visible story/caption, `brief` is the card reverse, and `href` opens the real project. The `target` joins the poster branch, `story-*` ID and `projectSystemFlows` key. Keep it stable. Check the separate editor content if the same statement appears there.

### Add a project

Add its showcase record, an explicit poster-art branch, matching flow definition and a source-ground brief. The stories map from the showcase array automatically. Update hard-coded project count/date labels, the selected-work list by the portrait, and metadata or editor records where relevant. Maintain the even horizontal deck; do not restore the discarded channel overlay.

### Change a system flow

Follow [PROJECT_FLOWS.md](PROJECT_FLOWS.md). Change semantics and source claims in the definition; change rendering in `ProjectSystemFlow.tsx`; change visual treatment in `project-system-flow.css`. Desktop and mobile connector coordinates are separate and both need updates.

### Adjust screen, HUD or section sizing

Start in the final glass rules in `poster-theme.css` and the three-row layout in `crt-hud.css`. Preserve middle-scroll containment, transparent HUD rows and readable targets. Do not compensate for one viewport by adding an oversized fixed header or footer over the content.

### Update the portrait

Use an intentional portrait asset and preserve the VHS print hierarchy. Update the `img` URL and descriptive alt text in `PortfolioHome.tsx`, then tune `portrait-poster.css`. Do not assume the old original and processed image are interchangeable.

## Known maintenance limits

- Source and copy are duplicated between the primary CRT and editor mode; no CMS or shared content schema currently resolves that duplication.
- The main CSS file contains successive design iterations. Later overrides are part of the current implementation; old comments can describe abandoned colors or layouts.
- Graphs are hand-positioned explanatory diagrams, not generated dependency maps or live service status dashboards.
- Source audit dates establish provenance for claims, not ongoing verification of external deployments.
- Generated `dist/`, local dependencies, and local environment files are ignored. Ship source and assets; rebuild the production bundle through the deployment workflow.
