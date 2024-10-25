import { z } from 'zod';

export const describeResumeBasicDto = z.object({
	resumeId: z.string(),
});

export type DescribeResumeBasicDto = z.infer<typeof describeResumeBasicDto>;
