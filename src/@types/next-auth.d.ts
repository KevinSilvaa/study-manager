// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      username: string
    } & DefaultSession["user"]
  }

  interface User {
    name: string
    email: string
    id: string
  }
}