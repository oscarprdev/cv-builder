import { DescribeResumeSkillResponseDto } from './describe-resume-skill.dto';

export interface DescribeResumeSkillPort {
	describe(input: { resumeId: string }): Promise<DescribeResumeSkillResponseDto>;
}
