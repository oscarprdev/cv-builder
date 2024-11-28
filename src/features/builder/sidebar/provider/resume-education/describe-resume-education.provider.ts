import { DescribeResumeEducationUsecase } from '~/features/builder/sidebar/application/resume-education/describe/describe-resume-education.usecase';
import { DescribeResumeEducationInfra } from '~/features/builder/sidebar/infrastructure/resume-education/describe-resume-education.infrastructure';
import { DescribeResumeEducationRepository } from '~/features/builder/sidebar/repository/resume-education/describe-resume-education.repository';

export const provideDescribeResumeEducationUsecase = () => {
	const infra = new DescribeResumeEducationInfra();
	const repository = new DescribeResumeEducationRepository(infra);

	return new DescribeResumeEducationUsecase(repository);
};
