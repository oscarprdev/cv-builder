import { DescribeResumeLanguagePort } from '~/features/builder/sidebar/application/resume-language/describe/describe-resume-language.port';
import { IDescribeResumeLanguageInfra } from '~/features/builder/sidebar/infrastructure/resume-language/describe-resume-language.infrastructure';
import { ResumeLanguageInfoModel } from '~/features/shared/models/resume.model';

export class DescribeResumeLanguageRepository implements DescribeResumeLanguagePort {
	constructor(private readonly infra: IDescribeResumeLanguageInfra) {}

	async describe(input: { resumeId: string }): Promise<ResumeLanguageInfoModel[]> {
		return await this.infra.describe(input);
	}
}
