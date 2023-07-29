import CirculationContent from '@/components/circulation/CirculationContent'
import HomePageTopHeading from '@/components/circulation/HomePageTopHeading'
import Container from '@/components/layout/container'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function CirculationPage() {
  const router = useRouter()

  function goTo(path) {
    router.push(`/circulation/${path}`)
  }

  return (
    <Container>
      <HomePageTopHeading />
      <CirculationContent goTo={goTo} />
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

export default CirculationPage
