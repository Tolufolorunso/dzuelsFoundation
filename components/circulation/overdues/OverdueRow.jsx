import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { formatDate } from '@/utils/formattedDate'

const cell = {
  fontSize: '1.3rem',
  fontWeight: '500',
  textTransform: 'capitalize !important',
}

function OverdueRow(props) {
  let { index, patronBarcode, title, patronName, dueDate, getOverDuePatron } =
    props

  dueDate = formatDate(dueDate)

  return (
    <>
      <TableRow
        sx={{ cursor: 'pointer' }}
        hover={true}
        onClick={() => getOverDuePatron(patronBarcode)}
      >
        <TableCell sx={cell} align="center">
          {index + 1}
        </TableCell>
        <TableCell sx={cell} align="center">
          {patronBarcode}
        </TableCell>
        <TableCell sx={cell} align="center">
          {patronName}
        </TableCell>
        <TableCell sx={cell} align="center">
          {title}
        </TableCell>
        <TableCell sx={cell} align="center">
          {dueDate}
        </TableCell>
      </TableRow>
    </>
  )
}

export default OverdueRow
