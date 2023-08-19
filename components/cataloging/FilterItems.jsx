import CustomHeader from '../typography/CustomHeader'
import classes from './FilterItem.module.css'
import Box from '@mui/material/Box'
import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import FilterTextField from './FilterTextField'

function FilterItems(props) {
  const { searchTerm, handleChange, clearTerms } = props

  return (
    <aside className={classes.aside}>
      <CustomHeader level={3} text='Search for Item' />
      {filterFields.map((field) => (
        <Box key={field.name} sx={{ mb: 2, width: '300px' }}>
          <FilterTextField
            label={field.label}
            name={field.name}
            value={searchTerm[field.name]}
            placeholder={field.placeholder}
            onChange={handleChange}
          />
        </Box>
      ))}
      <Box sx={{ mb: 2, width: '300px' }}>
        <Stack direction='row' spacing={2}>
          <Button variant='contained' onClick={clearTerms}>
            Clear Search
          </Button>
        </Stack>
      </Box>
    </aside>
  )
}

export default FilterItems

const filterFields = [
  { label: 'Title', name: 'title', placeholder: 'Search by title' },
  { label: 'Author', name: 'author', placeholder: 'Search by author' },
  {
    label: 'Classification',
    name: 'classification',
    placeholder: 'Enter classification',
  },
  {
    label: 'Control Number',
    name: 'controlNumber',
    placeholder: 'Enter Control Number',
  },
  { label: 'Barcode', name: 'barcode', placeholder: 'Enter barcode' },
]
