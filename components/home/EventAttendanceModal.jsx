import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'
import useScanDetection from 'use-scan-detection-react18'

function EventAttendanceModal(props) {
  const {
    open,
    onClose,
    event,
    studentBarcode,
    setStudentBarcode,
    studentBarcodeRef,
    loading,
    markStudent,
  } = props

  function comingFromScanDetection(scanDetectionValue) {
    setStudentBarcode(scanDetectionValue)
    markStudent()
  }

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScanDetection({
      onComplete: comingFromScanDetection,
      minLength: 5,
    })
  }

  function clickHandler() {
    markStudent()
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

        <Typography variant="h6" gutterBottom>
          {event.eventTitle}
        </Typography>

        <TextField
          label="Student Barcode"
          fullWidth
          type="text"
          id="barcode"
          name="barcode"
          value={studentBarcode}
          onChange={(e) => setStudentBarcode(e.target.value)}
          sx={{ mb: 2, mt: 4 }}
          inputRef={studentBarcodeRef}
          autoComplete="off"
        />
        <Button variant="contained" color="primary" onClick={clickHandler}>
          {loading ? (
            <>
              <CircularProgress size={10} color="inherit" />
              <span style={{ marginLeft: '5px' }}>Marking...</span>
            </>
          ) : (
            'Mark Student'
          )}
        </Button>
      </Box>
    </Modal>
  )
}

export default EventAttendanceModal
