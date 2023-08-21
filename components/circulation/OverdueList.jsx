import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import OverdueRow from './OverdueRow'

const cell = { fontSize: '1.6rem', fontWeight: 500 }

function OverdueList(props) {
  const { overdueItems } = props
  console.log(13, overdueItems)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell size='small' sx={cell} align='center'>
              No
            </TableCell>
            <TableCell size='medium' sx={cell} align='center'>
              Patron Barcode
            </TableCell>
            <TableCell sx={cell} align='center'>
              Name
            </TableCell>
            <TableCell sx={cell} align='center'>
              Book Title
            </TableCell>
            <TableCell sx={cell} align='center'>
              Due Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {overdueItems?.map((item, index) => (
            <OverdueRow key={item.patronBarcode} {...item} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OverdueList
