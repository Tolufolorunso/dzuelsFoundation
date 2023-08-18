import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const cell = { fontSize: '1.6rem', fontWeight: 500 }

function OverdueList(props) {
  const { itemsOverdue } = props
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell size='small' sx={cell}>
              No
            </TableCell>
            <TableCell size='medium' sx={cell}>
              Patron Barcode
            </TableCell>
            <TableCell sx={cell}>Name</TableCell>
            <TableCell sx={cell}>Book Title</TableCell>
            <TableCell sx={cell}>Due Date</TableCell>
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
