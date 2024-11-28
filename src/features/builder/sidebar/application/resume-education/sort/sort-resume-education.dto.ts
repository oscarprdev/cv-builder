import { z } from 'zod';

export const sortResumeEducationDto = z.array(
	z.object({
		educationId: z.string(),
		sortOrder: z.number(),
	})
);

export type SortResumeEducationDto = z.infer<typeof sortResumeEducationDto>;
