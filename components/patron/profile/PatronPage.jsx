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
import ModeEditIcon from '@mui/icons-material/ModeEdit'

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
    registeredBy,
    studentSchoolInfo,
    checkoutHistoryInThisMonth,
  } = patronData

  const currentDate = new Date()
  const month = currentDate.toLocaleString('default', { month: 'long' })
  const lastBook = itemsCheckedOutHistory[itemsCheckedOutHistory.length - 1]

  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false)

  const router = useRouter()

  const editPatronHandler = () => router.push(`/patrons/edit/${barcode}`)

  const deletePatronHandler = () => {
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

  const deleteClickHandler = (isDelete) => {
    setIsLoading(false)
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
          <Typography className={classes.fullname} variant="h5">
            {`${patronData.surname}, ${patronData.firstname} ${patronData.middlename}`}
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }} variant="body2">
            Library: {library}
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }} variant="body2">
            Gender: {gender}
          </Typography>
          <Chip
            variant="filled"
            label={active ? 'Active' : 'Not Active'}
            sx={{ fontSize: '1.2rem' }}
          />
          <div style={{ flex: '1' }} />
          <div className={classes.actionGroupStyle}>
            <Button
              variant="outlined"
              startIcon={<ModeEditIcon />}
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
          title={'Number Of Books Read For The Month'}
          value={`${checkoutHistoryInThisMonth?.length} Book(s) in ${month}`}
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
          title={'Last Item Borrowed: Main Title'}
          value={`${lastBook?.itemTitle}`}
        />
        <SummaryCard
          title={'Last Item Borrowed: Sub-Title'}
          value={`${lastBook?.itemSubTitle}`}
        />
        <SummaryCard title={'Item Barcode'} value={lastBook?.itemBarcode} />
      </div>
      {studentSchoolInfo && (
        <div className={classes.summaryCards}>
          <SummaryCard
            title={'Student School Name'}
            value={studentSchoolInfo.schoolName}
          />
          <SummaryCard
            title={'Student School Address'}
            value={studentSchoolInfo.schoolAdress}
          />
          <SummaryCard
            title={'Student Current Class'}
            value={studentSchoolInfo.currentClass}
          />
          <SummaryCard
            title={'Student school PhoneNumber'}
            value={
              studentSchoolInfo.schoolPhoneNumber ||
              studentSchoolInfo.schoolEmail
            }
          />
        </div>
      )}
      <div className={classes.summaryCards}>
        <SummaryCard
          title="Contact: Phone Number"
          component={
            <div className={classes.phoneNumber}>
              <a href={`tel:${patronData.phoneNumber}`}>
                <span style={{ fontWeight: 'bold' }}>Patron Number: </span>
                {patronData.phoneNumber ? patronData.phoneNumber : 'null'}
              </a>
              <br />
              <a href={`tel:${patronData?.parentInfo?.parentPhoneNumber}`}>
                <span style={{ fontWeight: 'bold' }}>Parent Number: </span>
                {patronData?.parentInfo?.parentPhoneNumber
                  ? patronData?.parentInfo?.parentPhoneNumber
                  : 'null'}
              </a>
            </div>
          }
        />
        <SummaryCard
          title="Contact: House Address"
          component={
            <Typography>{patronData?.parentInfo?.parentAddress}</Typography>
          }
        />
        <SummaryCard
          title="Registered By"
          component={<Typography>{registeredBy || 'null'}</Typography>}
        />
      </div>
      <div className={classes.summaryCards}>
        <SummaryCard
          title={'Performances'}
          component={<AreaChartComponent data={itemsCheckedOutHistory} />}
        />
      </div>
      <AlertDialog
        open={isDeleteConfirmation}
        handleClose={deleteClickHandler}
        patronBarcode={barcode}
        onConfirm={deletePatronHandler}
      >
        Are you sure you want to delete? Enter patron Barcode?
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
