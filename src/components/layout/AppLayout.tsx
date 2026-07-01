import { NavLink, Outlet } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FolderIcon from '@mui/icons-material/Folder'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'

const DRAWER_WIDTH = 260

const navItems = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: <DashboardIcon /> },
  { label: 'Projects', path: ROUTES.PROJECTS, icon: <FolderIcon /> },
  { label: 'Profile', path: ROUTES.PROFILE, icon: <PersonIcon /> },
]

export function AppLayout() {
  const { user, logout } = useAuth()

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 72 }}>
          <Box>
            <Typography variant="overline" color="text.secondary">
              Mid Internship Evaluation
            </Typography>
            <Typography variant="h6">Project Showcase App</Typography>
          </Box>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Chip label={user?.role} color="primary" size="small" />
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              {user?.name?.[0]?.toUpperCase()}
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {user?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={logout}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            p: 2,
          },
        }}
      >
        <Stack spacing={0.75} sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ color: 'common.white' }}>
            Showcase
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey.400' }}>
            Submit, review, and track projects.
          </Typography>
        </Stack>

        <List sx={{ display: 'grid', gap: 0.75 }}>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  color: 'grey.300',
                  '&:hover': { bgcolor: 'action.hover' },
                  '&.active': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                }}
              >
                {item.icon}
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { fontWeight: 700 } } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, px: { xs: 2, md: 4 }, py: 4, mt: 9 }}
      >
        <Box sx={{ maxWidth: 1180, mx: 'auto' }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: { xs: 'flex', md: 'none' },
              overflowX: 'auto',
              pb: 2,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                variant="outlined"
                size="small"
                startIcon={item.icon}
                sx={{
                  flexShrink: 0,
                  '&.active': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    borderColor: 'primary.main',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
