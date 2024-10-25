import { z } from 'zod';

export const updateResumeBasicDto = z.object({
	resumeId: z.string(),
	fullName: z.string(),
	headline: z.string(),
	email: z.string(),
	phone: z.string(),
	location: z.string(),
	website: z.string(),
});

export type UpdateResumeBasicDto = z.infer<typeof updateResumeBasicDto>;
