import { z } from 'zod';
import { Enums } from '~/features/shared/models/resume.model';

export const describeResumeLanguageDto = z.object({
	resumeId: z.string(),
});

export type DescribeResumeLanguageDto = z.infer<typeof describeResumeLanguageDto>;

export const languageLevels = Object.values(Enums.languageLevel) as [
	Enums.LanguageLevel,
	...Enums.LanguageLevel[],
];

export const languageDto = z.object({
	id: z.string(),
	resumeId: z.string(),
	language: z.string(),
	level: z.enum(languageLevels),
	certificationUrl: z.string().nullable(),
	sortOrder: z.number(),
});

export const describeResumeLanguageResponseDto = z.object(
	{
		languageInfo: z.array(languageDto, { message: 'Language Info is required' }),
		sectionTitle: z.string({ message: 'Section Title is required' }),
	},
	{ message: 'Language Info and sectionTitle fields are required' }
);

export type DescribeResumeLanguageResponseDto = z.infer<typeof describeResumeLanguageResponseDto>;
