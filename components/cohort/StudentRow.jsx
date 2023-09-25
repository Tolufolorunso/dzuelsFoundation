import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'

const cell = { fontSize: '1.3rem', fontWeight: 500 }

function StudentRow(props) {
  const { barcode, firstname, surname, attendance, onRemove, index } = props

  const curWeek = attendance[attendance.length - 1]?.week || 0

  const attendanceInfo = `${attendance.filter((record) => record.attended).length
    }/${attendance.length}`

  const AttendancePercentage = curWeek > 0 ? `${(
    (attendance.filter((record) => record.attended).length /
      attendance.length) *
    100
  ).toFixed(2)}%` : '0%'

  function handleClick() {
    onRemove(barcode)
  }

  return (
    <>
      <TableRow>
        <TableCell sx={cell} align='center'>
          {index + 1}
        </TableCell>
        <TableCell sx={cell} align='center'>
          {barcode}
        </TableCell>
        <TableCell sx={cell} align='center'>
          {firstname.toUpperCase()}
        </TableCell>
        <TableCell sx={cell} align='center'>
          {surname.toUpperCase()}
        </TableCell>
        <TableCell sx={cell} align='center'>
          {curWeek}
        </TableCell>
        <TableCell sx={cell} align='center'>
          {attendanceInfo}
        </TableCell>
        <TableCell sx={cell} align='center'>
          {AttendancePercentage}
        </TableCell>
        <TableCell sx={cell} align='center'>
          <Button variant='contained' color='primary' onClick={handleClick}>
            Remove
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}

export default StudentRow
