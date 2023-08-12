import classes from './Circulation.module.css'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useRef } from 'react'

function RenewItem(props) {
  const { renewHandler } = props
  const patronBarcodeRef = useRef(null)
  const itemBarcodeRef = useRef(null)
  const dueDayRef = useRef(null)

  function handleClick() {
    renewHandler({
      patronBarcode: patronBarcodeRef.current.value,
      itemBarcode: itemBarcodeRef.current.value,
      dueDay: dueDayRef.current.value,
    })
  }

  return (
    <div className={classes.checkin}>
      <p>Renew Item</p>
      <Box sx={{ width: '100%' }}>
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
            required
          />
          <input
            type='text'
            id='barcode'
            name='barcode'
            placeholder='Enter Item Barcode'
            ref={itemBarcodeRef}
            className={classes.input}
            autoComplete='off'
            required={true}
          />
          <input
            type='number'
            name='barcode'
            placeholder='Enter Numbers of Days'
            ref={dueDayRef}
            className={classes.input}
            autoComplete='off'
          />
        </Stack>
        <Button variant='outlined' onClick={handleClick}>
          Renew
        </Button>
      </Box>
    </div>
  )
}

export default RenewItem
