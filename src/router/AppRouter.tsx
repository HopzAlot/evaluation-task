import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { CircularProgress, Box } from '@mui/material'
import { AppLayout } from '../components/layout/AppLayout'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { ProjectDetailPage } from '../pages/projects/ProjectDetailPage'
import { ProjectFormPage } from '../pages/projects/ProjectFormPage'
import { ProjectsPage } from '../pages/projects/ProjectsPage'
import { ProfilePage } from '../pages/profile/ProfilePage'
import { RegisterPage } from '../pages/auth/RegisterPage'

function ProtectedRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return user ? <AppLayout /> : <Navigate to={ROUTES.SIGN_IN} replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, registering } = useAuth()

  if (loading) {
    return null
  }

  return user && !registering ? <Navigate to={ROUTES.DASHBOARD} replace /> : children
}

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path={ROUTES.SIGN_IN}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.SIGN_UP}
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route element={<ProtectedRoutes />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
          <Route path={ROUTES.NEW_PROJECT} element={<ProjectFormPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </Router>
  )
}
