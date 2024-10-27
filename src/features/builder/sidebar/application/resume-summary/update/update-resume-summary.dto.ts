import { z } from 'zod';

export const updateResumeSummaryDto = z.object({
	resumeId: z.string(),
	summary: z.string(),
});

export type UpdateResumeSummaryDto = z.infer<typeof updateResumeSummaryDto>;
