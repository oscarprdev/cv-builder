'use server';

import { auth } from '~/auth';
import { provideDeleteResumeUsecase } from '~/features/builder/sidebar/provider/resume-settings/delete-resume.provider';
import { errorResponse } from '~/lib/utils/either';

export const deleteResumeAction = async (resumeId: string) => {
	const session = await auth();

	const userId = session?.user?.id;
	if (!userId) return errorResponse('User not found');

	const usecase = provideDeleteResumeUsecase();
	const response = await usecase.execute({ resumeId });

	return response;
};
