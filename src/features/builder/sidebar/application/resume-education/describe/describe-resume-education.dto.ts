import { z } from 'zod';

export const describeResumeEducationDto = z.object({
	resumeId: z.string(),
});

export type DescribeResumeEducationDto = z.infer<typeof describeResumeEducationDto>;
