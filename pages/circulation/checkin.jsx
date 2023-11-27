import CheckinContent from '@/components/circulation/CheckinContent'
import Container from '@/components/layout/container'
import useAppStore from '@/store/applicationStateStore'
import fetchApi from '@/utils/fetchApi'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'

function Checkin() {
  const { setErrorMessage, setSuccessMessage } = useAppStore((state) => state)
  const [loading, setLoading] = useState(false)

  async function checkinHandler(checkinData) {
    try {
      setLoading(true)
      const res = await fetchApi('/circulation/checkin', 'POST', checkinData)
      const { status, successMessage, checkedInData } = res
      if (status) {
        setSuccessMessage(successMessage)
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Container>
      <CheckinContent checkinHandler={checkinHandler} isLoading={loading} />
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

export default Checkin
