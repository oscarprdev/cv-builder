import { Resume, ResumeBasicInformation, ResumeMeta } from '@prisma/client';

export interface ResumeModel extends Resume {
	resumeMeta: ResumeMetaModel;
	basicInfo: ResumeBasicInfoModel;
}

export interface ResumeBasicInfoModel extends ResumeBasicInformation {}
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
}
