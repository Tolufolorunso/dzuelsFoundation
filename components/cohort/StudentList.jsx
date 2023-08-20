import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import StudentRow from './StudentRow'

const cell = { fontSize: '1.3rem', fontWeight: 700 }

const StudentTable = ({ students, onRemove }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={cell} align='center'>
              No
            </TableCell>
            <TableCell sx={cell} align='center'>
              Barcode
            </TableCell>
            <TableCell sx={cell} align='center'>
              Firstname
            </TableCell>
            <TableCell sx={cell} align='center'>
              Surname
            </TableCell>
            <TableCell sx={cell} align='center'>
              Week
            </TableCell>
            <TableCell sx={cell} align='center'>
              Attendance
            </TableCell>
            <TableCell sx={cell} align='center'>
              Percentage
            </TableCell>
            <TableCell sx={cell} align='center'>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <StudentRow
              key={student.barcode}
              {...student}
              index={index}
              onRemove={onRemove}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StudentTable
