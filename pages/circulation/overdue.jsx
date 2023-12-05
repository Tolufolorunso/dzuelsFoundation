import OverduePage from '@/components/circulation/overdues/OverduePage'
import Container from '@/components/layout/container'
import useCirculationStore from '@/store/circulationStore'
import fetchApi from '@/utils/fetchApi'
import { getOverDue } from '@/utils/getOverdue'
import { getServerSession } from 'next-auth'
import React, { useEffect, useState } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'
import PatronDialog from '@/components/circulation/home/PatronDetailDialog'

function Holds() {
  const [patronBarcode, setPatronBarcode] = useState('')
  const {
    circulation: { isPatronDialogOpen, overdue: overdueItems },
    openPatronDialog,
    getHolds,
  } = useCirculationStore((state) => state)

  const [overdue, setOverdue] = useState(overdueItems)

  function openPatronDialogHandler() {
    openPatronDialog(!isPatronDialogOpen)
    setPatronBarcode(202302)
  }

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
    <React.Fragment>
      <PatronDialog
        openPatronDialog={openPatronDialogHandler}
        isPatronDialogOpen={isPatronDialogOpen}
        patronBarcode={patronBarcode}
      />
      <Container>
        <OverduePage overdueItems={overdue} />
      </Container>
    </React.Fragment>
  )
}

export default Holds

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
