import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { PageHeader } from '../../components/ui/PageHeader'
import { StatCard } from '../../components/ui/StatCard'
import { ROUTES } from '../../constants/routes'
import { projectCategories } from '../../constants/projects'
import { useProjects } from '../../hooks/useProjects'

export function DashboardPage() {
  const { projects } = useProjects()
  const pending = projects.filter((project) => project.reviewStatus === 'Pending')
  const approved = projects.filter((project) => project.reviewStatus === 'Approved')
  const rejected = projects.filter((project) => project.reviewStatus === 'Rejected')
  const categoryCounts = projectCategories.map((category) => ({
    category,
    count: projects.filter((project) => project.category === category).length,
  }))
  const topCategory =
    [...categoryCounts].sort((a, b) => b.count - a.count)[0]?.category ?? 'None'
  const maxCategoryCount = Math.max(...categoryCounts.map((item) => item.count), 1)

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A quick overview of submitted projects and review status."
        breadcrumbs={[{ label: 'Dashboard', path: ROUTES.DASHBOARD }]}
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Total projects" value={projects.length} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Pending" value={pending.length} helper="Awaiting admin review" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Approved" value={approved.length} helper="Accepted submissions" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Top category" value={topCategory} helper={`${rejected.length} rejected`} />
        </Grid>
      </Grid>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Stack spacing={2.5}>
            <Typography variant="h6">Projects per category</Typography>
            <Stack spacing={1.75}>
              {categoryCounts.map((item) => (
                <Box key={item.category}>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', mb: 0.75 }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {item.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.count}
                    </Typography>
                  </Stack>
                  <Box sx={{ height: 10, bgcolor: 'primary.light', borderRadius: 999 }}>
                    <Box
                      sx={{
                        width: `${(item.count / maxCategoryCount) * 100}%`,
                        height: '100%',
                        bgcolor: 'primary.main',
                        borderRadius: 999,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
