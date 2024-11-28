'use server';

import { EducationActionInput } from './shared/types';
import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideCreateResumeEducationUsecase } from '~/features/builder/sidebar/provider/resume-education/create-resume-education.provider';
import { errorResponse } from '~/lib/utils/either';

export const createNewEducationAction = async (input: EducationActionInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideCreateResumeEducationUsecase();
	const response = await usecase.execute(input);

	revalidatePath('/builder');

	return response;
};
