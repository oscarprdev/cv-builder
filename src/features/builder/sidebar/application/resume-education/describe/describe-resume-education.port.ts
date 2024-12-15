import { DescribeResumeEducationResponseDto } from './describe-resume-education.dto';

export interface DescribeResumeEducationPort {
	describe(input: { resumeId: string }): Promise<DescribeResumeEducationResponseDto>;
}
