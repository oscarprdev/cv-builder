'use server';

import { SkillActionInput } from './shared/types';
import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideCreateResumeSkillUsecase } from '~/features/builder/sidebar/provider/resume-skill/create-resume-skill.provider';
import { errorResponse } from '~/lib/utils/either';

export const createNewSkillAction = async (input: SkillActionInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideCreateResumeSkillUsecase();
	const response = await usecase.execute(input);

	revalidatePath('/builder');

	return response;
};
