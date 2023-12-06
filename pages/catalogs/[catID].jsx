import ItemDetail from '@/components/cataloging/ItemDetail'
import Loading from '@/components/layout/Loading'
import Container from '@/components/layout/container'
import fetchApi from '@/utils/fetchApi'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'

function ItemPage() {
  const router = useRouter()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getItem() {
      try {
        const catID = router.query.catID
        const res = await fetchApi(`/cataloging/${catID}`)
        const { item, status } = res
        if (status) {
          setItem(item)
        }
        setLoading(false)
      } catch (error) {
        // error
      }
    }
    getItem()
  }, [router.query.catID])

  if (loading) {
    return <Loading />
  }

  return (
    <Container>
      <ItemDetail item={item} />
    </Container>
  )
}

export async function getServerSideProps(ctx) {
  // const session = await getSession(ctx)
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: {
        username: session.user.username,
        role: session.user.role,
        name: session.user.name,
      },
    },
  }
}

export default ItemPage
