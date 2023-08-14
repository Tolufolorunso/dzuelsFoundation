import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import StudentRow from './TraineeRow'

const StudentTable = ({ students, onRemove }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Barcode</TableCell>
            <TableCell>Firstname</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Week</TableCell>
            <TableCell>Attendance</TableCell>
            <TableCell>Percentage</TableCell>
            <TableCell>Actions</TableCell>
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
