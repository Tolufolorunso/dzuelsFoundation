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
import StudentTable from './StudentList'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { exportToExcel } from '@/utils/export'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import toast from 'react-hot-toast'

const btn = {
  fontSize: '1.2rem',
  fontWeight: 500,
  wordSpacing: 1,
  letterSpacing: 1,
}

function StudentsPage(props) {
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
      toast.error('Enter all fields')
      return false
    }

    setIsLoading(true)

    try {
      const res = await fetchApi('/cohort/mark', 'POST', {
        date,
        attendanceStatus,
        barcode: studentBarcode,
        week: Number(week),
        cohortType: props.cohortType,
      })
      const { status, message } = res
      if (status) {
        toast.success(message)
        setPresent(studentBarcode)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setStudentBarcode('')
      studentBarcodeRef.current.focus()
      setIsLoading(false)
      setTimeout(() => {
        clearMessage()
      }, 1500)
    }
  }

  async function exportAttendance2ExcelHandler() {
    try {
      const res = await fetchApi('/cohort/attendance')
      const { status, attendance, message } = res

      if (status) {
        toast.success('Your file is ready to be downloaded in 2 seconds.')
        const formattedData = attendance.map((person) => {
          const { barcode, firstname, surname, attendance } = person

          const attendanceCount = attendance.length
          const attendedCount = attendance.filter(
            (entry) => entry.attended
          ).length
          const attendancePercentage =
            ((attendedCount / attendanceCount) * 100).toFixed(2) + '%'

          const formattedPerson = {
            barcode,
            name: `${firstname} ${surname}`,
            attendance: `${attendedCount}/${attendanceCount}`,
            percentage: attendancePercentage,
          }

          attendance.forEach((entry) => {
            formattedPerson[`week ${entry.week}`] = entry.attended
              ? 'present'
              : 'absent'
          })

          return formattedPerson
        })
        setTimeout(() => {
          exportToExcel(formattedData)
          // exportToExcel([
          //   {
          //     barcode: '202302',
          //     name: 'tolu kola',
          //     attendance: '2/3',
          //     percentage: '80%',
          //     'week 1': 'present',
          //     'week 2': 'absent',
          //     'week 3': 'present',
          //   },
          // ])
        }, 2000)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
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
      console.log(barcode)
    }
  }

  async function addStudentToCohort() {
    if (!patronBarcode) {
      toast.error('Please enter patron Barcode')
      return false
    }
    try {
      const res = await fetchApi('/cohort', 'POST', {
        barcode: patronBarcode,
        cohortType: props.cohortType,
      })
      const { status, message } = res
      if (status) {
        toast.success(message)
      } else {
        throw new Error('Error Adding patron')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4" gutterBottom>
          Cohort Class 2023
        </Typography>
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <FormControl>
            {/* <InputLabel id="demo-simple-select-label">Cohort</InputLabel> */}
            <Select value={props.cohortType} onChange={props.onChange}>
              <MenuItem value={'cohortOne'} selected>
                Cohort One
              </MenuItem>
              <MenuItem value={'cohortTwo'}>Cohort Two</MenuItem>
              <MenuItem value={'outOfClass'}>Out Of School</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            onClick={() => exportAttendance2ExcelHandler()}
            startIcon={<FileDownloadIcon />}
            sx={btn}
          >
            Export As Excel - Detail
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
            sx={btn}
          >
            Mark Attendance
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsDisplayAbsenteesOpen(true)}
            sx={btn}
          >
            Fail to Come
          </Button>
        </Box>
      </Box>

      <Box mb={2} bgcolor="white" p={4} borderRadius={2}>
        <label htmlFor="patronBarcode">Patron Barcode:</label>
        <TextField
          id="patronBarcode"
          placeholder="Patron Barcode"
          variant="outlined"
          fullWidth
          value={patronBarcode}
          onChange={(e) => setPatronBarcode(e.target.value)}
          style={{ marginBottom: '1rem' }}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addStudentToCohort}
          mt={2}
          disabled={props.cohortType === 'cohortOne' ? true : false}
        >
          Add Patron to Cohort class
        </Button>
      </Box>

      <StudentTable students={props.students} onRemove={handleRemoveStudent} />

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

export default StudentsPage
