'use server';

import { revalidatePath } from 'next/cache';
import { provideUpdateResumeSummaryUsecase } from '~/features/builder/sidebar/provider/resume-summary/update-resume-summary.provider';

export interface UpdateSummaryActionInput {
	summary: string;
	resumeId: string;
}

export const updateSummaryAction = async (formState: UpdateSummaryActionInput) => {
	const usecase = provideUpdateResumeSummaryUsecase();
	const response = await usecase.execute(formState);

	revalidatePath('/builder');

	return response;
};
