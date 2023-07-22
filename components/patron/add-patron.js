import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CustomHeader from '@/components/typography/custom-header'

import classes from './add-patron.module.css'
import PatronForm from './patron-form'

import { useState } from 'react'
import SelectPatronType from './select-patron-type'

function AddPatron() {
  const [patronType, setPatronType] = useState('student') // Default selection: 'student'

  const handleChange = (event) => {
    console.log(patronType)
    setPatronType(event.target.value)
  }
  return (
    <div className={classes.form}>
      <CustomHeader level={4} text={`Add Patron (${patronType})`} />
      <Stack
        spacing={2}
        direction='row'
        // style={{ position: 'absolute', top: 0 }}
      >
        <Button variant='contained' color='success' startIcon={<SaveAltIcon />}>
          Save
        </Button>
        <Button variant='text'>Cancel</Button>
      </Stack>
      <SelectPatronType patronType={patronType} handleChange={handleChange} />
      <PatronForm />
    </div>
  )
}

export default AddPatron
