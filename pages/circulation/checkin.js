import CheckinContent from '@/components/circulation/CheckinContent'
import Container from '@/components/layout/container'
import useAppStore from '@/store/applicationStateStore'
import fetchApi from '@/utils/fetchApi'
import { getSession } from 'next-auth/react'

function Checkin() {
  const { setErrorMessage, setSuccessMessage } = useAppStore((state) => state)
  async function checkinHandler(checkinData) {
    try {
      const res = await fetchApi('/circulation/checkin', 'POST', checkinData)
      const { status, successMessage, checkedInData } = res
      if (status) {
        setSuccessMessage(successMessage)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  return (
    <Container>
      <CheckinContent checkinHandler={checkinHandler} />
    </Container>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

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
