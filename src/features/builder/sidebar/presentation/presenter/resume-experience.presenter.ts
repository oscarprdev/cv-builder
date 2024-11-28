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

export const experienceDto = z.object({
	id: z.string(),
	resumeId: z.string(),
	company: z.string(),
	role: z.string(),
	description: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	website: z.string(),
	sortOrder: z.number(),
});

export const resumeExperiencePresenterDto = z.array(experienceDto);

export type ExperiencePresenter = z.infer<typeof experienceDto>;
export type ResumeExperiencePresenter = z.infer<typeof resumeExperiencePresenterDto>;
