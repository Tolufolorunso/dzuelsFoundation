import Link from 'next/link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import NotificationsIcon from '@mui/icons-material/Notifications'
import EventIcon from '@mui/icons-material/Event'

import classes from './Home.module.css'

function Home(props) {
  const { onClick, event, date, setDate, point, setPoint } = props

  return (
    <Box className={classes.container}>
      <Grid container sx={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Sidebar */}
        <Grid item xs={12} sm={4} sx={{ padding: 4 }}>
          <Box
            sx={{
              backgroundColor: '#e3e4e4',
              borderRadius: 4,
              padding: 2,
              marginBottom: 2,
            }}
          >
            <Typography variant='h6' gutterBottom>
              <NotificationsIcon sx={{ fontSize: 30 }} /> News &amp;
              Notifications
            </Typography>
            <ul style={{ listStyle: 'none' }}>
              <li>New books available</li>
              <li>New patron registered</li>
            </ul>
          </Box>
          <Box
            sx={{
              backgroundColor: '#e3e4e4',
              borderRadius: 4,
              padding: 2,
            }}
          >
            <Box
              sx={{
                marginBottom: 3,
              }}
            >
              <Typography variant='h3' gutterBottom>
                Latest Event
              </Typography>
              <Typography variant='h6' gutterBottom>
                <EventIcon sx={{ fontSize: 30 }} />
                Event: {event.eventTitle}
              </Typography>
              <Typography variant='p' gutterBottom>
                {event.eventDescription}
              </Typography>
            </Box>
            <TextField
              type='date'
              fullWidth
              sx={{ mb: 2 }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              label='Point for the event'
              fullWidth
              type='number'
              id='point'
              name='point'
              value={point}
              onChange={(e) => setPoint(e.target.value)}
              sx={{ mb: 2 }}
              autoComplete='off'
            />
            <Button variant='contained' color='primary' onClick={onClick}>
              Mark attendance
            </Button>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} sm={8} sx={{ padding: 4 }}>
          <Box sx={{ backgroundColor: '#ffffff', borderRadius: 4, padding: 4 }}>
            <Typography variant='h4' gutterBottom>
              Welcome to the Dzuels Educational Foundation Library System!
            </Typography>
            <Typography variant='body1' gutterBottom>
              Use the search bar to find patrons and books. You can also click
              the links below to go to the checkout and check-in pages.
            </Typography>
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={12} sm={6}>
                <Link href='/circulation/checkout' passHref>
                  <Button variant='contained' color='primary' fullWidth>
                    Go to Checkout
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link href='/circulation/checkin' passHref>
                  <Button variant='contained' color='primary' fullWidth>
                    Go to Check-in
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>

          {/* Search Bar */}
          <Box sx={{ marginTop: 4 }}>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Search for patrons and books'
              InputProps={{
                endAdornment: (
                  <Button variant='contained' color='primary'>
                    Search
                  </Button>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
