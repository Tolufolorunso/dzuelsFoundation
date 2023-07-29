import Home from '@/components/home/Home'
import { getSession } from 'next-auth/react'

const HomePage = () => {
  // const classes = useStyles()

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
}

export default HomePage
