import Container from '@/components/layout/container'
import fetchApi from '@/utils/fetchApi'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Divider } from '@mui/material'

import classes from '@/components/events/event.module.css'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

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

  return {
    props: {
      user: {
        username: session.user.username,
        role: session.user.role,
        name: session.user.name,
      },
    },
  }
}
