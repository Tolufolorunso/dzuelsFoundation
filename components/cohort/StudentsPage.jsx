// components/StudentsPage.js
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material'

import AddStudentModal from './AddStudentModal'
import useAppStore from '@/store/applicationStateStore'
import fetchApi from '@/utils/fetchApi'

function StudentsPage() {
  const { setErrorMessage, setSuccessMessage } = useAppStore((state) => state)

  const [students, setStudents] = useState([])
  const [patronBarcode, setPatronBarcode] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddStudent = (date1, date2, studentBarcode) => {
    // Implement the add student functionality
    const newStudent = {
      name: newStudentName,
      attended: 0,
      totalDays: 0,
      date1,
      date2,
      studentBarcode,
    }
    setStudents([...students, newStudent])
    setNewStudentName('')
  }

  const handleRemoveStudent = (index) => {
    // Implement the remove student functionality
    const updatedStudents = students.filter((_, i) => i !== index)
    setStudents(updatedStudents)
  }

  async function addStudentToCohort() {
    if (!patronBarcode) {
      setErrorMessage('Please enter patron Barcode')
      return false
    }
    try {
      const res = await fetchApi('/cohort', 'POST', { barcode: patronBarcode })
      const { status, message } = res
      console.log(50, res)
      if (status) {
        setSuccessMessage(message)
      } else {
        throw new Error('Error Adding patron')
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <Box p={4}>
      <Box display='flex' justifyContent='space-between' mb={4}>
        <Typography variant='h4' gutterBottom>
          Cohort Class 2023
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setIsModalOpen(true)}
          mt={2}
        >
          Mark Attendance
        </Button>
      </Box>

      <Box mb={2} bgcolor='white' p={4} borderRadius={2}>
        <TextField
          label='Patron Barcode'
          variant='outlined'
          fullWidth
          value={patronBarcode}
          onChange={(e) => setPatronBarcode(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={addStudentToCohort}
          mt={2}
        >
          Add Patron to Cohort class
        </Button>
      </Box>

      <List>
        <h1>Hello</h1>
      </List>

      <AddStudentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddStudent={handleAddStudent}
      />
    </Box>
  )
}

export default StudentsPage
