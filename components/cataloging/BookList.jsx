import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import classes from '@/components/cataloging/home.module.css'
import fetchApi from '@/utils/fetchApi'
import toast from 'react-hot-toast'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { useEffect, useState } from 'react'

function BookList(props) {
  const { rows, onRowDoubleClick } = props
  const [updatedRows, setUpdatedRows] = useState(rows)
  const [open, setOpen] = useState(false)

  const columns = [
    { field: 'barcode', headerName: 'Barcode', width: 100 },
    {
      field: 'title',
      headerName: 'Title',
      width: 250,
      cellClassName: classes.titleField,
    },
    {
      field: 'author',
      headerName: 'Author',
      width: 150,
      cellClassName: classes.titleField,
    },
    {
      field: 'classification',
      headerName: 'Classification',
      type: 'number',
      width: 70,
    },
    {
      field: 'controlNumber',
      headerName: 'Control Number',
      width: 70,
    },
    {
      field: 'delete', // You can set any field name you like
      headerName: 'Remove item',
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const handleClose = () => {
          setOpen(false)
        }

        const handleConfirmDelete = async () => {
          try {
            const res = await fetchApi(
              `/cataloging/${params.row.barcode}`,
              'DELETE'
            )
            const { status, message } = res

            if (status) {
              toast.success(message)

              // Remove the deleted row from the updatedRows state
              const filteredRows = updatedRows.filter(
                (row) => row.barcode !== params.row.barcode
              )
              setUpdatedRows(filteredRows)
            }
          } catch (error) {
            toast.error(error.message)
          } finally {
            handleClose()
          }
        }

        return (
          <>
            <Button onClick={() => setOpen(true)} variant="text">
              Delete item
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>Alert</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to remove the item?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleConfirmDelete} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )
      },
    },
  ]
  const [selectedRowIds, setSelectedRowIds] = useState([])

  // Handle selection change
  const handleSelectionChange = (newSelection) => {
    setSelectedRowIds(newSelection.selectionModel)
  }

  useEffect(() => {
    setUpdatedRows(rows)
  }, [rows])

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <DataGrid
        sx={{ fontSize: '1.2rem' }}
        rows={updatedRows} // Pass initialRows here
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[10, 15, 20, 30, 40, 50]}
        checkboxSelection
        onRowDoubleClick={onRowDoubleClick}
        getRowId={(row) => row.barcode}
        onRowSelectionModelChange={handleSelectionChange}
      />
    </div>
  )
}

export default BookList
