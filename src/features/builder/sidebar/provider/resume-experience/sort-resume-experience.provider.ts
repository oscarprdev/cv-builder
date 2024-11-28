import { SortResumeExperienceUseCase } from '~/features/builder/sidebar/application/resume-experience/sort/sort-resume-experience.usecase';
import { SortResumeExperienceInfra } from '~/features/builder/sidebar/infrastructure/resume-experience/sort-resume-experience.infrastructure';
import { SortResumeExperienceRepository } from '~/features/builder/sidebar/repository/resume-experience/sort-resume-experience.repository';

export const provideSortResumeExperienceUsecase = () => {
	const infra = new SortResumeExperienceInfra();
	const repository = new SortResumeExperienceRepository(infra);

	return new SortResumeExperienceUseCase(repository);
};
