import HoldsPage from '@/components/circulation/HoldsPage'
import Container from '@/components/layout/container'
import fetchApi from '@/utils/fetchApi'

import { getSession } from 'next-auth/react'

function holds(props) {
  const { holds } = props

  console.log('holds', props)
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
    console.log('endpoint', endpoint)
    const res = await fetchApi(`${endpoint}/circulation/holds`)
    const { status, holds } = res
    console.log(res)
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
    return {
      props: {
        errorMessage: error.message,
      },
    }
  }
}
