'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideDeleteResumeLanguageUsecase } from '~/features/builder/sidebar/provider/resume-language/delete-resume-language.provider';
import { errorResponse } from '~/lib/utils/either';

export const deleteLanguageAction = async (languageId: string) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideDeleteResumeLanguageUsecase();
	const response = await usecase.execute({ languageId });

	revalidatePath('/builder');

	return response;
};
