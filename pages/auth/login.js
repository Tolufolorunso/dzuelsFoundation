import LoginContent from '@/components/auth/LoginContent'
import useAppStore from '@/store/applicationStateStore'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

function LoginPage() {
  const { setErrorMessage, setSuccessMessage } = useAppStore((state) => state)

  const router = useRouter()

  async function submitHandler(props) {
    const { username, password } = props

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
        // setTimeout(() => {
        //   router.replace('/')
        // }, 1500)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return <LoginContent submitHandler={submitHandler} />
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
