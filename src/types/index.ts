export interface Project {
  id: string
  title: string
  tagline: string
  story: string
  tech: string[]
  url: string
  aiNote?: string
  year: string
  status: 'live' | 'wip' | 'archived'
}

export interface StackItem {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'database' | 'tools'
  note?: string
}

export interface LogEntry {
  id: string
  date: string
  mood: string
  content: string
  tag?: string
}

export type SectionId = 'hero' | 'story' | 'projects' | 'stack' | 'devlog' | 'connect'
