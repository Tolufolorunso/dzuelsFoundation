import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import HoldsRow from './HoldsListRow'

function HoldsLists(props) {
  console.log(props)
  const { patrons } = props
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Patron Barcode</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Book Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Due Date</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {patrons.map((patron, index) => (
            <HoldsRow
              key={student.barcode}
              {...student}
              index={index}
              onRemove={onRemove}
            />
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  )
}

export default HoldsLists
