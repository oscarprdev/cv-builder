import { ResumeEducationInfoModel } from '~/features/shared/models/resume.model';

export interface DescribeResumeEducationPort {
	describe(input: { resumeId: string }): Promise<ResumeEducationInfoModel[]>;
}
