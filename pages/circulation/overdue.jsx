import OverduePage from '@/components/circulation/OverduePage'
import Container from '@/components/layout/container'
import useCirculationStore from '@/store/circulationStore'
import fetchApi from '@/utils/fetchApi'
import { getOverDue } from '@/utils/getOverdue'

import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

function Holds(props) {
  const [overdueItems, setHolds, getHolds] = useCirculationStore((state) => [
    state.circulation.overdue,
    state.setHolds,
    state.getHolds,
  ])
  const [overdue, setOverdue] = useState(overdueItems)
  // console.log(11, overdueItems)
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
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  } else {
    return {
      props: {
        ...session,
      },
    }
  }
}
