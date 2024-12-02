import { z } from 'zod';

export const describeResumeSkillDto = z.object({
	resumeId: z.string(),
});

export type DescribeResumeSkillDto = z.infer<typeof describeResumeSkillDto>;
