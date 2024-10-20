import { CountResumesUseCase } from './application/count-resumes.usecase';
import { CountResumesInfra } from './infra/count-resumes.infra';
import { CountResumesRepository } from './repository/count-resumes.repository';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export const provideCountResumesUsecase = () => {
	const countResumesInfra = new CountResumesInfra(new ResumeClient());
	const countResumesRepository = new CountResumesRepository(countResumesInfra);

	return new CountResumesUseCase(countResumesRepository);
};
