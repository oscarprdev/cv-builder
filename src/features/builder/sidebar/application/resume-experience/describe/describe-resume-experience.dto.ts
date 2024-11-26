import { z } from 'zod';

export const describeResumeExperienceDto = z.object({
	resumeId: z.string(),
});

export type DescribeResumeExperienceDto = z.infer<typeof describeResumeExperienceDto>;
