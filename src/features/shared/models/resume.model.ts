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
	id: string;
	userId: string;
	resumeMeta: ResumeMetaModel | null;
	basicInfo: ResumeBasicInfoModel | null;
	summaryInfo: ResumeSummaryInfoModel | null;
	experienceInfo: ResumeExperienceInfoModel[];
	educationInfo: ResumeEducationInfoModel[];
	skillInfo: ResumeSkillInfoModel[];
	languageInfo: ResumeLanguageInfoModel[];
}

export interface ResumeBasicInfoModel extends ResumeBasicInformation {}
export interface ResumeSummaryInfoModel extends ResumeSummaryInformation {}
export interface ResumeExperienceInfoModel extends ResumeExperienceInformation {}
export interface ResumeEducationInfoModel extends ResumeEducationInformation {}
export interface ResumeSkillInfoModel extends ResumeSkillInformation {}
export interface ResumeLanguageInfoModel extends ResumeLanguageInformation {}
export interface ResumeMetaModel extends ResumeMeta {
	summaryTitle: string;
	experienceTitle: string;
	educationTitle: string;
	skillsTitle: string;
	languagesTitle: string;
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

	export const resumeSection = {
		SUMMARY: 'SUMMARY',
		EXPERIENCE: 'EXPERIENCE',
		EDUCATION: 'EDUCATION',
		LANGUAGES: 'LANGUAGES',
		SKILLS: 'SKILLS',
	} as const;

	export type ResumeSection = (typeof resumeSection)[keyof typeof resumeSection];
}
