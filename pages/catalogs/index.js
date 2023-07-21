import Container from '@/components/layout/container'
import Link from 'next/link'

function CatalogPage() {
  return (
    <Container>
      <h1>Cataloging Board</h1>
      <Link href='/catalogs/create'>Add Book</Link>
    </Container>
  )
}

export default CatalogPage
