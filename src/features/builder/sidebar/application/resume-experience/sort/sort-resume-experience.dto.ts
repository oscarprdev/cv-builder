import { z } from 'zod';

export const sortResumeExperienceDto = z.array(
	z.object({
		experienceId: z.string(),
		sortOrder: z.number(),
	})
);

export type SortResumeExperienceDto = z.infer<typeof sortResumeExperienceDto>;
