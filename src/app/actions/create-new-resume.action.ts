'use server';

import { z } from 'zod';
import { auth } from '~/auth';
import { newResumeFormSchema } from '~/features/dashboard/home/presentation/components/NewResumeForm/types';
import { provideCreateResumeUsecase } from '~/features/dashboard/home/providers/create-resume.provider';
import { errorResponse } from '~/lib/utils/either';

export const createNewResumeAction = async ({
	fullname,
	headline,
	email,
	website,
	phone,
	location,
}: z.infer<typeof newResumeFormSchema>) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	if (!fullname || !headline || !email || !website || !phone || !location) {
		return errorResponse('Invalid payload');
	}

	const usecase = provideCreateResumeUsecase();
	return await usecase.execute({ userId, fullname, headline, email, website, phone, location });
};
