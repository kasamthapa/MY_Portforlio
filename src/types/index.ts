export interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  live: string
  github: string
}

export type SectionId = 'hero' | 'projects' | 'stack' | 'now' | 'contact'
