import { Breadcrumbs, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

type PageHeaderProps = {
  title: string
  description?: string
  breadcrumbs: { label: string; path?: string }[]
  action?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  action,
}: PageHeaderProps) {
  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <Breadcrumbs>
        {breadcrumbs.map((item) =>
          item.path ? (
            <Typography
              key={item.label}
              component={RouterLink}
              to={item.path}
              color="primary"
              variant="body2"
            >
              {item.label}
            </Typography>
          ) : (
            <Typography key={item.label} variant="body2" color="text.secondary">
              {item.label}
            </Typography>
          ),
        )}
      </Breadcrumbs>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
        }}
      >
        <Stack spacing={0.5}>
          <Typography variant="h4">{title}</Typography>
          {description ? (
            <Typography color="text.secondary">{description}</Typography>
          ) : null}
        </Stack>
        {action}
      </Stack>
    </Stack>
  )
}
