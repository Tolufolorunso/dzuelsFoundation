import Home from '@/components/home/Home'
import { getSession } from 'next-auth/react'

const HomePage = () => {
  return <Home />
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

export default HomePage
