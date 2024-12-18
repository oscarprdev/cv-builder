import { DescribeResumeSummaryResponseDto } from './describe-resume-summary.dto';

export interface DescribeResumeSummaryPort {
	describe(input: { resumeId: string }): Promise<DescribeResumeSummaryResponseDto>;
}
