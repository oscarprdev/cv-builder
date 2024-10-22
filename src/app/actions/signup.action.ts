'use server';

import { provideRegisterUsecase } from '~/features/auth/signup';
import { errorResponse } from '~/lib/utils/either';

export const signupAction = async (formData: FormData) => {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	if (!email || !password) return errorResponse('Missing credentials');

	const registerUsecase = provideRegisterUsecase();

	return await registerUsecase.execute({ email, password });
};
