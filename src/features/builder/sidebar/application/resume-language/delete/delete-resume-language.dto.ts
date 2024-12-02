import { z } from 'zod';

export const deleteResumeLanguageDto = z.object({
	languageId: z.string(),
});

export type DeleteResumeLanguageDto = z.infer<typeof deleteResumeLanguageDto>;
