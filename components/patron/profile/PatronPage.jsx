import React from 'react'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import Paper from '@mui/material/Paper'

import PatronAvater from './PatronAvatar'
import classes from './styles.module.css'
import AreaChartComponent from './Area'
import { useRouter } from 'next/router'
import fetchApi from '@/utils/fetchApi'
import toast from 'react-hot-toast'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import AlertDialog from '@/components/layout/AlertDialog'

function PatronProfilePage({ patronData }) {
  const {
    surname,
    firstname,
    middlename,
    active,
    library,
    gender,
    itemsCheckedOutHistory,
    event,
    hasBorrowedBook,
    barcode,
    image_url,
  } = patronData

  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false)

  const router = useRouter()

  const editPatronHandler = () => router.push(`/patrons/edit/${barcode}`)

  const deletedPatronHandler = () => {
    setIsLoading(true)
    fetchApi(`/patrons/${barcode}`, 'DELETE')
      .then((res) => {
        const { status, message } = res
        if (status) {
          toast.success(message)
          router.push('/patrons')
          setIsLoading(false)
        } else {
          toast.error(message)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        toast.error(error.message)
        setIsLoading(false)
      })
  }

  const deletePatronHandler = (isDelete) => {
    if (isDelete) {
      deletedPatronHandler()
    } else {
      setIsLoading(false)
    }
    setIsDeleteConfirmation(false)
  }

  return (
    <React.Fragment>
      <div className={classes.headerContainerStyle}>
        <div className={classes.headerStyle}>
          <PatronAvater
            imageUrl={image_url}
            alt={`${surname} ${firstname} ${middlename}'s photo`}
            barcode={barcode}
          />
          <Typography
            sx={{ fontSize: '2.4rem', fontWeight: 400, lineHeight: 1.334 }}
            variant="h5"
          >{`${patronData.surname}, ${patronData.firstname} ${patronData.middlename}`}</Typography>
          <Typography variant="body2">Library: {library}</Typography>
          <Typography variant="body2">Gender: {gender}</Typography>
          <Chip
            variant="filled"
            label={active ? 'Active' : 'Not Active'}
            sx={{ fontSize: '1.2rem' }}
          />
          <div style={{ flex: '1' }} />
          <div className={classes.actionGroupStyle}>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={editPatronHandler}
            >
              Edit
            </Button>
            {isLoading ? (
              <Button variant="outlined">
                <CircularProgress size={10} color="inherit" />{' '}
                <span style={{ marginLeft: '5px' }}>Deleting...</span>
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => setIsDeleteConfirmation(true)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className={classes.summaryCards}>
        <SummaryCard
          title={'Number Of Books Read'}
          value={`${itemsCheckedOutHistory.length} Book(s)`}
        />
        <SummaryCard title={'Attendence'} value={`${event.length} Event(s)`} />
        <SummaryCard
          title={'Borrowed Book'}
          value={hasBorrowedBook ? 'Yes' : 'No'}
        />
        <SummaryCard title={'Barcode'} value={barcode} />
      </div>
      <div className={classes.summaryCards}>
        <SummaryCard
          title={'Performances'}
          component={<AreaChartComponent data={itemsCheckedOutHistory} />}
        />
      </div>
      <AlertDialog
        open={isDeleteConfirmation}
        handleClose={deletePatronHandler}
      >
        Are you sure you want to delete this patron?
      </AlertDialog>
    </React.Fragment>
  )
}

export default PatronProfilePage

export function SummaryCard({ title, value, component }) {
  return (
    <Paper elevation={2} className={classes.summaryCard}>
      <Typography color={'textSecondary'} variant="h5" gutterBottom>
        {title}
      </Typography>
      {component || (
        <Typography color={'primary'} variant="h3">
          {value}
        </Typography>
      )}
    </Paper>
  )
}
