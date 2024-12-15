import { DeleteResumeUsecase } from '../../application/resume-settings/delete/delete-resume.usecase';
import { DeleteResumeInfra } from '../../infrastructure/resume-settings/delete-resume.infrastructure';
import { DeleteResumeRepository } from '../../repository/resume-settings/delete-resume.repository';

export const provideDeleteResumeUsecase = () => {
	const infra = new DeleteResumeInfra();
	const repository = new DeleteResumeRepository(infra);

	return new DeleteResumeUsecase(repository);
};
