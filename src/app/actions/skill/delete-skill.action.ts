'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideDeleteResumeSkillUsecase } from '~/features/builder/sidebar/provider/resume-skill/delete-resume-skill.provider';
import { errorResponse } from '~/lib/utils/either';

export const deleteSkillAction = async (skillId: string) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideDeleteResumeSkillUsecase();
	const response = await usecase.execute({ skillId });

	revalidatePath('/builder');

	return response;
};
