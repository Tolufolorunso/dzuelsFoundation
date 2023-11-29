import { DataGrid } from '@mui/x-data-grid'

function GridLists(props) {
  const { columns, rows, onRowClick } = props

  console.log(rows)

  // if (rows.length === 0) {
  //   return <p>No data available.</p> // Your custom message when rows are empty
  // }

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
        }}
        pageSizeOptions={[30, 40, 50, 60, 80, 100]}
        checkboxSelection={false}
        // onRowClick={onRowClick}
        onRowDoubleClick={onRowClick}
        getRowId={(row) => row.barcode}
      />
    </div>
  )
}

export default GridLists
