import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import { FormTextField } from '../../components/forms/FormTextField'
import { PageHeader } from '../../components/ui/PageHeader'
import { ReviewStatusChip } from '../../components/projects/ReviewStatusChip'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import type { Project } from '../../types/project'
import { useForm } from 'react-hook-form'

type SearchValues = {
  search: string
}

export function ProjectsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { projects, setReviewStatus } = useProjects()
  const { control, watch } = useForm<SearchValues>({
    defaultValues: { search: '' },
  })
  const search = watch('search').toLowerCase()

  const visibleProjects = useMemo(() => {
    return projects
      .filter((project) => user?.role === 'Admin' || project.ownerId === user?.uid)
      .filter((project) => project.title.toLowerCase().includes(search))
  }, [projects, search, user])

  const columns: GridColDef<Project>[] = [
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 180 },
    { field: 'category', headerName: 'Category', flex: 1, minWidth: 150 },
    { field: 'ownerName', headerName: 'Submitted by', flex: 1, minWidth: 150 },
    { field: 'progressStatus', headerName: 'Progress', flex: 1, minWidth: 130 },
    {
      field: 'reviewStatus',
      headerName: 'Review',
      minWidth: 130,
      renderCell: (params) => <ReviewStatusChip status={params.row.reviewStatus} />,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: user?.role === 'Admin' ? 260 : 120,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={() => navigate(`/projects/${params.row.id}`)}
          >
            View
          </Button>
          {user?.role === 'Admin' ? (
            <>
              <Button
                size="small"
                color="success"
                startIcon={<CheckIcon />}
                onClick={() => setReviewStatus(params.row.id, 'Approved')}
              >
                Approve
              </Button>
              <Button
                size="small"
                color="error"
                startIcon={<CloseIcon />}
                onClick={() => setReviewStatus(params.row.id, 'Rejected')}
              >
                Reject
              </Button>
            </>
          ) : null}
        </Stack>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Projects"
        description={
          user?.role === 'Admin'
            ? 'Review all submitted projects.'
            : 'Track your own submitted projects.'
        }
        breadcrumbs={[
          { label: 'Dashboard', path: ROUTES.DASHBOARD },
          { label: 'Projects' },
        ]}
        action={
          user?.role === 'User' ? (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate(ROUTES.NEW_PROJECT)}
            >
              Add project
            </Button>
          ) : null
        }
      />

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <FormTextField
              control={control}
              name="search"
              label="Search by title"
              placeholder="Search projects"
            />
            <DataGrid
              autoHeight
              rows={visibleProjects}
              columns={columns}
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              disableRowSelectionOnClick
            />
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
