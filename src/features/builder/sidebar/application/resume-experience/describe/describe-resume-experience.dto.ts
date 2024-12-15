import { z } from 'zod';

export const describeResumeExperienceDto = z.object({
	resumeId: z.string(),
});

export type DescribeResumeExperienceDto = z.infer<typeof describeResumeExperienceDto>;

export const experienceDto = z.object({
	id: z.string(),
	resumeId: z.string(),
	company: z.string(),
	role: z.string(),
	description: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	website: z.string(),
	sortOrder: z.number(),
});

export const describeResumeExperienceResponseDto = z.object(
	{
		experienceInfo: z.array(experienceDto, { message: 'Experience Info is required' }),
		sectionTitle: z.string({ message: 'Section Title is required' }),
	},
	{ message: 'Experience Info and sectionTitle fields are required' }
);

export type DescribeResumeExperienceResponseDto = z.infer<
	typeof describeResumeExperienceResponseDto
>;
