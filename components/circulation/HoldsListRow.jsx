import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'

function HoldsRow(props) {
  const { barcode, firstname, surname, attendance, onRemove, index } = props
  const curWeek = attendance[attendance.length - 1].week
  const attendanceInfo = `${
    attendance.filter((record) => record.attended).length
  }/${attendance.length}`
  const AttendancePercentage = `${(
    (attendance.filter((record) => record.attended).length /
      attendance.length) *
    100
  ).toFixed(2)}%`

  function handleClick() {
    onRemove(barcode)
  }

  return (
    <>
      {/* <TableRow>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{barcode}</TableCell>
        <TableCell>{firstname.toUpperCase()}</TableCell>
        <TableCell>{surname.toUpperCase()}</TableCell>
        <TableCell>{curWeek}</TableCell>
        <TableCell>{attendanceInfo}</TableCell>
        <TableCell>{AttendancePercentage}</TableCell>
      </TableRow> */}
    </>
  )
}

export default HoldsRow
