import { z } from 'zod';
import { Enums } from '~/features/shared/models/resume.model';

const languageLevels = Object.values(Enums.languageLevel) as [
	Enums.LanguageLevel,
	...Enums.LanguageLevel[],
];

export const editResumeLanguageDto = z.object({
	id: z.string(),
	language: z.string(),
	level: z.enum(languageLevels),
	certificationUrl: z
		.union([
			z.string().url({ message: 'Invalid URL format - http://*****.com' }),
			z.literal(''),
			z.undefined(),
		])
		.nullable(),
});
export type EditResumeLanguageDto = z.infer<typeof editResumeLanguageDto>;
