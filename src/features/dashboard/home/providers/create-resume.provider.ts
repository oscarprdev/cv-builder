import { CreateResumeUseCase } from '~/features/dashboard/home/application/create-resume/create-resume.usecase';
import { CreateResumeInfra } from '~/features/dashboard/home/infrastructure/create-resume.infra';
import { CreateResumeRepository } from '~/features/dashboard/home/repository/create-resume.repository';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export const provideCreateResumeUsecase = () => {
	const createResumeInfra = new CreateResumeInfra(new ResumeClient());
	const createResumeRepository = new CreateResumeRepository(createResumeInfra);

	return new CreateResumeUseCase(createResumeRepository);
};
