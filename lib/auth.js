import { getSession } from 'next-auth/react'

export const isAuthorized = async (req) => {
  //   const session = await getSession({ req })
  //   console.log(5, session)

  return !!session
}
