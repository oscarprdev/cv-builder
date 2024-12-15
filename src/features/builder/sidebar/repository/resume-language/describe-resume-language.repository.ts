import { DescribeResumeLanguageResponseDto } from '../../application/resume-language/describe/describe-resume-language.dto';
import { DescribeResumeLanguagePort } from '~/features/builder/sidebar/application/resume-language/describe/describe-resume-language.port';
import { IDescribeResumeLanguageInfra } from '~/features/builder/sidebar/infrastructure/resume-language/describe-resume-language.infrastructure';

export class DescribeResumeLanguageRepository implements DescribeResumeLanguagePort {
	constructor(private readonly infra: IDescribeResumeLanguageInfra) {}

	async describe(input: { resumeId: string }): Promise<DescribeResumeLanguageResponseDto> {
		const response = await this.infra.describe(input);

		return {
			languageInfo: response?.languageInfo ?? [],
			sectionTitle: response?.resumeMeta?.languagesTitle ?? 'Languages',
		};
	}
}
