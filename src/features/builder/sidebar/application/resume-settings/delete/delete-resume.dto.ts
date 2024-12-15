import { z } from 'zod';

export const deleteResumeDtoSchema = z.object({
	resumeId: z.string(),
});

export type DeleteResumeDto = z.infer<typeof deleteResumeDtoSchema>;
