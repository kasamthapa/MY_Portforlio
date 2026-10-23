import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'codebrain',
    title: 'codebrain',
    tagline: 'Ask a GitHub codebase a question. Get an answer grounded in the actual code, with file and line citations.',
    problem:
      'Getting dropped into an unfamiliar codebase with no idea where to start is one of the most common, most tedious parts of being a developer. CodeBrain automates the tracing-through-code part: ask a question, get an answer with file and line citations.',
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
  {
    id: 'sikshyanepal',
    title: 'SikshyaNepal',
    tagline: 'A practical guide to colleges, admissions, campus news, and student resources across Nepal.',
    problem:
      'Students and families often have to piece together education information from scattered college websites and notices. SikshyaNepal brings useful discovery and guidance into one place, while linking back to original sources for decisions that need current, official details.',
    decisions: [
      'Organize around the student’s task: discover colleges and programs, understand admissions, then follow campus updates.',
      'Keep official-source links visible so students can verify changing dates, fees, and requirements at the institution.',
      'Pair short, practical explanations with current notices so research and next steps live together.',
    ],
    limitation:
      'Admission requirements and deadlines can change. SikshyaNepal points students to official sources for final confirmation.',
    stack: ['Education discovery', 'College research', 'Admissions', 'Student guides'],
    live: 'https://shikshaxnepal.com',
  },
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
]
