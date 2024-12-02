import { z } from 'zod';

export const editResumeSkillDto = z.object({
	id: z.string(),
	name: z.string(),
	level: z.number().max(5, { message: 'Max level is 5' }).min(1, { message: 'Min level is 1' }),
});

export type EditResumeSkillDto = z.infer<typeof editResumeSkillDto>;
