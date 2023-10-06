import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

export default function AlertDialog(props) {
  const { children, open, handleClose, patronBarcode, onConfirm } = props
  const [enteredBarcode, setEnteredBarcode] = React.useState('')
  const [barcodeError, setBarcodeError] = React.useState('')

  const handleConfirm = () => {
    if (enteredBarcode === patronBarcode) {
      onConfirm()
    } else {
      setBarcodeError('Barcode does not match.')
    }
  }

  const handleInputChange = (event) => {
    setEnteredBarcode(event.target.value)
    setBarcodeError('')
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Patron: {patronBarcode}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
          <TextField
            hiddenLabel={false}
            fullWidth
            value={enteredBarcode}
            onChange={handleInputChange}
            placeholder="Enter Patron Barcode"
            size="small"
          />
          {barcodeError && (
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: 'red' }}
            >
              {barcodeError}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
