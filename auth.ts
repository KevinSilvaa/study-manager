import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { ErrorCodes } from "@/utils/error-codes"
import { AuthError } from "@auth/core/errors"
import prisma from "prisma/prisma"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username: string
      email: string
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 10 * 60, // 10 min
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (!user) {
          throw new AuthError('Invalid credentials!', {
            cause: ErrorCodes.InvalidCredentials,
          })
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
          throw new AuthError('Invalid credentials!', {
            cause: ErrorCodes.InvalidCredentials,
          })
        }

        return {
          id: user.id,
          email: user.email,
          name: user.username,
        }
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }

      return token;
    },
    session: async ({ session, token }) => {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: token.sub
        }
      })

      return {
        ...session,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: token.name,
        }
      };
    },
    async signIn({ user, account, profile }) {
      if (!user) {
        return false
      }

      return true
    }
  },
  // pages: {
  //   signIn: '/',
  //   error: '/', // Página de erro customizada
  // },
})
