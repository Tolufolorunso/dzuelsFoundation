import Container from '@/components/layout/container'
import Button from '@mui/material/Button'
import Head from 'next/head'
import Link from 'next/link'

function HomePage() {
  return (
    <Container>
      <Head>
        <title>Hello</title>
      </Head>
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
      <Button variant='text' color='ter'>
        Text
      </Button>
      <Button variant='contained'>Contained</Button>
      <Button variant='outlined'>Outlined</Button>
    </Container>
  )
}

export default HomePage
