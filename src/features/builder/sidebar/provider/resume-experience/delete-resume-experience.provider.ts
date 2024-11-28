import { DeleteResumeExperienceUsecase } from '~/features/builder/sidebar/application/resume-experience/delete/delete-resume-experience.usecase';
import { DeleteResumeExperienceInfra } from '~/features/builder/sidebar/infrastructure/resume-experience/delete-resume-experience.infrastructure';
import { DeleteResumeExperienceRepository } from '~/features/builder/sidebar/repository/resume-experience/delete-resume-experience.repository';

export const provideDeleteResumeExperienceUsecase = () => {
	const infra = new DeleteResumeExperienceInfra();
	const repository = new DeleteResumeExperienceRepository(infra);

	return new DeleteResumeExperienceUsecase(repository);
};
