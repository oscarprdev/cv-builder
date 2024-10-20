import { DetailResumeUseCase } from './application/detail-resume.usecase';
import { DetailResumeInfra } from './infra/detail-resume.infra';
import { DetailResumeRepository } from './repository/detail-resume.repository';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export const provideDetailResumeUsecase = () => {
	const detailResumeInfra = new DetailResumeInfra(new ResumeClient());
	const detailResumeRepository = new DetailResumeRepository(detailResumeInfra);

	return new DetailResumeUseCase(detailResumeRepository);
};
