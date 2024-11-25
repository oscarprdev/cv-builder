'use server';

import { provideRegisterUsecase } from '~/features/auth/signup/providers/signup.provider';
import { errorResponse } from '~/lib/utils/either';

export const signupAction = async ({ email, password }: { email: string; password: string }) => {
	if (!email || !password) return errorResponse('Missing credentials');

	const registerUsecase = provideRegisterUsecase();

	return await registerUsecase.execute({ email, password });
};
