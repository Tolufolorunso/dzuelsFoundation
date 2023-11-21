import Stack from '@mui/material/Stack'
import classes from './HomePageTopHeading.module.css'
import CustomHeader from '../typography/CustomHeader'
import CirculationContent from './CirculationContent'

function HomePageTopHeading() {
  return (
    <div className={classes.btns}>
      <Stack direction="row" spacing={3}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <CustomHeader level={3} text="Circulation" />
          <p style={{ marginTop: '-12px', fontSize: '1.9rem' }}>
            Reading Competition Opens
          </p>
        </div>
      </Stack>
    </div>
  )
}

export default HomePageTopHeading
