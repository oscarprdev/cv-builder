import { z } from 'zod';

export const sortResumeSkillDto = z.array(
	z.object({
		skillId: z.string(),
		sortOrder: z.number(),
	})
);

export type SortResumeSkillDto = z.infer<typeof sortResumeSkillDto>;
