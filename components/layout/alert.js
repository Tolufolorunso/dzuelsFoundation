import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import MuiAlert from '@mui/material/Alert'
import useAppStore from '@/store/applicationStateStore'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function Toast() {
  const successMessage = useAppStore((state) => state.appState.successMessage)
  const errorMessage = useAppStore((state) => state.appState.errorMessage)
  const clearMessage = useAppStore((state) => state.clearMessage)

  const appMessage = successMessage ? successMessage : errorMessage

  const messageType = successMessage ? 'success' : 'error'

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={appMessage ? true : false}
      autoHideDuration={6000}
      onClose={clearMessage}
    >
      <Alert
        onClose={clearMessage}
        severity={messageType}
        sx={{ width: '100%', height: 'fit-content' }}
      >
        <pre style={{ fontSize: '1.4rem' }}>{appMessage.trim()}</pre>
      </Alert>
    </Snackbar>
  )
}

export default Toast
