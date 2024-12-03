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
		theme: response.success?.resumeMeta?.theme,
		basicInfo: response.success?.basicInfo,
		summaryInfo: response.success?.summaryInfo,
		experienceInfo: response.success?.experienceInfo,
		educationInfo: response.success?.educationInfo,
		skillInfo: response.success?.skillInfo,
		languageInfo: response.success?.languageInfo,
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
	theme: z.enum(resumeThemes),
	basicInfo: resumeBasicPresenterDto,
	summaryInfo: resumeSummaryPresenterDto,
	experienceInfo: resumeExperiencePresenterDto,
	educationInfo: resumeEducationPresenterDto,
	skillInfo: resumeSkillPresenterDto,
	languageInfo: resumeLanguagePresenterDto,
});

export type ResumePresenter = z.infer<typeof resumePresenterDto>;