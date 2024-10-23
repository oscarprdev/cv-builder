'use server';

import { provideCountResumesUsecase } from '~/features/dashboard/home/providers/count-resume.provider';
import { provideListResumesUsecase } from '~/features/dashboard/home/providers/list-resumes.provider';
import { isError } from '~/lib/utils/either';

export const dashboardHomePresenter = async (userId: string) => {
	const listResumesUsecase = provideListResumesUsecase();
	const countResumesUsecase = provideCountResumesUsecase();

	const countResponse = await countResumesUsecase.execute({
		userId,
	});

	return {
		resumesCount: isError(countResponse) ? null : countResponse.success,
		userId,
		listResumesUsecase,
	};
};
