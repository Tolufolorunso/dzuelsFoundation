import Container from '@/components/layout/container'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]'

function InventoryPage() {
  return (
    <Container>
      <h1>Inventory List and Add tools to inventory</h1>
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

export default InventoryPage
