# Product and agent handoff

Last updated: **2026-10-24**. This describes the design accepted by the owner at the end of the CRT redesign. Later explicit requests can change these decisions.

## The portfolio's purpose

Introduce Kasam Thapa Magar as a software engineer in Kathmandu, explain the useful software he builds, and make it easy to explore his projects or contact him. The visual language references an old convex television and distressed home-video print, with readable contemporary explanations underneath the texture.

The public page has four navigation destinations: **HOME**, **WORK**, **ABOUT**, and **CONTACT**. The source/editor experience is secondary and is opened from the footer. Current projects are CodeBrain, SikshyaNepal, Critch, and Rapporteur.

## Decisions that matter most

### One screen, one scrolling picture

The screen should feel like viewing a picture through convex glass, with subtle central magnification and bowed edges. The user repeatedly rejected a flat rounded container, a device/phone bezel, and excessive space around the screen. Preserve the complete optics stack rather than increasing border radius.

The transparent HUD is stationary. The middle has its own scroll container so the HUD does not mask the content with a filled bar. Reflections and scanlines are decorative and must not intercept pointers.

### Palette and typography

The accepted palette is charcoal and warm light gold/off-white. Red was reduced at the owner's request. Text clarity matters more than a strong distortion or blur effect.

The user requested a CA Telecopy/CRT type feeling. CA Telecopy is named in CSS but its licensed files are not present. The current build loads fallbacks from Google Fonts. Do not claim the commercial font has been installed or silently substitute an unlicensed download.

### Portrait

The owner supplied his own portrait. The repository now includes usable JPEG assets; the runtime must not reference the original HEIC in Downloads. The public composition uses `public/kasam-portrait-vhs.jpg` with black-and-white contrast, scratches, ragged edges, a Home Video masthead, gold KASAM lettering, and VHS-style stamps. Labels for selected work and practice sit to either side on desktop.

### Projects: overview first, system detail below

The user explicitly wanted to retain horizontal scrolling cards. Their initial layout must be equal-size and evenly spaced, beginning at the leading edge with no empty half-screen before the first card. Floating left/right buttons were removed; drag, swipe, keyboard arrows, and project indicators remain.

Clicking a card flips it to a short descriptive brief. Clicking again restores its poster. The brief is not a second system diagram. A previous TV-channel overlay duplicated the explanation and was removed. Do not recreate it from leftover `.project-channel*` CSS.

The detailed showcases below the carousel use the shared connected graph renderer. The **HOW IT WORKS** action scrolls to the selected project's showcase. The user asked for directed connectors and meaningful system branches in this site's own theme, rather than disconnected illustrations. Preserve that distinction when revising the graphs.

### Contacts and clicking through the lens

The owner corrected the email to **kasamthapa89@gmail.com**. It is used in the page, editor previews, and clipboard command.

The convex SVG displacement affects painted pixels while HTML hit areas remain in their layout positions. This made the small social labels visually appear outside their click targets. Transparent, generous hit areas in `src/crt-hud.css` compensate for this. Do not remove the padding simply because the text looks small.

### Initial power-on

A fresh page load starts dark, then a warm phosphor dot stretches into a horizontal line. The center opens vertically into the page, with a short static/flicker settle. CSS lasts 1400 ms; App removes startup state at 1500 ms. It runs once per App load and is canceled when source mode opens. Reduced-motion users see the settled page immediately.

### GitHub activity extension

The owner requested a contribution calendar like the supplied reference, using his own GitHub activity. The implementation adds `kasamthapa`'s calendar after About and before Contact, within the existing charcoal/gold theme and middle scroller; the four HUD destinations stay unchanged. It shows the actual displayed-window total, active days, longest streak and best day. Saved real data renders immediately, then the public feed refreshes when needed; failures keep a dated fallback rather than inventing activity. The calendar supports a single keyboard exploration target and mobile horizontal scrolling. See [GitHub activity](GITHUB_ACTIVITY.md) before changing its source, dates or metrics.

## Current implementation boundaries

- This portfolio is a static client app, not a backend for the four showcased products.
- The editor mode retains its own content/data modules. Updating public project copy does not automatically update every editor preview.
- Several legacy CSS selectors remain from earlier iterations. They are not active feature specifications.
- The canonical source of the active lens map is `public/crt-lens-map.png` and its generator. `src/assets/crt-lens-map.png` is an older asset, not the file referenced by the current filters.
- No automated test or lint command is configured. `npm run build` performs TypeScript checking and creates the production bundle.
- The source-ground flow notes record behavior, not promises that generated answers or extracted conclusions are always correct.

## How to resume safely

1. Read `AGENTS.md` and the relevant design/architecture documents.
2. Inspect `git status` and the current rendered view. Avoid redoing accepted work based only on an earlier screenshot.
3. Find the active JSX and final CSS override before editing. Preserve the existing import order.
4. Make the requested change in the smallest appropriate surface. Update companion data/docs where needed.
5. Build or inspect as appropriate to the user's request. Be precise about what was actually checked.
6. If publishing is authorized, use the existing Git/Vercel connection and verify the resulting deployment. Do not create a replacement hosting project or change the domain casually.

See [Design system](DESIGN_SYSTEM.md), [Architecture](ARCHITECTURE.md), [Project flows](PROJECT_FLOWS.md), [GitHub activity](GITHUB_ACTIVITY.md), and [Deployment](DEPLOYMENT.md) for implementation detail.
