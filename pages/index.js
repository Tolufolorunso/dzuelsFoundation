import Link from 'next/link'

function HomePage() {
  return (
    <div>
      <h1>Dzuels Foundation</h1>
      <ul>
        <li>
          <Link href='/patrons'>Patrons</Link>
        </li>
        <li>
          <Link href='/catalogs'>Catalog</Link>
        </li>
        <li>
          <Link href='/circulation'>Circulation</Link>
        </li>
        <li>
          <Link href='/inventory'>Inventory</Link>
        </li>
        <li>
          <Link href='/cohort-class'>Cohort Class</Link>
        </li>
      </ul>
    </div>
  )
}

export default HomePage
