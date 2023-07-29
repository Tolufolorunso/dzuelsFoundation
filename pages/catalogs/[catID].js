import Container from '@/components/layout/container'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function ItemPage() {
  const router = useRouter()
  return (
    <Container>
      <h1>Dzuels Foundation</h1>
      <p>{router.query.catID}</p>
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

export default ItemPage
