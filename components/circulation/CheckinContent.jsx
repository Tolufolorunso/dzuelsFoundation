import classes from './Circulation.module.css'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useRef } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

function CheckinContent(props) {
  const { checkinHandler, isLoading } = props
  const patronBarcodeRef = useRef(null)
  const itemBarcodeRef = useRef(null)

  function clickHandler() {
    checkinHandler({
      patronBarcode: patronBarcodeRef.current.value,
      itemBarcode: itemBarcodeRef.current.value,
    })
  }

  return (
    <div className={classes.checkin}>
      <p>Check In</p>
      <Box sx={{ width: '100%' }}>
        <form>
          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'column' }}
            style={{ width: '60%' }}
          >
            <input
              type='text'
              id='barcode'
              name='barcode'
              placeholder='Enter Patron Barcode'
              ref={patronBarcodeRef}
              className={classes.input}
              autoComplete='off'
            />
            <input
              type='text'
              id='barcode'
              name='barcode'
              placeholder='Enter Item Barcode'
              ref={itemBarcodeRef}
              className={classes.input}
              autoComplete='off'
            />
          </Stack>
          <Button variant='outlined' onClick={clickHandler}>
            {isLoading ? (
              <>
                <CircularProgress size={10} color='inherit' />
                <span style={{ marginLeft: '5px' }}>Login...</span>
              </>
            ) : (
              'Checkin'
            )}
          </Button>
        </form>
      </Box>
    </div>
  )
}

export default CheckinContent
