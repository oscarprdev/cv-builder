'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { ExperienceFormValues } from '~/features/builder/sidebar/presentation/components/Sections/Experience/types';
import { errorResponse, successResponse } from '~/lib/utils/either';

export const editNewExperienceAction = async (input: ExperienceFormValues, resumeId: string) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	// const usecase = provideEditResumeExperienceUsecase();
	// const response = await usecase.execute({ ...input, resumeId });

	revalidatePath('/builder');
	console.log(resumeId, input);

	// return response;
	return successResponse('Experience updated');
};
