import { z } from 'zod';

export const describeResumeSkillDto = z.object({
	resumeId: z.string(),
});

export type DescribeResumeSkillDto = z.infer<typeof describeResumeSkillDto>;

export const skillDto = z.object({
	id: z.string(),
	resumeId: z.string(),
	name: z.string(),
	level: z.number(),
	sortOrder: z.number(),
});

export const describeResumeSkillResponseDto = z.object(
	{
		skillInfo: z.array(skillDto, { message: 'Skill Info is required' }),
		sectionTitle: z.string({ message: 'Section Title is required' }),
	},
	{ message: 'Skill Info and sectionTitle fields are required' }
);

export type DescribeResumeSkillResponseDto = z.infer<typeof describeResumeSkillResponseDto>;
