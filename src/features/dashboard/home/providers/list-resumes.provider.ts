import { ListResumesUseCase } from '../application/list-resumes/list-resumes.usecase';
import { ListResumesInfra } from '../infrastructure/list-resumes.infra';
import { ListResumesRepository } from '../repository/list-resumes.repository';

export const provideListResumesUsecase = () => {
	const listResumesInfra = new ListResumesInfra();
	const listResumesRepository = new ListResumesRepository(listResumesInfra);

	return new ListResumesUseCase(listResumesRepository);
};
