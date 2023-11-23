import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react'

import classes from './main.module.css'
import CircularProgress from '@mui/material/CircularProgress'

function CompetitionModal(props) {
  const { submitHandler, loading, onClose, onChange } = props
  const [state, setState] = useState({
    libraryName: '',
    password: '',
  })

  function handleChenge(event) {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  function clickHandler() {
    const { libraryName, password } = state
    submitHandler({ libraryName, password })
  }

  return (
    <Box className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Create Library
        </Typography>
        <TextField
          label="Library Name"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={onChange}
          name="libraryName"
          value={libraryInfo.libraryName}
        />
        <TextField
          label="State"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={onChange}
          name="state"
          value={libraryInfo.state}
        />
        <TextField
          label="City"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={onChange}
          name="city"
          value={libraryInfo.city}
        />

        <TextField
          label="Street"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={onChange}
          name="street"
          value={libraryInfo.street}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={clickHandler}
        >
          {loading ? (
            <>
              <CircularProgress size={10} color="inherit" />
              <span style={{ marginLeft: '5px' }}>Creating...</span>
            </>
          ) : (
            'Create Library'
          )}
        </Button>
        <Button variant="text" color="primary" sx={{ mt: 2 }} onClick={onClose}>
          Close
        </Button>
      </Paper>
    </Box>
  )
}

export default CompetitionModal
