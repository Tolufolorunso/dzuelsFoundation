import Container from '@/components/layout/container'
import fetchApi from '@/utils/fetchApi'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Divider } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import classes from '@/components/events/event.module.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import toast from 'react-hot-toast'
import GridLists from '@/components/grid/dataGrid'
const columns = [
  {
    field: 'rowNumber',
    headerName: '#',
    width: 70,
    renderCell: (params) => {
      return <div>{params.row.id + 1}</div>
    },
  },
  { field: 'barcode', headerName: 'Barcode', width: 150 },
  { field: 'fullname', headerName: 'Full Name', width: 550 },
  { field: 'points', headerName: 'Points', width: 150 },
  { field: 'numberOfItems', headerName: 'Books', width: 150 },
]

function EventPage() {
  const [eventTitle, setEventTitle] = useState('')
  const [patrons, setPatrons] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCompetition = async () => {
    if (!eventTitle) {
      toast.error('Select Competition')
      return false
    }
    setIsLoading(true)
    try {
      const res = await fetchApi(`/events?eventTitle=${eventTitle}`)
      const { status, message, patrons } = res
      if (status) {
        setPatrons(patrons)
        toast.success(message)
      }
    } catch (err) {
      toast.error(err.message)
      setPatrons([])
    } finally {
      setIsLoading(false)
    }
  }

  function handleClick() {
    console.log('hello')
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
            <FormControl sx={{ m: 1, minWidth: '70%' }} size="small">
              <label htmlFor="eventTitle" style={{ fontWeight: 'bold' }}>
                eventTitle
              </label>
              <Select
                // labelId="eventTitle"
                id="eventTitle"
                value={eventTitle}
                label="eventTitle"
                onChange={(e) => setEventTitle(e.target.value)}
              >
                <MenuItem value="Change" selected={true}>
                  Change
                </MenuItem>
                <MenuItem value="reading_competition">
                  Reading Competition
                </MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              className={classes.searchPatronBtn}
              onClick={fetchCompetition}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={10} color="inherit" />
                  <span style={{ marginLeft: '5px' }}>Fetching...</span>
                </>
              ) : (
                'Fetch Patrons'
              )}
            </Button>
          </Stack>
        </form>
      </Box>
      <Divider />
      <Typography variant="h1" gutterBottom sx={{ marginTop: '40px' }}>
        Competition Page
      </Typography>
      <div>
        <GridLists
          columns={columns}
          // rows={patrons}
          rows={[]}
          onRowClick={handleClick}
          sortField="numberOfItems"
          sort="desc"
        />
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
