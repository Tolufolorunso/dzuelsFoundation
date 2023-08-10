import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import useScanDetection from 'use-scan-detection-react18'

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

  function markTheStudent() {
    markStudentHandler(date, attendanceStatus, week)
  }

  function comingFromScanDetection(scanDetectionValue) {
    setStudentBarcode(scanDetectionValue)
    markStudentHandler(date, attendanceStatus, week)
  }

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScanDetection({
      onComplete: comingFromScanDetection,
      minLength: 5,
    })
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
