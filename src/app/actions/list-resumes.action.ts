'use server';

import { auth } from '~/auth';
import { provideListResumesUsecase } from '~/features/resume/list';
import { errorResponse } from '~/lib/utils/either';

export const listResumesAction = async () => {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		return errorResponse('User not found');
	}

	const usecase = provideListResumesUsecase();

	return await usecase.execute({ userId });
};
