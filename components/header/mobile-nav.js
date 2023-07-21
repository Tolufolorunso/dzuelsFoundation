import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const RightDrawer = ({ open, onClose }) => {
  const drawerWidth = 240

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        <ListItem button>
          <ListItemText primary='Item 1' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='Item 2' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='Item 3' />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default RightDrawer
