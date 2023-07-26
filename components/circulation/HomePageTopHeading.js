import Stack from '@mui/material/Stack'
import classes from './HomePageTopHeading.module.css'
import CustomHeader from '../typography/custom-header'
import CirculationContent from './CirculationContent'

function HomePageTopHeading() {
  return (
    <div className={classes.btns}>
      <Stack direction='row' spacing={3}>
        <div onClick={() => console.log('hello')}>
          <CustomHeader level={3} text='Circulation' />
        </div>
      </Stack>
    </div>
  )
}

export default HomePageTopHeading
