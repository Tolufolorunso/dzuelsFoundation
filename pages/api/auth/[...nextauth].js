/* eslint-disable import/no-anonymous-default-export */
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import dbConnect from '@/lib/dbConnect'
import User from '@/models/UserModel'
import { verifyPassword } from '@/lib/auth'

export const authOptions = {
  session: { strategy: 'jwt', maxAge: 18000 },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        await dbConnect()
        const { username, password } = credentials
        const user = await User.findOne({ username })
        if (!user) {
          throw new Error('Wrong credentials. Try again.')
        }

        const isPasswordsCorrect = await verifyPassword(password, user.password)

        if (!isPasswordsCorrect) {
          throw new Error('Wrong credentials. Try again.')
        }

        if (!user.active) {
          throw new Error('You must be verified. Contact your administrator')
        }

        if (user) {
          return {
            username: user.username,
            role: user.role,
            active: user.active,
            name: user.name,
          }
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = user.token
        token.id = user._id
      }

      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.accessTokenExpires = token.accessTokenExpires
      session.user = { ...token }
      return session
    },
  },
}

export default NextAuth(authOptions)
