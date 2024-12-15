import { DescribeResumeEducationResponseDto } from '../../application/resume-education/describe/describe-resume-education.dto';
import { DescribeResumeEducationPort } from '~/features/builder/sidebar/application/resume-education/describe/describe-resume-education.port';
import { IDescribeResumeEducationInfra } from '~/features/builder/sidebar/infrastructure/resume-education/describe-resume-education.infrastructure';

export class DescribeResumeEducationRepository implements DescribeResumeEducationPort {
	constructor(private readonly infra: IDescribeResumeEducationInfra) {}

	async describe(input: { resumeId: string }): Promise<DescribeResumeEducationResponseDto> {
		const response = await this.infra.describe(input);

		return {
			educationInfo: response?.educationInfo ?? [],
			sectionTitle: response?.resumeMeta?.educationTitle ?? 'Education',
		};
	}
}
