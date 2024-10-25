import { UpdateResumeBasicUseCase } from '~/features/builder/sidebar/application/resume-basic/update/update-resume-basic.usecase';
import { UpdateResumeBasicInfra } from '~/features/builder/sidebar/infrastructure/resume-basic/update-resume-basic.infrastructure';
import { UpdateResumeBasicRepository } from '~/features/builder/sidebar/repository/resume-basic/update-resume-basic.repository';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export const provideUpdateResumeBasicUsecase = () => {
	const infra = new UpdateResumeBasicInfra(new ResumeClient());
	const repository = new UpdateResumeBasicRepository(infra);

	return new UpdateResumeBasicUseCase(repository);
};
