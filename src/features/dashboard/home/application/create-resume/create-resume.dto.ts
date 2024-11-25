import { z } from 'zod';

export const createResumeDto = z.object({
	userId: z.string(),
	fullname: z.string(),
	headline: z.string(),
	email: z.string().email(),
	phone: z.string(),
	location: z.string(),
	website: z.string().url(),
});

export type CreateResumeDto = z.infer<typeof createResumeDto>;
