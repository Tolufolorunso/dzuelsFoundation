import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'

function CirculationUserInfo(props) {
  const { patronData } = props
  const fullName = patronData
    ? `${patronData.surname}, ${patronData.firstname} ${patronData.middlename}`
    : ''
  const barcode = patronData ? `${patronData.barcode}` : ''
  const phoneNumber = patronData ? `${patronData.phoneNumber}` : ''
  const email = patronData ? `${patronData.email}` : ''
  const library = patronData ? `${patronData.library}` : ''
  const address = patronData
    ? `${patronData.address?.street},\n${patronData.address?.city}${patronData.address?.state},\n${patronData.address?.country}`
    : ''

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem>
            <div>
              <h1>{fullName}</h1>
              <p>({barcode})</p>
            </div>
          </ListItem>
          <ListItem>
            <address>
              <pre>{address}</pre>
            </address>
          </ListItem>
          <ListItem>
            <pre>{phoneNumber}</pre>
          </ListItem>
          <ListItem>
            <pre>{email}</pre>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem>
            <div>
              <p>
                <strong>Library</strong>: {library}
              </p>
            </div>
          </ListItem>
        </List>
      </nav>
    </Box>
  )
}

export default CirculationUserInfo
