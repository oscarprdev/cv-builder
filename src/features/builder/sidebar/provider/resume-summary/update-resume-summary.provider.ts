import { UpdateResumeSummaryUsecase } from '~/features/builder/sidebar/application/resume-summary/update/update-resume-summary.usecase';
import { UpdateResumeSummaryInfra } from '~/features/builder/sidebar/infrastructure/resume-summary/update-resume-summary.infrastructure';
import { UpdateResumeSummaryRepository } from '~/features/builder/sidebar/repository/resume-summary/update-resume-summary.repository';

export const provideUpdateResumeSummaryUsecase = () => {
	const infra = new UpdateResumeSummaryInfra();
	const repository = new UpdateResumeSummaryRepository(infra);

	return new UpdateResumeSummaryUsecase(repository);
};
