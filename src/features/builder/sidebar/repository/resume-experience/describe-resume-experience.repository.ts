import { DescribeResumeExperienceResponseDto } from '../../application/resume-experience/describe/describe-resume-experience.dto';
import { DescribeResumeExperiencePort } from '~/features/builder/sidebar/application/resume-experience/describe/describe-resume-experience.port';
import { IDescribeResumeExperienceInfra } from '~/features/builder/sidebar/infrastructure/resume-experience/describe-resume-experience.infrastructure';

export class DescribeResumeExperienceRepository implements DescribeResumeExperiencePort {
	constructor(private readonly infra: IDescribeResumeExperienceInfra) {}

	async describe(input: { resumeId: string }): Promise<DescribeResumeExperienceResponseDto> {
		const response = await this.infra.describe(input);

		return {
			experienceInfo: response?.experienceInfo ?? [],
			sectionTitle: response?.resumeMeta?.experienceTitle ?? 'Experience',
		};
	}
}
