import { Card, CardContent, Stack, Typography } from '@mui/material'

type StatCardProps = {
  label: string
  value: string | number
  helper?: string
}

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h4">{value}</Typography>
          {helper ? (
            <Typography variant="caption" color="text.secondary">
              {helper}
            </Typography>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  )
}
