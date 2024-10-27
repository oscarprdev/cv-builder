import { DescribeResumeBasicUseCase } from '~/features/builder/sidebar/application/resume-basic/describe/describe-resume-basic.usecase';
import { DescribeResumeBasicInfra } from '~/features/builder/sidebar/infrastructure/resume-basic/describe-resume-basic.infrastructure';
import { DescribeResumeBasicRepository } from '~/features/builder/sidebar/repository/resume-basic/describe-resume-basic.repository';

export const provideDescribeResumeBasicUsecase = () => {
	const infra = new DescribeResumeBasicInfra();
	const repository = new DescribeResumeBasicRepository(infra);

	return new DescribeResumeBasicUseCase(repository);
};
