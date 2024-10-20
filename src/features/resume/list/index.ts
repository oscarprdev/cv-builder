import { ListResumesUseCase } from './application/list-resumes.usecase';
import { ListResumesInfra } from './infra/list-resumes.infra';
import { ListResumesRepository } from './repository/list-resumes.repository';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export const provideListResumesUsecase = () => {
	const listResumesInfra = new ListResumesInfra(new ResumeClient());
	const listResumesRepository = new ListResumesRepository(listResumesInfra);

	return new ListResumesUseCase(listResumesRepository);
};