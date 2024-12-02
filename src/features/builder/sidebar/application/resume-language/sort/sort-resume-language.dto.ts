import { z } from 'zod';

export const sortResumeLanguageDto = z.array(
	z.object({
		languageId: z.string(),
		sortOrder: z.number(),
	})
);

export type SortResumeLanguageDto = z.infer<typeof sortResumeLanguageDto>;
