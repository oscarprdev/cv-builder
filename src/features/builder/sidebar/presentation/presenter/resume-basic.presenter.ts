import { provideDescribeResumeBasicUsecase } from '../../provider/describe-resume-basic.provider';
import { z } from 'zod';
import { isError } from '~/lib/utils/either';

export const resumeBasicPresenter = async ({ resumeId }: { resumeId: string }) => {
	const usecase = provideDescribeResumeBasicUsecase();
	const response = await usecase.execute({ resumeId });

	if (isError(response)) return response.error;

	const validResponse = resumeBasicPresenterDto.safeParse(response.success);

	if (!validResponse.success) return 'Invalid resume basic info';

	return validResponse.data;
};

export const resumeBasicPresenterDto = z.object({
	resumeId: z.string(),
	fullName: z.string(),
	headline: z.string(),
	email: z.string(),
	phone: z.string(),
	location: z.string(),
	website: z.string(),
});

export type ResumeBasicPresenter = z.infer<typeof resumeBasicPresenterDto>;
