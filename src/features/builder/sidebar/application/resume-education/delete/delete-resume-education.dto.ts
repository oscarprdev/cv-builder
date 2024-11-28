import { z } from 'zod';

export const deleteResumeEducationDto = z.object({
	educationId: z.string(),
});

export type DeleteResumeEducationDto = z.infer<typeof deleteResumeEducationDto>;
