'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideRemoveResumeExperienceUsecase } from '~/features/builder/sidebar/provider/resume-experience/remove-resume-experience.provider';
import { errorResponse } from '~/lib/utils/either';

export const removeExperienceAction = async (experienceId: string) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideRemoveResumeExperienceUsecase();
	const response = await usecase.execute({ experienceId });

	revalidatePath('/builder');

	return response;
};
