import Link from 'next/link'

function CatalogPage() {
  return (
    <div>
      <h1>Cataloging Board</h1>
      <Link href='/catalogs/create'>Add Book</Link>
    </div>
  )
}

export default CatalogPage
