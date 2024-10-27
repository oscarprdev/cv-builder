import { Resume } from '@prisma/client';
import { ResumeBasicInfoModel, ResumeMetaModel } from '~/features/shared/models/resume.model';

export interface ResumeClientResponse extends Resume {
	resumeMeta: ResumeMetaModel | null;
	basicInfo: ResumeBasicInfoModel | null;
}
