import useCirculationStore from '@/store/circulationStore'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import classes from './CirculationCheckoutSection.module.css'
import { useEffect, useRef } from 'react'

function CirculationCheckoutSection() {
  const patronData = useCirculationStore(
    (state) => state.circulation.patronData
  )

  const formRef = useRef(null)
  const inputRef = useRef(null)

  let barcodeScan = ''

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      // If keycode is 13 (enter) the check if there are barcode scan keys and if there are handle barcode scan
      if (e.keyCode === 13 && barcodeScan.length > 3) {
        handleScan(barcodeScan)
        e.preventDefault()
        return
      }

      if (e.keyCode === 16) {
        return
      }

      //push keycode to barcode scan variable
      // eslint-disable-next-line react-hooks/exhaustive-deps
      barcodeScan += e.key

      //set Timeout to clear variables
      setTimeout(() => {
        barcodeScan = ''
      }, 100)
    }

    document.addEventListener('keydown', handleKeyDown)

    // Clean up the event listener when the component unmounts
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  function checkoutHandler() {
    const inputValue = formRef.current.barcode.value
    // getPatron(inputValue)
    console.log(inputValue)
  }

  const handleScan = (barcodeString) => {
    //set barcode display to data
    // getPatron(barcodeString)

    console.log(65, barcodeString)
  }

  const patronBarcode = patronData ? patronData.barcode : null
  const patronName = patronData
    ? `${patronData.firstname} ${patronData.firstname}`
    : null
  return (
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <p className={classes.checkingHeader}>
        Checking out to <span>{patronName}</span> ({patronBarcode})
      </p>
      <Box sx={{ width: '100%' }}>
        <form ref={formRef}>
          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            style={{ width: '60%', alignItems: 'flex-end' }}
          >
            <div
              style={{
                width: '70%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <label htmlFor='barcode' className={classes.enterBarcode}>
                Enter Item barcode or keyword
              </label>
              <input
                type='text'
                id='barcode'
                name='barcode'
                placeholder='Search Patron Barcode'
                style={{
                  padding: '8px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
                ref={inputRef}
              />
            </div>
            <Button
              variant='outlined'
              className={classes.searchPatronBtn}
              onClick={checkoutHandler}
            >
              Checkout
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default CirculationCheckoutSection
