import { DescribeResumeSummaryUseCase } from '~/features/builder/sidebar/application/resume-summary/describe/describe-resume-summary.usecase';
import { DescribeResumeSummaryInfra } from '~/features/builder/sidebar/infrastructure/resume-summary/describe-resume-summary.infrastructure';
import { DescribeResumeSummaryRepository } from '~/features/builder/sidebar/repository/resume-summary/describe-resume-summary.repository';

export const provideDescribeResumeSummaryUsecase = () => {
	const infra = new DescribeResumeSummaryInfra();
	const repository = new DescribeResumeSummaryRepository(infra);

	return new DescribeResumeSummaryUseCase(repository);
};
