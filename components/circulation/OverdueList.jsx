import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import HoldsRow from './HoldsListRow'

function OverdueList(props) {
  const { itemsOverdue } = props
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Patron Barcode</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Book Title</TableCell>
            <TableCell>Borrowed On</TableCell>
            <TableCell>Due Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {itemsOverdue?.map((item, index) => (
            <HoldsRow key={item.patronBarcode} {...item} index={index} />
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OverdueList
