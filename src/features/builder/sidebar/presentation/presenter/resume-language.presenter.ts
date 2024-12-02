import { z } from 'zod';
import { provideDescribeResumeLanguageUsecase } from '~/features/builder/sidebar/provider/resume-language/describe-resume-language.provider';
import { Enums } from '~/features/shared/models/resume.model';
import { isError } from '~/lib/utils/either';

export const resumeLanguagePresenter = async ({ resumeId }: { resumeId: string }) => {
	const usecase = provideDescribeResumeLanguageUsecase();
	const response = await usecase.execute({ resumeId });

	if (isError(response)) return response.error;

	const validResponse = resumeLanguagePresenterDto.safeParse(response.success);

	if (!validResponse.success) return 'Invalid resume language info';

	return validResponse.data;
};

export const languageLevels = Object.values(Enums.languageLevel) as [
	Enums.LanguageLevel,
	...Enums.LanguageLevel[],
];

export const languageDto = z.object({
	id: z.string(),
	resumeId: z.string(),
	language: z.string(),
	level: z.enum(languageLevels),
	certificationUrl: z.string().optional(),
	sortOrder: z.number(),
});

export const resumeLanguagePresenterDto = z.array(languageDto);

export type LanguagePresenter = z.infer<typeof languageDto>;
export type ResumeLanguagePresenter = z.infer<typeof resumeLanguagePresenterDto>;
