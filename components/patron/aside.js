import CustomHeader from '../typography/custom-header'
import classes from './aside.module.css'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

function Aside() {
  return (
    <aside className={classes.aside}>
      <CustomHeader level={3} text='Search for Patron' />

      <Box sx={{ m: 1, width: '300px' }}>
        <Typography />
        <TextField hiddenLabel={false} fullWidth label='fullWidth' id='rty' />
      </Box>
    </aside>
  )
}

export default Aside
