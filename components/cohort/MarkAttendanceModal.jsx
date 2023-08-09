import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

function MarkAttendanceModal(props) {
  const {
    open,
    onClose,
    markStudentHandler,
    studentBarcode,
    setStudentBarcode,
    studentBarcodeRef,
  } = props

  const [date, setDate] = useState('')
  const [week, setWeek] = useState(1)
  const [attendanceStatus, setAttendanceStatus] = useState('attend')

  let barcodeScan = ''

  useEffect(() => {
    const handleKeyDown = (e) => {
      // If keycode is 13 (enter) the check if there are barcode scan keys and if there are handle barcode scan
      // console.log(barcodeScan.length)
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

  const handleScan = (barcodeString) => {
    // console.log('60', barcodeString)
    setStudentBarcode(barcodeString)
    markTheStudent()
  }

  function markTheStudent() {
    markStudentHandler(date, attendanceStatus, week)
  }

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'white',
          p: 4,
          borderRadius: 4,
        }}
      >
        <Button
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            m: 1,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </Button>
        <Typography variant='h6' gutterBottom>
          Add Student Attendance
        </Typography>
        <TextField
          type='date'
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          value={week}
          type='number'
          onChange={(e) => setWeek(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label='Student Barcode'
          fullWidth
          type='text'
          id='barcode'
          name='barcode'
          value={studentBarcode}
          onChange={(e) => setStudentBarcode(e.target.value)}
          sx={{ mb: 2 }}
          inputRef={studentBarcodeRef}
        />
        <RadioGroup
          row
          aria-label='attendanceStatus'
          name='attendanceStatus'
          value={attendanceStatus}
          onChange={(e) => setAttendanceStatus(e.target.value)}
        >
          <FormControlLabel
            value='attend'
            control={<Radio />}
            label='Present'
          />
          <FormControlLabel
            value='notAttend'
            control={<Radio />}
            label='Absent'
          />
        </RadioGroup>
        <Button variant='contained' color='primary' onClick={markTheStudent}>
          Mark Student
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => onClose()}
          style={{ marginLeft: '1rem' }}
        >
          Done
        </Button>
      </Box>
    </Modal>
  )
}

export default MarkAttendanceModal
