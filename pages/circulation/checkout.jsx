import CheckoutContent from '@/components/circulation/CheckoutContent'
import HomePageTopHeading from '@/components/circulation/HomePageTopHeading'
import Container from '@/components/layout/container'
import useCirculationStore from '@/store/circulationStore'
import fetchApi from '@/utils/fetchApi'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { authOptions } from '../api/auth/[...nextauth]'

function Checkout() {
  const setPatron = useCirculationStore((state) => state.setPatron)
  const clearPatronData = useCirculationStore((state) => state.clearPatronData)

  async function getPatron(patronBarcode, type) {
    if (!patronBarcode || patronBarcode.length < 6) {
      toast.error('Enter a valid patron barcode')
      return false
    }
    if (type === 'patron') {
      try {
        const data = await fetchApi(
          `/circulation/checkout?patronBarcode=${patronBarcode}`
        )
        setPatron(data.patron)
      } catch (error) {
        toast.error(error.message)
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

export default Checkout
