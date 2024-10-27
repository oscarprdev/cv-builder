'use server';

import { revalidatePath } from 'next/cache';
import { ResumeSummaryPresenter } from '~/features/builder/sidebar/presentation/presenter/resume-summary.presenter';
import { provideUpdateResumeSummaryUsecase } from '~/features/builder/sidebar/provider/resume-summary/update-resume-summary.provider';

export const updateSummaryAction = async (formState: ResumeSummaryPresenter) => {
	const usecase = provideUpdateResumeSummaryUsecase();
	const response = await usecase.execute(formState);

	revalidatePath('/builder');

	return response;
};
