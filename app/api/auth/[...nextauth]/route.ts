import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Handle sign up
        if (credentials.name) {
          return {
            id: '1',
            email: credentials.email,
            name: credentials.name,
            koreanLevel: 0,
          }
        }

        // Handle sign in - for demo purposes, accept any email/password
        return {
          id: '1',
          email: credentials.email,
          name: credentials.email.split('@')[0],
          koreanLevel: 1,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.koreanLevel = user.koreanLevel
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.koreanLevel = token.koreanLevel
      }
      return session
    },
  },
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
})

export { handler as GET, handler as POST }
