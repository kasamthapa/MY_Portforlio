# Kasam Thapa Magar — portfolio

A React and TypeScript portfolio presented inside a single convex CRT screen. It introduces Kasam as a software engineer in Kathmandu, showcases four projects, and explains their systems through interactive connected diagrams. A secondary VS Code inspired view is available from **SOURCE: CODE VIEW**.

- Public URL: **https://www.kasamthapa.com.np/**
- Email: **kasamthapa89@gmail.com**
- Repository: [kasamthapa/MY_Portforlio](https://github.com/kasamthapa/MY_Portforlio)

## Start here

| Document | Purpose |
| --- | --- |
| [AGENTS.md](AGENTS.md) | First read for coding agents: working rules, accepted behavior, and change locations. |
| [Design system](docs/DESIGN_SYSTEM.md) | Theme, typography, CRT optics, assets, layout, motion, and interaction rules. |
| [Architecture](docs/ARCHITECTURE.md) | Application structure, rendering modes, state, source map, and change recipes. |
| [Project flows](docs/PROJECT_FLOWS.md) | What each project diagram means and which claims its implementation supports. |
| [GitHub activity](docs/GITHUB_ACTIVITY.md) | Real contribution data, calendar metrics, caching, fallback refresh, and keyboard behavior. |
| [Handoff](docs/HANDOFF.md) | Current accepted product decisions and important context from the redesign. |
| [Deployment](docs/DEPLOYMENT.md) | Build output, Git/Vercel release process, and production verification. |

## Local development

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite. It is normally `http://localhost:5173`; Vite can choose another port when that port is occupied. An existing development server can be reused.

```sh
npm run build
npm run preview
```

The build runs `tsc` followed by `vite build` and writes `dist/`. The preview command serves that output locally. There are no test or lint scripts configured. The current production build has been run successfully with Node.js 22.23.2; no Node version is pinned in the repository.

## Stack and layout

- React 18, TypeScript 5, Vite 5, GSAP 3.
- Tailwind supplies the editor view's utilities; the portfolio uses layered CSS.
- No backend, API keys, or runtime environment variables are required for this app.
- `src/App.tsx` selects portfolio/editor mode and owns the initial CRT power-on lifecycle.
- `src/components/PortfolioHome.tsx` owns the public page, navigation, project carousel, contact section, and lens filter definitions.
- `src/components/ProjectSystemFlow.tsx` renders diagrams configured in `src/project-system-flows.ts`.
- `src/components/GitHubActivity.tsx` displays the contribution calendar; `src/lib/githubActivity.ts` validates and loads its data, with a dated fallback in `src/data/github-activity.json`.
- `public/` contains the portrait, torn mask, lens map, favicon, and metadata assets.
- `scripts/generate-crt-lens-map.py` regenerates the active lens map using Python's standard library.

The stylesheet import order in `src/main.tsx` is significant. Read the design and architecture documents before changing screen geometry or consolidating CSS.

## Current experience

1. A brief CRT ignition plays on a fresh load, unless reduced motion is requested.
2. Transparent header/footer text remains fixed inside the glass; the middle scrolls.
3. Project cards form an evenly spaced horizontal filmstrip. Clicking a card flips it to a short brief; clicking again restores its artwork.
4. Detailed connected system flows sit below the cards. **HOW IT WORKS** scrolls to the selected project's flow.
5. Contact links use generous transparent hit areas to compensate for the painted displacement from the lens.
6. A gold GitHub contribution calendar follows About, before Contact, with activity totals and keyboard exploration. It starts with saved real data, then refreshes from a public contribution feed when the local cache is older than one hour.

Project destinations, external social profiles, Google Fonts, and the public GitHub contribution feed are external services. Their availability is independent of this static app. The activity calendar retains a dated saved calendar if the feed fails; see [GitHub activity](docs/GITHUB_ACTIVITY.md), including the snapshot refresh command. CA Telecopy is a preferred family in CSS but is not distributed with this repository; see the typography notes before changing font declarations.

## Publishing

The repository's `main` branch is connected to the existing Vercel project `my-portforlio`. A Git push and a successful deployment are separate events: check the Vercel status on the exact pushed commit, then confirm the public domain serves the new assets. See [Deployment](docs/DEPLOYMENT.md).
