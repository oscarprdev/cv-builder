import { DescribeResumeEducationPort } from '~/features/builder/sidebar/application/resume-education/describe/describe-resume-education.port';
import { IDescribeResumeEducationInfra } from '~/features/builder/sidebar/infrastructure/resume-education/describe-resume-education.infrastructure';
import { ResumeEducationInfoModel } from '~/features/shared/models/resume.model';

export class DescribeResumeEducationRepository implements DescribeResumeEducationPort {
	constructor(private readonly infra: IDescribeResumeEducationInfra) {}

	async describe(input: { resumeId: string }): Promise<ResumeEducationInfoModel[]> {
		return await this.infra.describe(input);
	}
}
