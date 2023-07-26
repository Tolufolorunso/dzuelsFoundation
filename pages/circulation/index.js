import CirculationContent from '@/components/circulation/CirculationContent'
import HomePageTopHeading from '@/components/circulation/HomePageTopHeading'
import Container from '@/components/layout/container'
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

export default CirculationPage
