import { provideCountResumesUsecase } from './features/resume/count';
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

				const countResumesUsecase = provideCountResumesUsecase();
				const countResponse = await countResumesUsecase.execute({
					userId: response.success.data.id,
				});

				if (isError(countResponse)) {
					throw new Error(countResponse.error);
				}

				return {
					id: response.success.data.id,
					resumesCount: countResponse.success,
				};
			},
		}),
	],
} satisfies NextAuthConfig;
