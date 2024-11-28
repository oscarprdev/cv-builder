'use server';

import { ExperienceActionInput } from './shared/types';
import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { EditResumeExperienceDto } from '~/features/builder/sidebar/application/resume-experience/edit/edit-resume-experience.dto';
import { provideEditResumeExperienceUsecase } from '~/features/builder/sidebar/provider/resume-experience/edit-resume-experience.provider';
import { errorResponse } from '~/lib/utils/either';

export const editNewExperienceAction = async (input: ExperienceActionInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');
	if (!input.id) return errorResponse('Experience id is required');

	const payload: EditResumeExperienceDto = {
		id: input.id,
		company: input.company,
		description: input.description,
		role: input.role,
		startDate: input.startDate,
		endDate: input.endDate,
		website: input.website,
	};

	const usecase = provideEditResumeExperienceUsecase();
	const response = await usecase.execute(payload);

	revalidatePath('/builder');

	return response;
};
