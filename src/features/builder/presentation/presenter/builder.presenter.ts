'use server';

import { provideDetailResumeUsecase } from '../../providers/detail-resume.provider';
import { redirect } from 'next/navigation';
import { isError } from '~/lib/utils/either';

export const builderPresenter = async ({ resumeId }: { resumeId: string }) => {
	const resumeUsecase = provideDetailResumeUsecase();
	const response = await resumeUsecase.execute({ resumeId });

	if (isError(response)) {
		redirect('/not-found');
	}

	return {
		basicInfo: response.success.basicInfo,
	};
};
