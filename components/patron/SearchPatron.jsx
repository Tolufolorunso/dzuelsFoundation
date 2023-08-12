import CustomHeader from '../typography/custom-header'
import classes from './searchPatron.module.css'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

function SearchPatron(props) {
  const { handleChange, searchTerm, clearTerms } = props

  return (
    <aside className={classes.aside}>
      <CustomHeader level={3} text='Search for Patron' />

      <Box sx={{ mb: 2, width: '300px' }}>
        <TextField
          hiddenLabel={false}
          fullWidth
          label='Surname'
          id='rty'
          autoFocus
          name='surname'
          value={searchTerm.surname}
          placeholder='Surname'
          onChange={handleChange}
          size='small'
          autoComplete='off'
        />
      </Box>
      <Box sx={{ mb: 2, width: '300px' }}>
        <TextField
          hiddenLabel={false}
          fullWidth
          label='Firstname'
          name='firstname'
          value={searchTerm.firstname}
          placeholder='Firstname'
          onChange={handleChange}
          size='small'
          autoComplete='off'
        />
      </Box>
      <Box sx={{ mb: 2, width: '300px' }}>
        <TextField
          hiddenLabel={false}
          fullWidth
          label='Barcode'
          name='barcode'
          value={searchTerm.barcode}
          placeholder='Enter patron barcode'
          onChange={handleChange}
          size='small'
          autoComplete='off'
        />
      </Box>
      <Box sx={{ mb: 2, width: '300px' }}>
        <FormControl fullWidth>
          <InputLabel id='patronType'>Patron Type</InputLabel>
          <Select
            labelId='patronType'
            id='patronType'
            value={searchTerm.patronType}
            label='Patron Type'
            name='patronType'
            onChange={handleChange}
            size='small'
          >
            <MenuItem value='any'>Any</MenuItem>
            <MenuItem value='staff'>Staff</MenuItem>
            <MenuItem value='student'>Student</MenuItem>
            <MenuItem value='teacher'>Teacher</MenuItem>
            <MenuItem value='guest'>Guest</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mb: 2, width: '300px' }}>
        <Stack direction='row' spacing={2}>
          <Button variant='contained' onClick={() => clearTerms(searchTerm)}>
            Clear Search
          </Button>
        </Stack>
      </Box>
    </aside>
  )
}

export default SearchPatron
