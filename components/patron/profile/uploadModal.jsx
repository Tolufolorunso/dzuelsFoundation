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

function UploadModal({ open, barcode, setImgUrl, handleClose }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const cameraStreamRef = useRef(null)

  const [photoData, setPhotoData] = useState(null)
  const [isSnapCamera, setIsSnapCamera] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  // useEffect(() => {
  //   if (open) {
  //     startCamera()
  //   } else {
  //     stopCamera()
  //   }

  //   return () => {
  //     stopCamera()
  //   }
  // }, [open])

  useEffect(() => {
    if (open) {
      startCamera()
      setIsCameraActive(true) // Camera is active when the modal is open
    } else {
      stopCamera()
      setIsCameraActive(false) // Camera is not active when the modal is closed
    }

    return () => {
      stopCamera()
      setIsCameraActive(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function closeHandler() {
    handleClose()
    stopCamera()
    // setIsSnapCamera(true)
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      cameraStreamRef.current = stream
      const video = videoRef.current

      if (video) {
        video.srcObject = stream
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const takePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (video && canvas) {
      const context = canvas.getContext('2d')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      setSize({ width: canvas.width, height: canvas.height })
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
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
      const video = videoRef.current

      if (video) {
        video.srcObject = null
      }
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

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

  const handleCancel = () => {
    setIsSnapCamera(true)
    setPhotoData(null)
    startCamera()
  }

  return (
    <Modal
      open={open}
      onClose={closeHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>Camera Capture</h2>
        {/* <Button onClick={startCamera} disabled={isLoading}>
          Start Camera
        </Button>
        <Button onClick={takePhoto} disabled={isLoading}>
          Take Photo
        </Button>
        <Button onClick={stopCamera} disabled={isLoading}>
          Stop Camera
        </Button> */}
        <Button onClick={startCamera} disabled={isLoading || isCameraActive}>
          Start Camera
        </Button>
        <Button onClick={takePhoto} disabled={isLoading || !isCameraActive}>
          Take Photo
        </Button>
        <Button onClick={stopCamera} disabled={isLoading || !isCameraActive}>
          Stop Camera
        </Button>

        {photoData && (
          <div>
            <Image
              src={photoData}
              alt="Captured"
              onLoad={handleImageLoad}
              width={size.width}
              height={size.height}
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

        {isSnapCamera ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            // style={{ width: '250px', height: '300px', margin: '0 auto' }}
          />
        ) : null}

        {isSnapCamera ? (
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        ) : null}
      </Box>
    </Modal>
  )
}

export default UploadModal
