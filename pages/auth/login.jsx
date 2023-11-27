import LoginContent from '@/components/auth/LoginContent'
import useAppStore from '@/store/applicationStateStore'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

function LoginPage() {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function submitHandler(props) {
    const { username, password } = props
    setLoading(true)

    try {
      const res = await signIn('credentials', {
        redirect: false,
        username: username,
        password: password,
      })
      if (res.error) {
        throw new Error(res.error)
      } else {
        const session = await getSession()
        toast.success(`Authenticated as ${session.user.name}`)
        router.replace('/')
        // setTimeout(() => {
        //   if (session.user.role === 'ima' || session.user.role === 'ict') {
        //     router.replace('/dashboard/' + session.user.role)
        //   } else {
        //     router.replace('/')
        //   }
        // }, 1500)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return <LoginContent submitHandler={submitHandler} loading={loading} />
}

export async function getServerSideProps(ctx) {
  // const session = await getSession(ctx)
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { ...session },
  }
}

export default LoginPage
