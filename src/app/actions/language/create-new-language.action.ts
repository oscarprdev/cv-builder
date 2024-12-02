'use server';

import { LanguageActionInput } from './shared/types';
import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideCreateResumeLanguageUsecase } from '~/features/builder/sidebar/provider/resume-language/create-resume-language.provider';
import { errorResponse } from '~/lib/utils/either';

export const createNewLanguageAction = async (input: LanguageActionInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideCreateResumeLanguageUsecase();
	const response = await usecase.execute(input);

	revalidatePath('/builder');

	return response;
};
