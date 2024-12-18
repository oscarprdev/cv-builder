import { ResumeMetaModel } from '~/features/shared/models/resume.model';

export interface DescribeResumeSectionInfraOutput {
	id: string;
	userId: string;
	resumeMeta: ResumeMetaModel | null;
}
