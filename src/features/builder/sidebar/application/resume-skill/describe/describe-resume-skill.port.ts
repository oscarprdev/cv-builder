import { ResumeSkillInfoModel } from '~/features/shared/models/resume.model';

export interface DescribeResumeSkillPort {
	describe(input: { resumeId: string }): Promise<ResumeSkillInfoModel[]>;
}
