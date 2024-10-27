import { DescribeResumeSummaryPort } from '~/features/builder/sidebar/application/resume-summary/describe/describe-resume-summary.port';
import { IDescribeResumeSummaryInfra } from '~/features/builder/sidebar/infrastructure/resume-summary/describe-resume-summary.infrastructure';
import { ResumeSummaryInfoModel } from '~/features/shared/models/resume.model';

export class DescribeResumeSummaryRepository implements DescribeResumeSummaryPort {
	constructor(private readonly infra: IDescribeResumeSummaryInfra) {}

	async describe(input: { resumeId: string }): Promise<ResumeSummaryInfoModel | null> {
		return await this.infra.describe(input);
	}
}
