import HoldsPage from '@/components/circulation/holds/HoldsPage'
import Container from '@/components/layout/container'
import { BASEURL } from '@/lib/contant'
import fetchApi from '@/utils/fetchApi'
import { getServerSession } from 'next-auth'

import { getSession } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]'

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

  try {
    const res = await fetchApi(`${BASEURL}/circulation/holds`)
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
    return {
      props: {
        errorMessage: error.message,
      },
    }
  }
}
