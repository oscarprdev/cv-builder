import { z } from 'zod';

export const createResumeExperienceDto = z.object({
	resumeId: z.string(),
	company: z.string(),
	position: z.string(),
	description: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	website: z.string().optional(),
});

export type CreateResumeExperienceDto = z.infer<typeof createResumeExperienceDto>;
