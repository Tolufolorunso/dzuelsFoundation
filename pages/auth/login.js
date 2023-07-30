import LoginContent from '@/components/auth/LoginContent'
import useAppStore from '@/store/applicationStateStore'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

function LoginPage() {
  const { setErrorMessage, setSuccessMessage } = useAppStore((state) => state)
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
        setSuccessMessage('login successful')
        setTimeout(() => {
          router.replace('/')
        }, 1500)
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return <LoginContent submitHandler={submitHandler} loading={loading} />
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      ...session,
    },
  }
}

export default LoginPage
