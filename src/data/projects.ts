import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'critch',
    title: 'critch',
    description:
      'A peer review platform for developers. Post a project, get structured feedback on code quality, UI, idea, and documentation. Built from scratch — every line written and understood.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Cloudinary'],
    live: 'https://critch-neon.vercel.app',
    github: 'https://github.com/kasamthapa/critch',
  },
  {
    id: 'codebrain',
    title: 'codebrain',
    description:
      'Point it at any GitHub repo and ask questions about the code. RAG pipeline built from scratch — no LangChain. AST chunking, Gemini embeddings, pgvector similarity search, SSE streaming.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'pgvector', 'Gemini API', 'RAG'],
    live: 'https://codebrain-gamma.vercel.app',
    github: 'https://github.com/kasamthapa/codebrain',
  },
]
