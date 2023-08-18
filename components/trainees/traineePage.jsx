// components/StudentsPage.js
import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import useAppStore from '@/store/applicationStateStore'
import fetchApi from '@/utils/fetchApi'
import MarkAttendanceModal from './MarkAttendanceModal'
import useCohortStore from '@/store/cohortStore'
import DisplayAbsenteesModal from './DisplayAbsenteesModal'
import StudentTable from './TraineeList'

function TraineePage(props) {
  // const { students } = props
  const { setErrorMessage, setSuccessMessage, clearMessage } = useAppStore(
    (state) => state
  )
  const setPresent = useCohortStore((state) => state.setPresent)
  // const cohort = useCohortStore((state) => state.cohort)

  const [patronBarcode, setPatronBarcode] = useState('')
  const [studentBarcode, setStudentBarcode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const studentBarcodeRef = useRef(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDisplayAbsenteesOpen, setIsDisplayAbsenteesOpen] = useState(false)

  async function markStudentHandler(date, attendanceStatus, week) {
    if (!date || !studentBarcode || !attendanceStatus || !week) {
      setErrorMessage('Enter all fields')
      return false
    }

    setIsLoading(true)

    try {
      const res = await fetchApi('/cohort/mark', 'POST', {
        date,
        attendanceStatus,
        barcode: studentBarcode,
        week: Number(week),
      })
      const { status, message } = res
      if (status) {
        setSuccessMessage(message)
        setPresent(studentBarcode)
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setStudentBarcode('')
      studentBarcodeRef.current.focus()
      setIsLoading(false)
      setTimeout(() => {
        clearMessage()
      }, 1500)
    }
  }

  function handleRemoveStudent(barcode) {
    const isvalid = prompt(
      `Are you sure you want to remove this student, enter ${barcode}`
    )
    if (isvalid === barcode) {
      // console.log(barcode)
    }
  }

  async function addStudentToCohort() {
    if (!patronBarcode) {
      setErrorMessage('Please enter patron Barcode')
      return false
    }
    try {
      const res = await fetchApi('/trainees', 'POST', {
        barcode: patronBarcode,
      })
      const { status, message } = res
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
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setIsModalOpen(true)}
          >
            Mark Attendance
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setIsDisplayAbsenteesOpen(true)}
          >
            Fail to Come
          </Button>
        </Box>
      </Box>

      <Box mb={2} bgcolor='white' p={4} borderRadius={2}>
        <label htmlFor='patronBarcode'>Patron Barcode:</label>
        <TextField
          id='patronBarcode'
          placeholder='Patron Barcode'
          variant='outlined'
          fullWidth
          value={patronBarcode}
          onChange={(e) => setPatronBarcode(e.target.value)}
          style={{ marginBottom: '1rem' }}
          size='small'
        />
        <Button
          variant='contained'
          color='primary'
          onClick={addStudentToCohort}
          mt={2}
          disabled
        >
          Add Patron to Cohort class
        </Button>
      </Box>

      <StudentTable trainees={props.students} onRemove={handleRemoveStudent} />

      <MarkAttendanceModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        markStudentHandler={markStudentHandler}
        studentBarcode={studentBarcode}
        setStudentBarcode={setStudentBarcode}
        studentBarcodeRef={studentBarcodeRef}
        isLoading={isLoading}
      />
      <DisplayAbsenteesModal
        open={isDisplayAbsenteesOpen}
        onClose={() => setIsDisplayAbsenteesOpen(false)}
      />
    </Box>
  )
}

export default TraineePage
