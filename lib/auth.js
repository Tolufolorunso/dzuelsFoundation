import { getSession } from 'next-auth/react'

export const isAuthorized = async (req) => {
  //   const session = await getSession({ req })
  return !!session
}
