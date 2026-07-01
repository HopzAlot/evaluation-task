export type ProjectCategory =
  | 'Web Development'
  | 'Mobile App'
  | 'UI/UX Design'
  | 'Data Science'
  | 'Other'

export type ProjectProgressStatus = 'In progress' | 'Completed' | 'On hold'

export type ProjectReviewStatus = 'Pending' | 'Approved' | 'Rejected'

export type Project = {
  id: string
  ownerId: string
  ownerName: string
  ownerEmail: string
  category: ProjectCategory
  title: string
  description: string
  techStack: string[]
  otherTechStack?: string
  progressStatus: ProjectProgressStatus
  reviewStatus: ProjectReviewStatus
  startDate: string
  endDate: string
  link?: string
  createdAt: string
}

export type ProjectFormValues = {
  category: ProjectCategory | ''
  title: string
  description: string
  techStack: string[]
  otherTechStack: string
  progressStatus: ProjectProgressStatus | ''
  startDate: string
  endDate: string
  link: string
}
