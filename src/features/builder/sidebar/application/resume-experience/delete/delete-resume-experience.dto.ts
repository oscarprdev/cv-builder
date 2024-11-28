import { z } from 'zod';

export const deleteResumeExperienceDto = z.object({
	experienceId: z.string(),
});

export type DeleteResumeExperienceDto = z.infer<typeof deleteResumeExperienceDto>;
