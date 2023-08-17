import HoldsPage from '@/components/circulation/HoldsPage'
import Container from '@/components/layout/container'
import fetchApi from '@/utils/fetchApi'

import { getSession } from 'next-auth/react'

function holds(props) {
  const { holds } = props
  return (
    <Container>
      <HoldsPage holds={holds} />
    </Container>
  )
}

export default holds

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

  let endpoint =
    process.env.NEXT_ENV === 'development'
      ? process.env.LOCALURL
      : process.env.BASEURL

  try {
    const res = await fetchApi(`${endpoint}/circulation/holds`)
    const { status, holds } = res

    if (status) {
      return {
        props: {
          holds: holds || [],
        },
      }
    } else {
      throw new Error('Error occurred while fetching')
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        errorMessage: error.message,
      },
    }
  }
}
