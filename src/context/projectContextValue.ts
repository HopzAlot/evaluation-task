import { createContext } from 'react'
import type { AppUser } from '../types/auth'
import type {
  Project,
  ProjectFormValues,
  ProjectReviewStatus,
} from '../types/project'

export type ProjectContextValue = {
  projects: Project[]
  addProject: (values: ProjectFormValues, user: AppUser) => Project
  setReviewStatus: (id: string, status: ProjectReviewStatus) => void
}

export const ProjectContext = createContext<ProjectContextValue | null>(null)
