import { z } from 'zod';

export const describeResumeSummaryDto = z.object({
	resumeId: z.string(),
});

export type DescribeResumeSummaryDto = z.infer<typeof describeResumeSummaryDto>;
