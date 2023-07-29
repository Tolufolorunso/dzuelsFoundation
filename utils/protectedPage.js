import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const useAuth = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    // Show loading state or redirect if needed
    return null
  }

  if (!session) {
    // Redirect to login page if not authenticated
    router.replace('/login')
    return null
  }

  // Return the session data if authenticated
  return session
}
