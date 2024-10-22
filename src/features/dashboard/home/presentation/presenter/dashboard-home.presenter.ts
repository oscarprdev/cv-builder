'use server';

import { redirect } from 'next/navigation';
import { auth } from '~/auth';
import { provideCountResumesUsecase } from '~/features/dashboard/home/providers/count-resume.provider';
import { provideListResumesUsecase } from '~/features/dashboard/home/providers/list-resumes.provider';
import { isError } from '~/lib/utils/either';

export const dashboardHomePresenter = async () => {
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		return redirect('/signin');
	}

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
