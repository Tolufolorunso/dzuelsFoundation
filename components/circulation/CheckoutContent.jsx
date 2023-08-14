import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Divider } from '@mui/material'
import classes from './Circulation.module.css'

import useCirculationStore from '@/store/circulationStore'
import CirculationUserInfo from './CirculationUserInfo'
import CirculationCheckoutSection from './CirculationCheckoutSection'
// import useScanner from '@/hooks/useScanner'

function CheckoutContent(props) {
  const patronData = useCirculationStore(
    (state) => state.circulation.patronData
  )
  const clearPatronData = useCirculationStore((state) => state.clearPatronData)
  const { getPatron } = props
  const formRef = useRef(null)
  const inputRef = useRef(null)

  let barcodeScan = ''

  // const { barcode, inputRef: customInputRef } = useScanner(handleScan)

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

  function submitBtnClickHandler() {
    const inputValue = formRef.current.barcode.value
    getPatron(inputValue, 'patron')
  }

  function clearPatronDataHandler() {
    clearPatronData()
    inputRef.current.focus()
    inputRef.current.value = ''
  }

  const handleScan = (barcodeString) => {
    //set barcode display to data
    if (!patronData) {
      getPatron(barcodeString, 'patron')
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
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
                <label htmlFor='barcode' style={{ fontWeight: 'bold' }}>
                  Scan Patron Barcode
                </label>
                <input
                  type='text'
                  id='barcode'
                  name='barcode'
                  placeholder='Search Patron Barcode'
                  className={classes.input}
                  ref={inputRef}
                  autoComplete='off'
                />
              </div>
              <Button
                variant='outlined'
                className={classes.searchPatronBtn}
                onClick={submitBtnClickHandler}
              >
                Submit
              </Button>
              <Button
                variant='outlined'
                className={classes.searchPatronBtn}
                onClick={clearPatronDataHandler}
              >
                Clear Patron Data
              </Button>
            </Stack>
          </form>
        </Box>
        <Divider />
        {patronData ? (
          <Stack container spacing={4} direction={{ sm: 'column', md: 'row' }}>
            <Box sx={{ width: '30%' }}>
              <CirculationUserInfo patronData={patronData} />
            </Box>
            <Box sx={{ width: '70%' }}>
              <CirculationCheckoutSection />
            </Box>
          </Stack>
        ) : null}
      </Stack>
    </Box>
  )
}

export default CheckoutContent
