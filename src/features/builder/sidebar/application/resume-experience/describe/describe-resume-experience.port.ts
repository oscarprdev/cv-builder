import { DescribeResumeExperienceResponseDto } from './describe-resume-experience.dto';

export interface DescribeResumeExperiencePort {
	describe(input: { resumeId: string }): Promise<DescribeResumeExperienceResponseDto>;
}
