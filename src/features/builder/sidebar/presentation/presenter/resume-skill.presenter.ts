import { z } from 'zod';
import { provideDescribeResumeSkillUsecase } from '~/features/builder/sidebar/provider/resume-skill/describe-resume-skill.provider';
import { isError } from '~/lib/utils/either';

export const resumeSkillPresenter = async ({ resumeId }: { resumeId: string }) => {
	const usecase = provideDescribeResumeSkillUsecase();
	const response = await usecase.execute({ resumeId });

	if (isError(response)) return response.error;

	const validResponse = resumeSkillPresenterDto.safeParse(response.success);

	if (!validResponse.success) return 'Invalid resume skill info';

	return validResponse.data;
};

export const skillDto = z.object({
	id: z.string(),
	resumeId: z.string(),
	name: z.string(),
	level: z.number(),
	sortOrder: z.number(),
});

export const resumeSkillPresenterDto = z.array(skillDto);

export type SkillPresenter = z.infer<typeof skillDto>;
export type ResumeSkillPresenter = z.infer<typeof resumeSkillPresenterDto>;
