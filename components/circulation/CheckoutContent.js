import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Divider } from '@mui/material'

import classes from './CheckoutContent.module.css'
import useCirculationStore from '@/store/circulationStore'
import CirculationUserInfo from './CirculationUserInfo'

function CheckoutContent(props) {
  const patronData = useCirculationStore(
    (state) => state.circulation.patronData
  )
  console.log(patronData)
  const { getPatron } = props
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

  function submitBtnClickHandler() {
    const inputValue = formRef.current.barcode.value
    getPatron(inputValue)
  }

  const handleScan = (barcodeString) => {
    //set barcode display to data
    getPatron(barcodeString)
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
              {/* <TextField
                label='Scan Patron Barcode'
                autoFocus={true}
                style={{ width: '70%' }}
                name='barcode'
                ref={inputRef}
              /> */}

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
                onClick={submitBtnClickHandler}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
        <Divider />
        <Stack container spacing={3} direction={{ sm: 'column', md: 'row' }}>
          <Box sx={{ width: '30%' }}>
            <CirculationUserInfo patronData={patronData} />
          </Box>
          <Divider orientation='vertical' />
          <Box sx={{ width: '70%' }}>
            <h1>hello</h1>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default CheckoutContent
