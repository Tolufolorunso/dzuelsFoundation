import React, { useState, useRef } from 'react'
import Avatar from '@mui/material/Avatar'
import classes from './styles.module.css'
import Button from '@mui/material/Button'
import UploadModal from './uploadModal'

function PatronAvatar(props) {
  const { alt, barcode, imageUrl } = props
  const [imgUrl, setImgUrl] = useState(imageUrl?.secure_url || '')

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <div className={classes.avatarContainer}>
        <Avatar
          alt={alt}
          src={imgUrl}
          style={{ width: '100%', height: '100%' }}
          variant="square"
        />
        <div htmlFor="upload-photo" className={classes.uploadButton}>
          <Button variant="contained" onClick={handleOpen}>
            Capture Photo
          </Button>
        </div>
      </div>
      <UploadModal
        open={open}
        handleClose={handleClose}
        barcode={barcode}
        setImgUrl={setImgUrl}
      />
    </>
  )
}

export default PatronAvatar
