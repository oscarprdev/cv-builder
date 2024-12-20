'use server';

import { ExperienceActionInput } from './shared/types';
import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideCreateResumeExperienceUsecase } from '~/features/builder/sidebar/provider/resume-experience/create-resume-experience.provider';
import { errorResponse } from '~/lib/utils/either';

export const createNewExperienceAction = async (input: ExperienceActionInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideCreateResumeExperienceUsecase();
	const response = await usecase.execute(input);

	revalidatePath('/builder');

	return response;
};
