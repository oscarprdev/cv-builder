import { z } from 'zod';

export const createResumeEducationDto = z.object({
	resumeId: z.string(),
	institution: z.string(),
	study: z.string(),
	description: z.string(),
	startDate: z.string(),
	endDate: z.string(),
});

export type CreateResumeEducationDto = z.infer<typeof createResumeEducationDto>;
