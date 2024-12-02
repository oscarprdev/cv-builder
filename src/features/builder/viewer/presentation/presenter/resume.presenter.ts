import { z } from 'zod';
import { describeResumeAction } from '~/app/actions/resume/describe-resume.action';
import { resumeBasicPresenterDto } from '~/features/builder/sidebar/presentation/presenter/resume-basic.presenter';
import { resumeEducationPresenterDto } from '~/features/builder/sidebar/presentation/presenter/resume-education.presenter';
import { resumeExperiencePresenterDto } from '~/features/builder/sidebar/presentation/presenter/resume-experience.presenter';
import { resumeLanguagePresenterDto } from '~/features/builder/sidebar/presentation/presenter/resume-language.presenter';
import { resumeSkillPresenterDto } from '~/features/builder/sidebar/presentation/presenter/resume-skill.presenter';
import { resumeSummaryPresenterDto } from '~/features/builder/sidebar/presentation/presenter/resume-summary.presenter';
import { Enums } from '~/features/shared/models/resume.model';

export const resumePresenter = async (resumeId: string) => {
	const response = await describeResumeAction(resumeId);

	const responseToParse = {
		resumeId: response?.id,
		theme: response?.resumeMeta?.theme,
		basicInfo: response?.basicInfo,
		summaryInfo: response?.summaryInfo,
		experienceInfo: response?.experienceInfo,
		educationInfo: response?.educationInfo,
		skillInfo: response?.skillInfo,
		languageInfo: response?.languageInfo,
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
