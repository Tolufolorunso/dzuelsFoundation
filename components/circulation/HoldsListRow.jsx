import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import { formatDate } from '@/utils/formattedDate'

const cell = {
  fontSize: '1.3rem',
}

function HoldsRow(props) {
  let { index, patronBarcode, title, patronName, borrowingDate, dueDate } =
    props

  borrowingDate = formatDate(borrowingDate)
  dueDate = formatDate(dueDate)

  return (
    <>
      <TableRow>
        <TableCell sx={cell}>{index + 1}</TableCell>
        <TableCell sx={cell}>{patronBarcode}</TableCell>
        <TableCell sx={cell}>{patronName}</TableCell>
        <TableCell sx={cell}>{title}</TableCell>
        <TableCell sx={cell}>{borrowingDate}</TableCell>
        <TableCell sx={cell}>{dueDate}</TableCell>
      </TableRow>
    </>
  )
}

export default HoldsRow
