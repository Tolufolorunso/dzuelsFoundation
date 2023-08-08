import StudentsPage from '@/components/cohort/StudentsPage'
import Container from '@/components/layout/container'
import fetchApi from '@/utils/fetchApi'
import { getSession } from 'next-auth/react'

function CohortClassPage(props) {
  const { patrons } = props
  console.log(patrons)
  return (
    <Container>
      <StudentsPage />
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
    const res = await fetchApi(`${endpoint}/cohort`)
    const { status, patrons } = res

    if (status) {
      return {
        props: {
          patrons,
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
