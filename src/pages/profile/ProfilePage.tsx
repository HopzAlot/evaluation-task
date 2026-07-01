import { Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
import { PageHeader } from '../../components/ui/PageHeader'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'

export function ProfilePage() {
  const { user } = useAuth()

  return (
    <>
      <PageHeader
        title="Profile"
        description="Read-only account information."
        breadcrumbs={[
          { label: 'Dashboard', path: ROUTES.DASHBOARD },
          { label: 'Profile' },
        ]}
      />

      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="h6">{user?.name}</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="h6">{user?.email}</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack spacing={0.5} sx={{ alignItems: 'flex-start' }}>
                <Typography variant="caption" color="text.secondary">
                  Role
                </Typography>
                <Chip label={user?.role} color="primary" />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
