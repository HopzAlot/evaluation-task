import { Chip } from '@mui/material'
import type { ProjectReviewStatus } from '../../types/project'

const colorByStatus = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'error',
} as const

type ReviewStatusChipProps = {
  status: ProjectReviewStatus
}

export function ReviewStatusChip({ status }: ReviewStatusChipProps) {
  return <Chip label={status} color={colorByStatus[status]} size="small" />
}
