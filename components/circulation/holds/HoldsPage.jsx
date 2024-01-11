import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import HoldsRow from './HoldsListRow'
import { useState } from 'react'

const cell = { fontSize: '1.6rem', fontWeight: 500 }

function HoldsPage(props) {
  const { holds } = props
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // console.log(holds)
  return (
    <div style={{ marginBottom: '6rem' }}>
      {/* <HoldsLists holds={holds} /> */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={cell} align="center">
                  No
                </TableCell>
                <TableCell sx={cell} align="center">
                  Patron Barcode
                </TableCell>
                <TableCell sx={cell} align="center">
                  Name
                </TableCell>
                <TableCell sx={cell} align="center">
                  Book Title
                </TableCell>
                <TableCell sx={cell} align="center">
                  Borrowed On
                </TableCell>
                <TableCell sx={cell} align="center">
                  Due Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holds?.map((hold, index) => (
                <HoldsRow key={hold.patronBarcode} {...hold} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default HoldsPage
