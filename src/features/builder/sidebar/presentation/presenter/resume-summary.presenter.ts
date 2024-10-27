import { z } from 'zod';
import { provideDescribeResumeSummaryUsecase } from '~/features/builder/sidebar/provider/resume-summary/describe-resume-summary.provider';
import { isError } from '~/lib/utils/either';

export const resumeSummaryPresenter = async ({ resumeId }: { resumeId: string }) => {
	const usecase = provideDescribeResumeSummaryUsecase();
	const response = await usecase.execute({ resumeId });

	if (isError(response)) return response.error;

	const responseToParse = {
		resumeId: response.success?.resumeId || resumeId,
		summary: response.success?.summary || '',
	};

	const validResponse = resumeSummaryPresenterDto.safeParse(responseToParse);

	if (validResponse.error) return 'Invalid resume summary info';

	return {
		resumeId: validResponse.data.resumeId,
		summary: validResponse.data.summary,
	};
};

export const resumeSummaryPresenterDto = z.object({
	resumeId: z.string(),
	summary: z.string(),
});

export type ResumeSummaryPresenter = z.infer<typeof resumeSummaryPresenterDto>;
