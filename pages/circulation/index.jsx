import CirculationContent from '@/components/circulation/CirculationContent'
import HomePageTopHeading from '@/components/circulation/HomePageTopHeading'
import Container from '@/components/layout/container'
import useCirculationStore from '@/store/circulationStore'
import fetchApi from '@/utils/fetchApi'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function CirculationPage(props) {
  const { holds } = props
  const router = useRouter()
  const setHolds = useCirculationStore((state) => state.setHolds)

  useEffect(() => {
    setHolds(holds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holds])

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

  let endpoint =
    process.env.NEXT_ENV === 'development'
      ? process.env.LOCALURL
      : process.env.BASEURL

  try {
    const res = await fetchApi(`${endpoint}/circulation/holds`)
    const { status, holds } = res

    if (status) {
      return {
        props: {
          holds: holds || [],
          user: {
            username: session.user.username,
            role: session.user.role,
            name: session.user.name,
          },
        },
      }
    } else {
      throw new Error('Error occurred while fetching')
    }
  } catch (error) {
    return {
      props: {
        errorMessage: error.message,
      },
    }
  }
}

export default CirculationPage
