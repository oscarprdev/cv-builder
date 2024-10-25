import { DescribeResumeBasicUseCase } from '../application/resume-basic/describe/describe-resume-basic.usecase';
import { DescribeResumeBasicInfra } from '../infrastructure/describe-resume-basic.infrastructure';
import { DescribeResumeBasicRepository } from '../repository/describe-resume-basic.repository';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export const provideDescribeResumeBasicUsecase = () => {
	const infra = new DescribeResumeBasicInfra(new ResumeClient());
	const repository = new DescribeResumeBasicRepository(infra);

	return new DescribeResumeBasicUseCase(repository);
};
