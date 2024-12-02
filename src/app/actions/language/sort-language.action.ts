'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '~/auth';
import { provideSortResumeLanguageUsecase } from '~/features/builder/sidebar/provider/resume-language/sort-resume-language.provider';
import { errorResponse } from '~/lib/utils/either';

type SortLanguageInput = { id: string; sortOrder: number }[];

export const sortLanguageAction = async (input: SortLanguageInput) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideSortResumeLanguageUsecase();
	const response = await usecase.execute(
		input.map(language => ({ ...language, languageId: language.id }))
	);

	revalidatePath('/builder');

	return response;
};
