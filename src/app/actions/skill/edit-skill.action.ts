'use server';

import { SkillActionInput } from './shared/types';
import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { EditResumeSkillDto } from '~/features/builder/sidebar/application/resume-skill/edit/edit-resume-skill.dto';
import { provideEditResumeSkillUsecase } from '~/features/builder/sidebar/provider/resume-skill/edit-resume-skill.provider';
import { errorResponse } from '~/lib/utils/either';

export const editNewSkillAction = async (input: SkillActionInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');
	if (!input.id) return errorResponse('Skill id is required');

	const payload: EditResumeSkillDto = {
		id: input.id,
		name: input.name,
		level: input.level,
	};

	const usecase = provideEditResumeSkillUsecase();
	const response = await usecase.execute(payload);

	revalidatePath('/builder');

	return response;
};
