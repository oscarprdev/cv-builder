import { DescribeResumeLanguageResponseDto } from './describe-resume-language.dto';

export interface DescribeResumeLanguagePort {
	describe(input: { resumeId: string }): Promise<DescribeResumeLanguageResponseDto>;
}
