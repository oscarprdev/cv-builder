import authConfig from './auth.config';
import NextAuth, { NextAuthResult } from 'next-auth';

const nextAuth = NextAuth({
	callbacks: {
		session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.resumesCount = token.resumesCount as number;
			}

			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.resumesCount = user.resumesCount;
			}

			return token;
		},
	},

	session: { strategy: 'jwt' },
	...authConfig,
});

export const signIn: NextAuthResult['signIn'] = nextAuth.signIn;
export const auth: NextAuthResult['auth'] = nextAuth.auth;
export const { GET, POST }: NextAuthResult['handlers'] = nextAuth.handlers;
export const signOut: NextAuthResult['signOut'] = nextAuth.signOut;
