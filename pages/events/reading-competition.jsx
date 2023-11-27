import Container from '@/components/layout/container'
import fetchApi from '@/utils/fetchApi'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Divider } from '@mui/material'

import classes from '@/components/events/event.module.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
// import { BASEURL } from '@/lib/contant'

function EventPage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [patrons, setPatrons] = useState([])

  const fetchPatronsWithinDateRange = async () => {
    try {
      const res = await fetchApi(
        `/events?startDate=${startDate}&endDate=${endDate}`
      )
      const { status, message, event, patrons } = res
      if (status) {
        setPatrons(patrons)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <Box sx={{ width: '100%', marginBottom: '30px', marginTop: '30px' }}>
        <form>
          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            style={{ width: '60%', alignItems: 'flex-end' }}
          >
            <div style={{ width: '30%' }}>
              <label htmlFor="startDate" style={{ fontWeight: 'bold' }}>
                Start Date
              </label>
              <TextField
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={classes.input}
              />
            </div>
            <div style={{ width: '30%' }}>
              <label htmlFor="endDate" style={{ fontWeight: 'bold' }}>
                End Date
              </label>
              <TextField
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={classes.input}
              />
            </div>
            <Button
              variant="outlined"
              className={classes.searchPatronBtn}
              onClick={fetchPatronsWithinDateRange}
            >
              Fetch Patrons
            </Button>
          </Stack>
        </form>
      </Box>
      <Divider />
      <h2>Fetch Patrons Within Date Range</h2>
      <div>
        {patrons.map((patron) => (
          <div key={patron._id}>
            <p>
              Name: {patron.firstname} {patron.surname}
            </p>
            <p>Barcode: {patron.barcode}</p>
            <p>Checkout History:</p>
            <p>{patron.itemsCheckedOutHistory.length}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default EventPage

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  const columns = [
    { field: 'barcode', headerName: 'Barcode', width: 100 },
    { field: 'firstname', headerName: 'Firstname', width: 150 },
    { field: 'surname', headerName: 'Surname', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone-No', width: 150 },
    {
      field: 'patronType',
      headerName: 'Patron Type',
      width: 150,
    },
    { field: 'points', headerName: 'Points', width: 150 },
  ]

  const BASE_URL =
    process.env.NEXT_ENV === 'development'
      ? process.env.BASE_URL_LOCAL
      : process.env.BASE_URL

  try {
    const res = await fetchApi(
      `${BASE_URL}/events?eventTitle=reading_competition`
    )
    const { status, patrons, message } = res

    if (status) {
      return {
        props: {
          user: {
            username: session.user.username,
            role: session.user.role,
            name: session.user.name,
          },
          patrons,
          columns,
        },
      }
    } else {
      throw new Error('Error occurred while fetching')
    }
  } catch (error) {
    return {
      props: {
        errorMessage: error.message,
        columns,
      },
    }
  }
}
