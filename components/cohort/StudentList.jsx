import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material'

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
            <TableRow key={student.barcode}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{student.barcode}</TableCell>
              <TableCell>{student.firstname}</TableCell>
              <TableCell>{student.surname}</TableCell>
              <TableCell>
                {student.attendance[student.attendance.length - 1].week}
              </TableCell>
              <TableCell>{`${
                student.attendance.filter((record) => record.attended).length
              }/${student.attendance.length}`}</TableCell>
              <TableCell>{`${(
                (student.attendance.filter((record) => record.attended).length /
                  student.attendance.length) *
                100
              ).toFixed(2)}%`}</TableCell>
              <TableCell>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => onRemove(student.barcode)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StudentTable
