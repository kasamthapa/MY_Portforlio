import type { ComponentType } from 'react'
import { HeroCode, HeroPreview } from './HeroFile'
import { ProjectsCode, ProjectsPreview } from './ProjectsFile'
import { StackCode, StackPreview } from './StackFile'
import { NowCode, NowPreview } from './NowFile'
import { ContactCode, ContactPreview } from './ContactFile'

export interface FileEntry {
  id: string
  name: string
  language: 'ts' | 'json'
  previewLabel: string
  Code: ComponentType
  Preview: ComponentType
}

export const FILES: FileEntry[] = [
  { id: 'profile', name: 'profile.ts', language: 'ts', previewLabel: 'Profile', Code: HeroCode, Preview: HeroPreview },
  { id: 'projects', name: 'projects.ts', language: 'ts', previewLabel: 'Projects', Code: ProjectsCode, Preview: ProjectsPreview },
  { id: 'stack', name: 'stack.json', language: 'json', previewLabel: 'Stack', Code: StackCode, Preview: StackPreview },
  { id: 'now', name: 'now.ts', language: 'ts', previewLabel: 'Now', Code: NowCode, Preview: NowPreview },
  { id: 'contact', name: 'contact.ts', language: 'ts', previewLabel: 'Contact', Code: ContactCode, Preview: ContactPreview },
]

export const DEFAULT_FILE_ID = 'profile'
