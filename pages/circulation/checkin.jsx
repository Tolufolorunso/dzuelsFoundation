import CheckinContent from '@/components/circulation/checkin/CheckinContent'
import Container from '@/components/layout/container'
import useAppStore from '@/store/applicationStateStore'
import fetchApi from '@/utils/fetchApi'
import { getServerSession } from 'next-auth'
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
        return true
      }
    } catch (error) {
      setErrorMessage(error.message)
      return false
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
