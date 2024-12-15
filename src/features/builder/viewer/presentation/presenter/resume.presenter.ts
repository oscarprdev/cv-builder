import { describeResumeProvider } from '../../provider/describe-resume.provider';
import { z } from 'zod';
import { resumeBasicPresenterDto } from '~/features/builder/sidebar/presentation/presenter/resume-basic.presenter';
import { resumeEducationPresenterDto } from '~/features/builder/sidebar/presentation/presenter/resume-education.presenter';
import { resumeExperiencePresenterDto } from '~/features/builder/sidebar/presentation/presenter/resume-experience.presenter';
import { resumeLanguagePresenterDto } from '~/features/builder/sidebar/presentation/presenter/resume-language.presenter';
import { resumeSkillPresenterDto } from '~/features/builder/sidebar/presentation/presenter/resume-skill.presenter';
import { resumeSummaryPresenterDto } from '~/features/builder/sidebar/presentation/presenter/resume-summary.presenter';
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
		summaryInfo: response.success?.summaryInfo ?? undefined,
		experienceInfo: response.success?.experienceInfo ?? undefined,
		educationInfo: response.success?.educationInfo ?? undefined,
		skillInfo: response.success?.skillInfo ?? undefined,
		languageInfo: response.success?.languageInfo ?? undefined,
	};

	console.log(responseToParse);

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
	basicInfo: resumeBasicPresenterDto,
	summaryInfo: resumeSummaryPresenterDto.optional(),
	experienceInfo: resumeExperiencePresenterDto.optional(),
	educationInfo: resumeEducationPresenterDto.optional(),
	skillInfo: resumeSkillPresenterDto.optional(),
	languageInfo: resumeLanguagePresenterDto.optional(),
});

export type ResumePresenter = z.infer<typeof resumePresenterDto>;
