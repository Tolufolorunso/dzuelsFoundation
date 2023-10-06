import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { useRouter } from 'next/router'
import useDashboardStore from '@/store/dashboardStore'

import classes from './dashboard.module.css'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // color: 'white',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}))

const drawerWidth = 240

const menu = [
  {
    label: 'Dashboard',
    name: 'base',
    icon: <InboxIcon />,
  },
  {
    label: 'Patrons',
    name: 'patronsList',
    icon: <InboxIcon />,
  },
  {
    label: 'Staffs',
    name: 'staff',
    icon: <InboxIcon />,
  },
]
function DashboardDrawer(props) {
  const theme = useTheme()
  const router = useRouter()
  const switchComponent = useDashboardStore((state) => state.switchComponent)
  const activeComponent = useDashboardStore(
    (state) => state.dashboardState.activeComponent
  )

  const { open, handleDrawerClose } = props

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        // display: 'flex',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          // backgroundColor: 'black',
          // color: 'white',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box>
          <h1>Dzuels</h1>
        </Box>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => router.push('/')}>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        {menu.map((m, index) => (
          <ListItem
            key={m.label}
            disablePadding
            onClick={() => switchComponent(m.name)}
            sx={{ fontSize: '40px' }}
          >
            <ListItemButton
              selected={m.name == activeComponent}
              disabled={m.name == activeComponent}
            >
              <ListItemIcon>{m.icon}</ListItemIcon>
              <ListItemText primary={m.label} style={{ fontSize: '40px' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <Box sx={{ flex: 1 }}></Box>
      <Box>
        <h1>Dzuels</h1>
      </Box>
    </Drawer>
  )
}

export default DashboardDrawer
