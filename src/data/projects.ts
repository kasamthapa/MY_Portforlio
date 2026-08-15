import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'critch',
    title: 'critch',
    tagline: 'A peer review platform for developers — post a project, get structured feedback instead of casual compliments.',
    problem:
      "Developers rarely get real feedback on side projects, just surface-level praise. Critch forces a structured review — code quality, UI, idea, and docs — capped at one review per person, so the resulting reputation score actually means something.",
    decisions: [
      'Four separate rating categories instead of one star score, so feedback is specific enough to act on, not just a number.',
      'JWT auth with refresh tokens, and the cross-origin cookie constraints that come with running that in a demo deployment.',
      'Nested threaded comments so a review can turn into an actual conversation, not a one-shot rating.',
    ],
    limitation:
      'Refresh tokens hit browser cross-origin cookie restrictions on the demo deploy — without a shared custom domain, sessions expire every 15 minutes. Documented, not hidden.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Cloudinary'],
    live: 'https://critch-neon.vercel.app',
    github: 'https://github.com/kasamthapa/critch',
  },
  {
    id: 'codebrain',
    title: 'codebrain',
    tagline: 'Point it at a GitHub repo, ask a question, get an answer grounded in the actual code — RAG built from scratch, no LangChain.',
    problem:
      "Getting dropped into an unfamiliar codebase with no idea where to start is one of the most common, most tedious parts of being a developer. CodeBrain automates the tracing-through-code part: ask a question, get an answer with file and line citations.",
    decisions: [
      'AST-based chunking via @typescript-eslint/parser instead of naive line-splitting — chunks are whole functions, classes, and imports, not arbitrary text blocks.',
      'pgvector inside the existing Postgres instance instead of a dedicated vector database — one less piece of infrastructure to run and pay for.',
      'Chunks that exceed the context window are logged and skipped, not silently truncated — a visible gap beats a wrong answer built on cut-off context.',
    ],
    limitation:
      'TypeScript/JavaScript parsing only for now — Python, Go, and Rust support are next, along with real vector-based conversation memory instead of a sliding window.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'pgvector', 'Gemini API', 'RAG'],
    live: 'https://codebrain-gamma.vercel.app',
    github: 'https://github.com/kasamthapa/codebrain',
  },
]
