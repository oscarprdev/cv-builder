import { z } from 'zod';

export const detaildResumeDto = z.object({
	resumeId: z.string(),
});

export type DetailResumeDto = z.infer<typeof detaildResumeDto>;
