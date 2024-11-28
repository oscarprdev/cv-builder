'use server';

import { EducationActionInput } from './shared/types';
import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { EditResumeEducationDto } from '~/features/builder/sidebar/application/resume-education/edit/edit-resume-education.dto';
import { provideEditResumeEducationUsecase } from '~/features/builder/sidebar/provider/resume-education/edit-resume-education.provider';
import { errorResponse } from '~/lib/utils/either';

export const editEducationAction = async (input: EducationActionInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');
	if (!input.id) return errorResponse('Education id is required');

	const payload: EditResumeEducationDto = {
		id: input.id,
		institution: input.institution,
		description: input.description,
		study: input.study,
		startDate: input.startDate,
		endDate: input.endDate,
	};

	const usecase = provideEditResumeEducationUsecase();
	const response = await usecase.execute(payload);

	revalidatePath('/builder');

	return response;
};
