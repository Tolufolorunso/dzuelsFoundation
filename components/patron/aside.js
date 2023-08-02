import CustomHeader from '../typography/custom-header'
import classes from './aside.module.css'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import usePatronStore from '@/store/patronStore'

function Aside() {
  const setPatrons = usePatronStore((state) => state.setAllPatrons)
  const patrons = usePatronStore((state) => state.patrons.allPatrons)
  const addSearchTerm = usePatronStore((state) => state.addSearchTerm)

  const [searchTerm, setSearchTerm] = React.useState({
    patronType: 'any',
    surname: '',
    firstname: '',
    barcode: '',
  })

  function handleChange(event) {
    setSearchTerm({ ...searchTerm, [event.target.name]: event.target.value })
  }

  function searchHandler() {
    const filteredData = patrons.filter((item) => {
      // Check if patronType matches the search term
      if (
        searchTerm.patronType !== 'any' &&
        item.patronType !== searchTerm.patronType
      ) {
        return false
      }

      // Check if surname matches the search term
      if (
        searchTerm.surname &&
        item.surname.toLowerCase().indexOf(searchTerm.surname.toLowerCase()) ===
          -1
      ) {
        return false
      }

      // Check if firstname matches the search term
      if (
        searchTerm.firstname &&
        item.firstname
          .toLowerCase()
          .indexOf(searchTerm.firstname.toLowerCase()) === -1
      ) {
        return false
      }

      // Check if barcode matches the search term
      if (
        searchTerm.barcode &&
        item.barcode.indexOf(searchTerm.barcode) === -1
      ) {
        return false
      }

      // If all search terms are empty or match, return true to keep the item in the filteredData
      return true
    })

    addSearchTerm(searchTerm)
    setPatrons(filteredData)
  }

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
          <Button variant='contained' onClick={searchHandler}>
            Search
          </Button>
          <Button variant='outlined' color='error'>
            Cancel
          </Button>
        </Stack>
      </Box>
    </aside>
  )
}

export default Aside
