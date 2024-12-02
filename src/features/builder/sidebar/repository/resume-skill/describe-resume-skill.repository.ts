import { DescribeResumeSkillPort } from '~/features/builder/sidebar/application/resume-skill/describe/describe-resume-skill.port';
import { IDescribeResumeSkillInfra } from '~/features/builder/sidebar/infrastructure/resume-skill/describe-resume-skill.infrastructure';
import { ResumeSkillInfoModel } from '~/features/shared/models/resume.model';

export class DescribeResumeSkillRepository implements DescribeResumeSkillPort {
	constructor(private readonly infra: IDescribeResumeSkillInfra) {}

	async describe(input: { resumeId: string }): Promise<ResumeSkillInfoModel[]> {
		return await this.infra.describe(input);
	}
}
