import { DescribeResumeExperienceUsecase } from '~/features/builder/sidebar/application/resume-experience/describe/describe-resume-experience.usecase';
import { DescribeResumeExperienceInfra } from '~/features/builder/sidebar/infrastructure/resume-experience/describe-resume-experience.infrastructure';
import { DescribeResumeExperienceRepository } from '~/features/builder/sidebar/repository/resume-experience/describe-resume-experience.repository';

export const provideDescribeResumeExperienceUsecase = () => {
	const infra = new DescribeResumeExperienceInfra();
	const repository = new DescribeResumeExperienceRepository(infra);

	return new DescribeResumeExperienceUsecase(repository);
};
