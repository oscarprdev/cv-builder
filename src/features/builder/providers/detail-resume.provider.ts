import { DetailResumeUseCase } from '~/features/builder/application/detail-resume/detail-resume.usecase';
import { DetailResumeInfra } from '~/features/builder/infrastructure/detail-resume.infra';
import { DetailResumeRepository } from '~/features/builder/repository/detail-resume.repository';
import { ResumeClient } from '~/lib/prisma/clients/resume/resume.client';

export const provideDetailResumeUsecase = () => {
	const detailResumeInfra = new DetailResumeInfra(new ResumeClient());
	const detailResumeRepository = new DetailResumeRepository(detailResumeInfra);

	return new DetailResumeUseCase(detailResumeRepository);
};
