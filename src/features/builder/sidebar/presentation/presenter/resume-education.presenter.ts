import { educationDto } from '../../application/resume-education/describe/describe-resume-education.dto';
import { z } from 'zod';
import { provideDescribeResumeEducationUsecase } from '~/features/builder/sidebar/provider/resume-education/describe-resume-education.provider';
import { isError } from '~/lib/utils/either';

export const resumeEducationPresenter = async ({ resumeId }: { resumeId: string }) => {
	const usecase = provideDescribeResumeEducationUsecase();
	const response = await usecase.execute({ resumeId });

	if (isError(response)) return response.error;

	console.log(response.success);

	const validResponse = resumeEducationPresenterDto.safeParse(response.success);

	if (!validResponse.success) return 'Invalid resume education info';

	return validResponse.data;
};

export const resumeEducationPresenterDto = z.object({
	educationInfo: z.array(educationDto),
	sectionTitle: z.string(),
});

export type EducationPresenter = z.infer<typeof educationDto>;
export type ResumeEducationPresenter = z.infer<typeof resumeEducationPresenterDto>;
