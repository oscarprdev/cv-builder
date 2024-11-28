import { SortResumeEducationUseCase } from '~/features/builder/sidebar/application/resume-education/sort/sort-resume-education.usecase';
import { SortResumeEducationInfra } from '~/features/builder/sidebar/infrastructure/resume-education/sort-resume-education.infrastructure';
import { SortResumeEducationRepository } from '~/features/builder/sidebar/repository/resume-education/sort-resume-education.repository';

export const provideSortResumeEducationUsecase = () => {
	const infra = new SortResumeEducationInfra();
	const repository = new SortResumeEducationRepository(infra);

	return new SortResumeEducationUseCase(repository);
};
