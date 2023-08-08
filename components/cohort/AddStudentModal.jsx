// components/AddStudentModal.js
import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'

function AddStudentModal(props) {
  const { open, onClose, onAddStudent } = props

  const [date, setDate] = useState('')
  const [week, setWeek] = useState('')
  const [studentBarcode, setStudentBarcode] = useState('')

  function markTheStudent() {
    // Implement the add student functionality
    onAddStudent(date, week, studentBarcode)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
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
          label='Date'
          type='date'
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label='Week'
          fullWidth
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label='Student Barcode'
          fullWidth
          value={studentBarcode}
          onChange={(e) => setStudentBarcode(e.target.value)}
          sx={{ mb: 2 }}
        />
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

export default AddStudentModal
