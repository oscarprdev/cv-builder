'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideSortResumeEducationUsecase } from '~/features/builder/sidebar/provider/resume-education/sort-resume-education.provider';
import { errorResponse } from '~/lib/utils/either';

type SortEducationInput = { id: string; sortOrder: number }[];

export const sortEducationAction = async (input: SortEducationInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideSortResumeEducationUsecase();
	const response = await usecase.execute(input.map(education => ({...education, educationId: education.id})));

	revalidatePath('/builder');

	return response;
};
