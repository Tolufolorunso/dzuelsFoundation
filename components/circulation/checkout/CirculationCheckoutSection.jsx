import useCirculationStore from '@/store/circulationStore'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import classes from '../Circulation.module.css'
import { useEffect, useRef, useState } from 'react'
import CheckedOutMessage from './CheckedOutMessage'
import toast from 'react-hot-toast'

function CirculationCheckoutSection() {
  const [isLoading, setIsLoading] = useState(false)
  const patronData = useCirculationStore(
    (state) => state.circulation.patronData
  )
  const checkout = useCirculationStore((state) => state.checkout)

  const [checkedOutSuccess, setCheckedOutSuccess] = useState(null)

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
    handleCheckout(inputValue)
  }

  const handleScan = (barcodeString) => {
    handleCheckout(barcodeString)
  }

  async function handleCheckout(itemBarcode) {
    const patronBarcode = patronData ? patronData.barcode : null

    // if (true) {
    //   toast.error('The end of the Reading Competition')
    //   return
    // }

    if (Boolean(patronBarcode) === false) {
      toast.error('provide patron barcode')
      return
    }
    setIsLoading(true)
    try {
      const res = await checkout({ itemBarcode, patronBarcode })
      const { status, message, checkedOut } = res

      setCheckedOutSuccess(checkedOut)
      if (status) {
        toast.success(message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const patronBarcode = patronData ? patronData.barcode : null
  const patronName = patronData
    ? `${patronData.firstname} ${patronData.firstname}`
    : null
  return (
    <>
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
                <label htmlFor="barcode" className={classes.enterBarcode}>
                  Enter Item barcode or keyword
                </label>
                <input
                  type="text"
                  id="barcode"
                  name="barcode"
                  placeholder="Search Patron Barcode"
                  className={classes.input}
                  ref={inputRef}
                  autoComplete="off"
                />
              </div>
              <Button
                variant="outlined"
                className={classes.searchPatronBtn}
                onClick={checkoutHandler}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={10} color="inherit" />
                    <span style={{ marginLeft: '5px' }}>Checking Out...</span>
                  </>
                ) : (
                  'Checkout'
                )}
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
      {checkedOutSuccess ? <CheckedOutMessage {...checkedOutSuccess} /> : null}
    </>
  )
}

export default CirculationCheckoutSection
