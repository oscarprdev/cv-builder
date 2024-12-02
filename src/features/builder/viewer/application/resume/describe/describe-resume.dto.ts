import { z } from 'zod';

export const describeResumeDto = z.object({
	resumeId: z.string(),
});

export type DescribeResumeDto = z.infer<typeof describeResumeDto>;
