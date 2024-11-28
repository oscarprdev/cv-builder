import { z } from 'zod';

export const editResumeEducationDto = z.object({
	id: z.string(),
	institution: z.string(),
	study: z.string(),
	description: z.string(),
	startDate: z.string(),
	endDate: z.string(),
});

export type EditResumeEducationDto = z.infer<typeof editResumeEducationDto>;
