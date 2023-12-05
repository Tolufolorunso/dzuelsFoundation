import { DataGrid } from '@mui/x-data-grid'

function GridLists(props) {
  const { columns, rows, onRowClick, sortField = null, sort = 'asc' } = props

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <DataGrid
        sx={{ fontSize: '1.2rem' }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
          sorting: {
            sortModel: [{ field: sortField, sort }],
          },
        }}
        pageSizeOptions={[30, 40, 50, 60, 80, 100]}
        checkboxSelection={false}
        onRowDoubleClick={onRowClick}
        getRowId={(row) => row.barcode}
      />
    </div>
  )
}

export default GridLists
