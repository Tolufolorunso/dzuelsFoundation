import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { formatDate } from '@/utils/formattedDate'

const cell = {
  fontSize: '1.3rem',
  fontWeight: '500',
  textTransform: 'capitalize !important',
}

function HoldsRow(props) {
  let {
    index,
    patronBarcode,
    title,
    patronName,
    borrowingDate,
    dueDate,
    itemBarcode,
  } = props

  borrowingDate = formatDate(borrowingDate)
  dueDate = formatDate(dueDate)

  return (
    <>
      <TableRow
        sx={{ cursor: 'pointer' }}
        hover={true}
        onClick={() => console.log(patronBarcode)}
      >
        <TableCell sx={cell} align='right'>
          {index + 1}
        </TableCell>
        <TableCell sx={cell} align='center'>
          {patronBarcode}
        </TableCell>
        <TableCell sx={cell} align='center'>
          {patronName}
        </TableCell>
        <TableCell sx={cell} align='center'>
          {title} ({itemBarcode})
        </TableCell>
        <TableCell sx={cell} align='center'>
          {borrowingDate}
        </TableCell>
        <TableCell sx={cell} align='center'>
          {dueDate}
        </TableCell>
      </TableRow>
    </>
  )
}

export default HoldsRow
