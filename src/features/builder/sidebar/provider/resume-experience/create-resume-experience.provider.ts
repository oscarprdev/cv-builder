import { CreateResumeExperienceRepository } from '../../repository/resume-experience/create-resume-experience.repository';
import { CreateResumeExperienceUsecase } from '~/features/builder/sidebar/application/resume-experience/create/create-resume-experience.usecase';
import { CreateResumeExperienceInfra } from '~/features/builder/sidebar/infrastructure/resume-experience/create-resume-experience.infrastructure';

export const provideCreateResumeExperienceUsecase = () => {
	const infra = new CreateResumeExperienceInfra();
	const repository = new CreateResumeExperienceRepository(infra);

	return new CreateResumeExperienceUsecase(repository);
};
