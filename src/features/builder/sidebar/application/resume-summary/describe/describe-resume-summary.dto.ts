import { z } from 'zod';

export const describeResumeSummaryDto = z.object({
	resumeId: z.string(),
});

export type DescribeResumeSummaryDto = z.infer<typeof describeResumeSummaryDto>;

export const describeResumeSummaryResponseDto = z.object({
	summaryInfo: z
		.object(
			{
				id: z.string(),
				resumeId: z.string(),
				summary: z.string(),
			},
			{ message: 'Summary Info is required' }
		)
		.nullable(),
	sectionTitle: z.string({ message: 'Section Title is required' }),
});

export type DescribeResumeSummaryResponseDto = z.infer<typeof describeResumeSummaryResponseDto>;
