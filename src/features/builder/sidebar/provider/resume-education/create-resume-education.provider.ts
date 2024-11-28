import { CreateResumeEducationRepository } from '../../repository/resume-education/create-resume-education.repository';
import { CreateResumeEducationUsecase } from '~/features/builder/sidebar/application/resume-education/create/create-resume-education.usecase';
import { CreateResumeEducationInfra } from '~/features/builder/sidebar/infrastructure/resume-education/create-resume-education.infrastructure';

export const provideCreateResumeEducationUsecase = () => {
	const infra = new CreateResumeEducationInfra();
	const repository = new CreateResumeEducationRepository(infra);

	return new CreateResumeEducationUsecase(repository);
};
