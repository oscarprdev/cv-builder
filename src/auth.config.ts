import { provideLoginUsecase } from './features/auth/signin/providers/sigin.provider';
import { isError } from './lib/utils/either';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';

export default {
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		}),
		Credentials({
			async authorize(credentials) {
				const loginUsecase = provideLoginUsecase();
				const response = await loginUsecase.execute({
					email: credentials.email as string,
					password: credentials.password as string,
				});

				if (isError(response)) {
					throw new Error(response.error);
				}

				return {
					id: response.success.data.id,
				};
			},
		}),
	],
} satisfies NextAuthConfig;
