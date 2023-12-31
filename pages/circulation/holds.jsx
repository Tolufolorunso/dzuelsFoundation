import React from 'react'
import HoldsPage from '@/components/circulation/holds/HoldsPage'
import Container from '@/components/layout/container'
import fetchApi from '@/utils/fetchApi'
import { getServerSession } from 'next-auth'

import { authOptions } from '../api/auth/[...nextauth]'
import PatronDialog from '@/components/circulation/home/PatronDetailDialog'

function holds(props) {
  const { holds } = props

  return (
    <React.Fragment>
      <PatronDialog />
      <Container>
        <HoldsPage holds={holds} />
      </Container>
    </React.Fragment>
  )
}

export default holds

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

  const BASE_URL =
    process.env.NEXT_ENV === 'development'
      ? process.env.BASE_URL_LOCAL
      : process.env.BASE_URL

  try {
    const res = await fetchApi(`${BASE_URL}/circulation/holds`)

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
