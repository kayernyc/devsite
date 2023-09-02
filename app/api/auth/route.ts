import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [],
  pages: {
    signIn: 'auth/signin',
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = 'admin';
      return token;
    },
  },
};

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  console.log('IS THIS CALLED?');
  authOptions.providers = [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ];
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
