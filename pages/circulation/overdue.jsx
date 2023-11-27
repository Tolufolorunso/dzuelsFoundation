import OverduePage from '@/components/circulation/overdues/OverduePage'
import Container from '@/components/layout/container'
import useCirculationStore from '@/store/circulationStore'
import fetchApi from '@/utils/fetchApi'
import { getOverDue } from '@/utils/getOverdue'
import { getServerSession } from 'next-auth'

import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'
import { BASEURL } from '@/lib/contant'

function Holds(props) {
  const [overdueItems, setHolds, getHolds] = useCirculationStore((state) => [
    state.circulation.overdue,
    state.setHolds,
    state.getHolds,
  ])
  const [overdue, setOverdue] = useState(overdueItems)
  // const { overdueItems } = props

  useEffect(() => {
    async function holds() {
      if (overdueItems.length > 0) {
        return
      } else {
        const holds = await getHolds()
        const overdueItems = getOverDue(holds)
        setOverdue(overdueItems)
      }
    }
    holds()
  }, [overdueItems, getHolds])

  return (
    <Container>
      <OverduePage overdueItems={overdue} />
    </Container>
  )
}

export default Holds

export async function getServerSideProps(ctx) {
  // const session = await getSession(ctx)
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  console.log('hello')

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  console.log(`${BASEURL}/circulation/holds`)

  try {
    const res = await fetchApi(`${BASEURL}/circulation/holds`)

    console.log(res)

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
