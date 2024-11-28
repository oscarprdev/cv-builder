import { EditResumeEducationRepository } from '../../repository/resume-education/edit-resume-education.repository';
import { EditResumeEducationUsecase } from '~/features/builder/sidebar/application/resume-education/edit/edit-resume-education.usecase';
import { EditResumeEducationInfra } from '~/features/builder/sidebar/infrastructure/resume-education/edit-resume-education.infrastructure';

export const provideEditResumeEducationUsecase = () => {
	const infra = new EditResumeEducationInfra();
	const repository = new EditResumeEducationRepository(infra);

	return new EditResumeEducationUsecase(repository);
};
