import { DescribeResumeExperiencePort } from '~/features/builder/sidebar/application/resume-experience/describe/describe-resume-experience.port';
import { IDescribeResumeExperienceInfra } from '~/features/builder/sidebar/infrastructure/resume-experience/describe-resume-experience.infrastructure';
import { ResumeExperienceInfoModel } from '~/features/shared/models/resume.model';

export class DescribeResumeExperienceRepository implements DescribeResumeExperiencePort {
	constructor(private readonly infra: IDescribeResumeExperienceInfra) {}

	async describe(input: { resumeId: string }): Promise<ResumeExperienceInfoModel[]> {
		return await this.infra.describe(input);
	}
}
