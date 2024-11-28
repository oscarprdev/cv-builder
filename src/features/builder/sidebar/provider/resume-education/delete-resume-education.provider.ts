import { DeleteResumeEducationUsecase } from '~/features/builder/sidebar/application/resume-education/delete/delete-resume-education.usecase';
import { DeleteResumeEducationInfra } from '~/features/builder/sidebar/infrastructure/resume-education/delete-resume-education.infrastructure';
import { DeleteResumeEducationRepository } from '~/features/builder/sidebar/repository/resume-education/delete-resume-education.repository';

export const provideDeleteResumeEducationUsecase = () => {
	const infra = new DeleteResumeEducationInfra();
	const repository = new DeleteResumeEducationRepository(infra);

	return new DeleteResumeEducationUsecase(repository);
};
