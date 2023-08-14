import Container from '@/components/layout/container'
import TraineePage from '@/components/trainees/traineePage'
import useCohortStore from '@/store/cohortStore'
import fetchApi from '@/utils/fetchApi'
import { getSession } from 'next-auth/react'

function CohortClassPage(props) {
  const { trainees, barcodes } = props

  // console.log(patrons)

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
    const res = await fetchApi(`${endpoint}/trainees`)
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
