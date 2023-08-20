import { DataGrid } from '@mui/x-data-grid'

function BookList(props) {
  const { rows, columns, onRowDoubleClick } = props

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
        pageSizeOptions={[5, 7, 10, 15, 20]}
        checkboxSelection
        onRowDoubleClick={onRowDoubleClick}
        getRowId={(row) => row.barcode}
      />
    </div>
  )
}

export default BookList