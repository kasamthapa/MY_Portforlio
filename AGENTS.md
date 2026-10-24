# Agent instructions

## Catch up first

Read [README.md](README.md), [docs/HANDOFF.md](docs/HANDOFF.md), and the relevant parts of [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Read [docs/PROJECT_FLOWS.md](docs/PROJECT_FLOWS.md) before changing diagram content. The user's current request takes precedence over this handoff.

Inspect the working tree before editing. It may contain ongoing work from the user or another agent. Preserve unrelated changes and never reset, overwrite, or discard them to simplify a task.

## Preserve these accepted decisions

- The public experience is one convex CRT picture. Its glass comes from the SVG displacement field, curved clipping path, reflections, vignette, and raster texture together. A rounded rectangle or phone-style rim does not reproduce it.
- Use charcoal, warm off-white, and restrained film gold. Keep text readable. A heavy red palette and aggressive blur were rejected.
- Keep the transparent header and footer in the screen's fixed rows. Only the middle scrolls; content should not pass under opaque HUD bars.
- Keep the ragged, black-and-white VHS portrait treatment and its gold typography. The project/practice labels sit beside the portrait on desktop.
- Keep the horizontal project filmstrip, with equal-size, evenly spaced cards and no large leading spacer. Floating previous/next arrow buttons were removed at the user's request.
- Card clicks **only flip to a short brief**. Do not reintroduce a separate project channel/modal with a second copy of the system explanation.
- Full connected system diagrams belong **below** the carousel. Use actual nodes, directed connectors, branches, and short stage narration; disconnected decorative icons do not explain the system.
- Keep the CRT power-on brief and once per page load. Section navigation and returning from source mode must not replay it. Honor reduced motion.
- Preserve usable pointer and keyboard targets. The SVG filter displaces painted pixels without moving HTML hit boxes; tiny text-only links are especially easy to break.
- Present Kasam as a software engineer. Canonical contact email: **kasamthapa89@gmail.com**.

## Where to change things

| Task | Start with |
| --- | --- |
| Page copy, carousel, contact links, lens SVG | `src/components/PortfolioHome.tsx` |
| Power-on lifecycle and editor mode | `src/App.tsx` |
| Screen layout, HUD, current carousel overrides, startup CSS | `src/crt-hud.css` |
| Theme palette and print treatment | `src/poster-theme.css` |
| Portrait composition and distress | `src/portrait-poster.css` |
| Shared diagram renderer and controls | `src/components/ProjectSystemFlow.tsx`, `src/project-system-flow.css` |
| Project graph content and routing | `src/project-system-flows.ts` |
| Secondary editor project data/copy | `src/data/projects.ts`, `src/editor/` |
| SEO, font loading, public URL | `index.html`, `public/sitemap.xml`, `public/robots.txt` |
| Lens map generation | `scripts/generate-crt-lens-map.py`, `public/crt-lens-map.png` |

## Implementation discipline

- Follow the CSS load order in `src/main.tsx`. `src/index.css` contains historical iterations; selectors for old channels/case studies are not proof those views are active. Check the rendered JSX before extending them.
- Prefer small, deliberate edits to the active layer. Do not broadly delete older CSS or redesign accepted sections during an unrelated change.
- Keep project claims grounded in the projects' actual behavior. Do not turn illustrative output or prompted citations into guarantees of correctness.
- Do not add a commercial font binary without a supplied asset and appropriate rights. CA Telecopy is currently a preferred CSS family with fallbacks, not a bundled font.
- Update all relevant contact copies when contact details change: public page, editor previews, and App command-palette clipboard action.
- Keep essential assets inside this repo. Do not depend on the owner's Downloads folder, temporary screenshots, neighboring repositories, or absolute local paths at runtime.
- Keep documentation synchronized when behavior, tokens, data ownership, commands, or deployment changes.

## Commands and releases

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The build includes TypeScript checking. No automated test suite or lint script is configured; do not report tests passing when only a build ran. Respect the user's requested verification scope.

Never commit `node_modules/`, `dist/`, credentials, `.env` secrets, CLI auth files, or machine-specific deployment links. Do not force-push. Publishing and Git pushes require user authorization; once authorized, follow [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) and verify the exact released commit rather than assuming a push means the site is live.
