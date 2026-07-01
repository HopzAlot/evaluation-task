import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  createProject,
  readProjects,
  updateProjectReviewStatus,
  writeProjects,
} from '../services/projectStorage'
import { ProjectContext } from './projectContextValue'
import type { AppUser } from '../types/auth'
import type {
  Project,
  ProjectFormValues,
  ProjectReviewStatus,
} from '../types/project'

type ProjectProviderProps = {
  children: ReactNode
}

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [projects, setProjects] = useState(readProjects)

  function save(nextProjects: Project[]) {
    setProjects(nextProjects)
    writeProjects(nextProjects)
  }

  function addProject(values: ProjectFormValues, user: AppUser) {
    const project = createProject(values, user)
    save([project, ...projects])
    return project
  }

  function setReviewStatus(id: string, status: ProjectReviewStatus) {
    save(updateProjectReviewStatus(projects, id, status))
  }

  return (
    <ProjectContext.Provider value={{ projects, addProject, setReviewStatus }}>
      {children}
    </ProjectContext.Provider>
  )
}
