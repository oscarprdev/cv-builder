import { EditResumeExperienceRepository } from '../../repository/resume-experience/edit-resume-experience.repository';
import { EditResumeExperienceUsecase } from '~/features/builder/sidebar/application/resume-experience/edit/edit-resume-experience.usecase';
import { EditResumeExperienceInfra } from '~/features/builder/sidebar/infrastructure/resume-experience/edit-resume-experience.infrastructure';

export const provideEditResumeExperienceUsecase = () => {
	const infra = new EditResumeExperienceInfra();
	const repository = new EditResumeExperienceRepository(infra);

	return new EditResumeExperienceUsecase(repository);
};
