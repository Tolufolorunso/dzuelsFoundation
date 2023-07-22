import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'barcode', headerName: 'Barcode', width: 130 },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'author', headerName: 'Author', width: 150 },
  {
    field: 'classification',
    headerName: 'Classification',
    type: 'number',
    width: 90,
  },
  {
    field: 'controlNumber',
    headerName: 'Control Number',
    width: 90,
  },
]

function BookList(props) {
  const { rows, onCellClickHandler } = props
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <DataGrid
        sx={{ fontSize: '1.2rem' }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        pageSizeOptions={[7, 15]}
        checkboxSelection
        onCellClick={onCellClickHandler}
        getRowId={(row) => row.barcode}
        // loading={true}
      />
    </div>
  )
}

export default BookList
