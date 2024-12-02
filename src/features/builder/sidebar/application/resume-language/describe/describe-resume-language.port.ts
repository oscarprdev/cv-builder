import { ResumeLanguageInfoModel } from '~/features/shared/models/resume.model';

export interface DescribeResumeLanguagePort {
	describe(input: { resumeId: string }): Promise<ResumeLanguageInfoModel[]>;
}
