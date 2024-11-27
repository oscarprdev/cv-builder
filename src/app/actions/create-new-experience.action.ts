'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { ExperienceFormValues } from '~/features/builder/sidebar/presentation/components/Sections/Experience/types';
import { provideCreateResumeExperienceUsecase } from '~/features/builder/sidebar/provider/resume-experience/create-resume-experience.provider';
import { errorResponse } from '~/lib/utils/either';

export const createNewExperienceAction = async (input: ExperienceFormValues, resumeId: string) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideCreateResumeExperienceUsecase();
	const response = await usecase.execute({ ...input, resumeId });

	revalidatePath('/builder');

	return response;
};
