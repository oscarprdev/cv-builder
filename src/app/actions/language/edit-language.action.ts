'use server';

import { LanguageActionInput } from './shared/types';
import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { EditResumeLanguageDto } from '~/features/builder/sidebar/application/resume-language/edit/edit-resume-language.dto';
import { provideEditResumeLanguageUsecase } from '~/features/builder/sidebar/provider/resume-language/edit-resume-language.provider';
import { errorResponse } from '~/lib/utils/either';

export const editNewLanguageAction = async (input: LanguageActionInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');
	if (!input.id) return errorResponse('Language id is required');

	const payload: EditResumeLanguageDto = {
		id: input.id,
		language: input.language,
		level: input.level,
		certificationUrl: input.certificationUrl,
	};

	const usecase = provideEditResumeLanguageUsecase();
	const response = await usecase.execute(payload);

	revalidatePath('/builder');

	return response;
};
