# Portfolio design system

This is the design contract for Kasam Thapa Magar’s portfolio, documented from the accepted implementation on **2026-10-24**. Use it when extending the site, fixing layout, or handing the work to another coding agent. The implementation remains the source of truth for exact values; this document explains which choices are intentional and which older CSS should not be revived.

## 1. The experience to preserve

The portfolio is a picture inside **one convex CRT screen**. It should feel like gently bowed glass viewed through a lens: a slightly enlarged center, curved picture edges, soft reflections, darkened edges, restrained scanlines, and warm phosphor ink. It is not a phone mockup, a television cabinet, or a rectangular app with a thick rounded border.

The glass, navigation, and screen controls stay in place. The content between the header and footer scrolls. Every section shares the same glass; changing sections must not reveal another screen outline or a new enclosing card. Keep the outer black margin modest.

The mood is analog, cinematic, and personal. Charcoal, cream, and light film gold are the current palette. Red was explicitly reduced; historical variable names containing `red` do **not** mean the current accent should be red. Retro texture supports the content and must not make the words hard to read.

The words should introduce Kasam as a **software engineer in Kathmandu who works across the stack**, with a human point of view. Do not replace this with unsupported awards, years of experience, employers, client names, or a designer-only identity copied from a visual reference.

### Accepted interaction model

- The opening centers Kasam’s distressed black-and-white VHS portrait, with selected projects to its left and practice areas to its right.
- Work begins with an evenly aligned horizontal carousel. The posters have equal size and spacing; the first card starts near the leading edge rather than sitting alone in the center with a large blank area before it.
- Clicking a project card **only flips it to a short project brief**. A second click flips it back. Do not reintroduce the duplicate project channel/modal.
- The carousel keeps dragging, touch swiping, keyboard browsing, and project indicator buttons. The floating previous/next arrows were deliberately removed.
- Detailed explanations live **below** the carousel, one project story at a time, with real connected system diagrams.
- The `HOW IT WORKS ↓` action moves to the corresponding story. Keep this distinct from `FLIP FOR A BRIEF`.
- Header and footer remain transparent text layouts, not filled bars added to make controls visible.

## 2. Styling ownership and cascade

`src/main.tsx` imports the styles in this order:

| Order | File | Responsibility |
| --- | --- | --- |
| 1 | `src/index.css` | Global/editor styles and the accumulated base portfolio styles. Contains several older design passes. |
| 2 | `src/poster-theme.css` | Current charcoal/gold palette, printed poster treatments, final glass silhouette and lens filter selection. |
| 3 | `src/portrait-poster.css` | Current VHS portrait sleeve, image treatment, masthead, title, stamps, mask, and portrait sizing defaults. |
| 4 | `src/crt-hud.css` | Current fixed-screen grid, stationary HUD, scrolling middle, readable sizing, equal carousel layout, story layout, contact target padding, and power-on effect. |
| 5 | `src/project-system-flow.css` | Connected diagram visuals, typography, active signal, caption, playback controls, and mobile graph switch. |

`ProjectSystemFlow.tsx` also imports its component stylesheet. Preserve the established import order when changing styles. A selector near the start of `index.css` is often overridden later, sometimes in several places. Read the later matching rules and the dedicated files before editing a value.

Use the file that owns the feature instead of adding another general override to `index.css`. New rules should be scoped to the portfolio or their component. A future CSS cleanup can consolidate the cascade, but it must preserve the rendered result and interaction model first.

There are historical selectors such as `.portfolio-rail`, `.gallery-arrow`, `.trace-*`, and `.project-channel*` in the stylesheets. Their presence does not establish current product behavior. In particular, the current `PortfolioHome.tsx` does not render the old selected-project channel. Do not document or restore it as an active feature by following leftover CSS alone.

## 3. Color and surface tokens

The primary tokens are scoped to `.portfolio-home` in `poster-theme.css`.

| Token/value | Current role |
| --- | --- |
| `--poster-black: #080808` | Deep screen/print black. The page outside the glass is `#010101`. |
| `--poster-charcoal: #1a1815` | Warm charcoal glass base. |
| `--poster-paper: #e9dfcb` | Main cream ink. |
| `--poster-muted: #c9bea9` | Readable secondary ink. |
| `--poster-faint: #85817c` | Low priority marks and inactive indicators. |
| `--poster-red: #cbb486` | **Light gold accent**, despite the legacy name. |
| `--poster-rule: rgba(238, 234, 227, .24)` | Fine dividers and printed outlines. |
| `--page-*`, `--screen-*`, `--phosphor`, `--crt-*` | Compatibility aliases mapped to the current print palette. |

The final glass background in `crt-hud.css` uses a warm radial progression: `#26231f` → `#181614` → `#0b0a09` → `#020202`. It also adds a very low opacity one-pixel scanline every four pixels. These layers combine with the final reflection/vignette overlays; they are not separate containers.

Diagram tokens in `project-system-flow.css`:

| Token | Value | Role |
| --- | --- | --- |
| `--psf-gold` | `#d7bd83` | Active stage, connector, and controls. |
| `--psf-light` | `#f1e8d5` | Diagram foreground. |
| `--psf-muted` | `#bcb4a4` | Supporting diagram text. |
| `--psf-wire` | `#78756a` | Inactive connectors. |
| `--psf-surface` | `#1c1b17` | Terminal node fill. |

Keep major content cream and use gold selectively for emphasis, active states, rules, and link cues. Additional saturated colors, large red headings, white panels, filled navigation bars, and broad heavy glows would change the accepted theme.

### Theme controls

The public portfolio has a `B&W [OFF/ON]` screen control. It adds `is-monochrome` and applies grayscale while preserving the appropriate lens filter. It is an in-memory screen option, not a separate light theme.

The optional **SOURCE: CODE VIEW** uses the existing editor shell and its Dark+/Light+ tokens. Its `vs-theme` preference is stored in local storage and initialized before first paint in `index.html`. Those editor tokens are separate from the public CRT palette; changing an editor theme should not recolor the public glass.

## 4. Typography and legibility

The user requested the **CA Telecopy / CRT font feeling**. The repository currently has **no bundled CA Telecopy font binary and no `@font-face` loading it**. It appears as the preferred family in CSS fallback lists. Do not claim that a licensed CA Telecopy webfont has been installed.

`index.html` currently requests these Google Fonts: **Bodoni Moda, DM Mono, IBM Plex Mono, IBM Plex Sans, Instrument Serif, JetBrains Mono, and VT323**. These are network loaded, not local bundled font assets. If a browser already has CA Telecopy locally, its family name may resolve; otherwise those selectors typically fall through to VT323 and then a monospace fallback.

| Use | Current treatment |
| --- | --- |
| Large editorial statement and project story titles | Bodoni Moda / Instrument Serif / Georgia where the dedicated theme overrides specify them. Tight letter spacing and deliberate line breaks. |
| Retro poster display text and selected small print | CA Telecopy preference, VT323 fallback, then IBM Plex Mono/monospace. |
| Stationary HUD, diagrams, playback narration | IBM Plex Mono. Keep these comparatively clean. |
| Intro description and project story explanation | IBM Plex Sans and sans-serif fallbacks. |
| Source editor | JetBrains Mono and system monospace fallbacks. |

The mix is deliberate: not every word uses the display CRT face. Avoid forcing the whole website into one pixel font or restoring the tiny/blurry labels from earlier passes. Some small marks inside poster artwork are decorative; the nearby project name, brief, action, and diagram narration must remain readable without reading those marks.

Concrete current sizing anchors in `crt-hud.css` include HUD text at `clamp(11px, .9vw, 14px)`, project story explanatory copy at `clamp(17px, 1.3vw, 20px)`, contact social labels at `13px`, and contact email at `15px` on desktop. Diagram captions use 15px titles and 13px supporting text before the mobile adjustment. Do not shrink these globally to fit an overflow problem; fix the layout or content length.

## 5. Convex glass: geometry and rendering

The effect combines **three different mechanisms**; keeping only a border radius loses the intended result.

1. **Bowed silhouette:** `PortfolioHome.tsx` defines `#crt-glass-clip` and `#crt-glass-clip-mobile` as object-bounding-box SVG paths. `poster-theme.css` applies the selected `clip-path` to `.portfolio-home`. The sides and top/bottom have curves, not straight edges between four rounded corners.
2. **Optical distortion:** `#crt-lens-distortion` uses an SVG `feImage` displacement map plus `feDisplacementMap` on the whole screen. Desktop scale is `.1`; the mobile filter scale is `.075`. This warps the drawn picture and gently magnifies the center.
3. **Glass lighting:** the screen background and `::before`/`::after` overlays supply highlights, side light, scanlines, and edge darkness. They use `pointer-events: none` and must not become click-blocking layers.

`public/crt-lens-map.png` is the runtime map. `scripts/generate-crt-lens-map.py` generates it using standard-library Python, a 512×512 RGBA field, `CURVATURE = 0.065`, and `FILTER_SCALE = 0.1`. The inverse mapping gives approximately 7% center magnification and returns to neutral near the rim. Regenerate the public map with:

```sh
python3 scripts/generate-crt-lens-map.py
```

The generator’s normalization scale must continue to agree with the desktop filter. The intentionally smaller mobile filter scale reduces distortion. Do not change only one number without considering this relationship. `src/assets/crt-lens-map.png` is not the URL loaded by the current filter; the active JSX uses `/crt-lens-map.png?v=bounded-1`.

The current screen’s desktop gutters are `--glass-gutter-x: clamp(14px, 2vw, 36px)` and `--glass-gutter-y: clamp(9px, 1.6vh, 20px)`. At the 640px glass breakpoint, horizontal gutters become `clamp(10px, 3.5vw, 20px)` and vertical gutters become 10px. Keep some black outside the lens, but avoid returning to the large empty margins seen in earlier screenshots.

**Tuning rule:** make moderate coordinated changes to silhouette, map strength, and lighting. Excess distortion can cut off the HUD and shift visible link text away from its actual target. Avoid adding multiple beveled rings, cabinet borders, or a second rounded mask per section to simulate depth.

## 6. Fixed HUD and scrolling content

`.portfolio-home` is a three-row grid in `crt-hud.css`:

```text
Stationary transparent header: HOME / clock / KASAM / WORK ABOUT CONTACT
Scrolling middle: home → carousel → four system stories → about → contact
Stationary transparent footer: Kathmandu time / B&W / SOURCE: CODE VIEW / EMAIL
```

The desktop header is `clamp(70px, 8.6vh, 104px)` high, and footer is `clamp(48px, 6.1vh, 70px)`. `--crt-middle-height` subtracts these and the outer vertical gutters from `100svh`. `.portfolio-scroll` owns vertical scrolling, has `min-height: 0`, and hides its scrollbar. The document body stays overflow-hidden. Navigation scrolls this element using section offsets; browser-window scrolling is not the navigation mechanism.

The HUD is a sibling of the scroller, not a sticky element pasted over its contents. Its transparency does not require a blurred or opaque background for contrast. The grid reserves its space so moving text does not pass through the controls.

At 760px and below, the header becomes two rows, the seconds clock is hidden, the footer becomes a two-column layout, and fixed row heights are 104px and 69px. This breakpoint differs from the 640px glass silhouette breakpoint; do not assume every responsive rule should share a single breakpoint.

## 7. Portrait: a worn VHS sleeve, not a flat photo

The active portrait is `/kasam-portrait-vhs.jpg`, composed inside `.intro-portrait-card`. It is not a plain rounded avatar. Preserve:

- Black-and-white photographic treatment, including current CSS `grayscale(1) contrast(1.14) brightness(.88)`.
- `/torn-photo-mask.png` as the irregular alpha mask around the sleeve.
- A small `KASAM THAPA MAGAR` masthead above **Home Video**, with its printed divider.
- Oversized gold **KASAM** typography crossing the portrait, with a subtle distress mask.
- VHS stamp, `KTM / 2026`, and the oval K seal along the lower edge.
- Restrained static/scanline overlays, worn edges, a dark photographic vignette, and soft shadow.
- The selected-work and practice indexes alongside the portrait, not moved into a separate row below it.

`src/portrait-poster.css` is authoritative for the sleeve treatment. It deliberately replaces earlier paper-print transforms, padding, clipping, and colored treatments in `index.css`. `src/crt-hud.css` then refines its final size: desktop `clamp(165px, min(13vw, 20svh), 285px)`; mobile `clamp(146px, min(48vw, 25svh), 190px)`.

The user’s original HEIC file is outside the repo. Runtime assets must stay within `public/`; do not make the website depend on a Downloads path. `/kasam-portrait.jpg` remains available, but the landing page currently uses the VHS version. Avoid compounding more noise onto the already distressed raster until the face becomes indistinct.

## 8. Projects: posters, briefs, then connected stories

### Carousel structure

The layout is a native horizontal scroll container with flex children and scroll snapping. `crt-hud.css` intentionally overrides the old center-padding, scale, tilt, fade, and perspective-based side-card presentation.

- Desktop: three equal card widths computed from `100cqw`, two equal gaps, and 4px leading/trailing edge padding.
- At 1100px and below: two equal card widths.
- At 760px and below: one card with a small next-card hint; width `calc(100cqw - 32px)` and 18px gap.
- Gap on larger screens: `clamp(20px, 2.4vw, 34px)`.
- All cards remain `scale: 1`, full opacity, no individual tilt, and `scroll-snap-align: start`.
- `scrollToProject` reveals a card only as far as needed instead of centering it with empty space. Selection indicators update the caption.

Use actual buttons for cards, retain their accessible names and `aria-pressed` state, and keep backface visibility rules for the flip. Mouse dragging suppresses an accidental click after the drag; preserve that distinction. Left/right arrow keys browse when the gallery is focused, Escape closes a brief, and standard button activation works by keyboard. Vertical scrolling must still reach the project stories; do not capture every wheel event for the horizontal carousel.

The poster front is visual artwork, not an embedded functioning project UI. Keep the surrounding text explicit: **FOUR PROJECTS**, **Click a card for a quick project brief**, project name/category, **FLIP FOR A BRIEF**, and **SCROLL DOWN FOR THE SYSTEM FLOWS**. The Rapporteur poster labels its sample as an **ILLUSTRATIVE EXAMPLE**; this does not mean the actual project is merely a mockup.

The reverse contains a short plain-language brief. Avoid filling it with a full diagram or repeating the entire story. Do not add nested external-link buttons inside the card button. External project links live in the separate stories.

### Connected system stories

`src/project-system-flows.ts` supplies the node, edge, and step data. `src/components/ProjectSystemFlow.tsx` renders it; `src/project-system-flow.css` owns its appearance. Each diagram keeps the complete topology visible while a stage highlights the relevant nodes and **actual directed connections**. This is essential: disconnected icons with captions failed the user’s request.

Every project has its own meaningful topology rather than the same decorative three-step template:

| Project | Story to communicate |
| --- | --- |
| CodeBrain | Repository → parsed fragments → search index; question and saved index converge on matching code → answer builder → answer with source references. |
| SikshyaNepal | Search and sourced catalog → college profile; branches to comparison, private shortlist, official admission notices, and private planner. |
| Critch | Project → feed → peer review → review checks → save transaction; branches to project rating, owner reputation, and notification. |
| Rapporteur | Transcript/agenda → numbered lines → AI draft → structure check with a retry branch → quote check → agenda/off-agenda notes linked to source transcript. |

The configurations were audited against local project sources on 2026-10-24. Keep the implementation comments and descriptions accurate. Source references in CodeBrain are for a viewer to check, not a claim of independently verified correctness. Sikshya records can have different verification states. Quote verification in Rapporteur checks the quote against its named transcript line; it does not prove that an AI conclusion is true. Do not invent runtime, deployment, storage, or automation claims to improve the diagram.

Visual conventions:

- Dark chamfered terminal nodes, fine grey wires, arrowheads, small role labels, and warm gold active paths.
- A moving phosphor packet follows the highlighted connector, rather than drifting between unrelated decorations.
- Short stage title and explanation below the graph; previous/play/pause/next controls and numbered stage selectors.
- Click or keyboard-activate a node to select its relevant stage. Manual selection pauses playback.
- Desktop SVG viewBox is 960×430. Mobile has a separate 420-unit-wide layout with project-specific height, node coordinates, and connector routes. It is not just a squeezed desktop graph.
- At 1100px and below, story intro and diagram stack. At 760px and below, the mobile graph is displayed and the desktop one is hidden.

When adding or moving a node, update both layouts and their edge endpoints. Arrowheads should meet node borders, branches should remain understandable, and labels should avoid crossings. Keep the graph floating on the shared glass; do not add another large rounded device panel around it.

## 9. Motion and accessibility

### CRT power-on

`App.tsx` initializes `crtPoweringOn` once on page load unless reduced motion is requested, then clears it after 1500ms. `PortfolioHome.tsx` renders an `aria-hidden`, non-interactive overlay while this state is true. `crt-hud.css` runs the visual sequence for 1400ms:

1. Dark shutters cover the picture.
2. A warm point grows into a thin horizontal scan beam.
3. Shutters retract vertically and a soft phosphor bloom reveals the picture.
4. Brief low opacity static/flicker settles into the normal screen.

This is a page-load effect, not a section transition and not a full-screen loading spinner. Do not replay it on carousel selection or navigation. Keep overlays `pointer-events: none` so the animation does not add an invisible blocking layer.

### Other motion

- Gallery flip duration is approximately `.85s` with the existing eased 3D rotation.
- Active project caption transitions use GSAP and are gated by a no-reduced-motion media query.
- Diagram stage autoplay advances every 4500ms. Packet movement lasts 2.2s per loop. Playback pauses while the graph is outside the viewport or the document is hidden.
- In reduced motion, the power-on overlay is hidden, smooth scrolling becomes immediate, decorative animations/transitions are reduced, diagrams begin paused, and moving packets are not drawn. A viewer can still deliberately choose stages and start playback.

Keep focus indicators visible, preserve accessible labels, and do not use continuous blur for the screen’s ordinary text. Screen noise, scanlines, and distress overlays must remain decorative and non-interactive. Diagram narration uses a polite live region only during manual selection, preventing autoplay from continually announcing text.

### Lens rendering and hit targets

SVG displacement moves the painted text but does **not** relocate the DOM hit-test geometry to match every displaced pixel. The contact links deliberately have generous transparent padding to compensate. Current social targets are at least 60px wide and 56px high, with `18px 14px` padding; the email target is at least 52px high with `12px 14px` padding. This is padding compensation, not an inverse optical hit-test engine.

Keep contact and HUD links away from the most distorted rim. Preserve `pointer-events: none` on all visual glass overlays, and never place a decorative absolute layer over the links. If lens strength or contact layout changes, check clicks at the **visible glyph positions**, including the arrows, rather than assuming correct `href` values prove usability. Email is `kasamthapa89@gmail.com`; current social destinations are declared in `PortfolioHome.tsx`.

## 10. Assets and safe editing map

| Asset/source | Purpose and editing guidance |
| --- | --- |
| `public/kasam-portrait-vhs.jpg` | Active distressed portrait raster. Preserve Kasam’s identity and black-and-white treatment. |
| `public/kasam-portrait.jpg` | Retained portrait asset; not the active landing-page sleeve image. |
| `public/torn-photo-mask.png` | Irregular portrait alpha edge. Keep transparent areas intact. |
| `public/crt-lens-map.png` | Generated optical displacement field used at runtime. Change through its generator. |
| `public/favicon.svg` and PNG icon variants | Browser/app identity assets. Keep their tone consistent with the portfolio. |
| `public/og-image.svg`, `public/og-image.png` | Share artwork. Current metadata in `index.html` points to the SVG. Update metadata if changing the selected asset. |
| `src/components/PortfolioHome.tsx` | Public composition, section copy, current project briefs/URLs, social destinations, carousel interactions, SVG filter definitions. |
| `src/poster-theme.css` | Public palette and glass silhouette/filter selection. |
| `src/portrait-poster.css` | Portrait composition and distress overlays. |
| `src/crt-hud.css` | Final screen grid, carousel proportions, text sizing, power-on sequence, and contact hit areas. |
| `src/project-system-flows.ts` | Source-grounded system diagram content and desktop/mobile routes. |
| `src/components/ProjectSystemFlow.tsx` | Diagram rendering, selection, playback, visibility, and motion preference behavior. |
| `src/project-system-flow.css` | Diagram visual system. |
| `index.html` | Font loading, browser color, metadata, and share image selection. |

## 11. Guardrails for the next design change

Before calling a visual change complete, make its affected state concrete: opening view, first carousel position, a flipped brief, the corresponding connected story, and any changed responsive state. When verification is part of the requested work, inspect normal and reduced-motion behavior, readable text, focus states, and visible link targets. Do not claim visual or accessibility verification that was not performed.

Preserve the approved composition by default. In particular, avoid another central-card layout with blank leading space, floating carousel arrows, duplicate detail channels, filled HUD bars, multiple nested screen frames, an all-red accent scheme, a flat untreated portrait, or disconnected project icons. These are specific rejected directions from the design work, not interchangeable implementation options.

Potential later improvements, **not current implemented features**: a properly licensed and bundled CA Telecopy webfont; consolidation of the historical CSS layers; a generalized inverse-displacement hit-target solution. Treat these as explicit future work rather than describing them as already present.
