'use server';

import { auth } from '~/auth';
import { provideCreateResumeUsecase } from '~/features/dashboard/home/providers/create-resume.provider';
import { errorResponse } from '~/lib/utils/either';

export const createNewResumeAction = async (formData: FormData) => {
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

	const usecase = provideCreateResumeUsecase();
	return await usecase.execute({ userId, fullName, headline, email, website, phone, location });
};
