import Container from '@/components/layout/container'
import { useRouter } from 'next/router'

function ItemPage() {
  const router = useRouter()
  // console.log(router.query)
  return (
    <Container>
      <h1>Dzuels Foundation</h1>
      <p>{router.query.catID}</p>
    </Container>
  )
}

export default ItemPage
