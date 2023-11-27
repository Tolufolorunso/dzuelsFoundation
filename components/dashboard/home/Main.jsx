import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import classes from '../dashboard.module.css'
import CustomHeader from '@/components/typography/CustomHeader'
import CreateLibraryModel from './CreateLibraryModel'
import fetchApi from '@/utils/fetchApi'
import toast from 'react-hot-toast'
import CompetitionModal from './startCompetition'

function BaseComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCompetitionModalOpen, setIsCompetitionModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [libraryInfo, setLibraryInfo] = useState({
    libraryName: '',
    city: '',
    country: 'Nigeria',
    zipCode: '23401',
    state: '',
    street: '',
  })

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function openStartCompetitionModal() {
    setIsCompetitionModalOpen(true)
  }

  async function submitLibraryInfo(info) {
    setLoading(true)
    try {
      // Send library info to the API endpoint
      const res = await fetchApi('/admin/library', 'POST', libraryInfo)
      const { status, message, library } = res // Handle the response as needed
      if (status) {
        toast.success(message)
        closeModal()
      } else {
        throw new Error('Something went wrong')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
      // closeModal()
    }
  }

  async function submitStartCompetition(info) {
    setLoading(true)
    try {
      // Send library info to the API endpoint
      const res = await fetchApi(`/admin/library`, 'POST', libraryInfo)
      const { status, message, library } = res // Handle the response as needed
      if (status) {
        toast.success(message)
        closeModal()
      } else {
        throw new Error('Something went wrong')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
      // closeModal()
    }
  }

  function handleLibraryInfoChange(event) {
    const { name, value } = event.target
    setLibraryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }))
  }

  return (
    <React.Fragment>
      {isModalOpen && (
        <CreateLibraryModel
          submitHandler={submitLibraryInfo}
          loading={loading}
          onClose={closeModal}
          onChange={handleLibraryInfoChange}
          libraryInfo={libraryInfo}
        />
      )}
      {isCompetitionModalOpen && (
        <CompetitionModal
          submitHandler={submitStartCompetition}
          loading={loading}
          onClose={closeModal}
          onChange={handleLibraryInfoChange}
          libraryInfo={libraryInfo}
        />
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={7} lg={8}>
          <Paper className={classes.balancePaper}>
            <CustomHeader level={2} text="Create Library" />
            <Button variant="outlined" onClick={openModal}>
              Open Modal
            </Button>
          </Paper>
          <Paper className={classes.balancePaper}>
            <CustomHeader level={2} text="Start Competition" />
            <Button variant="outlined" onClick={openStartCompetitionModal}>
              Open Modal
            </Button>
          </Paper>
        </Grid>
        {/* Recent TotalCard */}
        <Grid item xs={12} md={5} lg={4}>
          <Paper className={classes.balancePaper}>
            {/* <CovidWarning /> */}
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={8}>
          <Paper className={classes.fixedHeightPaper}>{/* <Chart />*/}</Paper>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Paper className={classes.fixedHeightPaper}>{/* <Tools /> */}</Paper>
        </Grid>
        {/* ExpensesTable */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>{/* <ExpensesTable /> */}</Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default BaseComponent
