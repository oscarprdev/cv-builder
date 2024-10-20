import { Resume, ResumeMeta } from '@prisma/client';
import { ResumeBasicInfoModel } from '~/features/shared/models/resume.model';

export interface ResumeClientResponse extends Resume {
	resumeMeta: ResumeMeta | null;
	basicInfo: ResumeBasicInfoModel | null;
}
