import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import { formatDate } from '@/utils/formattedDate'

function HoldsRow(props) {
  let { index, patronBarcode, title, patronName, borrowingDate, dueDate } =
    props

  borrowingDate = formatDate(borrowingDate)
  dueDate = formatDate(dueDate)

  return (
    <>
      <TableRow>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{patronBarcode}</TableCell>
        <TableCell>{patronName}</TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>{borrowingDate}</TableCell>
        <TableCell>{dueDate}</TableCell>
      </TableRow>
    </>
  )
}

export default HoldsRow
