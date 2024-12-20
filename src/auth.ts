import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthResult } from 'next-auth';
import prisma from '~/lib/prisma/db';

const nextAuth = NextAuth({
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}

			return token;
		},
		session({ session, token, user }) {
			if (token && session.user) {
				session.user.id = token.id as string;
			}

			if (user) {
				session.user = user;
			}

			return session;
		},
	},
	session: { strategy: 'jwt' },
	adapter: PrismaAdapter(prisma),

	...authConfig,
});

export const signIn: NextAuthResult['signIn'] = nextAuth.signIn;
export const auth: NextAuthResult['auth'] = nextAuth.auth;
export const { GET, POST }: NextAuthResult['handlers'] = nextAuth.handlers;
export const signOut: NextAuthResult['signOut'] = nextAuth.signOut;
