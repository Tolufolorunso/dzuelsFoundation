import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

import MainContent from '@/components/dashboard/MainContent'
import DashboardDrawer from '@/components/dashboard/Drawer'
import DashboardAppBar from '@/components/dashboard/AppBar'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: '80%',
    width: '100%',
    margin: '0 auto',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      // marginLeft: 0,
    }),
  })
)

export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        background: 'white',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <DashboardAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <DashboardDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <MainContent />
      </Main>
    </Box>
  )
}
