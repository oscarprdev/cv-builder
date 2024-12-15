import { experienceDto } from '../../application/resume-experience/describe/describe-resume-experience.dto';
import { z } from 'zod';
import { provideDescribeResumeExperienceUsecase } from '~/features/builder/sidebar/provider/resume-experience/describe-resume-experience.provider';
import { isError } from '~/lib/utils/either';

export const resumeExperiencePresenter = async ({ resumeId }: { resumeId: string }) => {
	const usecase = provideDescribeResumeExperienceUsecase();
	const response = await usecase.execute({ resumeId });

	if (isError(response)) return response.error;

	const validResponse = resumeExperiencePresenterDto.safeParse(response.success);

	if (!validResponse.success) return 'Invalid resume experience info';

	return validResponse.data;
};

export const resumeExperiencePresenterDto = z.object({
	experienceInfo: z.array(experienceDto),
	sectionTitle: z.string(),
});

export type ExperiencePresenter = z.infer<typeof experienceDto>;
export type ResumeExperiencePresenter = z.infer<typeof resumeExperiencePresenterDto>;
