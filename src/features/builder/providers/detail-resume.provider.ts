import { DetailResumeRepository } from '../../builder/repository/detail-resume.repository';
import { DetailResumeUseCase } from '../application/detail-resume/detail-resume.usecase';
import { DetailResumeInfra } from '../infrastructure/detail-resume.infra';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export const provideDetailResumeUsecase = () => {
	const detailResumeInfra = new DetailResumeInfra(new ResumeClient());
	const detailResumeRepository = new DetailResumeRepository(detailResumeInfra);

	return new DetailResumeUseCase(detailResumeRepository);
};
