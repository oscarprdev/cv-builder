import { ResumeSummaryInfoModel } from '~/features/shared/models/resume.model';

export interface DescribeResumeSummaryPort {
	describe(input: { resumeId: string }): Promise<ResumeSummaryInfoModel | null>;
}
