import { z } from 'zod';
import { provideDescribeResumeEducationUsecase } from '~/features/builder/sidebar/provider/resume-education/describe-resume-education.provider';
import { isError } from '~/lib/utils/either';

export const resumeEducationPresenter = async ({ resumeId }: { resumeId: string }) => {
	const usecase = provideDescribeResumeEducationUsecase();
	const response = await usecase.execute({ resumeId });

	if (isError(response)) return response.error;

	const validResponse = resumeEducationPresenterDto.safeParse(response.success);

	if (!validResponse.success) return 'Invalid resume education info';

	return validResponse.data;
};

export const educationDto = z.object({
	id: z.string(),
	resumeId: z.string(),
	institution: z.string(),
	study: z.string(),
	description: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	sortOrder: z.number(),
});

export const resumeEducationPresenterDto = z.array(educationDto);

export type EducationPresenter = z.infer<typeof educationDto>;
export type ResumeEducationPresenter = z.infer<typeof resumeEducationPresenterDto>;
