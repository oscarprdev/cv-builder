import { ResumeBasicInfoModel } from '~/features/shared/models/resume.model';

export interface DescribeResumeBasicPort {
	describe(input: { resumeId: string }): Promise<ResumeBasicInfoModel | null>;
}
