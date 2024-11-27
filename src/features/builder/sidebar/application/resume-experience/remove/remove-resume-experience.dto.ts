import { z } from 'zod';

export const removeResumeExperienceDto = z.object({
	experienceId: z.string(),
});

export type RemoveResumeExperienceDto = z.infer<typeof removeResumeExperienceDto>;
