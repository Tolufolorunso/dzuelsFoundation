import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import useCohortStore from '@/store/cohortStore'

function DisplayAbsenteesModal(props) {
  const { open, onClose } = props
  const cohort = useCohortStore((state) => state.cohort)
  const absentees = []

  for (const student of cohort.students) {
    if (!cohort.presents.includes(student)) {
      absentees.push(student)
    }
  }

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'white',
          p: 4,
          borderRadius: 4,
        }}
      >
        <Button
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            m: 1,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </Button>
        <Typography variant='h6' gutterBottom>
          Those who are not present
        </Typography>
        <Typography variant='h6' gutterBottom>
          Total number of absentees: {absentees.length}
        </Typography>
        {absentees.map((num) => {
          return (
            <Typography variant='h6' key={num}>
              {num}
            </Typography>
          )
        })}
      </Box>
    </Modal>
  )
}

export default DisplayAbsenteesModal
