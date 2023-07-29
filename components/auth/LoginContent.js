import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react'

import classes from './auth.module.css'

function LoginContent(props) {
  const { submitHandler } = props
  const [state, setState] = useState({
    username: '',
    password: '',
  })

  function handleChenge(event) {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  function clickHandler() {
    const { username, password } = state
    submitHandler({ username, password })
  }

  return (
    <Box className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant='h5' sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField
          label='Username'
          variant='outlined'
          margin='normal'
          fullWidth
          onChange={handleChenge}
          name='username'
        />
        <TextField
          label='Password'
          variant='outlined'
          margin='normal'
          type='password'
          fullWidth
          onChange={handleChenge}
          name='password'
        />
        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
          onClick={clickHandler}
        >
          Login
        </Button>
        <Link href='/auth/register' passHref>
          <Button variant='text' color='primary' sx={{ mt: 2 }}>
            Register instead?
          </Button>
        </Link>
      </Paper>
    </Box>
  )
}

export default LoginContent
