import {
	Resume,
	ResumeBasicInformation,
	ResumeEducationInformation,
	ResumeExperienceInformation,
	ResumeLanguageInformation,
	ResumeMeta,
	ResumeSkillInformation,
	ResumeSummaryInformation,
} from '@prisma/client';

export interface ResumeModel extends Resume {
	resumeMeta: ResumeMetaModel;
	basicInfo: ResumeBasicInfoModel;
	summaryInfo: ResumeSummaryInfoModel;
	experienceInfo: ResumeExperienceInfoModel;
	educationInfo: ResumeEducationInfoModel;
	skillInfo: ResumeSkillInfoModel;
	languageInfo: ResumeLanguageInfoModel;
}

export interface ResumeBasicInfoModel extends ResumeBasicInformation {}
export interface ResumeSummaryInfoModel extends ResumeSummaryInformation {}
export interface ResumeExperienceInfoModel extends ResumeExperienceInformation {}
export interface ResumeEducationInfoModel extends ResumeEducationInformation {}
export interface ResumeSkillInfoModel extends ResumeSkillInformation {}
export interface ResumeLanguageInfoModel extends ResumeLanguageInformation {}
export interface ResumeMetaModel extends ResumeMeta {
	theme: Enums.ResumeTheme;
}

export type ResumeTheme = Enums.ResumeTheme;

export namespace Enums {
	export const resumeTheme = {
		DEFAULT: 'DEFAULT',
		HARVARD: 'HARVARD',
	} as const;

	export type ResumeTheme = (typeof resumeTheme)[keyof typeof resumeTheme];

	export const languageLevel = {
		BEGINNER: 'BEGINNER',
		INTERMEDIATE: 'INTERMEDIATE',
		ADVANCED: 'ADVANCED',
		NATIVE: 'NATIVE',
	} as const;

	export type LanguageLevel = (typeof languageLevel)[keyof typeof languageLevel];
}
