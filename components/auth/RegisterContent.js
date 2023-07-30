import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import classes from './auth.module.css'
import CircularProgress from '@mui/material/CircularProgress'

function RegisterContent(props) {
  const { submitHandler, handleRoleChange, selectedRole, loading } = props

  return (
    <Box className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant='h5' sx={{ mb: 2 }}>
          Register
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            label='Username'
            variant='outlined'
            margin='normal'
            fullWidth
            name='username'
          />
          <TextField
            label='Password'
            variant='outlined'
            margin='normal'
            type='password'
            fullWidth
            name='password'
          />
          <TextField
            label='Name'
            variant='outlined'
            margin='normal'
            fullWidth
            name='name'
          />
          <RadioGroup
            name='role'
            value={selectedRole}
            onChange={handleRoleChange}
            sx={{ mt: 1 }}
          >
            <FormControlLabel
              value='librarian'
              control={<Radio />}
              label='Librarian'
            />
            <FormControlLabel value='admin' control={<Radio />} label='Admin' />
            <FormControlLabel
              value='ict'
              control={<Radio />}
              label='ICT Admin'
            />
          </RadioGroup>
          <Button
            variant='contained'
            type='submit'
            color='primary'
            sx={{ mt: 2 }}
          >
            {loading ? (
              <>
                <CircularProgress size={10} color='inherit' />
                <span style={{ marginLeft: '5px' }}>Register...</span>
              </>
            ) : (
              'Register'
            )}
          </Button>
        </form>
        <Link href='/auth/login' passHref>
          <Button variant='text' color='primary' sx={{ mt: 2 }}>
            Already have an account? Login
          </Button>
        </Link>
      </Paper>
    </Box>
  )
}

export default RegisterContent
