'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideSortResumeSkillUsecase } from '~/features/builder/sidebar/provider/resume-skill/sort-resume-skill.provider';
import { errorResponse } from '~/lib/utils/either';

type SortSkillInput = { id: string; sortOrder: number }[];

export const sortSkillAction = async (input: SortSkillInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideSortResumeSkillUsecase();
	const response = await usecase.execute(input.map(skill => ({ ...skill, skillId: skill.id })));

	revalidatePath('/builder');

	return response;
};
