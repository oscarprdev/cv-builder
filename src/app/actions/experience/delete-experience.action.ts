'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideDeleteResumeExperienceUsecase } from '~/features/builder/sidebar/provider/resume-experience/delete-resume-experience.provider';
import { errorResponse } from '~/lib/utils/either';

export const deleteExperienceAction = async (experienceId: string) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideDeleteResumeExperienceUsecase();
	const response = await usecase.execute({ experienceId });

	revalidatePath('/builder');

	return response;
};
