import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import classes from './Circulation.module.css'
import CustomHeader from '../typography/custom-header'

function CirculationContent(props) {
  const { goTo } = props
  return (
    <div className={classes.box}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <CustomHeader level={3} text='Circulation' />
            <Stack direction='column' spacing={3}>
              <Button
                fullWidth
                key='one'
                className={classes.button}
                onClick={() => goTo('checkout')}
              >
                Checkout
              </Button>
              <Button
                key='two'
                fullWidth
                className={classes.button}
                onClick={() => goTo('checkin')}
              >
                Checkin
              </Button>
              <Button
                key='three'
                fullWidth
                className={classes.button}
                onClick={() => goTo('renew')}
              >
                Renew
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHeader level={3} text='Holds' />
            <Stack direction='column' spacing={3}>
              <Button
                fullWidth
                key='one'
                className={classes.button}
                onClick={() => goTo('holds')}
              >
                Hold Queue
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHeader level={3} text='Transfer' />
            <Stack direction='column' spacing={3}>
              <Button fullWidth key='one' className={classes.button}>
                OverDues
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default CirculationContent
