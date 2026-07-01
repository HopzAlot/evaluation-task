import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import type { FieldPath } from 'react-hook-form'
import { FormDateField } from '../../components/forms/FormDateField'
import { FormMultiSelectField } from '../../components/forms/FormMultiSelectField'
import { FormSelectField } from '../../components/forms/FormSelectField'
import { FormTextField } from '../../components/forms/FormTextField'
import { PageHeader } from '../../components/ui/PageHeader'
import {
  progressStatuses,
  projectCategories,
  techStackByCategory,
} from '../../constants/projects'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import type { ProjectFormValues } from '../../types/project'

const steps = ['Project basics', 'Tech and status', 'Review']

const defaultValues: ProjectFormValues = {
  category: '',
  title: '',
  description: '',
  techStack: [],
  otherTechStack: '',
  progressStatus: '',
  startDate: '',
  endDate: '',
  link: '',
}

export function ProjectFormPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addProject } = useProjects()
  const [activeStep, setActiveStep] = useState(0)
  const { control, handleSubmit, trigger, watch } = useForm<ProjectFormValues>({
    defaultValues,
    mode: 'onBlur',
  })

  const category = watch('category')
  const reviewValues = watch()
  const techOptions = category ? techStackByCategory[category] : []

  async function goNext() {
    const stepTwoFields: FieldPath<ProjectFormValues>[] =
      category === 'Other'
        ? ['otherTechStack', 'progressStatus', 'startDate', 'endDate', 'link']
        : ['techStack', 'progressStatus', 'startDate', 'endDate', 'link']

    const valid =
      activeStep === 0
        ? await trigger(['category', 'title', 'description'])
        : await trigger(stepTwoFields)

    if (valid) {
      setActiveStep((step) => step + 1)
    }
  }

  function goBack() {
    setActiveStep((step) => step - 1)
  }

  function onSubmit(values: ProjectFormValues) {
    if (!user) {
      return
    }

    const project = addProject(values, user)
    navigate(`/projects/${project.id}`)
  }

  if (user?.role === 'Admin') {
    return (
      <Alert severity="info">
        Admins review submitted projects and do not create new projects.
      </Alert>
    )
  }

  return (
    <>
      <PageHeader
        title="Add project"
        description="Submit your project in three small steps."
        breadcrumbs={[
          { label: 'Dashboard', path: ROUTES.DASHBOARD },
          { label: 'Projects', path: ROUTES.PROJECTS },
          { label: 'Add' },
        ]}
      />

      <Card>
        <CardContent>
          <Stack component="form" spacing={3} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 ? (
              <Stack spacing={2}>
                <FormSelectField
                  control={control}
                  name="category"
                  label="Category"
                  options={projectCategories}
                  rules={{ required: 'Category is required' }}
                />
                <FormTextField
                  control={control}
                  name="title"
                  label="Project title"
                  rules={{
                    required: 'Project title is required',
                    minLength: { value: 3, message: 'Title must be at least 3 characters' },
                  }}
                />
                <FormTextField
                  control={control}
                  name="description"
                  label="Short description"
                  multiline
                  minRows={3}
                  rules={{
                    required: 'Short description is required',
                    maxLength: { value: 220, message: 'Keep it under 220 characters' },
                  }}
                />
              </Stack>
            ) : null}

            {activeStep === 1 ? (
              <Stack spacing={2}>
                {category === 'Other' ? (
                  <FormTextField
                    control={control}
                    name="otherTechStack"
                    label="Other tech stack"
                    placeholder="Example: WordPress, Canva, Excel"
                    helperText="Because you selected Other, write the tools manually."
                    rules={{
                      required: 'Write the tech stack for Other category',
                      minLength: {
                        value: 2,
                        message: 'Tech stack must be at least 2 characters',
                      },
                    }}
                  />
                ) : (
                  <FormMultiSelectField
                    control={control}
                    name="techStack"
                    label="Tech stack"
                    options={techOptions}
                    rules={{
                      validate: (value) =>
                        value.length > 0 || 'Select at least one technology',
                    }}
                  />
                )}
                <FormSelectField
                  control={control}
                  name="progressStatus"
                  label="Project status"
                  options={progressStatuses}
                  rules={{ required: 'Project status is required' }}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <FormDateField
                    control={control}
                    name="startDate"
                    label="Start date"
                    rules={{ required: 'Start date is required' }}
                  />
                  <FormDateField
                    control={control}
                    name="endDate"
                    label="End date"
                    rules={{
                      required: 'End date is required',
                      validate: (value) =>
                        !reviewValues.startDate ||
                        value >= reviewValues.startDate ||
                        'End date cannot be before start date',
                    }}
                  />
                </Stack>
                <FormTextField
                  control={control}
                  name="link"
                  label="Repo or demo link"
                  placeholder="https://github.com/..."
                  rules={{
                    pattern: {
                      value: /^$|^https?:\/\/.+/,
                      message: 'Link must start with http:// or https://',
                    },
                  }}
                />
              </Stack>
            ) : null}

            {activeStep === 2 ? (
              <Stack spacing={2}>
                <Typography variant="h6">Review summary</Typography>
                <Divider />
                {[
                  ['Category', reviewValues.category],
                  ['Title', reviewValues.title],
                  ['Description', reviewValues.description],
                  [
                    'Tech stack',
                    reviewValues.category === 'Other'
                      ? reviewValues.otherTechStack
                      : reviewValues.techStack.join(', '),
                  ],
                  ['Project status', reviewValues.progressStatus],
                  ['Start date', reviewValues.startDate],
                  ['End date', reviewValues.endDate],
                  ['Link', reviewValues.link || 'Not provided'],
                ].map(([label, value]) => (
                  <Box key={label}>
                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
                  </Box>
                ))}
              </Stack>
            ) : null}

            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Button disabled={activeStep === 0} onClick={goBack}>
                Back
              </Button>
              {activeStep < steps.length - 1 ? (
                <Button variant="contained" onClick={goNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" variant="contained">
                  Submit project
                </Button>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
