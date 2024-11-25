'use server';

import { AuthError } from 'next-auth';
import { signIn } from '~/auth';
import { errorResponse, successResponse } from '~/lib/utils/either';

export const loginAction = async ({ email, password }: { email: string; password: string }) => {
	try {
		if (!email || !password) return errorResponse('Missing credentials');

		await signIn('credentials', {
			email,
			password,
		});

		return successResponse('User logged successfully');
	} catch (error: unknown) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return errorResponse('User credentials not valid');
				case 'CallbackRouteError':
					return errorResponse('User not found');
				default:
					return errorResponse(
						error instanceof Error ? error.message : 'Error logging user'
					);
			}
		}

		if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
			return successResponse('User logged successfully');
		}

		return errorResponse(error instanceof Error ? error.message : 'Error logging user');
	}
};
