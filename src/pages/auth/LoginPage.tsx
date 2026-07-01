import { Alert, Button, Link, Stack } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthShell } from '../../components/ui/AuthShell'
import { FormTextField } from '../../components/forms/FormTextField'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import type { LoginValues } from '../../types/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const { control, handleSubmit } = useForm<LoginValues>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  })

  async function onSubmit(values: LoginValues) {
    setError('')

    try {
      await login(values)
      navigate(ROUTES.DASHBOARD)
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : 'Could not sign in.',
      )
    }
  }

  return (
    <AuthShell
      title="Sign in"
      description="Use Firebase authentication to access the protected dashboard."
    >
      <Stack component="form" spacing={2} noValidate onSubmit={handleSubmit(onSubmit)}>
        {error ? <Alert severity="error">{error}</Alert> : null}
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
          rules={{ required: 'Password is required' }}
        />
        <Button type="submit" variant="contained" size="large">
          Sign in
        </Button>
        <Link component={RouterLink} to={ROUTES.SIGN_UP} sx={{ textAlign: 'center' }}>
          New here? Create account
        </Link>
      </Stack>
    </AuthShell>
  )
}
