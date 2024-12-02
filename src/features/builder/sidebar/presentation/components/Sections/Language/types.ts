import { z } from 'zod';
import { languageLevels } from '~/features/builder/sidebar/presentation/presenter/resume-language.presenter';

export const languageSchema = z.object({
	id: z.string().optional(),
	language: z.string({ message: 'Language is required' }),
	level: z.enum(languageLevels),
	certificationUrl: z
		.union([
			z.string().url({ message: 'Invalid URL format - http://*****.com' }),
			z.literal(''),
			z.undefined(),
		])
		.optional(),
});

export type LanguageFormValues = z.infer<typeof languageSchema>;
