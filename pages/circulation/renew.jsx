import RenewItem from '@/components/circulation/renew/Renew'
import Container from '@/components/layout/container'
import useAppStore from '@/store/applicationStateStore'
import fetchApi from '@/utils/fetchApi'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

function RenewPage() {
  const { setErrorMessage, setSuccessMessage, clearMessage } = useAppStore(
    (state) => state
  )

  async function renewHandler(renewData) {
    if (!renewData.patronBarcode || !renewData.itemBarcode) {
      setErrorMessage('Both patron barcode and item barcode are required')
      return false
    }
    try {
      const res = await fetchApi('/circulation/renew', 'POST', renewData)
      const { status, message } = res
      if (status) {
        setSuccessMessage(message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setTimeout(() => {
        clearMessage()
      }, 1500)
    }
  }
  return (
    <Container>
      <RenewItem renewHandler={renewHandler} />
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

export default RenewPage
