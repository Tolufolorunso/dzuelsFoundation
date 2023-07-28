import { useEffect, useRef, useState } from 'react'

// Custom hook for barcode scanning
function useScanner(handleScan) {
  const [barcode, setBarcode] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    let barcodeScan = ''

    const handleKeyDown = (e) => {
      // If keycode is 13 (enter) and there are barcode scan keys, handle barcode scan
      if (e.keyCode === 13 && barcodeScan.length > 3) {
        handleScan(barcodeScan)
        e.preventDefault()
        return
      }

      if (e.keyCode === 16) {
        return
      }

      // Push keycode to barcode scan variable
      barcodeScan += e.key

      // Set Timeout to clear variables
      setTimeout(() => {
        barcodeScan = ''
      }, 100)
    }

    document.addEventListener('keydown', handleKeyDown)

    // Clean up the event listener when the component unmounts
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return { barcode, inputRef }
}

export default useScanner
