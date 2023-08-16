import Container from '@/components/layout/container'
import Link from 'next/link'

function Error({ statusCode }) {
  return (
    <Container>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
      <p>
        Go <Link href='/'>back Home</Link>
      </p>
    </Container>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
