import { DescribeResumeUseCase } from '~/features/builder/viewer/application/resume/describe/describe-resume.usecase';
import { DescribeResumeInfrastructure } from '~/features/builder/viewer/infrastructure/describe-resume.infrastructure';
import { DescribeResumeRepository } from '~/features/builder/viewer/repository/describe-resume.repository';

export const describeResumeProvider = () => {
	const infra = new DescribeResumeInfrastructure();
	const repo = new DescribeResumeRepository(infra);

	return new DescribeResumeUseCase(repo);
};
