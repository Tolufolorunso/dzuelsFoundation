import CheckoutContent from '@/components/circulation/CheckoutContent'
import HomePageTopHeading from '@/components/circulation/HomePageTopHeading'
import Container from '@/components/layout/container'
import useAppStore from '@/store/applicationStateStore'
import useCirculationStore from '@/store/circulationStore'
import usePatronStore from '@/store/patronStore'
import fetchApi from '@/utils/fetchApi'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'

function Checkout() {
  const { setErrorMessage, clearMessage } = useAppStore((state) => state)
  const setPatron = useCirculationStore((state) => state.setPatron)
  const clearPatronData = useCirculationStore((state) => state.clearPatronData)

  async function getPatron(patronBarcode, type) {
    if (!patronBarcode || patronBarcode.length < 6) {
      setErrorMessage('Enter a valid patron barcode')
      setTimeout(() => {
        clearMessage()
      }, 3000)
      return false
    }

    if (type === 'patron') {
      try {
        const data = await fetchApi(
          `/circulation/checkout?patronBarcode=${patronBarcode}`
        )
        setPatron(data.patron)
      } catch (error) {
        setErrorMessage(error.message)
      }
    }
  }

  // clear patron data when navigate away from checkout page
  useEffect(() => {
    return () => {
      clearPatronData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <HomePageTopHeading />
      <CheckoutContent getPatron={getPatron} />
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

export default Checkout
