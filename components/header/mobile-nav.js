import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'

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
        <ListItem>
          <Link href='/'>Home</Link>
        </ListItem>
        <ListItem>
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
