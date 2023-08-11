import CustomHeader from '../typography/custom-header'
import classes from './FilterItem.module.css'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

function FilterItems(props) {
  const { searchTerm, handleChange, clearTerms } = props

  return (
    <aside className={classes.aside}>
      <CustomHeader level={3} text='Search for Item' />

      <Box sx={{ mb: 2, width: '300px' }}>
        <TextField
          hiddenLabel={false}
          fullWidth
          label='Title'
          autoFocus
          name='title'
          value={searchTerm.title}
          placeholder='Search by title'
          onChange={handleChange}
          size='small'
          autoComplete='off'
        />
      </Box>
      <Box sx={{ mb: 2, width: '300px' }}>
        <TextField
          hiddenLabel={false}
          fullWidth
          label='Author'
          name='author'
          value={searchTerm.author}
          placeholder='Search by author'
          onChange={handleChange}
          size='small'
          autoComplete='off'
        />
      </Box>
      <Box sx={{ mb: 2, width: '300px' }}>
        <TextField
          hiddenLabel={false}
          fullWidth
          label='classification'
          name='classification'
          value={searchTerm.classification}
          placeholder='Enter classification'
          onChange={handleChange}
          size='small'
          autoComplete='off'
        />
      </Box>
      <Box sx={{ mb: 2, width: '300px' }}>
        <TextField
          hiddenLabel={false}
          fullWidth
          label='controlNumber'
          name='controlNumber'
          value={searchTerm.controlNumber}
          placeholder='Enter controlNumber'
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
          placeholder='Enter barcode'
          onChange={handleChange}
          size='small'
          autoComplete='off'
        />
      </Box>

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
