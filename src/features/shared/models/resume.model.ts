import { Resume, ResumeBasicInformation, ResumeMeta } from '@prisma/client';

export interface ResumeModel extends Resume {
	resumeMeta: ResumeMetaModel;
	basicInfo: ResumeBasicInfoModel;
}

export interface ResumeBasicInfoModel extends ResumeBasicInformation {}
export interface ResumeMetaModel extends ResumeMeta {}
