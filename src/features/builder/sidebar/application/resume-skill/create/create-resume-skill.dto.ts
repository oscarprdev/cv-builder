import { z } from 'zod';

export const createResumeSkillDto = z.object({
	resumeId: z.string(),
	name: z.string(),
	level: z.number(),
});

export type CreateResumeSkillDto = z.infer<typeof createResumeSkillDto>;
