'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideDeleteResumeEducationUsecase } from '~/features/builder/sidebar/provider/resume-education/delete-resume-education.provider';
import { errorResponse } from '~/lib/utils/either';

export const deleteEducationAction = async (educationId: string) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideDeleteResumeEducationUsecase();
	const response = await usecase.execute({ educationId });

	revalidatePath('/builder');

	return response;
};
