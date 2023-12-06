import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import OverdueRow from './OverdueRow'
import useCirculationStore from '@/store/circulationStore'

const cell = { fontSize: '1.6rem', fontWeight: 500 }

function OverduePage(props) {
  const { overdueItems } = props
  const {
    openPatronDialog,
    circulation: { isPatronDialogOpen },
  } = useCirculationStore((state) => state)

  function getOverDuePatron(barcode) {
    openPatronDialog(!isPatronDialogOpen)
  }

  return (
    <div style={{ marginBottom: '6rem' }}>
      {/* <OverdueList
        overdueItems={overdueItems}
        getOverDuePatron={getOverDuePatron}
      /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell size="small" sx={cell} align="center">
                No
              </TableCell>
              <TableCell size="medium" sx={cell} align="center">
                Patron Barcode
              </TableCell>
              <TableCell sx={cell} align="center">
                Name
              </TableCell>
              <TableCell sx={cell} align="center">
                Book Title
              </TableCell>
              <TableCell sx={cell} align="center">
                Due Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {overdueItems?.map((item, index) => (
              <OverdueRow
                key={item.patronBarcode}
                {...item}
                getOverDuePatron={getOverDuePatron}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default OverduePage
