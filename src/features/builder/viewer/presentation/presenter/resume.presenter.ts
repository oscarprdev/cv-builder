import { describeResumeProvider } from '../../provider/describe-resume.provider';
import { z } from 'zod';
import { educationDto } from '~/features/builder/sidebar/application/resume-education/describe/describe-resume-education.dto';
import { experienceDto } from '~/features/builder/sidebar/application/resume-experience/describe/describe-resume-experience.dto';
import { languageDto } from '~/features/builder/sidebar/application/resume-language/describe/describe-resume-language.dto';
import { skillDto } from '~/features/builder/sidebar/application/resume-skill/describe/describe-resume-skill.dto';
import { resumeBasicPresenterDto } from '~/features/builder/sidebar/presentation/presenter/resume-basic.presenter';
import { Enums } from '~/features/shared/models/resume.model';
import { isError } from '~/lib/utils/either';

export const resumePresenter = async (resumeId: string) => {
	const usecase = describeResumeProvider();
	const response = await usecase.execute({ resumeId });

	if (isError(response)) return response.error;

	const responseToParse = {
		resumeId: response.success?.id,
		resumeMeta: {
			theme: response.success?.resumeMeta?.theme,
			summaryTitle: response.success?.resumeMeta?.summaryTitle,
			experienceTitle: response.success?.resumeMeta?.experienceTitle,
			educationTitle: response.success?.resumeMeta?.educationTitle,
			skillsTitle: response.success?.resumeMeta?.skillsTitle,
			languagesTitle: response.success?.resumeMeta?.languagesTitle,
		},
		basicInfo: response.success?.basicInfo,
		summaryInfo: response.success?.summaryInfo?.summary ?? undefined,
		experienceInfo: response.success?.experienceInfo ?? [],
		educationInfo: response.success?.educationInfo ?? [],
		skillInfo: response.success?.skillInfo ?? [],
		languageInfo: response.success?.languageInfo ?? [],
	};

	const validResponse = resumePresenterDto.safeParse(responseToParse);

	if (!validResponse.success) return 'Invalid resume info';

	return validResponse.data;
};

export const resumeThemes = Object.values(Enums.resumeTheme) as [
	Enums.ResumeTheme,
	...Enums.ResumeTheme[],
];

export const resumePresenterDto = z.object({
	resumeId: z.string(),
	resumeMeta: z.object({
		summaryTitle: z.string(),
		experienceTitle: z.string(),
		educationTitle: z.string(),
		skillsTitle: z.string(),
		languagesTitle: z.string(),
		theme: z.enum(resumeThemes),
	}),
	basicInfo: resumeBasicPresenterDto.optional(),
	summaryInfo: z.string().optional(),
	experienceInfo: z.array(experienceDto).optional(),
	educationInfo: z.array(educationDto).optional(),
	skillInfo: z.array(skillDto).optional(),
	languageInfo: z.array(languageDto).optional(),
});

export type ResumePresenter = z.infer<typeof resumePresenterDto>;
