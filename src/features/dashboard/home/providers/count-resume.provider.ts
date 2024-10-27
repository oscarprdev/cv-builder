import { CountResumesUseCase } from '~/features/dashboard/home/application/count-resume/count-resumes.usecase';
import { CountResumesInfra } from '~/features/dashboard/home/infrastructure/count-resumes.infra';
import { CountResumesRepository } from '~/features/dashboard/home/repository/count-resumes.repository';

export const provideCountResumesUsecase = () => {
	const countResumesInfra = new CountResumesInfra();
	const countResumesRepository = new CountResumesRepository(countResumesInfra);

	return new CountResumesUseCase(countResumesRepository);
};
