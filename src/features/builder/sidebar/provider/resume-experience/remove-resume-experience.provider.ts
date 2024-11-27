import { RemoveResumeExperienceUsecase } from '~/features/builder/sidebar/application/resume-experience/remove/remove-resume-experience.usecase';
import { RemoveResumeExperienceInfra } from '~/features/builder/sidebar/infrastructure/resume-experience/remove-resume-experience.infrastructure';
import { RemoveResumeExperienceRepository } from '~/features/builder/sidebar/repository/resume-experience/remove-resume-experience.repository';

export const provideRemoveResumeExperienceUsecase = () => {
	const infra = new RemoveResumeExperienceInfra();
	const repository = new RemoveResumeExperienceRepository(infra);

	return new RemoveResumeExperienceUsecase(repository);
};
