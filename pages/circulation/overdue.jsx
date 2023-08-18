import OverduePage from '@/components/circulation/OverduePage'
import Container from '@/components/layout/container'
import fetchApi from '@/utils/fetchApi'

import { getSession } from 'next-auth/react'

function holds(props) {
  const { overdueItems } = props

  return (
    <Container>
      <OverduePage overdueItems={overdueItems} />
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
    const res = await fetchApi(`${endpoint}/circulation/overdue`)
    const { status, overdueItems } = res

    if (status) {
      return {
        props: {
          overdueItems: overdueItems || [],
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
