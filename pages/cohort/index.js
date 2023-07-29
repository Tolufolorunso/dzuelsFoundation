import Container from '@/components/layout/container'
import { getSession } from 'next-auth/react'

function CohortClassPage() {
  return (
    <Container>
      <h1>Students in cohort class</h1>
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
}

export default CohortClassPage
