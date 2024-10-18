import { CreateResumeUseCase } from './application/create-resume.usecase';
import { CreateResumeInfra } from './infra/create-resume.infra';
import { CreateResumeRepository } from './repository/create-resume.repository';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export const provideCreateResumeUsecase = () => {
	const createResumeInfra = new CreateResumeInfra(new ResumeClient());
	const createResumeRepository = new CreateResumeRepository(createResumeInfra);

	return new CreateResumeUseCase(createResumeRepository);
};
