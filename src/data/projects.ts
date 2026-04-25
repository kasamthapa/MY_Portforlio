import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'school-website',
    title: 'School Website',
    tagline: 'A real institution needed a real web presence.',
    story:
      "A local school had nothing online — no pages, no info, no way for parents to find them. I built it from scratch: routing, responsive layout, content structure. The kind of project that makes you realize how much a simple website actually matters to people who need it.",
    tech: ['React', 'TypeScript', 'Vite', 'CSS'],
    url: 'https://school-app-frontend-weld.vercel.app/',
    aiNote:
      'Used AI to speed up some boilerplate. Wrote the architecture, component design, and deployment myself.',
    year: '2024',
    status: 'live',
  },
  {
    id: 'client-portfolio',
    title: 'Portfolio for a Client',
    tagline: "Translating someone else's identity into pixels.",
    story:
      "The hard part wasn't the code — it was listening. Understanding what a person wants their online presence to say, then building something that actually says it. Clean, fast, minimal. Exactly how they wanted to be seen.",
    tech: ['React', 'JavaScript', 'CSS'],
    url: 'https://portfolio-dhurbasir-2.vercel.app/',
    aiNote: 'Collaborated with AI for layout suggestions. Final design decisions and code were mine.',
    year: '2024',
    status: 'live',
  },
]
