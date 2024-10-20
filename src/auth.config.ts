import { provideLoginUsecase } from './features/user/login';
import { isError } from './lib/utils/either';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default {
	providers: [
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
