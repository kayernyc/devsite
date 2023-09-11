import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { signIn } from 'next-auth/react';

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'username:',
          type: 'text',
          placeholder: 'username please',
        },
        password: {
          label: 'password:',
          type: 'password',
          placeholder: 'password please',
        },
      },
      async authorize(credentials) {
        // where to retrieve creds
        // const user = { id: '42', name: 'Dave', password: 'nextauth' };
        const user = { id: '231', name: 'me', password: 'blb' };
        if (
          credentials?.username === process.env.AUTH_NAME &&
          credentials?.password === process.env.AUTH_PASSWORD
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn(props) {
      if (props.user.id === process.env.AUTH_USER || props.user) {
        return true;
      }

      return false;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
