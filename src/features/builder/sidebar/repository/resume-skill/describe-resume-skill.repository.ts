import { DescribeResumeSkillResponseDto } from '../../application/resume-skill/describe/describe-resume-skill.dto';
import { DescribeResumeSkillPort } from '~/features/builder/sidebar/application/resume-skill/describe/describe-resume-skill.port';
import { IDescribeResumeSkillInfra } from '~/features/builder/sidebar/infrastructure/resume-skill/describe-resume-skill.infrastructure';

export class DescribeResumeSkillRepository implements DescribeResumeSkillPort {
	constructor(private readonly infra: IDescribeResumeSkillInfra) {}

	async describe(input: { resumeId: string }): Promise<DescribeResumeSkillResponseDto> {
		const response = await this.infra.describe(input);

		return {
			skillInfo: response?.skillInfo ?? [],
			sectionTitle: response?.resumeMeta?.skillsTitle ?? 'Skills',
		};
	}
}
