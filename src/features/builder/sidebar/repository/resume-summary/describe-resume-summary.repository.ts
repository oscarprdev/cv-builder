import { DescribeResumeSummaryResponseDto } from '../../application/resume-summary/describe/describe-resume-summary.dto';
import { DescribeResumeSummaryPort } from '~/features/builder/sidebar/application/resume-summary/describe/describe-resume-summary.port';
import { IDescribeResumeSummaryInfra } from '~/features/builder/sidebar/infrastructure/resume-summary/describe-resume-summary.infrastructure';

export class DescribeResumeSummaryRepository implements DescribeResumeSummaryPort {
	constructor(private readonly infra: IDescribeResumeSummaryInfra) {}

	async describe(input: { resumeId: string }): Promise<DescribeResumeSummaryResponseDto> {
		const response = await this.infra.describe(input);

		return {
			summaryInfo: response?.summaryInfo ?? null,
			sectionTitle: response?.resumeMeta?.summaryTitle ?? 'Summary',
		};
	}
}
