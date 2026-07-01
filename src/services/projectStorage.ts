import type { AppUser } from '../types/auth'
import type {
  Project,
  ProjectFormValues,
  ProjectReviewStatus,
} from '../types/project'

const STORAGE_KEY = 'evaluation-projects'

const starterProjects: Project[] = [
  {
    id: 'project-1',
    ownerId: 'demo-user',
    ownerName: 'Demo User',
    ownerEmail: 'demo.user@example.com',
    category: 'Web Development',
    title: 'Portfolio Builder',
    description: 'A responsive portfolio app for junior developers.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    progressStatus: 'Completed',
    reviewStatus: 'Approved',
    startDate: '2026-06-01',
    endDate: '2026-06-20',
    link: 'https://example.com',
    createdAt: '2026-06-20T10:00:00.000Z',
  },
  {
    id: 'project-2',
    ownerId: 'demo-admin',
    ownerName: 'Demo Admin',
    ownerEmail: 'demo.admin@example.com',
    category: 'Data Science',
    title: 'Student Result Predictor',
    description: 'A simple model dashboard for academic performance trends.',
    techStack: ['Python', 'Pandas', 'Scikit-learn'],
    progressStatus: 'In progress',
    reviewStatus: 'Pending',
    startDate: '2026-06-12',
    endDate: '2026-07-02',
    createdAt: '2026-06-25T10:00:00.000Z',
  },
]

export function readProjects(): Project[] {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(starterProjects))
    return starterProjects
  }

  return JSON.parse(stored) as Project[]
}

export function writeProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export function createProject(values: ProjectFormValues, user: AppUser): Project {
  return {
    id: crypto.randomUUID(),
    ownerId: user.uid,
    ownerName: user.name,
    ownerEmail: user.email,
    category: values.category || 'Other',
    title: values.title,
    description: values.description,
    techStack:
      values.category === 'Other' ? [values.otherTechStack] : values.techStack,
    otherTechStack: values.category === 'Other' ? values.otherTechStack : undefined,
    progressStatus: values.progressStatus || 'In progress',
    reviewStatus: 'Pending',
    startDate: values.startDate,
    endDate: values.endDate,
    link: values.link || undefined,
    createdAt: new Date().toISOString(),
  }
}

export function updateProjectReviewStatus(
  projects: Project[],
  id: string,
  reviewStatus: ProjectReviewStatus,
) {
  return projects.map((project) =>
    project.id === id ? { ...project, reviewStatus } : project,
  )
}
