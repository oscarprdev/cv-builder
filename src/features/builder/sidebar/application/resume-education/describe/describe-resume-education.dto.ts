import { z } from 'zod';

export const describeResumeEducationDto = z.object({
	resumeId: z.string(),
});

export type DescribeResumeEducationDto = z.infer<typeof describeResumeEducationDto>;

export const educationDto = z.object({
	id: z.string(),
	resumeId: z.string(),
	institution: z.string(),
	study: z.string(),
	description: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	sortOrder: z.number(),
});

export const describeResumeEducationResponseDto = z.object(
	{
		educationInfo: z.array(educationDto, { message: 'Education Info is required' }),
		sectionTitle: z.string({ message: 'Section Title is required' }),
	},
	{ message: 'Education Info and sectionTitle fields are required' }
);

export type DescribeResumeEducationResponseDto = z.infer<typeof describeResumeEducationResponseDto>;
