import type { StackItem } from '../types'

export const stack: StackItem[] = [
  { name: 'React', icon: '⚛️', category: 'frontend', note: 'My main UI tool' },
  { name: 'TypeScript', icon: '🔷', category: 'frontend', note: 'Strict mode always on' },
  { name: 'Vite', icon: '⚡', category: 'tools', note: 'Builds in milliseconds' },
  { name: 'CSS', icon: '🎨', category: 'frontend', note: 'Still hand-rolling styles' },
  { name: 'Node.js', icon: '🟢', category: 'backend', note: 'JS all the way down' },
  { name: 'Express', icon: '🚂', category: 'backend', note: 'Minimal, gets out of the way' },
  { name: 'PostgreSQL', icon: '🐘', category: 'database', note: 'Relational when it matters' },
  { name: 'MongoDB', icon: '🍃', category: 'database', note: 'Flexible for fast prototyping' },
  { name: 'Git', icon: '🌿', category: 'tools', note: 'Commit early, commit often' },
  { name: 'VS Code', icon: '🧩', category: 'tools', note: 'Home base' },
]

export const categories = ['frontend', 'backend', 'database', 'tools'] as const
