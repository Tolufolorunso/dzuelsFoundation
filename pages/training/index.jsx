import Container from '@/components/layout/container'
import TraineePage from '@/components/trainees/traineePage'
// import { BASEURL } from '@/lib/contant'
import useCohortStore from '@/store/cohortStore'
import fetchApi from '@/utils/fetchApi'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]'

function CohortClassPage(props) {
  const { trainees, barcodes } = props

  // set all cohort class student barcodes in global state management
  const setStudentsInStore = useCohortStore((state) => state.setStudents)
  setStudentsInStore(barcodes)

  return (
    <Container>
      <TraineePage trainees={trainees} />
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

  const BASE_URL =
    process.env.NEXT_ENV === 'development'
      ? process.env.BASE_URL_LOCAL
      : process.env.BASE_URL

  try {
    const res = await fetchApi(`${BASE_URL}/trainees`)
    const { status, patrons } = res

    const barcodesArray = patrons.map((student) => student.barcode)

    if (status) {
      return {
        props: {
          patrons,
          barcodes: barcodesArray,
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

export default CohortClassPage
