import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function PatronPage() {
  const router = useRouter()
  return (
    <div>
      <h1>Patron Page</h1>
    </div>
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

export default PatronPage
