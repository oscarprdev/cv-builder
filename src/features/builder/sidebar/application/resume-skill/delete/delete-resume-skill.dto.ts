import { z } from 'zod';

export const deleteResumeSkillDto = z.object({
	skillId: z.string(),
});

export type DeleteResumeSkillDto = z.infer<typeof deleteResumeSkillDto>;
