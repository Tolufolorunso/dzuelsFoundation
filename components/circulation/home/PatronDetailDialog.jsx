import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import toast from 'react-hot-toast'
import fetchApi from '@/utils/fetchApi'
import useCirculationStore from '@/store/circulationStore'
import CircularProgress from '@mui/material/CircularProgress'

export default function PatronDialog() {
  const {
    circulation: { isPatronDialogOpen, patronBarcode },
    openPatronDialog,
  } = useCirculationStore((state) => state)

  const [patron, setPatron] = React.useState({
    imgUrl: '',
    fullname: '',
    barcode: '',
    gender: '',
    address: '',
  })

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    async function fetchPatronData() {
      if (Boolean(patronBarcode) === true) {
        try {
          const res = await fetchApi(`/patrons/short-profile/${patronBarcode}`)
          setPatron(res.patron)
          setLoading(true)
        } catch (error) {
          toast.error(error.message)
        } finally {
          setLoading(true)
        }
      }
    }
    fetchPatronData()
  }, [patronBarcode])

  function closeHandler() {
    openPatronDialog(!isPatronDialogOpen, null)
    setPatron({
      imgUrl: '',
      fullname: '',
      barcode: '',
      gender: '',
      address: '',
    })
  }

  return (
    <Dialog
      open={isPatronDialogOpen}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Student Details</DialogTitle>
      <div style={{ minWidth: '600px', minHeight: '227px' }}>
        <DialogContent>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={patron.imgUrl}
                alt={patron.fullname}
                style={{ width: '300px', marginRight: '20px' }}
              />
              <div>
                <DialogContentText>
                  Full Name: {patron.fullname}
                </DialogContentText>
                <DialogContentText>Barcode: {patron.barcode}</DialogContentText>
                <DialogContentText>Gender: {patron.gender}</DialogContentText>
                <DialogContentText>Address: {patron.address}</DialogContentText>
                <DialogContentText>
                  School: {patron.schoolName}
                </DialogContentText>
                <DialogContentText>
                  Class: {patron.currentClass}
                </DialogContentText>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p>
                <CircularProgress size={40} color="inherit" />
              </p>
            </div>
          )}
        </DialogContent>
      </div>

      <DialogActions>
        <Button onClick={closeHandler}>close</Button>
      </DialogActions>
    </Dialog>
  )
}
