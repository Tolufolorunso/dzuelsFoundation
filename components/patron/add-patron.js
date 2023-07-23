import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CustomHeader from '@/components/typography/custom-header'

import classes from './add-patron.module.css'
import PatronForm from './patron-form'

import { useState } from 'react'
import SelectPatronType from './select-patron-type'

function AddPatron(props) {
  const {
    handleSubmit,
    formData,
    handleChange,
    patronType,
    changePatronTypeHandler,
  } = props

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
