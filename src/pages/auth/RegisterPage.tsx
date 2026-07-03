import {
  Alert,
  Button,
  CircularProgress,
  Link,
  MenuItem,
  Stack,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthShell } from '../../components/ui/AuthShell'
import { FormSelectField } from '../../components/forms/FormSelectField'
import { FormTextField } from '../../components/forms/FormTextField'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import type { RegisterValues } from '../../types/auth'

const defaultValues: RegisterValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'User',
}

export function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [error, setError] = useState('')
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<RegisterValues>({
    defaultValues,
    mode: 'onBlur',
  })

  const password = watch('password')

  async function onSubmit(values: RegisterValues) {
    setError('')

    try {
      await register(values)
      navigate(ROUTES.SIGN_IN)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Could not create account.',
      )
    }
  }

  return (
    <AuthShell
      title="Create account"
      description="Register with a role so routing can show the correct project actions."
    >
      <Stack component="form" spacing={2} noValidate onSubmit={handleSubmit(onSubmit)}>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <FormTextField
          control={control}
          name="name"
          label="Full name"
          rules={{
            required: 'Full name is required',
            minLength: { value: 3, message: 'Name must be at least 3 characters' },
          }}
        />
        <FormTextField
          control={control}
          name="email"
          label="Email address"
          type="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          }}
        />
        <FormTextField
          control={control}
          name="password"
          label="Password"
          type="password"
          rules={{
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          }}
        />
        <FormTextField
          control={control}
          name="confirmPassword"
          label="Confirm password"
          type="password"
          rules={{
            required: 'Confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          }}
        />
        <FormSelectField
          control={control}
          name="role"
          label="Role"
          options={[]}
          rules={{ required: 'Role is required' }}
        >
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </FormSelectField>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? <CircularProgress color="inherit" size={18} /> : null
          }
        >
          {isSubmitting ? 'Creating account...' : 'Sign up'}
        </Button>
        <Link component={RouterLink} to={ROUTES.SIGN_IN} sx={{ textAlign: 'center' }}>
          Already have an account? Sign in
        </Link>
      </Stack>
    </AuthShell>
  )
}
