import { CountResumesUseCase } from '~/features/dashboard/home/application/count-resume/count-resumes.usecase';
import { CountResumesInfra } from '~/features/dashboard/home/infrastructure/count-resumes.infra';
import { CountResumesRepository } from '~/features/dashboard/home/repository/count-resumes.repository';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export const provideCountResumesUsecase = () => {
	const countResumesInfra = new CountResumesInfra(new ResumeClient());
	const countResumesRepository = new CountResumesRepository(countResumesInfra);

	return new CountResumesUseCase(countResumesRepository);
};
