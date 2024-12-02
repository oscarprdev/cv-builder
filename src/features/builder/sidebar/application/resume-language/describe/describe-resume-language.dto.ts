import { z } from 'zod';

export const describeResumeLanguageDto = z.object({
	resumeId: z.string(),
});

export type DescribeResumeLanguageDto = z.infer<typeof describeResumeLanguageDto>;
