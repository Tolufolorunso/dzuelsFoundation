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
  return {
    props: {
      user: {
        username: session.user.username,
        role: session.user.role,
        name: session.user.name,
      },
    },
  }
}

export default CohortClassPage
