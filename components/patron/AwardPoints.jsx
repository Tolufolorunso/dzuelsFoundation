import CustomHeader from '../typography/CustomHeader'
import classes from './searchPatron.module.css'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import fetchApi from '@/utils/fetchApi'
import useAppStore from '@/store/applicationStateStore'
import CircularProgress from '@mui/material/CircularProgress'

function AwardPoints() {
  const { setErrorMessage, setSuccessMessage } = useAppStore((state) => state)

  const [points, setPoints] = useState('')
  const [patronBarcode, setPatronBarcode] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    if (event.target.name === 'points') {
      setPoints(event.target.value)
    } else {
      setPatronBarcode(event.target.value)
    }
  }

  function clearFieldsHandler() {
    setPoints('')
    setPatronBarcode('')
  }

  async function AddPointsHandler() {
    if (!points || !patronBarcode) {
      setErrorMessage('Please fill in all fields')
      return
    }
    const pointsData = { points: +points, patronBarcode }
    try {
      setLoading(true)
      const res = await fetchApi('/patrons/awardPoints', 'POST', pointsData)
      setSuccessMessage(res.message)
      clearFieldsHandler()
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <aside className={classes.aside} style={{ marginTop: '1rem' }}>
      <CustomHeader level={3} text='Award Points' />

      <Box sx={{ mb: 2, width: '300px' }}>
        <TextField
          hiddenLabel={false}
          fullWidth
          label='Award Point'
          autoFocus
          name='points'
          type='number'
          value={points}
          placeholder='Enter points'
          onChange={handleChange}
          size='small'
        />
      </Box>
      <Box sx={{ mb: 2, width: '300px' }}>
        <TextField
          hiddenLabel={false}
          fullWidth
          label='Patron Barcode'
          name='patronBarcode'
          value={patronBarcode}
          placeholder='Enter Patron Barcode'
          onChange={handleChange}
          size='small'
        />
      </Box>

      <Box sx={{ mb: 2, width: '300px' }}>
        <Stack direction='row' spacing={2}>
          <Button variant='contained' onClick={AddPointsHandler}>
            {loading ? (
              <>
                <CircularProgress size={10} color='inherit' />
                <span style={{ marginLeft: '5px' }}>Adding Points...</span>
              </>
            ) : (
              'Add Point(s)'
            )}
          </Button>
          <Button variant='outlined' color='error' onClick={clearFieldsHandler}>
            Clear Fields
          </Button>
        </Stack>
      </Box>
    </aside>
  )
}

export default AwardPoints
