'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { errorResponse, successResponse } from '~/lib/utils/either';

export const updateBasicInfoAction = async (formData: FormData) => {
	const session = await auth();

	const fullName = formData.get('fullName') as string;
	const headline = formData.get('headline') as string;
	const email = formData.get('email') as string;
	const website = formData.get('website') as string;
	const phone = formData.get('phone') as string;
	const location = formData.get('location') as string;

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	if (!fullName || !headline || !email || !website || !phone || !location) {
		return errorResponse('Invalid payload');
	}

	revalidatePath('/builder');

	return successResponse('Success');
};
