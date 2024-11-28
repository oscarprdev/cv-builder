'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideSortResumeExperienceUsecase } from '~/features/builder/sidebar/provider/resume-experience/sort-resume-experience.provider';
import { errorResponse } from '~/lib/utils/either';

type SortExperienceInput = { experienceId: string; sortOrder: number }[];

export const sortExperienceAction = async (input: SortExperienceInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideSortResumeExperienceUsecase();
	const response = await usecase.execute(input);

	revalidatePath('/builder');

	return response;
};
