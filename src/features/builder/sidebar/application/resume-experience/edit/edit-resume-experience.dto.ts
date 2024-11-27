import { z } from 'zod';

export const editResumeExperienceDto = z.object({
	id: z.string(),
	company: z.string(),
	position: z.string(),
	description: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	website: z.string().optional(),
});

export type EditResumeExperienceDto = z.infer<typeof editResumeExperienceDto>;
