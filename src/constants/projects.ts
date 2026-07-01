import type { ProjectCategory, ProjectProgressStatus } from '../types/project'

export const projectCategories: ProjectCategory[] = [
  'Web Development',
  'Mobile App',
  'UI/UX Design',
  'Data Science',
  'Other',
]

export const progressStatuses: ProjectProgressStatus[] = [
  'In progress',
  'Completed',
  'On hold',
]

export const techStackByCategory: Record<ProjectCategory, string[]> = {
  'Web Development': [
    'React',
    'Next.js',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'Tailwind CSS',
    'TypeScript',
  ],
  'Mobile App': ['React Native', 'Flutter', 'Firebase', 'Expo', 'Android', 'iOS'],
  'UI/UX Design': ['Figma', 'Adobe XD', 'Sketch', 'Protopie', 'Framer'],
  'Data Science': [
    'Python',
    'R',
    'Pandas',
    'NumPy',
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'Jupyter',
  ],
  Other: [],
}
