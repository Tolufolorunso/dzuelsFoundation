import Container from '@/components/layout/container'
import { getSession } from 'next-auth/react'

function InventoryPage() {
  return (
    <Container>
      <h1>Inventory List and Add tools to inventory</h1>
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

export default InventoryPage
