import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CustomHeader from '@/components/typography/custom-header'
import CircularProgress from '@mui/material/CircularProgress'

import classes from './AddPatron.module.css'
import PatronForm from './AddPatronForm'

import { useRef, useState } from 'react'
import SelectPatronType from './select-patron-type'
import usePatronStore from '@/store/patronStore'

function AddPatron(props) {
  const fileInputRef = useRef(null)
  const { handleSubmit, formData, handleChange } = props
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const { selectedPatronType: patronType, isLoading } = usePatronStore(
    (state) => state.patrons
  )
  const changeSelectedPatronType = usePatronStore(
    (state) => state.changeSelectedPatronType
  )

  const handleUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/patrons/upload', {
        // headers: {
        //   'content-type': 'multipart/form-data',
        // },
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        // console.log('Patron data uploaded successfully!')
      } else {
        // console.error('Failed to upload patron data.')
      }
    } catch (error) {
      console.error('Error uploading patron data:', error.message)
    }
  }

  return (
    <div className={classes.form}>
      <CustomHeader level={4} text={`Add Patron (${patronType})`} />
      <div className={classes.fixedButtonWrapper}>
        <Stack
          spacing={2}
          direction='row'
          // style={{ position: 'absolute', top: 0 }}
        >
          <Button
            onClick={handleSubmit}
            variant='contained'
            color='success'
            startIcon={isLoading ? null : <SaveAltIcon />}
          >
            {isLoading ? (
              <>
                <CircularProgress size={10} color='inherit' />
                <span style={{ marginLeft: '5px' }}>Saving...</span>
              </>
            ) : (
              'Save'
            )}
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
        </Stack>
      </div>
      <SelectPatronType
        patronType={patronType}
        changePatronTypeHandler={changeSelectedPatronType}
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
