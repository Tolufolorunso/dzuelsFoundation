import usePatronStore from '@/store/patronStore'
import { DataGrid } from '@mui/x-data-grid'

function PatronList(props) {
  const { columns, rows, onRowClick } = props
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
        checkboxSelection={false}
        onRowClick={onRowClick}
        getRowId={(row) => row.barcode}
      />
    </div>
  )
}

export default PatronList
