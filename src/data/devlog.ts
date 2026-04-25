import type { LogEntry } from '../types'

export const devlog: LogEntry[] = [
  {
    id: '1',
    date: 'today',
    mood: '🛠️',
    content: 'Building this portfolio felt more vulnerable than shipping any production code. Strange.',
    tag: 'meta',
  },
  {
    id: '2',
    date: '3 days ago',
    mood: '😅',
    content: 'Still not sure why that regex I wrote works. It does though. Leaving it alone.',
    tag: 'dev',
  },
  {
    id: '3',
    date: '1 week ago',
    mood: '💡',
    content: 'MongoDB aggregation pipelines finally clicked. Felt like learning a new language inside a language.',
    tag: 'learning',
  },
  {
    id: '4',
    date: '2 weeks ago',
    mood: '🎉',
    content: 'Shipped the school website. The principal said "it\'s nice." Peak validation, honestly.',
    tag: 'shipped',
  },
  {
    id: '5',
    date: '1 month ago',
    mood: '🔷',
    content: "TypeScript strict mode is annoying until it saves you from a bug at 11pm. Then it's your best friend.",
    tag: 'dev',
  },
  {
    id: '6',
    date: '2 months ago',
    mood: '🌱',
    content: 'Started learning PostgreSQL properly. Not just copy-pasting queries anymore.',
    tag: 'learning',
  },
]
