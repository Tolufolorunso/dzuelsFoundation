import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CustomHeader from '@/components/typography/custom-header'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'

import classes from './add-patron.module.css'
import PatronForm from './patron-form'

import { useRef, useState } from 'react'
import SelectPatronType from './select-patron-type'

function AddPatron(props) {
  const fileInputRef = useRef(null)
  const {
    handleSubmit,
    formData,
    handleChange,
    patronType,
    changePatronTypeHandler,
  } = props
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleUpload = async () => {
    console.log(27, file)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/patrons/uploadPatronData', {
        // headers: {
        //   'content-type': 'multipart/form-data',
        // },
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      console.log(result)
      if (response.ok) {
        console.log('Patron data uploaded successfully!')
      } else {
        console.error('Failed to upload patron data.')
      }
    } catch (error) {
      console.error('Error uploading patron data:', error.message)
    }
  }

  // const handleUpload = () => {
  //   if (file) {
  //     // Implement your upload logic here.
  //     console.log('File to upload:', file)
  //     // Reset the file input
  //     setFile(null)
  //     fileInputRef.current.value = ''
  //   }
  // }

  return (
    <div className={classes.form}>
      <CustomHeader level={4} text={`Add Patron (${patronType})`} />
      <Stack
        spacing={2}
        direction='row'
        // style={{ position: 'absolute', top: 0 }}
      >
        <Button
          onClick={handleSubmit}
          variant='contained'
          color='success'
          startIcon={<SaveAltIcon />}
        >
          Save
        </Button>
        <Button variant='text'>Cancel</Button>
        <div>
          <input
            type='file'
            accept='.xlsx'
            onChange={handleUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
            id='file-input'
          />
          <label htmlFor='file-input'>
            <Button
              component='span'
              // onClick={handleUpload}
              disabled={!file}
              variant='contained'
              color='primary'
            >
              Upload Patron Excel
            </Button>
          </label>
        </div>
        {/* <div>
          <input type='file' accept='.xlsx' onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={!file}>
            Upload Patron Data
          </button>
        </div> */}
      </Stack>
      <SelectPatronType
        patronType={patronType}
        changePatronTypeHandler={changePatronTypeHandler}
      />
      <PatronForm
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  )
}

export default AddPatron
