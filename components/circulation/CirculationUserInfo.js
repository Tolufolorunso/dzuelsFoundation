import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import CustomHeader from '../typography/custom-header'

function CirculationUserInfo(props) {
  const { patronData } = props
  const fullName = patronData
    ? `${patronData.surname}, ${patronData.firstname} ${patronData.middlename}`
    : ''
  const barcode = patronData ? `${patronData.barcode}` : ''

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label='main mailbox folders'>
        <List>
          <ListItem disablePadding>
            <CustomHeader level={2} text={fullName} />
            <p>{barcode}</p>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary='Drafts' />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label='secondary mailbox folders'>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary='Trash' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component='a' href='#simple-list'>
              <ListItemText primary='Spam' />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  )
}

export default CirculationUserInfo
