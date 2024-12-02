import { DescribeResumeLanguageUsecase } from '~/features/builder/sidebar/application/resume-language/describe/describe-resume-language.usecase';
import { DescribeResumeLanguageInfra } from '~/features/builder/sidebar/infrastructure/resume-language/describe-resume-language.infrastructure';
import { DescribeResumeLanguageRepository } from '~/features/builder/sidebar/repository/resume-language/describe-resume-language.repository';

export const provideDescribeResumeLanguageUsecase = () => {
	const infra = new DescribeResumeLanguageInfra();
	const repository = new DescribeResumeLanguageRepository(infra);

	return new DescribeResumeLanguageUsecase(repository);
};
