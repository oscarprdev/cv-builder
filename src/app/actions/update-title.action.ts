'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideUpdateTitleUsecase } from '~/features/builder/sidebar/provider/resume-meta/update-title.provider';
import { Enums } from '~/features/shared/models/resume.model';
import { errorResponse } from '~/lib/utils/either';

export type UpdateTitleActionInput = {
	value: string;
	resumeId: string;
	sectionKind: Enums.ResumeSection;
};

export const updateTitleAction = async (input: UpdateTitleActionInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideUpdateTitleUsecase();

	const response = await usecase.execute({
		resumeId: input.resumeId,
		title: input.value,
		kind: input.sectionKind,
	});

	revalidatePath('/builder');

	return response;
};
