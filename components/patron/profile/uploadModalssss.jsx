import React, { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import toast from 'react-hot-toast'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
}

function UploadModal(props) {
  const { open, barcode, setImgUrl, handleClose } = props

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [photoData, setPhotoData] = useState(null)
  const [isSnapCamera, setIsSnapCamera] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const cameraStreamRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      cameraStreamRef.current = stream // Save the stream reference
      videoRef.current.srcObject = stream
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const takePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (video && canvas) {
      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      const dataUrl = canvas.toDataURL('image/jpeg')
      setPhotoData(dataUrl)
      setIsSnapCamera(false)
    }
  }

  const stopCamera = () => {
    const stream = cameraStreamRef.current
    if (stream) {
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      cameraStreamRef.current = null
      videoRef.current.srcObject = null
    }
  }

  // Function to handle image load
  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  // Function to handle image crop
  const handleImageUpload = async () => {
    if (photoData) {
      try {
        setIsSnapCamera(false)
        setIsLoading(true)
        stopCamera()
        const response = await fetch('/api/patrons/patronUpload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ barcode, photoData }),
        })

        const data = await response.json()
        const { status, message, imageUrl } = data
        if (status) {
          toast.success(message)
          setImgUrl(imageUrl)
          handleClose()
        }
      } catch (error) {
        toast.error('Error uploading image:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  function handleCancel() {
    setIsSnapCamera(true)
    setPhotoData(null)
    startCamera()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>Camera Capture</h2>
        <Button onClick={startCamera} disabled={isLoading}>
          Start Camera
        </Button>
        <Button onClick={takePhoto} disabled={isLoading}>
          Take Photo
        </Button>
        <Button onClick={stopCamera} disabled={isLoading}>
          Stop Camera
        </Button>

        <div>
          {photoData && (
            <div style={{ width: '250px', height: '300px' }}>
              <Image
                src={photoData}
                alt="Captured"
                onLoad={handleImageLoad}
                style={{
                  display: imageLoaded ? 'block' : 'none',
                  width: '100%',
                  height: '100%',
                }}
              />
              <Button onClick={handleImageUpload}>
                {isLoading ? (
                  <>
                    <CircularProgress size={10} color="inherit" />
                    <span style={{ marginLeft: '5px' }}>Uploading...</span>
                  </>
                ) : (
                  'Upload'
                )}
              </Button>
              <Button onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          )}
          {/* Display the live camera feed */}
          {isSnapCamera ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              style={{ width: '250px', height: '300px', margin: '0 auto' }}
            />
          ) : null}
        </div>

        {/* Hidden canvas for capturing and processing the photo */}
        {isSnapCamera ? (
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        ) : null}
      </Box>
    </Modal>
  )
}

export default UploadModal
