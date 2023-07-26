import CustomHeader from '../typography/custom-header'
import classes from './aside.module.css'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import React, { useEffect } from 'react'

function Aside() {
  function handleChange(event) {
    console.log(event.target.value)
  }

  return (
    <aside className={classes.aside}>
      <CustomHeader level={3} text='Search for Patron' />

      <Box sx={{ m: 1, width: '300px' }}>
        <Typography />
        <TextField
          hiddenLabel={false}
          fullWidth
          label='fullWidth'
          id='rty'
          autoFocus
          placeholder='search name...'
          onChange={handleChange}
        />
      </Box>
    </aside>
  )
}

export default Aside
