import usePatronStore from '@/store/patronStore'
import { DataGrid } from '@mui/x-data-grid'

function PatronList(props) {
  const patrons = usePatronStore((state) => state.patrons.allPatrons)
  const { columns, onCellClickHandler } = props
  console.log(patrons)
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <DataGrid
        sx={{ fontSize: '1.2rem' }}
        rows={patrons}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        pageSizeOptions={[5, 7, 10, 15, 20]}
        checkboxSelection={false}
        // onCellClick={onCellClickHandler}
        getRowId={(row) => row.barcode}
      />
    </div>
  )
}

export default PatronList
