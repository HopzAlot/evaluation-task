import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { PageHeader } from '../../components/ui/PageHeader'
import { ReviewStatusChip } from '../../components/projects/ReviewStatusChip'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'

export function ProjectDetailPage() {
  const navigate = useNavigate()
  const { projectId } = useParams()
  const { user } = useAuth()
  const { projects, setReviewStatus } = useProjects()
  const project = projects.find((item) => item.id === projectId)

  if (!project) {
    return (
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5">Project not found</Typography>
            <Button variant="contained" onClick={() => navigate(ROUTES.PROJECTS)}>
              Back to projects
            </Button>
          </Stack>
        </CardContent>
      </Card>
    )
  }

  const canReview = user?.role === 'Admin'

  return (
    <>
      <PageHeader
        title={project.title}
        description="Project detail view."
        breadcrumbs={[
          { label: 'Dashboard', path: ROUTES.DASHBOARD },
          { label: 'Projects', path: ROUTES.PROJECTS },
          { label: project.title },
        ]}
        action={<ReviewStatusChip status={project.reviewStatus} />}
      />

      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              {[
                ['Category', project.category],
                ['Progress', project.progressStatus],
                ['Submitted by', project.ownerName],
                ['Email', project.ownerEmail],
                ['Start date', project.startDate],
                ['End date', project.endDate],
              ].map(([label, value]) => (
                <Grid key={label} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
                </Grid>
              ))}
            </Grid>

            <Divider />

            <Stack spacing={1}>
              <Typography variant="h6">Description</Typography>
              <Typography color="text.secondary">{project.description}</Typography>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="h6">Tech stack</Typography>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ flexWrap: 'wrap' }}
              >
                {project.techStack.map((tech) => (
                  <Chip key={tech} label={tech} />
                ))}
              </Stack>
            </Stack>

            {project.link ? (
              <Button href={project.link} target="_blank" rel="noreferrer" variant="outlined">
                Open repo/demo
              </Button>
            ) : null}

            {canReview ? (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setReviewStatus(project.id, 'Approved')}
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setReviewStatus(project.id, 'Rejected')}
                >
                  Reject
                </Button>
              </Stack>
            ) : null}
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
