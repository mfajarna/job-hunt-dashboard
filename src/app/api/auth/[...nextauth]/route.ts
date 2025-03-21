import { comparePassword } from '@/lib/utils';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../../../lib/prisma';

export const authOptions: AuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const user = await prisma.company.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          return null;
        }

        const isMatch = await comparePassword(
          credentials?.password!!,
          user.password
        );

        if (isMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup',
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
