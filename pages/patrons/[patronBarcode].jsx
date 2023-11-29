import Container from '@/components/layout/container'
import PatronProfilePage from '@/components/patron/profile/PatronPage'
import PatronProfileHeader from '@/components/patron/profile/PatronProfileHeader'
import usePatronStore from '@/store/patronStore'
import fetchApi from '@/utils/fetchApi'
import { Box, Typography } from '@mui/material'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { authOptions } from '../api/auth/[...nextauth]'

function PatronPage() {
  const router = useRouter()
  const [patronData, setPatronData] = useState(null)
  const setPatrondataInStore = usePatronStore((state) => state.setPatronData)

  useEffect(() => {
    async function fetchPatronData() {
      try {
        const res = await fetchApi(`/patrons/${router.query.patronBarcode}`)
        const { status, message, patron } = res

        console.log(patron)

        if (status) {
          setPatronData(patron)
          setPatrondataInStore(patron)
        } else {
          // Handle error, e.g., patron not found
          throw new Error('Error fetching patron data:', message)
        }
      } catch (error) {
        if (error.message.includes('not found')) {
          router.push('/patrons')
        }
        toast.error(error.message)
      }
    }

    fetchPatronData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.patronsID])

  if (!patronData) {
    return (
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="p" sx={{ fontSize: '4rem', color: 'tomato' }}>
          Loading...
        </Typography>
      </Box>
    )
  }

  return (
    <Container>
      <PatronProfileHeader
        imageUrl={'/images/book-default.jpg'}
        text="Dzuels Foundation"
      />
      <PatronProfilePage patronData={patronData} />
    </Container>
  )
}

export async function getServerSideProps(ctx) {
  // const session = await getSession(ctx)
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

export default PatronPage
