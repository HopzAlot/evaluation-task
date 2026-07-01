import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'

type AuthShellProps = {
  title: string
  description: string
  children: ReactNode
}

export function AuthShell({ title, description, children }: AuthShellProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        p: 2,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 460 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Stack spacing={0.75}>
              <Typography variant="h4">Project Showcase</Typography>
              <Typography variant="h5">{title}</Typography>
              <Typography color="text.secondary">{description}</Typography>
            </Stack>
            {children}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
